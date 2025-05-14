import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Livechat = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold mb-4">Live Chat</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => router.push("/livechat-webview")}
        >
          <Text className="text-white font-semibold">Open Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Livechat;
