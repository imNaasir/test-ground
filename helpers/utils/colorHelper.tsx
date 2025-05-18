// helpers/colorHelper.ts

/**
 * Converts a hex color code to RGBA format.
 * @param hex - The hex color code (e.g. "#ffffff").
 * @param opacity - A number between 0 and 1 for opacity (e.g. 0.5 for 50%).
 * @returns The color in rgba format.
 */
export function hexToRGBA(hex: string, opacity: number = 1): string {
    // Remove the hash at the start if it's there
    const cleanHex = hex?.replace("#", "");
    const bigint = parseInt(cleanHex, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
