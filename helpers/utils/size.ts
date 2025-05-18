import { Dimensions, PixelRatio, Platform } from "react-native";

// Get device screen and window sizes
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

// Define breakpoints
const isTablet = windowWidth >= 768;
const isLargeTablet = windowWidth >= 1024;
const isExtraLargeTablet = windowWidth >= 1200;
const tabletScaleFactor = isExtraLargeTablet ? 0.5 : isLargeTablet ? 0.6 : isTablet ? 0.7 : 1; // Dynamic scaling

// Scale width & height based on percentage
export const wwp = (percentage: number) => (percentage / 100) * windowWidth * tabletScaleFactor;
export const whp = (percentage: number) => (percentage / 100) * windowHeight * tabletScaleFactor;
export const swp = (percentage: number) => (percentage / 100) * screenWidth * tabletScaleFactor;
export const shp = (percentage: number) => (percentage / 100) * screenHeight * tabletScaleFactor;

// Base reference sizes (iPhone 12/13/14)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Scaling factors
const scaleWidth = windowWidth / guidelineBaseWidth;
const scaleHeight = windowHeight / guidelineBaseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

/**
 * Function to get responsive font size
 * Ensures fonts scale properly on all devices (phones, tablets, iPads)
 */
export const fontSize = (size: number, options = { minSize: 13, maxSize: 40 }) => {
    let newSize = size * scale;

    // Further adjust font size for tablets based on breakpoints
    if (isTablet) {
        newSize = size * (scale * (isExtraLargeTablet ? 0.5 : isLargeTablet ? 0.6 : 0.7));
    }

    // Apply font scaling correction for Android
    newSize = newSize / PixelRatio.getFontScale();

    return Math.round(PixelRatio.roundToNearestPixel(Math.max(options.minSize, Math.min(newSize, options.maxSize))));
};
