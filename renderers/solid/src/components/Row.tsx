/**
 * A2UI SolidJS Renderer - Row Component
 * 
 * Layout component that arranges children horizontally.
 * Demonstrates rendering multiple children.
 */

import { Component, For, createMemo, JSX } from "solid-js";
import { Types } from "@a2ui/lit/0.8";
import { useTheme } from "../context/theme-context";
import { Renderer } from "./Renderer";

interface RowProps {
  component: Types.RowNode;
  surfaceId: Types.SurfaceID;
  weight?: number;
}

/**
 * Row Component
 * 
 * Renders children in a horizontal flex layout.
 * Each child can have its own weight for flexible sizing.
 */
export const Row: Component<RowProps> = (props) => {
  const theme = useTheme();

  // Get children array from component properties
  const children = createMemo(() => props.component.properties.children ?? []);

  const styles = createMemo((): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "row",
    flex: props.weight ?? 1,
    gap: "8px",
  }));

  return (
    <div class={theme.components.Row} style={styles()}>
      <For each={children()}>
        {(child) => (
          <Renderer 
            component={child} 
            surfaceId={props.surfaceId}
            weight={child.properties?.weight ?? 1}
          />
        )}
      </For>
    </div>
  );
};
