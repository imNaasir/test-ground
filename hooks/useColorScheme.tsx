import React, { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, useColorScheme as deviceColorScheme, View } from "react-native";

// Define the context type to include color scheme and its setter
interface ColorSchemeContextType {
    colorScheme: "light" | "dark" | "system"; // "system" lets the app follow the device theme
    setColorScheme: (scheme: "light" | "dark" | "system") => void; // Function to change color scheme
}

// Create the context with default values
export const ColorSchemeContext = createContext<ColorSchemeContextType>({
    colorScheme: "system", // Default to "system" to follow device theme
    setColorScheme: () => {}, // Placeholder function
});

// Custom hook to access the current color scheme
export function useColorScheme(): "light" | "dark" {
    const { colorScheme } = useContext(ColorSchemeContext);
    const deviceDefaultScheme = deviceColorScheme(); // Get device's current color scheme

    // Return the color scheme based on user preference or device default if set to "system"
    return colorScheme === "system" ? deviceDefaultScheme || "light" : colorScheme;
}

// Custom hook to set the color scheme
export function useSetColorScheme(): (scheme: "light" | "dark" | "system") => void {
    const { setColorScheme } = useContext(ColorSchemeContext);
    return setColorScheme;
}

// Provider component to wrap the app and manage color scheme state
export function ColorSchemeProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const deviceDefaultScheme = deviceColorScheme(); // Detects the device’s current scheme on load
    const [colorScheme, setColorScheme] = useState<"light" | "dark" | "system">("system"); // Default to "system"
    const [activeScheme, setActiveScheme] = useState<"light" | "dark">(deviceDefaultScheme || "light"); // Tracks active theme

    // Load saved color scheme from AsyncStorage on app start
    useEffect(() => {
        const loadColorScheme = async () => {
            try {
                const savedScheme = await AsyncStorage.getItem("colorScheme"); // Retrieve saved preference
                if (savedScheme === "light" || savedScheme === "dark" || savedScheme === "system") {
                    setColorScheme(savedScheme); // Set based on saved value
                } else {
                    setColorScheme("system"); // Default to "system" if no saved value
                }
            } catch (error) {
                console.error("Failed to load color scheme:", error);
            }
        };
        loadColorScheme();
    }, []);

    // Save color scheme to AsyncStorage whenever it changes
    useEffect(() => {
        const saveColorScheme = async () => {
            try {
                await AsyncStorage.setItem("colorScheme", colorScheme); // Save current scheme
            } catch (error) {
                console.error("Failed to save color scheme:", error);
            }
        };
        saveColorScheme();
    }, [colorScheme]);

    // Handle system theme changes when the user selects "system"
    useEffect(() => {
        // Function to handle changes in system appearance, accounting for possible undefined values
        const handleAppearanceChange = ({ colorScheme: newSystemScheme }: { colorScheme: "light" | "dark" | undefined | null }) => {
            if (colorScheme === "system") {
                setActiveScheme(newSystemScheme || "light"); // Default to "light" if newSystemScheme is undefined
            }
        };

        // Listen for system theme changes with updated type compatibility
        const listener = Appearance.addChangeListener(handleAppearanceChange);

        // Initial set of active theme based on current colorScheme value
        if (colorScheme === "system") {
            setActiveScheme(deviceDefaultScheme || "light"); // Match the device's scheme if "system" is selected
        } else {
            setActiveScheme(colorScheme); // Use selected theme if not "system"
        }

        // Clean up the listener on unmount
        return () => listener.remove();
    }, [colorScheme, deviceDefaultScheme]);

    return <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>{children}</ColorSchemeContext.Provider>;
}
