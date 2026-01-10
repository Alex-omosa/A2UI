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
    { beginRendering: { surfaceId: "main" } },
    {
      surfaceUpdate: {
        surfaceId: "main",
        root: {
          type: "column",
          id: "root-column",
          dataContextPath: "",
          properties: {
            children: [
              {
                type: "text",
                id: "title",
                dataContextPath: "",
                properties: { text: { literalString: "Hello from A2UI!" }, usageHint: "h1" }
              },
              {
                type: "text",
                id: "subtitle",
                dataContextPath: "",
                properties: {
                  text: { literalString: "This is rendered by the SolidJS renderer inside SolidStart." },
                  usageHint: "body"
                }
              },
              {
                type: "row",
                id: "button-row",
                dataContextPath: "",
                properties: {
                  children: [
                    {
                      type: "button",
                      id: "btn-1",
                      dataContextPath: "",
                      properties: {
                        action: { name: "greet", context: [] },
                        child: {
                          type: "text",
                          id: "btn-1-text",
                          dataContextPath: "",
                          properties: { text: { literalString: "Say Hello" }, usageHint: "body" }
                        }
                      }
                    },
                    {
                      type: "button",
                      id: "btn-2",
                      dataContextPath: "",
                      properties: {
                        action: { name: "goodbye", context: [] },
                        child: {
                          type: "text",
                          id: "btn-2-text",
                          dataContextPath: "",
                          properties: { text: { literalString: "Say Goodbye" }, usageHint: "body" }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        } as Types.ColumnNode
      }
    }
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
