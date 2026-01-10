/**
 * A2UI SolidJS Renderer - Message Processor
 * 
 * This module wraps the core A2uiMessageProcessor from @a2ui/lit
 * and integrates it with SolidJS's reactive system.
 * 
 * STEP 1: Message Processing
 * ==========================
 * Messages from the transport layer are fed into processMessages().
 * The processor parses them and updates its internal state (surfaces, data model).
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
  
  // STEP 1a: Signal to trigger re-renders when surfaces change
  // When processMessages() is called, we update this signal to notify SolidJS
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

  /**
   * STEP 1b: Process incoming A2UI messages
   * 
   * This is called by the application when messages arrive from the transport.
   * After processing, we increment the version signal to trigger re-renders.
   * 
   * @param messages - Array of ServerToClientMessage from the agent
   */
  override processMessages(messages: Types.ServerToClientMessage[]): void {
    console.log("[A2UI Processor] Processing messages:", messages);
    
    // Process messages using the parent class logic
    // This handles: beginRendering, surfaceUpdate, dataModelUpdate, deleteSurface
    super.processMessages(messages);
    
    // Debug: Log surfaces state after processing
    console.log("[A2UI Processor] Surfaces after processing:", this.surfaces);
    for (const [id, surface] of this.surfaces.entries()) {
      console.log(`[A2UI Processor] Surface "${id}":`, {
        rootComponentId: surface.rootComponentId,
        componentTree: surface.componentTree,
        componentsCount: surface.components.size,
      });
    }
    
    // STEP 1c: Notify SolidJS that surfaces have changed
    // This triggers any components reading surfacesVersion() to re-render
    const [, setVersion] = this._surfacesVersion;
    setVersion((v) => v + 1);
    
    console.log("[A2UI Processor] Version updated, surfaces count:", this.surfaces.size);
  }

  /**
   * Get the current surfaces version (for reactive tracking)
   * Components should call this to subscribe to surface changes
   */
  get surfacesVersion(): number {
    const [version] = this._surfacesVersion;
    return version();
  }

  /**
   * STEP 5: Dispatch a user action event
   * 
   * Called by interactive components (Button, TextField, etc.) when user interacts.
   * Returns a promise that resolves when the server responds.
   * 
   * @param message - The A2UIClientEventMessage to send
   */
  dispatch(message: Types.A2UIClientEventMessage): Promise<Types.ServerToClientMessage[]> {
    return new Promise((resolve, reject) => {
      const event: DispatchedEvent = { message, resolve, reject };
      
      // Notify all listeners (typically the app shell handles this)
      for (const listener of this._eventListeners) {
        listener(event);
      }
    });
  }

  /**
   * Subscribe to dispatched events
   * The application layer uses this to send events to the transport
   */
  onDispatch(listener: (event: DispatchedEvent) => void): () => void {
    this._eventListeners.add(listener);
    return () => this._eventListeners.delete(listener);
  }

  /**
   * Helper to clear and reprocess (useful for full refresh)
   */
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
