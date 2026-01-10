/**
 * A2UI SolidJS Renderer - Processor Context
 * 
 * STEP 2: Context Propagation
 * ===========================
 * The processor is shared via SolidJS context so all components
 * can access it for:
 * - Reading surface data
 * - Resolving bound values (path references to data model)
 * - Dispatching user actions
 */

import { createContext, useContext, ParentComponent, JSX } from "solid-js";
import { SolidMessageProcessor, createProcessor } from "../data/processor";

// Create the context with undefined default (will be provided by A2UIProvider)
const ProcessorContext = createContext<SolidMessageProcessor>();

/**
 * Hook to access the message processor from any component
 * 
 * Components use this to:
 * - STEP 3b: Read data via processor.getData()
 * - STEP 5: Dispatch actions via processor.dispatch()
 */
export function useProcessor(): SolidMessageProcessor {
  const processor = useContext(ProcessorContext);
  if (!processor) {
    throw new Error("useProcessor must be used within an A2UIProvider");
  }
  return processor;
}

/**
 * Props for the A2UIProvider component
 */
interface A2UIProviderProps {
  /** Optional existing processor instance (useful for testing or sharing) */
  processor?: SolidMessageProcessor;
  children: JSX.Element;
}

/**
 * Provider component that makes the processor available to all children
 * 
 * Usage:
 * ```tsx
 * const processor = createProcessor();
 * 
 * <A2UIProvider processor={processor}>
 *   <A2UISurface surfaceId="main" />
 * </A2UIProvider>
 * ```
 */
export const A2UIProvider: ParentComponent<A2UIProviderProps> = (props) => {
  // Use provided processor or create a new one
  const processor = props.processor ?? createProcessor();
  
  return (
    <ProcessorContext.Provider value={processor}>
      {props.children}
    </ProcessorContext.Provider>
  );
};
