/**
 * A2UI SolidJS Renderer - Column Component
 * 
 * Layout component that arranges children vertically.
 */

import { Component, For, createMemo, JSX } from "solid-js";
import { Types } from "@a2ui/lit/0.8";
import { useTheme } from "../context/theme-context";
import { Renderer } from "./Renderer";

interface ColumnProps {
  component: Types.ColumnNode;
  surfaceId: Types.SurfaceID;
  weight?: number;
}

/**
 * Column Component
 * 
 * Renders children in a vertical flex layout.
 */
export const Column: Component<ColumnProps> = (props) => {
  const theme = useTheme();

  const children = createMemo(() => props.component.properties.children ?? []);

  const styles = createMemo((): JSX.CSSProperties => ({
    display: "flex",
    "flex-direction": "column",
    flex: props.weight ?? 1,
    gap: "8px",
  }));

  return (
    <div class={theme.components.Column} style={styles()}>
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
