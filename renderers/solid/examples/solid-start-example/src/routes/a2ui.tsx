import { A2UIProvider, A2UISurface, ThemeProvider, createProcessor, Types } from "@a2ui/solid";
import { Title } from "@solidjs/meta";
import { onCleanup, onMount } from "solid-js";

const processor = createProcessor();

processor.onDispatch(async (event) => {
  // In a real app, send `event.message` to your server and resolve with the server response messages.
  console.log("User action dispatched:", event.message);
  event.resolve([]);
});

function startA2uiSseTransport(processor: ReturnType<typeof createProcessor>) {
  const subject = "a2ui.main";
  const es = new EventSource(`/api/a2ui/stream?subject=${encodeURIComponent(subject)}`);

  es.addEventListener("ready", (evt) => {
    console.log("A2UI transport ready:", (evt as MessageEvent).data);
  });

  es.addEventListener("a2ui", (evt) => {
    const raw = (evt as MessageEvent).data;
    try {
      const parsed = JSON.parse(raw);
      const messages: Types.ServerToClientMessage[] = Array.isArray(parsed) ? parsed : [parsed];
      processor.processMessages(messages);
    } catch (err) {
      console.warn("Failed to parse A2UI SSE message", err);
    }
  });

  es.addEventListener("a2ui_error", (evt) => {
    const raw = (evt as MessageEvent).data;
    console.warn("A2UI transport server error:", raw);
  });

  es.addEventListener("error", (evt) => {
    // Browser will retry automatically. If the server emitted an SSE 'error' event,
    // it may arrive here with a JSON payload.
    const maybeData = (evt as unknown as MessageEvent | undefined)?.data;
    if (typeof maybeData === "string" && maybeData.length > 0) {
      console.warn("A2UI transport error:", maybeData);
      return;
    }
    // Avoid spamming logs: this fires during normal reconnect behavior.
    console.warn("A2UI transport connection issue (will retry)");
  });

  return () => {
    es.close();
  };
}

export default function A2UIDemoRoute() {
  onMount(() => {
    // Client-only: connect after hydration.
    const stop = startA2uiSseTransport(processor);
    onCleanup(stop);
  });

  return (
    <main>
      <Title>A2UI Demo</Title>
      <h1>A2UI Solid renderer demo</h1>
      <ThemeProvider>
        <A2UIProvider processor={processor}>
          <div style={{ padding: "16px" }}>
            <A2UISurface surfaceId="main" />
          </div>
        </A2UIProvider>
      </ThemeProvider>
    </main>
  );
}
