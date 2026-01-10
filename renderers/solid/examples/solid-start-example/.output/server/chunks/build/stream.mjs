import { DeliverPolicy, AckPolicy, connect } from 'nats';

function w() {
  const e = globalThis;
  return e.__a2uiNats || (e.__a2uiNats = {}), e.__a2uiNats;
}
function N() {
  var _a, _b, _c;
  return { url: (_a = process.env.NATS_URL) != null ? _a : "nats://127.0.0.1:4222", streamName: (_b = process.env.A2UI_STREAM) != null ? _b : "A2UI", subjectPrefix: (_c = process.env.A2UI_SUBJECT_PREFIX) != null ? _c : "a2ui" };
}
async function v() {
  const e = N(), t = w();
  return t.nc ? t.nc : (t.ncPromise || (t.ncPromise = connect({ servers: e.url, name: "a2ui-solidstart" }).then((c) => (t.nc = c, c))), t.ncPromise);
}
async function q() {
  const e = w();
  return e.jsmPromise || (e.jsmPromise = v().then((t) => t.jetstreamManager())), e.jsmPromise;
}
async function j() {
  const e = w();
  return e.jsPromise || (e.jsPromise = v().then((t) => t.jetstream())), e.jsPromise;
}
function i(e, t) {
  return `event: ${e}
data: ${t}

`;
}
function g(e) {
  return new Promise((t) => setTimeout(t, e));
}
async function C(e, t, c) {
  try {
    await e.streams.info(t);
  } catch {
    await e.streams.add({ name: t, subjects: [`${c}.>`] });
  }
}
async function I(e) {
  var _a;
  const t = new URL(e.request.url), { url: c, streamName: o, subjectPrefix: S } = N(), l = (_a = t.searchParams.get("subject")) != null ? _a : `${S}.main`, s = new TextEncoder();
  let u = false, f;
  const h = async () => {
    try {
      await (f == null ? void 0 : f());
    } catch {
    } finally {
      f = void 0;
    }
  }, m = async () => {
    u || (u = true, await h());
  };
  e.request.signal.addEventListener("abort", () => {
    m();
  });
  const P = new ReadableStream({ start(n) {
    n.enqueue(s.encode(i("ready", JSON.stringify({ subject: l })))), (async () => {
      var _a2, _b, _c;
      try {
        for (; !u; ) {
          try {
            await j();
          } catch (a) {
            n.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "nats_unreachable", message: `Failed to connect to NATS at ${c}. Is it running?`, detail: a instanceof Error ? a.message : String(a) })))), await g(1e3);
            continue;
          }
          let r;
          try {
            r = await q();
          } catch (a) {
            n.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "jetstream_unavailable", message: "JetStream manager unavailable. Is your nats-server running with JetStream enabled (nats-server -js)?", detail: a instanceof Error ? a.message : String(a) })))), await g(1e3);
            continue;
          }
          try {
            await C(r, o, S);
          } catch (a) {
            n.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "stream_create_failed", message: `Failed to get/create JetStream stream '${o}'.`, detail: a instanceof Error ? a.message : String(a) })))), await g(1e3);
            continue;
          }
          try {
            const a = await j(), _ = `a2ui_sse_${(_c = (_b = (_a2 = globalThis.crypto) == null ? void 0 : _a2.randomUUID) == null ? void 0 : _b.call(_a2)) != null ? _c : Math.random().toString(16).slice(2)}`;
            await r.consumers.add(o, { name: _, ack_policy: AckPolicy.Explicit, deliver_policy: DeliverPolicy.New, filter_subject: l });
            const b = await a.consumers.get(o, _), p = await b.consume({ expires: 3e4 });
            f = async () => {
              try {
                await p.close();
              } catch {
              }
              try {
                await b.delete();
              } catch {
              }
            };
            for await (const y of p) {
              if (u) break;
              const E = y.string();
              let d;
              try {
                d = JSON.parse(E);
              } catch {
                y.ack();
                continue;
              }
              const J = Array.isArray(d) ? d : [d];
              n.enqueue(s.encode(i("a2ui", JSON.stringify(J)))), y.ack();
            }
          } catch (a) {
            n.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "subscribe_failed", message: `Failed subscribing to subject '${l}' in stream '${o}'.`, detail: a instanceof Error ? a.message : String(a) }))));
          }
          await h(), await g(500);
        }
      } finally {
        await m();
        try {
          n.close();
        } catch {
        }
      }
    })().catch(async (r) => {
      try {
        n.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "stream_failed", message: "A2UI SSE stream failed.", detail: r instanceof Error ? r.message : String(r) }))));
      } catch {
      }
      await m();
      try {
        n.close();
      } catch {
      }
    });
  }, async cancel() {
    await m();
  } });
  return new Response(P, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" } });
}

export { I as GET };
//# sourceMappingURL=stream.mjs.map
