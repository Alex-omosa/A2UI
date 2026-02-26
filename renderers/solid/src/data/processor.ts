/**
 * SolidJS-wrapped A2UI message processor.
 *
 * Adds a Solid signal (`surfacesVersion`) that increments whenever new
 * server-to-client messages are processed, allowing renderer components to
 * re-render without needing route navigation.
 */

import { Data, Types } from "@a2ui/lit/0.8";
import { createSignal, batch } from "solid-js";

/**
 * Event dispatched when a user action occurs (e.g., button click).
 * The application layer should listen to this and send to the server.
 */
export interface DispatchedEvent {
  message: Types.A2UIClientEventMessage;
  resolve: (messages: Types.ServerToClientMessage[]) => void;
  reject: (error: Error) => void;
}

/**
 * SolidJS-wrapped A2UI Message Processor
 * 
 * Extends the base processor and adds:
 * - SolidJS signal for reactive surface updates
 * - Event dispatch system for user actions
 */
export class SolidMessageProcessor extends Data.A2uiMessageProcessor {
  
  // Signal used by the UI layer to track updates.
  private _surfacesVersion = createSignal(0);
  
  // Event listeners for dispatching user actions to the transport layer
  private _eventListeners: Set<(event: DispatchedEvent) => void> = new Set();

  constructor() {
    // Use standard JS constructors (not signal-based like Lit's version)
    // SolidJS handles reactivity at the component level instead
    super({
      mapCtor: Map,
      arrayCtor: Array,
      setCtor: Set,
      objCtor: Object,
    });
  }

  /** Processes incoming server-to-client A2UI messages and notifies the UI. */
  override processMessages(messages: Types.ServerToClientMessage[]): void {
    // Parent implementation handles: beginRendering, surfaceUpdate, dataModelUpdate, deleteSurface
    super.processMessages(messages);

    // Notify Solid that surfaces have changed.
    const [, setVersion] = this._surfacesVersion;
    setVersion((v) => v + 1);
  }

  /** Current surfaces version (read to subscribe). */
  get surfacesVersion(): number {
    const [version] = this._surfacesVersion;
    return version();
  }

  /** Dispatches a user action event to the app layer (transport-owned). */
  dispatch(message: Types.A2UIClientEventMessage): Promise<Types.ServerToClientMessage[]> {
    return new Promise((resolve, reject) => {
      const event: DispatchedEvent = { message, resolve, reject };
      
      // Notify all listeners (typically the app shell handles this)
      for (const listener of this._eventListeners) {
        listener(event);
      }
    });
  }

  /** Subscribe to dispatched events (the app layer wires transport here). */
  onDispatch(listener: (event: DispatchedEvent) => void): () => void {
    this._eventListeners.add(listener);
    return () => this._eventListeners.delete(listener);
  }

  /** Clears surfaces and reprocesses a full message snapshot. */
  replaceMessages(messages: Types.ServerToClientMessage[]): void {
    batch(() => {
      this.clearSurfaces();
      this.processMessages(messages);
    });
  }
}

// Export a factory function to create processors
export function createProcessor(): SolidMessageProcessor {
  return new SolidMessageProcessor();
}

// Re-export types that components will need
export type { Types };
