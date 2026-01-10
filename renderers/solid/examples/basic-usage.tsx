/**
 * Example: Basic Usage of @a2ui/solid
 * 
 * This file demonstrates how to:
 * 1. Set up the processor
 * 2. Connect to a transport (mocked here)
 * 3. Render A2UI surfaces
 * 
 * This is NOT meant to be run directly - it's a reference for integration.
 */

import { render } from "solid-js/web";
import { 
  A2UIProvider, 
  ThemeProvider,
  A2UISurface, 
  createProcessor,
  Types 
} from "../src";

// ============================================================================
// STEP 1: Create the message processor
// ============================================================================
const processor = createProcessor();

// ============================================================================
// STEP 2: Connect processor events to your transport layer
// ============================================================================

// When user interacts (button click, text input, etc.),
// the processor dispatches events that need to go to your server
processor.onDispatch(async (event) => {
  console.log("User action dispatched:", event.message);
  
  // In a real app, you'd send this to your server:
  // const responses = await fetch('/api/a2a', {
  //   method: 'POST',
  //   body: JSON.stringify(event.message)
  // }).then(r => r.json());
  
  // For this example, we'll simulate an empty response
  event.resolve([]);
});

// ============================================================================
// STEP 3: Feed incoming messages from your transport into the processor
// ============================================================================

// Example: Simulate receiving messages from an agent
// In a real app, this would come from SSE, WebSocket, or A2A protocol
function simulateAgentMessage() {
  const messages: Types.ServerToClientMessage[] = [
    {
      // This message creates a surface with a simple UI
      beginRendering: {
        surfaceId: "main",
      }
    },
    {
      // This message updates the surface with a component tree
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
                properties: {
                  text: { literalString: "Hello from A2UI!" },
                  usageHint: "h1"
                }
              },
              {
                type: "text",
                id: "subtitle",
                dataContextPath: "",
                properties: {
                  text: { literalString: "This is rendered by the SolidJS renderer." },
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
                        action: {
                          name: "greet",
                          context: []
                        },
                        child: {
                          type: "text",
                          id: "btn-1-text",
                          dataContextPath: "",
                          properties: {
                            text: { literalString: "Say Hello" },
                            usageHint: "body"
                          }
                        }
                      }
                    },
                    {
                      type: "button",
                      id: "btn-2",
                      dataContextPath: "",
                      properties: {
                        action: {
                          name: "goodbye",
                          context: []
                        },
                        child: {
                          type: "text",
                          id: "btn-2-text",
                          dataContextPath: "",
                          properties: {
                            text: { literalString: "Say Goodbye" },
                            usageHint: "body"
                          }
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

  // STEP 1 in action: Process the messages
  processor.processMessages(messages);
}

// ============================================================================
// STEP 4: Render the application
// ============================================================================

function App() {
  // Trigger the simulated message on mount
  setTimeout(simulateAgentMessage, 100);

  return (
    <ThemeProvider>
      <A2UIProvider processor={processor}>
        <div style={{ padding: "20px", "font-family": "sans-serif" }}>
          <h1>A2UI SolidJS Renderer Demo</h1>
          
          {/* This renders the "main" surface */}
          <A2UISurface surfaceId="main" />
        </div>
      </A2UIProvider>
    </ThemeProvider>
  );
}

// Mount the app
// render(() => <App />, document.getElementById("app")!);

export { App, processor };
