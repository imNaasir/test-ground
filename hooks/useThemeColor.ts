// hooks/useColorScheme.tsx

// import { Colors } from "@/src"; // Adjusted import for Colors
import { DefaultTheme, Theme } from "@react-navigation/native"; // Import Theme type
import { Colors } from "../helpers/constants/Colors";

/**
 * Custom theme configuration for React Navigation.
 * This overrides the default theme to use custom colors defined in the colors configuration.
 */
const CustomTheme = (colorScheme: string): Theme => {
  const currentColors = Colors.light;

  return {
    ...DefaultTheme, // Spread the default theme properties
    colors: {
      ...DefaultTheme.colors, // Spread the default colors properties
      primary: currentColors.primary, // Use primary color from your custom config
      background: currentColors.light, // Use background color from your custom config
      // You can customize more colors here as needed
    },
  };
};

export default CustomTheme;
