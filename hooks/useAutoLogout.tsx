import { useEffect, useRef } from "react";
import axios from "@/helpers/lib/axios"; // Import your configured axios instance
import useAuthStore from "@/stores/useAuthStore";
import useSecureStorage from "./useSecureStorage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { navigationRef } from "../../app";

const AUTO_LOGOUT_TIME = 1 * 60 * 1000; // 2 minutes in milliseconds

const useAutoLogout = () => {
    const { logout } = useAuthStore(); // Use Zustand store for logout function
    const { remove } = useSecureStorage();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // const navigations = useNavigation<NavigationProp<any>>();

    // Function to reset the inactivity timer
    const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            console.log("User inactive for 2 minutes. Logging out...");
            await remove("token"); // Remove token from SecureStorage
            await remove("wallet"); // Remove wallet from SecureStorage
            // navigations.navigate("LockScreen");
            // if (navigationRef.isReady()) {
            // navigationRef.navigate("LockScreen");
            // }
            logout(); // Call logout function
        }, AUTO_LOGOUT_TIME);
    };

    useEffect(() => {
        // Set up Axios interceptor to track API calls
        const requestInterceptor = axios.interceptors.request.use((request) => {
            console.log("=============requestInterceptor=======================");
            console.log(requestInterceptor);
            console.log("====================================");
            resetTimer(); // Reset timer on every API request
            return request;
        });

        resetTimer(); // Initialize the timer when hook is mounted

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            axios.interceptors.request.eject(requestInterceptor); // Clean up interceptor
        };
    }, []);

    return null;
};

export default useAutoLogout;
