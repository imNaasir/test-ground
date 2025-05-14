import FaceSDK, {
  Enum,
  InitConfig,
  InitResponse,
  LivenessNotification,
  LivenessResponse,
  LivenessSkipStep,
  MatchFacesImage,
  RNFaceApi,
} from "@regulaforensics/react-native-face-api";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  NativeEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as RNFS from "react-native-fs";

const Index = () => {
  const [img1, setImg1] = useState<any>(
    require("../../assets/images/react-logo.png")
  );
  const [img2, setImg2] = useState<any>(
    require("../../assets/images/react-logo.png")
  );
  const [similarity, setSimilarity] = useState<string>("nil");
  const [liveness, setLiveness] = useState<string>("nil");

  let image1 = React.useRef(new MatchFacesImage()).current;
  let image2 = React.useRef(new MatchFacesImage()).current;

  useEffect(() => {
    const eventManager = new NativeEventEmitter(RNFaceApi);
    const subscription = eventManager.addListener(
      "livenessNotificationEvent",
      (data) => {
        const notification = LivenessNotification.fromJson(JSON.parse(data))!;
        console.log("LivenessStatus:", notification.status);
      }
    );

    const onInit = (json: string) => {
      const response = InitResponse.fromJson(JSON.parse(json));
      if (!response!.success) {
        console.log(response!.error?.code);
        console.log(response!.error?.message);
      } else {
        console.log("Init complete");
      }
    };

    // Corrected license path
    const licPath = Platform.OS === "ios" ? "regula.license" : "regula.license";

    // Read license file
    const readLicense = async () => {
      try {
        const license = await RNFS.readFile(licPath, "base64");
        const config = new InitConfig();
        config.license = license;
        FaceSDK.initialize(config, onInit, (error) => {
          console.error("Initialization error:", error);
        });
      } catch (error) {
        console.warn("License file not found, initializing without license");
        FaceSDK.initialize(null, onInit, (error) => {
          console.error("Initialization error:", error);
        });
      }
    };

    readLicense();

    return () => {
      subscription.remove();
    };
  }, []);

  // Set your web service URL
  // const WEB_SERVICE_URL = "http://localhost:41101"; // Replace with your actual URL

  // useEffect(() => {
  //   FaceSDK.setServiceUrl(
  //     WEB_SERVICE_URL,
  //     () => console.log("Service URL configured"),
  //     (error) => console.error(error)
  //   );
  // }, []);

  // const pickImage = (first: boolean) => {
  //   Alert.alert("Select option", "", [
  //     {
  //       text: "Use gallery",
  //       onPress: () => {
  //         launchImageLibrary(
  //           {
  //             mediaType: "photo",
  //             selectionLimit: 1,
  //             includeBase64: true,
  //           },
  //           (response: any) => {
  //             if (!response.assets) return;
  //             setImage(
  //               first,
  //               response.assets[0].base64!,
  //               Enum.ImageType.PRINTED
  //             );
  //           }
  //         );
  //       },
  //     },
  //     {
  //       text: "Use camera",
  //       onPress: () => {
  //         FaceSDK.startFaceCapture(
  //           null,
  //           (json: string) => {
  //             const response = FaceCaptureResponse.fromJson(JSON.parse(json))!;
  //             if (response.image?.image)
  //               setImage(first, response.image.image, Enum.ImageType.LIVE);
  //           },
  //           () => {}
  //         );
  //       },
  //     },
  //   ]);
  // };

  const setImage = (first: boolean, base64: string, type: number) => {
    if (!base64) return;
    setSimilarity("null");
    if (first) {
      image1 = new MatchFacesImage();
      image1.image = base64;
      image1.imageType = type;
      setImg1({ uri: "data:image/png;base64," + base64 });
      console.log("===========response.image=========================");
      console.log("===.,  ", img1);
      console.log("====================================");
      setLiveness("null");
    } else {
      image2 = new MatchFacesImage();
      image2.image = base64;
      image2.imageType = type;
      setImg2({ uri: "data:image/png;base64," + base64 });
    }
  };

  const clearResults = () => {
    setImg1(require("../../assets/images/react-logo.png"));
    setImg2(require("../../assets/images/react-logo.png"));
    setSimilarity("null");
    setLiveness("null");
    image1 = new MatchFacesImage();
    image2 = new MatchFacesImage();
  };

  // const matchFaces = () => {
  //   if (!image1.image || !image2.image) return;
  //   setSimilarity("Processing...");
  //   const request = new MatchFacesRequest();
  //   request.images = [image1, image2];
  //   FaceSDK.matchFaces(
  //     request,
  //     null,
  //     (json: string) => {
  //       const response = MatchFacesResponse.fromJson(JSON.parse(json));
  //       FaceSDK.splitComparedFaces(
  //         response!.results!,
  //         0.75,
  //         (str) => {
  //           const split = ComparedFacesSplit.fromJson(JSON.parse(str))!;
  //           setSimilarity(
  //             split.matchedFaces?.length
  //               ? `${(split.matchedFaces[0].similarity! * 100).toFixed(2)}%`
  //               : "error"
  //           );
  //         },
  //         (e) => setSimilarity(e)
  //       );
  //     },
  //     (e) => setSimilarity(e)
  //   );
  // };

  const handleLiveness = () => {
    FaceSDK.startLiveness(
      { skipStep: [LivenessSkipStep.ONBOARDING_STEP] },
      (json: string) => {
        const response = LivenessResponse.fromJson(JSON.parse(json))!;
        if (response.image) {
          setImage(true, response.image, Enum.ImageType.LIVE);
          setLiveness(
            response.liveness === Enum.LivenessStatus.PASSED
              ? "passed"
              : "unknown"
          );
        }
      },
      () => {}
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={img1}
        resizeMode="contain"
        style={{ height: 150, width: 150 }}
      />
      {/* <View style={{ padding: 15 }}> */}
      {/* <TouchableOpacity
          onPress={() => pickImage(true)}
          style={{ alignItems: "center" }}
        >
          <Image
            source={img1}
            resizeMode="contain"
            style={{ height: 150, width: 150 }}
          />
        </TouchableOpacity> */}
      {/* <TouchableOpacity
          onPress={() => pickImage(false)}
          style={{ alignItems: "center" }}
        >
          <Image
            source={img2}
            resizeMode="contain"
            style={{ height: 150, width: 200 }}
          />
        </TouchableOpacity>
      </View> */}

      <View style={{ width: "100%", alignItems: "center" }}>
        {/* <View style={styles.buttonContainer}>
          <Button title="Match" color="#4285F4" onPress={matchFaces} />
        </View> */}
        <View style={styles.buttonContainer}>
          <Button title="Liveness" color="#4285F4" onPress={handleLiveness} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Clear" color="#4285F4" onPress={clearResults} />
        </View>
      </View>

      <View style={{ flexDirection: "row", padding: 10 }}>
        {/* <Text>Similarity: {similarity}</Text> */}
        <View style={{ padding: 10 }} />
        <Text>Liveness: {liveness}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 3,
    width: "60%",
  },
});
// ("use expo asset ");
