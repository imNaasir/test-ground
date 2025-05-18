import AsyncStorage from "@react-native-async-storage/async-storage";

function useLocalStorage<T>() {
    const store = async (key: string, value: T) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    };

    const get = async (key: string) => {
        const result = await AsyncStorage.getItem(key);
        if (result) {
            return JSON.parse(result) as T;
        }
    };

    const remove = async (key: string) => {
        const result = await AsyncStorage.removeItem(key);
        return result;
    };

    return { store, get, remove };
}

export default useLocalStorage;
