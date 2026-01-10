/**
 * A2UI SolidJS Renderer - Dynamic Component Renderer
 * 
 * STEP 4: Dynamic Component Resolution
 * =====================================
 * This is the heart of the rendering system.
 * It takes a component node and renders the appropriate SolidJS component.
 * 
 * The flow is:
 * 1. Receive component node (Types.AnyComponentNode)
 * 2. Look up the component type in the registry
 * 3. Render the corresponding SolidJS component
 * 4. Pass through props (component, surfaceId, weight)
 */

import { Component, Switch, Match, Show } from "solid-js";
import { Types } from "@a2ui/lit/0.8";

// Import all our components
import { Text } from "./Text";
import { Button } from "./Button";
import { Row } from "./Row";
import { Column } from "./Column";

/**
 * Props for the Renderer component
 */
interface RendererProps {
  /** The component node to render */
  component: Types.AnyComponentNode | null | undefined;
  /** The surface ID this component belongs to */
  surfaceId: Types.SurfaceID;
  /** Optional layout weight */
  weight?: number;
}

/**
 * Dynamic Renderer Component
 * 
 * STEP 4: This component is the "switch" that maps component types to implementations.
 * 
 * When you add a new component type:
 * 1. Create the component file (e.g., Card.tsx)
 * 2. Import it here
 * 3. Add a <Match> case for its type
 * 
 * The type field comes from the A2UI specification (see specification/0.8/)
 */
export const Renderer: Component<RendererProps> = (props) => {
  return (
    <Show when={props.component} fallback={null}>
      {(component) => (
        <Switch fallback={<UnknownComponent type={component().type} />}>
          {/* 
            STEP 4: Match component type to SolidJS component
            Each Match handles a specific A2UI component type
          */}
          
          {/* Text Component - renders text content */}
          <Match when={component().type === "Text"}>
            <Text 
              component={component() as Types.TextNode}
              surfaceId={props.surfaceId}
              weight={props.weight}
            />
          </Match>

          {/* Button Component - interactive, triggers actions */}
          <Match when={component().type === "Button"}>
            <Button 
              component={component() as Types.ButtonNode}
              surfaceId={props.surfaceId}
              weight={props.weight}
            />
          </Match>

          {/* Row Component - horizontal layout */}
          <Match when={component().type === "Row"}>
            <Row 
              component={component() as Types.RowNode}
              surfaceId={props.surfaceId}
              weight={props.weight}
            />
          </Match>

          {/* Column Component - vertical layout */}
          <Match when={component().type === "Column"}>
            <Column 
              component={component() as Types.ColumnNode}
              surfaceId={props.surfaceId}
              weight={props.weight}
            />
          </Match>

          {/* 
            TODO: Add more components as you implement them:
            
            <Match when={component().type === "list"}>
              <List component={...} />
            </Match>
            
            <Match when={component().type === "card"}>
              <Card component={...} />
            </Match>
            
            <Match when={component().type === "image"}>
              <Image component={...} />
            </Match>
            
            <Match when={component().type === "textField"}>
              <TextField component={...} />
            </Match>
            
            See Types.AnyComponentNode for all possible types
          */}
        </Switch>
      )}
    </Show>
  );
};

/**
 * Fallback component for unknown types
 * Useful for debugging when you encounter unimplemented components
 */
const UnknownComponent: Component<{ type: string }> = (props) => {
  return (
    <div style={{ 
      padding: "8px", 
      background: "#ffeeee", 
      border: "1px solid #ffcccc",
      "border-radius": "4px",
      "font-family": "monospace",
      "font-size": "12px"
    }}>
      Unknown component type: <strong>{props.type}</strong>
    </div>
  );
};
