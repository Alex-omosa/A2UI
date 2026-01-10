# @a2ui/solid - A2UI SolidJS Renderer

A SolidJS implementation of the A2UI renderer, following the same pattern as the Angular renderer by importing core logic from `@a2ui/lit`.

## Architecture

```
@a2ui/lit (imported)              @a2ui/solid (this package)
├── Types          ◄────────────── Re-exported
├── Primitives     ◄────────────── Re-exported  
├── Data           ◄────────────── Extended (SolidMessageProcessor)
├── Styles         ◄────────────── Re-exported
└── UI (Lit)       ✗ NOT USED     └── Components (SolidJS native)
```

## Message Flow (5 Steps)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MESSAGE FLOW                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐    ┌───────────┐    ┌──────────────────────────────────┐  │
│  │  Agent  │───▶│ Transport │───▶│ processor.processMessages()      │  │
│  │(Server) │    │(A2A/SSE)  │    │                                  │  │
│  └─────────┘    └───────────┘    │  STEP 1: Parse messages          │  │
│                                  │  • handleBeginRendering          │  │
│                                  │  • handleSurfaceUpdate           │  │
│                                  │  • handleDataModelUpdate         │  │
│                                  │  → Updates surfaces Map          │  │
│                                  │  → Increments surfacesVersion    │  │
│                                  └───────────────┬──────────────────┘  │
│                                                  │                     │
│                                                  ▼                     │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        A2UISurface                                │ │
│  │                                                                   │ │
│  │  STEP 2: Subscribe to surface changes                            │ │
│  │  • createMemo(() => { processor.surfacesVersion; ... })          │ │
│  │  • Reads processor.surfaces.get(surfaceId)                       │ │
│  │  • Gets root component from surface                              │ │
│  └───────────────────────────────┬───────────────────────────────────┘ │
│                                  │                                     │
│                                  ▼                                     │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                         Renderer                                  │ │
│  │                                                                   │ │
│  │  STEP 3-4: Map component types to SolidJS components             │ │
│  │  • Switch on component.type                                      │ │
│  │  • "text" → <Text />                                             │ │
│  │  • "button" → <Button />                                         │ │
│  │  • "row" → <Row />                                               │ │
│  │  • etc.                                                          │ │
│  └───────────────────────────────┬───────────────────────────────────┘ │
│                                  │                                     │
│                                  ▼                                     │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    Text / Button / Row / etc.                     │ │
│  │                                                                   │ │
│  │  STEP 4 continued: Resolve bound values                          │ │
│  │  • resolveString(processor, component, value, surfaceId)         │ │
│  │  • Handles { literalString } and { path } references             │ │
│  │  • Renders actual UI                                             │ │
│  │                                                                   │ │
│  │  STEP 5: Handle user interactions (Button only)                  │ │
│  │  • onClick → sendAction(processor, component, action, surfaceId) │ │
│  │  • Builds A2UIClientEventMessage                                 │ │
│  │  • processor.dispatch() → your transport → agent                 │ │
│  │  • Response cycles back to STEP 1                                │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Installation

```bash
npm install @a2ui/solid solid-js
```

## Quick Start

```tsx
import { render } from "solid-js/web";
import { 
  A2UIProvider, 
  ThemeProvider,
  A2UISurface, 
  createProcessor 
} from "@a2ui/solid";

// 1. Create processor
const processor = createProcessor();

// 2. Connect to your transport
processor.onDispatch((event) => {
  // Send event.message to your server
  myTransport.send(event.message).then((responses) => {
    event.resolve(responses);
    processor.processMessages(responses);
  });
});

// 3. Receive messages from transport
myTransport.onMessage((messages) => {
  processor.processMessages(messages);
});

// 4. Render
render(() => (
  <ThemeProvider>
    <A2UIProvider processor={processor}>
      <A2UISurface surfaceId="main" />
    </A2UIProvider>
  </ThemeProvider>
), document.getElementById("app"));
```

## File Structure

```
src/
├── index.ts                 # Main exports
├── data/
│   ├── processor.ts         # SolidMessageProcessor (extends @a2ui/lit)
│   └── index.ts
├── context/
│   ├── processor-context.tsx # SolidJS context for processor
│   ├── theme-context.tsx     # SolidJS context for theming
│   └── index.ts
└── components/
    ├── base.ts              # resolveString, sendAction utilities
    ├── Renderer.tsx         # Dynamic component mapper
    ├── Surface.tsx          # A2UISurface entry point
    ├── Text.tsx             # Text component
    ├── Button.tsx           # Button component (with actions)
    ├── Row.tsx              # Horizontal layout
    ├── Column.tsx           # Vertical layout
    └── index.ts
```

## What's Imported from @a2ui/lit

| Module | Usage |
|--------|-------|
| `Types` | TypeScript interfaces (ServerToClientMessage, AnyComponentNode, etc.) |
| `Primitives` | Bound value types (StringValue, NumberValue, BooleanValue) |
| `Data.A2uiMessageProcessor` | Core message processing logic (extended by SolidMessageProcessor) |
| `Styles` | Style merging utilities |

## Adding New Components

1. Create component file in `src/components/`:

```tsx
// src/components/Card.tsx
import { Component } from "solid-js";
import { Types } from "@a2ui/lit/0.8";
import { useProcessor } from "../context";
import { Renderer } from "./Renderer";

interface CardProps {
  component: Types.CardNode;
  surfaceId: Types.SurfaceID;
  weight?: number;
}

export const Card: Component<CardProps> = (props) => {
  return (
    <div class="a2ui-card">
      <Renderer 
        component={props.component.properties.child} 
        surfaceId={props.surfaceId}
      />
    </div>
  );
};
```

2. Add to `Renderer.tsx`:

```tsx
import { Card } from "./Card";

// In the Switch:
<Match when={component().type === "card"}>
  <Card 
    component={component() as Types.CardNode}
    surfaceId={props.surfaceId}
    weight={props.weight}
  />
</Match>
```

3. Export from `components/index.ts`

## Components Status

| Component | Status | Notes |
|-----------|--------|-------|
| Text | ✅ Implemented | Basic text rendering |
| Button | ✅ Implemented | With action dispatch |
| Row | ✅ Implemented | Horizontal flex layout |
| Column | ✅ Implemented | Vertical flex layout |
| List | ❌ TODO | |
| Card | ❌ TODO | |
| Image | ❌ TODO | |
| TextField | ❌ TODO | Needs input handling |
| Checkbox | ❌ TODO | |
| Tabs | ❌ TODO | |
| Modal | ❌ TODO | |

## Key Differences from Lit/Angular

| Aspect | Lit | Angular | SolidJS |
|--------|-----|---------|---------|
| Reactivity | Signals (@lit-labs/signals) | RxJS | createSignal/createMemo |
| Context | Lit Context | Dependency Injection | createContext |
| Components | Web Components (LitElement) | Angular Components | SolidJS Components |
| Rendering | lit-html | Angular Templates | JSX |

## License

Apache-2.0
