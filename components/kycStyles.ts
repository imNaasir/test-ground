import { StyleSheet } from "react-native";
import { Colors } from "@/helpers/constants/Colors";
import { whp, wwp } from "@/helpers/utils/size";
import { hexToRGBA } from "@/helpers/utils/colorHelper";
// import { Font } from "@/helpers/constants/type";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";
import { Font } from "@/helpers/constants/type";

export const KycStyles = () => {
    const colorScheme = useColorScheme();

    const currentColors = colorScheme === "light" ? Colors.light : Colors.dark;

    return StyleSheet.create({
        // KycListStyle screen 1
        container: {
            // padding: 20,
            // flexDirection: "row",
            // justifyContent: "space-between",
            // borderBottomColor: hexToRGBA(currentColors.primary, 0.2),
            // borderWidth: 2,
            // // marginBottom: 30,
        },
        kycHeader: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: wwp(4),
            paddingVertical: whp(1.5),
            textAlign: "center",
            // borderWidth: 2,
        },
        kycCountingSteps: {
            width: wwp(15),
            height: wwp(15),
            borderWidth: 2,
            borderColor: currentColors.primary,
            backgroundColor: currentColors.active,
            borderRadius: wwp(50),
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        kycCountingStepsText: {
            fontSize: wwp(5),
            fontFamily: Font.Medium,
            marginTop: wwp(1),
            color: currentColors.black,
            textAlign: "center",
        },
        kycHeaderText: {
            marginTop: wwp(3),
            marginBottom: wwp(0.5),
        },
        headerTextTitle: {
            fontFamily: Font.Bold,
            fontSize: 24,
            fontWeight: "700",
            color: currentColors.primary,
            textAlign: "center",
            // marginVertical: 5,
        },
        divider1: {
            borderWidth: 0.5,
            borderColor: hexToRGBA(currentColors.primary, 0.1),
        },
        Text: {
            fontSize: 22,
            fontFamily: Font.Bold,
            color: currentColors.primary,
        },
        textReview: {
            fontSize: 28,
            fontWeight: "bold",
            color: currentColors.primary,
        },
        reviewBodyText: {
            fontSize: 16,
            color: currentColors.primary,
            fontWeight: "100",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 20, 
            marginTop: 10, 
        },

        reviewCont: {
            height: 300,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        row: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
        },
        iconWrapper: {
            backgroundColor: hexToRGBA(currentColors.secondary, 0.2),
            justifyContent: "center",
            alignItems: "center",
            width: 30,
            height: 30,
            borderRadius: 4,
        },
        tier: {
            fontFamily: Font.Bold,
            fontSize: 12,
            fontWeight: "600",
            color: hexToRGBA(currentColors.primary, 0.8),
            textAlign: "center",
        },
        upgrade: {
            fontFamily: Font.Semibold,
            fontSize: 12,
            color: currentColors.secondary,
        },
        border: {
            borderBottomColor: hexToRGBA(currentColors.danger, 1),
            borderBottomWidth: 1,
            marginBottom: 30,
        },
        contactButton: {
            // padding: 10,
        },
        buttonContent: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: currentColors.white,
            padding: 25,
            borderRadius: 12,

            // Small shadow properties for iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 }, // Very small vertical offset
            shadowOpacity: 0.05, // Light opacity for subtle shadow
            shadowRadius: 2, // Small radius for minimal spread

            // Small shadow property for Android
            elevation: 1, // Minimal elevation for subtle shadow effect
        },
        textWrapper: {
            flex: 1,
            marginLeft: 10,
        },
        buttonText: {
            fontFamily: Font.Bold,
            fontSize: 16,
            fontWeight: "bold",
            color: currentColors.primary,
            // position: "absolute",
            // right: 0,
        },
        contactDetail: {
            fontFamily: Font.Semibold,
            fontSize: 12,
            fontWeight: "500",
            marginTop: 5,
        },
        submitButton: {
            marginVertical: 20,
        },
        tText: {
            fontSize: 16,
            color: currentColors.white,
        },
        submitText: {
            fontSize: 16,
            color: currentColors.white,
        },

        requirementContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
            columnGap: 5,
        },
        subtitle: {
            fontSize: 16,
            color: currentColors.secondary,
            fontFamily: Font.Bold,
            fontWeight: "bold",
            paddingLeft: 10,
        },
        icon: {
            color: "#FE5038E0",
            fontSize: 30,
            paddingTop: 10,
        },
        line: {
            borderBottomColor: hexToRGBA(currentColors.secondary, 0.2),
            borderBottomWidth: 1,
            marginTop: 20,
        },
        smallText: {
            fontFamily: Font.Semibold,
            fontSize: 12,
            color: currentColors.secondary,
            paddingLeft: 20,
            marginTop: -8,
        },
        approval: {
            fontSize: 10,
            marginTop: 1,
            color: currentColors.warning,
            paddingLeft: 20,
        },

        options: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            borderRadius: 25,

            paddingVertical: 20,
            backgroundColor: currentColors.cards,
        },
        radioCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: currentColors.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
        },
        waiting: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: currentColors.warning,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
        },
        option: {
            width: "45%",
            flexDirection: "row",
            padding: 6,
            margin: 2,
            paddingLeft: 20,
            alignItems: "center",
        },
        requirementText: {
            color: currentColors.primary,
            marginLeft: 10,
            fontSize: 12,
            fontWeight: "600",
        },
        // Transaction Limit
        transactionLimitContainer: {
            marginTop: 30,
        },
        transactionHeaderRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: hexToRGBA(currentColors.secondary, 0.025),
            padding: 20,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderWidth: 1,
            borderColor: hexToRGBA(currentColors.secondary, 0.1),
        },
        transactionRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: hexToRGBA(currentColors.primary, 0.1),
            marginTop: 10,
        },

        transactionText: {
            fontFamily: Font.Bold,
            color: currentColors.primary,
        },
        verticalBorder: {
            borderLeftWidth: 2,
            borderColor: hexToRGBA(currentColors.secondary, 0.2),
            marginHorizontal: 10,
            height: 40,
        },

        //KycFormStyles
        containerKycForm: {
            // padding: 20,
            flex: 1,
        },
        documentInputs: {
            marginVertical: wwp(5),
            paddingHorizontal: wwp(3),
            paddingVertical: wwp(1),
            borderRadius: 15,
            overflow: "scroll", // Overflow applied only to the inner container
            elevation: 1,
            backgroundColor: currentColors.cards,
        },
        selectedCircle: {
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: currentColors.primary,
        },

        selectedRb: {
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: currentColors.secondary,
        },

        // button
        actionButton: {
            marginVertical: 20,
            backgroundColor: currentColors.priSec
        },
        actionText: {
            color: currentColors.white,
            fontWeight: "bold",
        },
        //
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            marginBottom: 5,
            color: currentColors.primary,
            paddingTop: 20,
            padding: 10,
        },
        label1: {
            fontSize: 16,
            color: currentColors.primary,
            paddingLeft: 5,
        },
        documentType: {
            backgroundColor: hexToRGBA(currentColors.secondary, 0.1),
            borderRadius: 10,
            paddingVertical: 20,
            paddingHorizontal: 20,
        },
        documentText: {
            fontSize: 18,
            color: currentColors.primary,
        },
        uploadButton: {
            height: 55,
            marginVertical: 20,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: hexToRGBA(currentColors.secondary, 0.8)
            
        },
        uploadText: {
            fontSize: 16,
            color: currentColors.primary,
        },
        requirements: {
            fontSize: 16,
            color: currentColors.primary,
            marginBottom: 30,
        },
        rowContainer: {
            flexDirection: "row", // Arrange items in a row
            justifyContent: "space-between", // Create space between the text and icon
            alignItems: "center", // Align items vertically centered
            width: "100%", // Ensure the row takes the full width
            paddingHorizontal: 10, // Optional: Add padding if needed
            marginBottom: 10,
        },
        displayDocumentName: {
            fontSize: 16, // Customize the text size
            color: "#333", // Customize the text color
        },
        errorStyle: {
            fontSize: 14, // Maintain a readable font size
            color: currentColors.danger, // Use a danger color for error
            fontWeight: "600", // Make the text slightly bolder
            lineHeight: 16, // Adjust line height for better spacing
            letterSpacing: 0.2, // Add some spacing between letters
            marginBottom: 10, // Space below the error message
            textAlign: "center", // Center the text for a balanced look
            padding: 5, // Add a bit of padding for clarity
            backgroundColor: "#fdd", // Light red background to highlight the error
            borderRadius: 5, // Rounded corners for a softer look
            shadowColor: "#000", // Slight shadow to add depth
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        deleteIcon: {
            marginLeft: 10, // Optional: Add spacing between text and icon if needed
        },
        boldText: {
            fontWeight: "bold",
        },

        kycNotice: {
            marginTop: wwp(3),
            flexDirection: "column",
            padding: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 25,
            backgroundColor: currentColors.cards,
        },
        kycTitle: {
            fontSize: 20,
            color: currentColors.warning,
            fontWeight: "600",
        },
        kycTextAboutImage: {
            fontSize: 12,
            color: currentColors.primary,
            fontWeight: "400",
            fontFamily: Font.Regular,
        },
        agree: {
            flexDirection: "row",
            alignItems: "center",
            gap: wwp(2),
            marginTop: wwp(3),
        },
        isAgree: {
            fontSize: 15,
            color: currentColors.primary,
            fontWeight: "600",
            fontFamily: Font.Semibold,
        },

        optionsType: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap", // Allows items to wrap into new rows
            justifyContent: "space-between", // Adjusts space between items
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 25,
            backgroundColor: currentColors.cards,
            // backgroundColor: "red",
            width: "100%",
            gap: 25,
            marginTop: 16,
        },
        optionContainer: {
            width: "100%", // Makes each item take up roughly half the width
            display: "flex",
            flexDirection: "row",
        },
        radioCircle1: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: currentColors.primary,
        },
        option1: {
            fontSize: 16,
            color: currentColors.primary,
            marginLeft: 10,
        },

        //KycFaceRecognitionStyle
        containerKycFace: {
            flex: 1,
            backgroundColor: "transparent",
        },
        bodyContainer: {
            marginTop: 20,
            marginHorizontal: 30,
        },
        faceContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        instruction: {
            marginTop: 60,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
        },
        title: {
            fontSize: 16,
            fontWeight: "700",
            paddingBottom: 10,
        },
        text: {
            fontSize: 14,
            fontWeight: "400",
            color: hexToRGBA(currentColors.primary, 0.5),
            marginLeft: -40,
        },
        cameraWrapper: {
            width: 240,
            height: 250,
            borderRadius: 170,
            overflow: "hidden",
        },
        camera: {
            flex: 1,
        },
        capturedImage: {
            width: 240,
            height: 250,
            borderRadius: 170,
            marginVertical: 20,
            alignSelf: "center",
        },
        buttonRow: {
            flexDirection: "row", // Arrange items in a row
            justifyContent: "center", // Place items at the start and end of the row
            alignItems: "center", // Center items vertically
            width: "100%", // Ensure the container takes full width
            // paddingHorizontal: 20,
            gap: 10,
            flex: 1,
        },

        okeyBtn: {
            backgroundColor: currentColors.priSec,
        }
    });
};
