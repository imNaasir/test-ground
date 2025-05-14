import { KeyboardAvoidingView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Platform } from "react-native";
const LiveChatWebview = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25} 
            >
                <View className="flex-row items-center px-4 py-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.back} className="w-6 h-6" tintColor="#0066FF" />
                    </TouchableOpacity>
                    <Text className="ml-4 text-lg font-semibold">Back Home</Text>
                </View>
                <View className="flex-1">
                    <WebView
                        source={{
                            uri: "https://direct.lc.chat/19153063/",
                        }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        mixedContentMode="always"
                        allowsInlineMediaPlayback={true}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LiveChatWebview

