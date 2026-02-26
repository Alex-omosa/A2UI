/**
 * A2UI SolidJS Renderer - Base Component Utilities
 * 
 * STEP 3: Value Resolution
 * ========================
 * Components receive "bound values" (Primitives.StringValue, etc.)
 * These can be either:
 * - Literal values: { literalString: "Hello" }
 * - Data bindings: { path: "user.name" } - references into the data model
 * 
 * This module provides utilities to resolve these values.
 */

import { Types, Primitives } from "@a2ui/lit/0.8";
import { SolidMessageProcessor } from "../data/processor";

/**
 * STEP 3a: Resolve a primitive bound value
 * 
 * Takes a bound value (which may be literal or path reference)
 * and returns the actual value from the data model.
 * 
 * @param processor - The message processor (has the data model)
 * @param component - The component node (provides context path)
 * @param value - The bound value to resolve
 * @param surfaceId - Optional surface ID for scoped data
 */
export function resolveString(
  processor: SolidMessageProcessor,
  component: Types.AnyComponentNode,
  value: Primitives.StringValue | null | undefined,
  surfaceId?: Types.SurfaceID
): string | null {
  if (!value) return null;
  
  // STEP 3b: Check for literal value first
  if ("literalString" in value && value.literalString != null) {
    return value.literalString;
  }
  if ("literal" in value && value.literal != null) {
    return String(value.literal);
  }
  
  // STEP 3c: Resolve path reference from data model
  if (value.path) {
    const resolved = processor.getData(component, value.path, surfaceId);
    return resolved != null ? String(resolved) : null;
  }
  
  return null;
}

export function resolveNumber(
  processor: SolidMessageProcessor,
  component: Types.AnyComponentNode,
  value: Primitives.NumberValue | null | undefined,
  surfaceId?: Types.SurfaceID
): number | null {
  if (!value) return null;
  
  if ("literalNumber" in value && value.literalNumber != null) {
    return value.literalNumber;
  }
  if ("literal" in value && value.literal != null) {
    return Number(value.literal);
  }
  
  if (value.path) {
    const resolved = processor.getData(component, value.path, surfaceId);
    return resolved != null ? Number(resolved) : null;
  }
  
  return null;
}

export function resolveBoolean(
  processor: SolidMessageProcessor,
  component: Types.AnyComponentNode,
  value: Primitives.BooleanValue | null | undefined,
  surfaceId?: Types.SurfaceID
): boolean | null {
  if (!value) return null;
  
  if ("literalBoolean" in value && value.literalBoolean != null) {
    return value.literalBoolean;
  }
  if ("literal" in value && value.literal != null) {
    return Boolean(value.literal);
  }
  
  if (value.path) {
    const resolved = processor.getData(component, value.path, surfaceId);
    return resolved != null ? Boolean(resolved) : null;
  }
  
  return null;
}

/**
 * STEP 5a: Build and dispatch a user action
 * 
 * Called by interactive components when user interacts.
 * Constructs the A2UIClientEventMessage and sends via processor.
 * 
 * @param processor - The message processor
 * @param component - The component that triggered the action
 * @param action - The action definition from the component
 * @param surfaceId - The surface ID
 */
export async function sendAction(
  processor: SolidMessageProcessor,
  component: Types.AnyComponentNode,
  action: Types.Action,
  surfaceId?: Types.SurfaceID
): Promise<Types.ServerToClientMessage[]> {
  
  // STEP 5b: Build the context object from action.context
  const context: Record<string, unknown> = {};
  
  if (action.context) {
    for (const item of action.context) {
      if (item.value.literalBoolean != null) {
        context[item.key] = item.value.literalBoolean;
      } else if (item.value.literalNumber != null) {
        context[item.key] = item.value.literalNumber;
      } else if (item.value.literalString != null) {
        context[item.key] = item.value.literalString;
      } else if (item.value.path) {
        // Resolve path reference for context value
        const path = processor.resolvePath(item.value.path, component.dataContextPath);
        const value = processor.getData(component, path, surfaceId);
        context[item.key] = value;
      }
    }
  }

  // STEP 5c: Construct the event message
  const message: Types.A2UIClientEventMessage = {
    userAction: {
      name: action.name,
      sourceComponentId: component.id,
      surfaceId: surfaceId!,
      timestamp: new Date().toISOString(),
      context,
    },
  };

  // STEP 5d: Dispatch and wait for response
  return processor.dispatch(message);
}

// Re-export types for convenience
export type { Types, Primitives };
