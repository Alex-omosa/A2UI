/**
 * A2UI SolidJS Renderer - Button Component
 * 
 * Interactive component demonstrating:
 * - STEP 5: User action handling
 * - Nested child rendering
 */

import { Component, createMemo, JSX } from "solid-js";
import { Types } from "@a2ui/lit/0.8";
import { useProcessor } from "../context/processor-context";
import { useTheme } from "../context/theme-context";
import { sendAction } from "./base";
import { Renderer } from "./Renderer";

interface ButtonProps {
  component: Types.ButtonNode;
  surfaceId: Types.SurfaceID;
  weight?: number;
}

/**
 * Button Component
 * 
 * Renders a clickable button that can trigger actions.
 * The button's label is rendered via its child component.
 * 
 * STEP 5: Action Flow
 * - User clicks button
 * - handleClick() is called
 * - sendAction() builds A2UIClientEventMessage
 * - Processor dispatches to transport layer
 * - Response messages are processed
 */
export const Button: Component<ButtonProps> = (props) => {
  const processor = useProcessor();
  const theme = useTheme();

  // STEP 5: Handle click event
  const handleClick = async () => {
    const action = props.component.properties.action;
    
    if (action) {
      // sendAction builds the message and dispatches it
      // The transport layer (in your app) will send it to the server
      const responses = await sendAction(
        processor,
        props.component,
        action,
        props.surfaceId
      );
      
      // Process any response messages (updates the UI)
      if (responses.length > 0) {
        processor.processMessages(responses);
      }
    }
  };

  const styles = createMemo((): JSX.CSSProperties => ({
    flex: props.weight ?? 1,
  }));

  return (
    <button 
      class={theme.components.Button}
      style={styles()}
      onClick={handleClick}
    >
      {/* Render the button's child content (usually Text) */}
      <Renderer 
        component={props.component.properties.child} 
        surfaceId={props.surfaceId}
      />
    </button>
  );
};
