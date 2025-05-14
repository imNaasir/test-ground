import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const TawkChat = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center">
                <Text className="text-2xl font-bold mb-4">Tawk Chat</Text>
                <TouchableOpacity
                    className="bg-blue-500 px-6 py-3 rounded-lg"
                    onPress={() => router.push("/tawk-webview")}
                >
                    <Text className="text-white font-semibold">Open Chat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TawkChat;

const styles = StyleSheet.create({});