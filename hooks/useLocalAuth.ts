import * as LocalAuthentication from "expo-local-authentication";
import { useCallback } from "react";

type SupportedBiometricsType = ["FINGERPRINT" | "FACIAL_RECOGNITION"] | [] | ["FINGERPRINT", "FACIAL_RECOGNITION"];
const useLocalAuth = () => {
    const isBiometricSupport = useCallback(async () => {
        return await LocalAuthentication.hasHardwareAsync();
    }, []);

    const supportedBiometrics = useCallback(async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const sbt: any = [];
        types.forEach((type) => {
            if (type === 1) {
                sbt.push("FINGERPRINT");
            } else if (type === 2) {
                sbt.push("FACIAL_RECOGNITION");
            }
        });
        return sbt as SupportedBiometricsType;
    }, []);

    const authenticate = useCallback(
        async (callback: (result: LocalAuthentication.LocalAuthenticationResult | boolean) => void) => {
            const compatible = await isBiometricSupport();
            if (compatible) {
                LocalAuthentication.authenticateAsync({
                    promptMessage: "Authentication Required",
                    fallbackLabel: "Enter your passcode",
                }).then((result) => {
                    callback(result);
                });
            } else {
                callback(false);
            }
        },
        [isBiometricSupport]
    );

    return { isBiometricSupport, supportedBiometrics, authenticate };
};

export default useLocalAuth;
