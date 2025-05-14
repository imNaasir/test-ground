import { Image, Platform, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full bg-secondary">
        <Image source={icon} tintColor="#FFFFFF" className="size-5" />
        <Text className="text-white text-base font-semibold ml-2">{title}</Text>
      </View>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

const AppLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0066FF",
        tabBarInactiveTintColor: "#A8B5DB",

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#F6F6F7",
          borderTopWidth: 0.1,
          height: Platform.OS === "ios" ? 80 : 60,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          marginBottom: Platform.OS === "ios" ? 0 : 50,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="livechat"
        options={{
          title: "Live Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.livechat}
              title="Live Chat"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tawk"
        options={{
          title: "Tawk Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tawk} title="Tawk Chat" />
          ),
        }}
      />

      <Tabs.Screen
        name="tawk-webview"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />

<Tabs.Screen
        name="livechat-webview"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
