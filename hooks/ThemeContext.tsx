import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create a context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component to wrap the app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Default to light theme

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme in any component
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Throw an error if useTheme is used outside of ThemeProvider
  //   if (!context) {
  //     throw new Error("useTheme must be used within a ThemeProvider");
  //   }

  return context;
};
