import * as SecureStore from "expo-secure-store";

function useSecureStorage<T>() {
    const store = async (key: string, value: T) => {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
        return true;
    };

    const get = async (key: string) => {
        const result = await SecureStore.getItemAsync(key);
        if (result) {
            return JSON.parse(result) as T;
        }
    };

    const remove = async (key: string) => {
        await SecureStore.deleteItemAsync(key);
        return true;
    };

    return { store, get, remove };
}

export default useSecureStorage;
