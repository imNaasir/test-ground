import FaceSDK, { InitConfig } from "@regulaforensics/react-native-face-api";
import { Platform } from "react-native";

class FaceSdkService {
  initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      if (Platform.OS === "android") {
        // For Android
        FaceSDK.initialize(
          null, 
          () => {
            console.log("Face SDK initialized successfully");
            resolve(true);
          },
          (error: string) => {
            console.error("Face SDK initialization failed:", error);
            resolve(false);
          }
        );
      } else {
        // For iOS - using initializeWithConfig
        const config: InitConfig = {
          license: "regula.license", // path to your license file
          // other config options if needed
        };

        FaceSDK.initialize(
          config,
          () => {
            console.log("Face SDK initialized successfully");
            resolve(true);
          },
          (error: string) => {
            console.error("Face SDK initialization failed:", error);
            resolve(false);
          }
        );
      }
    });
  }

  deinitialize(): Promise<void> {
    return new Promise((resolve) => {
      FaceSDK.deinitialize(
        () => {
          console.log("Face SDK deinitialized successfully");
          resolve();
        },
        (error: string) => {
          console.error("Face SDK deinitialization failed:", error);
          resolve();
        }
      );
    });
  }
}

const faceSdkService = new FaceSdkService();
export default faceSdkService;
