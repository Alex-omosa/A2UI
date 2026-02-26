/**
 * A2UI SolidJS Renderer - Text Component
 * 
 * STEP 4: Component Rendering
 * ===========================
 * This is a leaf component that renders text content.
 * It demonstrates how to:
 * - Receive component node as props
 * - Resolve bound values
 * - Apply theming
 */

import { Component, createMemo, JSX } from "solid-js";
import { Types, Primitives } from "@a2ui/lit/0.8";
import { useProcessor } from "../context/processor-context";
import { useTheme, Styles } from "../context/theme-context";
import { resolveString } from "./base";

/**
 * Props for the Text component
 * These come from the component node in the A2UI tree
 */
interface TextProps {
  /** The component node from the A2UI message */
  component: Types.TextNode;
  /** The surface ID this component belongs to */
  surfaceId: Types.SurfaceID;
  /** Layout weight (flex grow) */
  weight?: number;
}

/**
 * Text Component
 * 
 * Renders text with optional usage hints (h1, h2, body, caption, etc.)
 * 
 * STEP 4a: Component receives props from parent (Renderer)
 * STEP 4b: Uses createMemo to reactively resolve values
 * STEP 4c: Applies theme classes based on usageHint
 */
export const Text: Component<TextProps> = (props) => {
  // Get processor and theme from context
  const processor = useProcessor();
  const theme = useTheme();

  // STEP 4b: Reactively resolve the text value
  // This re-runs when processor.surfacesVersion changes (data model updates)
  const resolvedText = createMemo(() => {
    // Touch the version to subscribe to changes
    processor.surfacesVersion;
    
    const textValue = props.component.properties.text;
    let value = resolveString(processor, props.component, textValue, props.surfaceId);
    
    if (value == null) {
      return "(empty)";
    }
    
    return value;
  });

  // Get the usage hint (h1, h2, body, caption, etc.)
  const usageHint = createMemo(() => props.component.properties.usageHint ?? "body");

  // STEP 4c: Compute CSS classes based on theme and usage hint
  const classes = createMemo(() => {
    const hint = usageHint();
    const base = theme.components.Text.all;
    const hintClass = theme.components.Text[hint as keyof typeof theme.components.Text];
    
    return [base, hintClass].filter(Boolean).join(" ");
  });

  // Compute inline styles
  const styles = createMemo((): JSX.CSSProperties => ({
    flex: props.weight ?? 1,
  }));

  // STEP 4d: Render the component
  return (
    <div class={classes()} style={styles()}>
      {resolvedText()}
    </div>
  );
};
