/**
 * A2UI SolidJS Renderer - Surface Component
 * 
 * STEP 2-4: Surface Rendering Pipeline
 * =====================================
 * A Surface is the top-level container for A2UI content.
 * 
 * The complete flow is:
 * 
 * STEP 1: Transport delivers messages → processor.processMessages()
 *         (happens in your app, outside this component)
 * 
 * STEP 2: Surface subscribes to processor changes
 *         - Reads surface data from processor.surfaces
 *         - Re-renders when surfacesVersion changes
 * 
 * STEP 3: Surface gets root component from the surface data
 *         - Each surface has a root component tree
 * 
 * STEP 4: Renderer recursively renders the component tree
 *         - Maps component types to SolidJS components
 *         - Resolves bound values from data model
 * 
 * STEP 5: User interactions dispatch actions
 *         - Goes back through processor.dispatch()
 *         - Your app sends to transport
 *         - Response triggers STEP 1 again
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

/**
 * Surface Component
 * 
 * Entry point for rendering A2UI content.
 * 
 * Usage:
 * ```tsx
 * <A2UIProvider processor={processor}>
 *   <A2UISurface surfaceId="main" />
 * </A2UIProvider>
 * ```
 */
export const A2UISurface: Component<SurfaceProps> = (props) => {
  const processor = useProcessor();
  const theme = useTheme();

  console.log("[A2UISurface] Rendering surface:", props.surfaceId);

  // STEP 2: Reactively get the surface data from the processor
  // This memo re-runs whenever surfacesVersion changes
  const surface = createMemo(() => {
    // Subscribe to changes by reading the version
    const version = processor.surfacesVersion;
    console.log("[A2UISurface] Version:", version, "Available surfaces:", [...processor.surfaces.keys()]);
    
    // Get the surface from the processor's internal state
    const s = processor.surfaces.get(props.surfaceId);
    console.log("[A2UISurface] Got surface for", props.surfaceId, ":", s);
    return s;
  });

  // STEP 3: Get the root component of the surface
  const rootComponent = createMemo(() => {
    const s = surface();
    console.log("[A2UISurface] Surface data:", s);
    if (!s) {
      console.log("[A2UISurface] No surface found");
      return null;
    }
    
    // The surface has a 'componentTree' property containing the built component tree
    console.log("[A2UISurface] componentTree:", s.componentTree);
    console.log("[A2UISurface] rootComponentId:", s.rootComponentId);
    console.log("[A2UISurface] components map:", s.components);
    return s.componentTree;
  });

  return (
    <div class={theme.components.Surface} data-surface-id={props.surfaceId}>
      <Show 
        when={rootComponent()} 
        fallback={<SurfaceLoading surfaceId={props.surfaceId} />}
      >
        {(root) => {
          console.log("[A2UISurface] Rendering root component:", root());
          return (
            // STEP 4: Render the component tree starting from root
            <Renderer 
              component={root()} 
              surfaceId={props.surfaceId}
            />
          );
        }}
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
