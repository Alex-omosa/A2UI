import type { APIEvent } from "@solidjs/start/server";
import { AckPolicy, DeliverPolicy, type JetStreamManager } from "nats";
import { getJetStreamClient, getJetStreamManager, getNatsConfig } from "~/server/nats";

function toSseEvent(event: string, data: string) {
  // SSE format: https://html.spec.whatwg.org/multipage/server-sent-events.html
  // Keep it simple: single-line JSON payload.
  return `event: ${event}\ndata: ${data}\n\n`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureStream(jsm: JetStreamManager, streamName: string, subjectPrefix: string) {
  try {
    await jsm.streams.info(streamName);
  } catch {
    await jsm.streams.add({
      name: streamName,
      subjects: [`${subjectPrefix}.>`],
    });
  }
}

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);

  const { url: natsUrl, streamName, subjectPrefix } = getNatsConfig();
  const subject = url.searchParams.get("subject") ?? `${subjectPrefix}.main`;
  const deliverParam = (url.searchParams.get("deliver") ?? "all").toLowerCase();
  const deliverPolicy = deliverParam === "new" ? DeliverPolicy.New : DeliverPolicy.All;

  const encoder = new TextEncoder();

  let aborted = false;
  let subscriptionCleanup: (() => Promise<void> | void) | undefined;

  const cleanupSubscription = async () => {
    try {
      await subscriptionCleanup?.();
    } catch {
      // ignore
    } finally {
      subscriptionCleanup = undefined;
    }
  };

  const shutdown = async () => {
    if (aborted) return;
    aborted = true;
    await cleanupSubscription();
    // Do not close the shared NATS connection here. It's global for the server.
  };

  event.request.signal.addEventListener("abort", () => {
    void shutdown();
  });

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          toSseEvent(
            "ready",
            JSON.stringify({
              subject,
              deliver: deliverPolicy === DeliverPolicy.New ? "new" : "all",
            })
          )
        )
      );

      (async () => {
        try {
          // Establish shared deps once, then create ONE pull consumer per SSE connection.
          // Re-pull on that consumer repeatedly (consume() expires) to avoid consumer churn.
          const js = await getJetStreamClient().catch((err) => {
            controller.enqueue(
              encoder.encode(
                toSseEvent(
                  "a2ui_error",
                  JSON.stringify({
                    code: "nats_unreachable",
                    message: `Failed to connect to NATS at ${natsUrl}. Is it running?`,
                    detail: err instanceof Error ? err.message : String(err),
                  })
                )
              )
            );
            throw err;
          });

          const jsm = await getJetStreamManager().catch((err) => {
            controller.enqueue(
              encoder.encode(
                toSseEvent(
                  "a2ui_error",
                  JSON.stringify({
                    code: "jetstream_unavailable",
                    message:
                      "JetStream manager unavailable. Is your nats-server running with JetStream enabled (nats-server -js)?",
                    detail: err instanceof Error ? err.message : String(err),
                  })
                )
              )
            );
            throw err;
          });

          await ensureStream(jsm, streamName, subjectPrefix).catch((err) => {
            controller.enqueue(
              encoder.encode(
                toSseEvent(
                  "a2ui_error",
                  JSON.stringify({
                    code: "stream_create_failed",
                    message: `Failed to get/create JetStream stream '${streamName}'.`,
                    detail: err instanceof Error ? err.message : String(err),
                  })
                )
              )
            );
            throw err;
          });

          const consumerName = `a2ui_sse_${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2)}`;
          await jsm.consumers.add(streamName, {
            name: consumerName,
            ack_policy: AckPolicy.Explicit,
            deliver_policy: deliverPolicy,
            filter_subject: subject,
          });

          const consumer = await js.consumers.get(streamName, consumerName);
          let messages: Awaited<ReturnType<typeof consumer.consume>> | undefined;

          subscriptionCleanup = async () => {
            try {
              await messages?.close();
            } catch {
              // ignore
            } finally {
              messages = undefined;
            }
            try {
              await consumer.delete();
            } catch {
              // ignore
            }
          };

          while (!aborted) {
            try {
              messages = await consumer.consume({
                // The server will renew pulls; this keeps the loop responsive.
                expires: 30_000,
              });

              for await (const msg of messages) {
                if (aborted) break;

                const raw = msg.string();
                // Publisher should send either a single A2UI message or an array of them.
                let parsed: unknown;
                try {
                  parsed = JSON.parse(raw);
                } catch {
                  msg.ack();
                  continue;
                }

                const payload = Array.isArray(parsed) ? parsed : [parsed];
                controller.enqueue(encoder.encode(toSseEvent("a2ui", JSON.stringify(payload))));
                msg.ack();
              }
            } catch (err) {
              controller.enqueue(
                encoder.encode(
                  toSseEvent(
                    "a2ui_error",
                    JSON.stringify({
                      code: "consume_failed",
                      message: `Failed consuming from subject '${subject}' in stream '${streamName}'.`,
                      detail: err instanceof Error ? err.message : String(err),
                    })
                  )
                )
              );
              await sleep(500);
            } finally {
              try {
                await messages?.close();
              } catch {
                // ignore
              } finally {
                messages = undefined;
              }
            }
          }
        } finally {
          await shutdown();
          try {
            controller.close();
          } catch {
            // ignore
          }
        }
      })().catch(async (err) => {
        try {
          controller.enqueue(
            encoder.encode(
              toSseEvent(
                "a2ui_error",
                JSON.stringify({
                  code: "stream_failed",
                  message: "A2UI SSE stream failed.",
                  detail: err instanceof Error ? err.message : String(err),
                })
              )
            )
          );
        } catch {
          // ignore
        }
        await shutdown();
        try {
          controller.close();
        } catch {
          // ignore
        }
      });
    },
    async cancel() {
      await shutdown();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
