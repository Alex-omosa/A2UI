import { DeliverPolicy, AckPolicy } from 'nats';
import { i as i$1, c, o } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'seroval';
import 'seroval-plugins/web';
import 'solid-js';
import 'solid-js/web';
import 'solid-js/web/storage';

function i(a, n) {
  return `event: ${a}
data: ${n}

`;
}
function m(a) {
  return new Promise((n) => setTimeout(n, a));
}
async function O(a, n, y) {
  try {
    await a.streams.info(n);
  } catch {
    await a.streams.add({ name: n, subjects: [`${y}.>`] });
  }
}
async function x(a) {
  var _a;
  const n = new URL(a.request.url), { url: y, streamName: c$1, subjectPrefix: w } = i$1(), g = (_a = n.searchParams.get("subject")) != null ? _a : `${w}.main`, s = new TextEncoder();
  let o$1 = false, l;
  const S = async () => {
    try {
      await (l == null ? void 0 : l());
    } catch {
    } finally {
      l = void 0;
    }
  }, u = async () => {
    o$1 || (o$1 = true, await S());
  };
  a.request.signal.addEventListener("abort", () => {
    u();
  });
  const J = new ReadableStream({ start(t) {
    t.enqueue(s.encode(i("ready", JSON.stringify({ subject: g })))), (async () => {
      var _a2, _b, _c;
      try {
        for (; !o$1; ) {
          try {
            await c();
          } catch (e) {
            t.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "nats_unreachable", message: `Failed to connect to NATS at ${y}. Is it running?`, detail: e instanceof Error ? e.message : String(e) })))), await m(1e3);
            continue;
          }
          let r;
          try {
            r = await o();
          } catch (e) {
            t.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "jetstream_unavailable", message: "JetStream manager unavailable. Is your nats-server running with JetStream enabled (nats-server -js)?", detail: e instanceof Error ? e.message : String(e) })))), await m(1e3);
            continue;
          }
          try {
            await O(r, c$1, w);
          } catch (e) {
            t.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "stream_create_failed", message: `Failed to get/create JetStream stream '${c$1}'.`, detail: e instanceof Error ? e.message : String(e) })))), await m(1e3);
            continue;
          }
          try {
            const e = await c(), h = `a2ui_sse_${(_c = (_b = (_a2 = globalThis.crypto) == null ? void 0 : _a2.randomUUID) == null ? void 0 : _b.call(_a2)) != null ? _c : Math.random().toString(16).slice(2)}`;
            await r.consumers.add(c$1, { name: h, ack_policy: AckPolicy.Explicit, deliver_policy: DeliverPolicy.New, filter_subject: g });
            const b = await e.consumers.get(c$1, h), p = await b.consume({ expires: 3e4 });
            l = async () => {
              try {
                await p.close();
              } catch {
              }
              try {
                await b.delete();
              } catch {
              }
            };
            for await (const f of p) {
              if (o$1) break;
              const v = f.string();
              let d;
              try {
                d = JSON.parse(v);
              } catch {
                f.ack();
                continue;
              }
              const N = Array.isArray(d) ? d : [d];
              t.enqueue(s.encode(i("a2ui", JSON.stringify(N)))), f.ack();
            }
          } catch (e) {
            t.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "subscribe_failed", message: `Failed subscribing to subject '${g}' in stream '${c$1}'.`, detail: e instanceof Error ? e.message : String(e) }))));
          }
          await S(), await m(500);
        }
      } finally {
        await u();
        try {
          t.close();
        } catch {
        }
      }
    })().catch(async (r) => {
      try {
        t.enqueue(s.encode(i("a2ui_error", JSON.stringify({ code: "stream_failed", message: "A2UI SSE stream failed.", detail: r instanceof Error ? r.message : String(r) }))));
      } catch {
      }
      await u();
      try {
        t.close();
      } catch {
      }
    });
  }, async cancel() {
    await u();
  } });
  return new Response(J, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" } });
}

export { x as GET };
//# sourceMappingURL=stream2.mjs.map
