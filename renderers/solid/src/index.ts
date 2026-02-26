/**
 * @a2ui/solid - A2UI SolidJS Renderer
 * 
 * A SolidJS implementation of the A2UI renderer.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                         MESSAGE FLOW OVERVIEW                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │                                                                         │
 * │  ┌─────────────┐     ┌─────────────┐     ┌─────────────────────────┐   │
 * │  │   Agent     │     │  Transport  │     │     Your App Shell      │   │
 * │  │  (Server)   │────▶│  (A2A/SSE)  │────▶│  processor.process()    │   │
 * │  └─────────────┘     └─────────────┘     └───────────┬─────────────┘   │
 * │                                                      │ STEP 1          │
 * │                                                      ▼                 │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                    SolidMessageProcessor                        │   │
 * │  │  • Parses messages (beginRendering, surfaceUpdate, etc.)        │   │
 * │  │  • Maintains surfaces Map and data model                        │   │
 * │  │  • Triggers reactivity via surfacesVersion signal               │   │
 * │  └───────────────────────────────┬─────────────────────────────────┘   │
 * │                                  │ STEP 2                              │
 * │                                  ▼                                     │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                       A2UISurface                               │   │
 * │  │  • Subscribes to surfacesVersion                                │   │
 * │  │  • Reads surface root component from processor.surfaces         │   │
 * │  └───────────────────────────────┬─────────────────────────────────┘   │
 * │                                  │ STEP 3-4                            │
 * │                                  ▼                                     │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                         Renderer                                │   │
 * │  │  • Maps component.type to SolidJS components                    │   │
 * │  │  • Recursively renders component tree                           │   │
 * │  │  • Components resolve bound values from data model              │   │
 * │  └───────────────────────────────┬─────────────────────────────────┘   │
 * │                                  │ STEP 5 (user interaction)           │
 * │                                  ▼                                     │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                    Button/TextField/etc.                        │   │
 * │  │  • User clicks/types → sendAction()                             │   │
 * │  │  • processor.dispatch() → your app → transport → agent          │   │
 * │  │  • Response cycles back to STEP 1                               │   │
 * │  └─────────────────────────────────────────────────────────────────┘   │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * USAGE EXAMPLE:
 * 
 * ```tsx
 * import { render } from "solid-js/web";
 * import { 
 *   A2UIProvider, 
 *   A2UISurface, 
 *   createProcessor 
 * } from "@a2ui/solid";
 * 
 * // Create processor
 * const processor = createProcessor();
 * 
 * // Listen for events to send to your transport
 * processor.onDispatch((event) => {
 *   // Send event.message to your server via A2A, SSE, WebSocket, etc.
 *   myTransport.send(event.message).then((responses) => {
 *     event.resolve(responses);
 *     // Optionally process responses immediately
 *     processor.processMessages(responses);
 *   });
 * });
 * 
 * // Receive messages from transport
 * myTransport.onMessage((messages) => {
 *   processor.processMessages(messages);
 * });
 * 
 * // Render
 * render(() => (
 *   <A2UIProvider processor={processor}>
 *     <A2UISurface surfaceId="main" />
 *   </A2UIProvider>
 * ), document.getElementById("app"));
 * ```
 */

// Data layer
export { 
  SolidMessageProcessor, 
  createProcessor,
  type DispatchedEvent 
} from "./data";

// Context providers
export { 
  A2UIProvider, 
  useProcessor,
  ThemeProvider,
  useTheme,
  defaultTheme,
  type A2UITheme 
} from "./context";

// Components
export {
  Renderer,
  A2UISurface,
  Text,
  Button,
  Row,
  Column,
  resolveString,
  resolveNumber,
  resolveBoolean,
  sendAction,
} from "./components";

// Re-export types from lit for convenience
export { Types, Primitives, Styles } from "@a2ui/lit/0.8";
