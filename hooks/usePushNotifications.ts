import { useState, useEffect, useRef } from "react";
import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Battery from "expo-battery";

// Key for storing battery optimization prompt status
const BATTERY_OPTIMIZATION_KEY = "hasShownBatteryOptimizationPrompt";
// Key for storing manufacturer-specific prompt status
const MANUFACTURER_PROMPT_KEY = "hasShownManufacturerPrompt";

export const usePushNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    // Configure notification handler with enhanced settings.
    // This ensures notifications have high priority, play sounds, and show alerts.
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
        }),
    });

    // Check for manufacturer-specific notification issues on Android.
    // This prompts the user to enable autostart and disable battery optimization on problematic device brands.
    const checkManufacturerSettings = async () => {
        if (Platform.OS !== "android") return;

        try {
            const hasShownPrompt = await AsyncStorage.getItem(MANUFACTURER_PROMPT_KEY);
            if (hasShownPrompt === "true") return;

            // Note: Make sure to verify that the device brand is retrieved correctly.
            const brand = (await Device.getDeviceTypeAsync()).brand?.toLowerCase() || "";
            const problematicBrands = ["xiaomi", "redmi", "huawei", "honor", "oppo", "vivo", "realme", "oneplus"];

            if (problematicBrands.some((b) => brand.includes(b))) {
                Alert.alert(
                    "Important Notification Settings",
                    `For ${brand} devices, please enable autostart and disable battery optimization for this app in settings to ensure reliable notifications.`,
                    [
                        {
                            text: "Not Now",
                            style: "cancel",
                            onPress: () => AsyncStorage.setItem(MANUFACTURER_PROMPT_KEY, "true"),
                        },
                        {
                            text: "Open Settings",
                            onPress: async () => {
                                await Linking.openSettings();
                                await AsyncStorage.setItem(MANUFACTURER_PROMPT_KEY, "true");
                            },
                        },
                    ]
                );
            }
        } catch (error) {
            console.error("Manufacturer check failed:", error);
        }
    };

    // Enhanced battery optimization check on Android with user guidance.
    // Prompts the user to disable battery optimization if it is enabled.
    const checkBatteryOptimization = async () => {
        if (Platform.OS === "android") {
            try {
                const hasShownPrompt = await AsyncStorage.getItem(BATTERY_OPTIMIZATION_KEY);
                if (hasShownPrompt === "true") return;

                const isOptimizationEnabled = await Battery.isBatteryOptimizationEnabledAsync();
                console.log("Battery Optimization Enabled:", isOptimizationEnabled);
                // if (!isOptimizationEnabled) return;

                // Alert.alert("Better Notifications", "For reliable notifications, please:\n1. Disable battery optimization\n2. Enable autostart (if available)\n3. Lock the app in recent apps", [
                //     {
                //         text: "Not Now",
                //         style: "cancel",
                //         onPress: () => AsyncStorage.setItem(BATTERY_OPTIMIZATION_KEY, "true"),
                //     },
                //     {
                //         text: "Open Settings",
                //         onPress: async () => {
                //             try {
                //                 // Try to open the specific battery optimization screen.
                //                 // IMPORTANT: Ensure the URL format is appropriate for your target devices
                //                 await Linking.openURL("package:com.app.yiksiWallet");
                //                 await AsyncStorage.setItem(BATTERY_OPTIMIZATION_KEY, "true");
                //             } catch {
                //                 // Fallback to general settings if the specific screen cannot be opened.
                //                 await Linking.openSettings();
                //             }
                //         },
                //     },
                // ]);
            } catch (error) {
                console.error("Battery optimization check failed:", error);
            }
        }
    };

    // Check if system notification permission is enabled on Android.
    // This ensures that users are notified if they have disabled notifications at the system level.
    const checkSystemNotificationPermission = async () => {
        if (Platform.OS !== "android") return;

        const settings = await Notifications.getPermissionsAsync();
        if (!settings.granted) {
            Alert.alert("Notifications Disabled", "Please enable notifications for this app in system settings", [
                { text: "Cancel", style: "cancel" },
                { text: "Open Settings", onPress: () => Linking.openSettings() },
            ]);
            return false;
        }
        return true;
    };

    // Comprehensive notification registration with all enhancements.
    // This includes requesting all necessary permissions and configuring the Android channel.
    const registerForPushNotifications = async () => {
        // IMPORTANT: Use a physical device when testing push notifications.
        if (!Device.isDevice) {
            console.warn("Must use physical device for Push Notifications");
            return;
        }

        try {
            // Request permissions for notifications with all available options.
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                    allowCriticalAlerts: true,
                    provideAppNotificationSettings: true,
                },
                android: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true,
                    vibrate: true,
                },
            });

            if (status !== "granted") {
                Alert.alert("Permission Required", "Enable notifications in settings for the best experience", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => Linking.openSettings() },
                ]);
                return;
            }

            // Run additional checks:
            await checkSystemNotificationPermission();
            await checkBatteryOptimization();
            await checkManufacturerSettings();

            // IMPORTANT: Ensure that your google-services.json is located at "android/app/google-services.json"
            // and that your Firebase project’s package name matches "com.app.yiksiWallet".
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId || "526f7090-21d1-473e-b363-1c9cb8364bd0",
            });

            // Configure the Android notification channel with all recommended settings.
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("urgent", {
                    name: "Urgent Notifications",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                    sound: "default",
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                    bypassDnd: true, // Bypass Do Not Disturb mode
                    showBadge: true,
                    enableVibrate: true,
                    enableLights: true,
                });

                // Set up a notification category for action buttons.
                await Notifications.setNotificationCategoryAsync("urgent", [
                    {
                        identifier: "open",
                        buttonTitle: "Open App",
                        options: {
                            opensAppToForeground: true,
                        },
                    },
                ]);
            }

            // Return the token data (the Expo push token)
            return token.data;
        } catch (error) {
            console.error("Notification registration error:", error);
            return undefined;
        }
    };

    // Setup useEffect with comprehensive error handling and notification listener registration.
    useEffect(() => {
        let isMounted = true;

        const setupNotifications = async () => {
            try {
                const token = await registerForPushNotifications();
                if (isMounted && token) {
                    setExpoPushToken(token);
                }

                // Listen for incoming notifications and update state.
                notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
                    if (isMounted) {
                        setNotification(notification);
                    }
                });

                // Listen for responses when the user interacts with notifications.
                responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
                    console.log("Notification response:", response);
                    // Optionally add navigation logic based on notification actions.
                });

                // Handle notifications when the app is launched from a quit state.
                const initialNotification = await Notifications.getLastNotificationResponseAsync();
                if (initialNotification && isMounted) {
                    console.log("App launched from notification:", initialNotification);
                    setNotification(initialNotification.notification);
                }
            } catch (error) {
                console.error("Notification setup failed:", error);
            }
        };

        setupNotifications();

        return () => {
            isMounted = false;
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    // Expose a function to manually check notification permissions.
    const checkPermissions = async () => {
        return await Notifications.getPermissionsAsync();
    };

    return { expoPushToken, notification, checkPermissions };
};
