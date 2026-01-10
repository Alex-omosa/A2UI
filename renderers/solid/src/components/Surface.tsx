/**
 * Surface container for rendering an A2UI tree.
 *
 * Re-renders when `processor.surfacesVersion` changes.
 */

import { Component, createMemo, Show } from "solid-js";
import { Types } from "@a2ui/lit/0.8";
import { useProcessor } from "../context/processor-context";
import { useTheme } from "../context/theme-context";
import { Renderer } from "./Renderer";

interface SurfaceProps {
  /** The ID of the surface to render */
  surfaceId: Types.SurfaceID;
}

/** Entry point for rendering A2UI content for a given surfaceId. */
export const A2UISurface: Component<SurfaceProps> = (props) => {
  const processor = useProcessor();
  const theme = useTheme();

  // The processor mutates Surface objects in-place, so read componentTree
  // directly (it is replaced on rebuild) to ensure Solid re-renders.
  const rootComponent = createMemo(() => {
    // Subscribe to changes by reading the version signal.
    processor.surfacesVersion;

    return processor.getSurfaces().get(props.surfaceId)?.componentTree ?? null;
  });

  return (
    <div class={theme.components.Surface} data-surface-id={props.surfaceId}>
      <Show 
        when={rootComponent()} 
        fallback={<SurfaceLoading surfaceId={props.surfaceId} />}
      >
        {(root) => (
          // STEP 4: Render the component tree starting from root
          <Renderer 
            component={root()} 
            surfaceId={props.surfaceId}
          />
        )}
      </Show>
    </div>
  );
};

/**
 * Loading state shown when surface has no content yet
 */
const SurfaceLoading: Component<{ surfaceId: string }> = (props) => {
  return (
    <div style={{ 
      padding: "16px", 
      color: "#666",
      "font-style": "italic" 
    }}>
      Waiting for surface "{props.surfaceId}"...
    </div>
  );
};
