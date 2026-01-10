import { A2UIProvider, A2UISurface, ThemeProvider, createProcessor, Types } from "@a2ui/solid";
import { Title } from "@solidjs/meta";
import { onMount } from "solid-js";

const processor = createProcessor();

processor.onDispatch(async (event) => {
  // In a real app, send `event.message` to your server and resolve with the server response messages.
  console.log("User action dispatched:", event.message);
  event.resolve([]);
});

function simulateAgentMessage() {
  const messages: Types.ServerToClientMessage[] = [
    {
      beginRendering: {
        surfaceId: "main",
        root: "root",
      },
    },
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root",
            component: {
              Column: {
                children: { explicitList: ["title", "subtitle", "button-row"] },
              },
            },
          },
          {
            id: "title",
            component: {
              Text: {
                text: { literalString: "Hello from A2UI!" },
                usageHint: "h1",
              },
            },
          },
          {
            id: "subtitle",
            component: {
              Text: {
                text: {
                  literalString: "This is rendered by the SolidJS renderer inside SolidStart.",
                },
                usageHint: "body",
              },
            },
          },
          {
            id: "button-row",
            component: {
              Row: {
                children: { explicitList: ["btn-1", "btn-2"] },
              },
            },
          },
          {
            id: "btn-1",
            component: {
              Button: {
                action: { name: "greet", context: [] },
                child: "btn-1-text",
              },
            },
          },
          {
            id: "btn-1-text",
            component: {
              Text: {
                text: { literalString: "Say Hello" },
                usageHint: "body",
              },
            },
          },
          {
            id: "btn-2",
            component: {
              Button: {
                action: { name: "goodbye", context: [] },
                child: "btn-2-text",
              },
            },
          },
          {
            id: "btn-2-text",
            component: {
              Text: {
                text: { literalString: "Say Goodbye" },
                usageHint: "body",
              },
            },
          },
        ],
      },
    },
  ];

  processor.processMessages(messages);
}

export default function A2UIDemoRoute() {
  onMount(() => {
    // Client-only: hydrate first, then push messages.
    setTimeout(simulateAgentMessage, 50);
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
