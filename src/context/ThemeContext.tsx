import { createContext, useContext, useState, ReactNode } from "react";

// Theme context will store a boolean and a function.
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void; //return nothing
}

// creating an empty container that will hold - darkmode & toggleDarkmode
// initially, it is undefined because no provider is giving it data yet
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Wraps your whole app with ThemeProvider,
// It sends down the darkMode value and the toggleDarkMode function to all components inside it.
// So later if any component wants to know the theme, it can grab it.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    // take the <body> tag and if it already has the class 'dark-mode', remove , if it doesn't add it
    // click onchange, dark mode on(class add it), click again, dark mode off(class removed)
    document.body.classList.toggle("dark-mode");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// - context → To store dark mode state.
// - provider → To wrap your app and give dark mode info to every component.
// - custom hook (useTheme()) → A shortcut to use that info anywhere.
