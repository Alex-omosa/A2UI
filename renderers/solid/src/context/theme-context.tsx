/**
 * A2UI SolidJS Renderer - Theme Context
 * 
 * Provides theming/styling configuration to all components.
 * This is a simplified version - you can expand it to match
 * the full theming system in Angular/Lit renderers.
 */

import { createContext, useContext, ParentComponent, JSX } from "solid-js";
import { Styles } from "@a2ui/lit/0.8";

/**
 * Theme configuration for A2UI components
 * Maps component types to CSS class names
 */
export interface A2UITheme {
  components: {
    Text: {
      all: string;
      h1?: string;
      h2?: string;
      h3?: string;
      h4?: string;
      h5?: string;
      body?: string;
      caption?: string;
    };
    Button: string;
    Row: string;
    Column: string;
    Surface: string;
    List: string;
    ListItem: string;
  };
  /** Additional inline styles per component (optional) */
  additionalStyles?: Record<string, Record<string, string>>;
  /** Markdown rendering styles */
  markdown?: Record<string, Record<string, string>>;
}

/**
 * Default minimal theme
 * Override by providing your own theme to ThemeProvider
 */
export const defaultTheme: A2UITheme = {
  components: {
    Text: {
      all: "a2ui-text",
      h1: "a2ui-text-h1",
      h2: "a2ui-text-h2",
      h3: "a2ui-text-h3",
      body: "a2ui-text-body",
      caption: "a2ui-text-caption",
    },
    Button: "a2ui-button",
    Row: "a2ui-row",
    Column: "a2ui-column",
    Surface: "a2ui-surface",
    List: "a2ui-list",
    ListItem: "a2ui-list-item",
  },
};

const ThemeContext = createContext<A2UITheme>(defaultTheme);

/**
 * Hook to access the current theme
 */
export function useTheme(): A2UITheme {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  theme?: A2UITheme;
  children: JSX.Element;
}

/**
 * Provider component for theming
 */
export const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const theme = props.theme ?? defaultTheme;
  
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Re-export Styles utility from lit for style merging
export { Styles };
