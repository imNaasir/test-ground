import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle, StyleProp, View, TouchableWithoutFeedback } from "react-native";
import { Colors } from "@/helpers/constants/Colors";
import { fontSize, whp, wwp } from "@/helpers/utils/size";
// import { Font } from "@/helpers/constants/type";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Font } from "@/helpers/constants/type";
import { useTranslation } from "react-i18next";

// Define the props type for the component
interface AppButtonProps {
    title: string;
    icon?: React.ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean; // Add disabled prop
    color?: keyof (typeof Colors)["light"];
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    theme?: "light" | "dark";
}

// Reusable button component

const AppButton: React.FC<AppButtonProps> = ({
    title,
    icon,
    onPress,
    disabled = false, // Default value for disabled
    color = "priSec",
    style,
    textStyle = {},
    theme = "light",
}) => {
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const currentColors = colorScheme === "light" ? Colors.light : Colors.light;
    // Adjust background and border colors for disabled and enabled states
    // const backgroundColor = disabled
    //     ? hexToRGBA(currentColors.primary, 0.4) // Adjusted border color when disabled
    //     : currentColors.primary; // Normal border color

    // const borderColor = disabled
    //     ? hexToRGBA(currentColors.primary, 0.4) // Adjusted border color when disabled
    //     : currentColors.primary; // Normal border color

    // const currentColors = Colors[theme] as Record<string, string>;

    // Adjust background and border colors for disabled and enabled states
    const backgroundColor = disabled
        ? `rgba(22, 76, 123, 0.4)` // Disabled background color (semi-transparent)
        : currentColors[color] || currentColors.primary; // Normal background color

    const borderColor = disabled
        ? `rgba(22, 76, 123, 0.4)` // Adjusted border color when disabled
        : currentColors[color] || currentColors.primary; // Normal border color

    return (
        <TouchableOpacity
            style={[
                {
                    // paddingVertical: wwp(4),
                    height: whp(6),
                    backgroundColor: backgroundColor, // Apply the dynamic background color
                    borderColor: borderColor, // Apply the dynamic border color
                    // borderWidth: 1, // Add border width for visibility
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: disabled ? 0.6 : 1, // Optional: Adjust opacity to indicate disabled state
                },
                style,
            ]}
            onPress={disabled ? undefined : onPress} // Prevent interaction when disabled
            disabled={disabled} // Disable interaction when true
        >
            {/* <Text
                style={[
                    {
                        color: "white", // Default text color
                        fontSize: 16,
                        fontWeight: "600",
                        fontFamily: Font.Bold,
                        textTransform: "capitalize", // Text styling
                    },
                    textStyle, // Allow custom text styles
                ]}
            >
                {icon && <View>{icon}</View>}
                {title}
            </Text> */}

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
                <Text
                    style={[
                        {
                            color: "white",
                            fontSize: fontSize(16),
                            fontWeight: "600",
                            fontFamily: Font.Semibold,
                        },
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default AppButton;
