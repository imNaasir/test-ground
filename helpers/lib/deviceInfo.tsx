import * as Device from "expo-device";
import * as Network from "expo-network";
import * as Localization from "expo-localization";
import useLocalStorage from "@/hooks/useLocalStorage";
// import useLocalStorage from "./useLocalStorage";

export default async function DeviceInfo() {
    const { store, get } = useLocalStorage();

    try {
        // Check if data already exists in AsyncStorage
        const storedDeviceInfo = await get("deviceInfo");
        if (storedDeviceInfo) {
            // console.log("Device info already stored:", storedDeviceInfo);
            return;
        }

        // Fetch and store device info if not already stored
        const deviceName = Device.deviceName || "Unknown Device";
        const platform = `${Device.osName} ${Device.osVersion}`;
        const ipAddress = await Network.getIpAddressAsync();
        const country = Localization.region || "Unknown";

        const newDeviceInfo = {
            device: deviceName,
            platform,
            ipAddress,
            country,
        };

        // Save to AsyncStorage
        await store("deviceInfo", newDeviceInfo);
        console.log("Device info stored:", newDeviceInfo);
    } catch (error) {
        console.error("Error fetching or storing device info:", error);
    }
}
