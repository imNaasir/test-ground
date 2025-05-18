import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

function useClipboard<T>() {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopied = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000); // Reset feedback after 1 second
        Alert.alert("Copied!", "The content has been copied to the clipboard.");
    };

    const copyToClipboard = (value: T) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Clipboard.setStringAsync(`${value}`);
                resolve(true);
                handleCopied();
            } catch (e) {
                reject(e);
            }
        });
    };

    const getCopiedItem = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await Clipboard.getStringAsync();
                value !== null ? resolve(JSON.parse(value)) : resolve(null);
            } catch (e) {
                reject(e);
            }
        });
    };

    return { copyToClipboard, getCopiedItem, isCopied, setIsCopied };
}

export default useClipboard;
