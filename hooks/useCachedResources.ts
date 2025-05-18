import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import {
    Overpass_100Thin,
    Overpass_200ExtraLight,
    Overpass_300Light,
    Overpass_400Regular,
    Overpass_500Medium,
    Overpass_600SemiBold,
    Overpass_700Bold,
    Overpass_800ExtraBold,
    Overpass_900Black,
    Overpass_100Thin_Italic,
    Overpass_200ExtraLight_Italic,
    Overpass_300Light_Italic,
    Overpass_400Regular_Italic,
    Overpass_500Medium_Italic,
    Overpass_600SemiBold_Italic,
    Overpass_700Bold_Italic,
    Overpass_800ExtraBold_Italic,
    Overpass_900Black_Italic,
} from "@expo-google-fonts/overpass";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    ...FontAwesome.font,
                    Overpass_100Thin,
                    Overpass_200ExtraLight,
                    Overpass_300Light,
                    Overpass_400Regular,
                    Overpass_500Medium,
                    Overpass_600SemiBold,
                    Overpass_700Bold,
                    Overpass_800ExtraBold,
                    Overpass_900Black,
                    Overpass_100Thin_Italic,
                    Overpass_200ExtraLight_Italic,
                    Overpass_300Light_Italic,
                    Overpass_400Regular_Italic,
                    Overpass_500Medium_Italic,
                    Overpass_600SemiBold_Italic,
                    Overpass_700Bold_Italic,
                    Overpass_800ExtraBold_Italic,
                    Overpass_900Black_Italic,
                });
            } catch (e) {
                console.error("Error loading fonts", e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
