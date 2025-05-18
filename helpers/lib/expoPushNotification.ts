import { Alert, Linking, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useRef, useState } from 'react';

// 1. Notification Background Handler
TaskManager.defineTask('BACKGROUND_NOTIFICATION_HANDLER', ({ data, error }) => {
  if (error) {
    console.error('Background notification error:', error);
    return;
  }
  if (data) {
    console.log('Background notification received:', data);
    // Handle your background notification here
  }
});

// 2. Enhanced Push Notification Sender
export const sendPushNotification = async (
  expoPushToken: string,
  title: string,
  body: string,
  data: object = {}
) => {
  try {
    // For Chinese OEM compatibility
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      data,
      priority: 'high',
      _displayInForeground: true, // Important for some OEMs
      channelId: 'default', // Required for Android 8+
      mutableContent: true, // For iOS rich notifications
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Push failed: ${errorData?.errors?.join(', ') || 'Unknown error'}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Push notification error:', error);
    throw error;
  }
};

// 3. Comprehensive Registration with OEM Handling
export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice) {
    Alert.alert('Must use physical device for Push Notifications');
    return null;
  }

  try {
    // Check existing permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permission if not granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      finalStatus = status;
    }

    // Handle permission denial
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Enable notifications in settings to receive updates',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
              // For Chinese OEMs, open specific battery settings
              if (Platform.OS === 'android') {
                const brand = Device.brand?.toLowerCase();
                if (brand === 'xiaomi') {
                  Linking.sendIntent('miui.intent.action.APP_AUTOSTART_MANAGE');
                } else if (brand === 'oppo') {
                  Linking.sendIntent('com.coloros.safecenter');
                }
              }
            },
          },
        ]
      );
      return null;
    }

    // Get push token
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });

    // Android-specific configuration
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        showBadge: true,
        sound: 'default',
        enableLights: true,
        enableVibrate: true,
      });
    }

    // Register background handler
    await Notifications.registerTaskAsync('BACKGROUND_NOTIFICATION_HANDLER');

    return token.data;
  } catch (error) {
    console.error('Notification registration error:', error);
    Alert.alert('Error', 'Failed to configure notifications');
    return null;
  }
};

// 4. Notification Handling Hook
export const useNotificationHandlers = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Foreground handler
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle your notification here
      });

    // User interaction handler
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle user tapping the notification
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
};

// 5. OEM-specific Utilities
export const checkOEMSettings = async () => {
  if (Platform.OS !== 'android') return;

  const brand = Device.brand?.toLowerCase();
  
  // Check battery optimization
  try {
    const powerManagerInfo = await Notifications.getDevicePushTokenAsync();
    if (powerManagerInfo.data.optimized) {
      Alert.alert(
        'Battery Optimization',
        'For reliable notifications, disable battery optimization for this app',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  } catch (error) {
    console.log('Battery optimization check failed', error);
  }

  // OEM-specific settings
  if (['xiaomi', 'oppo', 'vivo', 'huawei'].includes(brand || '')) {
    Alert.alert(
      'Additional Settings Required',
      `On ${brand} devices, please enable:
      1. Auto-start
      2. Background pop-up
      3. Disable battery saver for this app`,
      [
        {
          text: 'Open Settings',
          onPress: () => {
            if (brand === 'xiaomi') {
              Linking.sendIntent('miui.intent.action.APP_AUTOSTART_MANAGE');
            } else if (brand === 'oppo') {
              Linking.sendIntent('com.coloros.safecenter');
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  }
};