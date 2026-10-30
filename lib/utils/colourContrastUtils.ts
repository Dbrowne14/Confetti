const DARK_TEXT = "#3b2619";
const LIGHT_TEXT = "#fcf7ef";

// Convert a hex colour into its relative luminance (0 = black, 1 = white)
const getColourContrast = (hexCode: string) => {
  // Convert hex into RGB values from 0–255
  if (!hexCode) {
    throw new Error("Hexcode invalid");
  }
  const { r, g, b } = hextoRGB(hexCode);

  // Normalise RGB values to 0–1
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // Adjust RGB values so they represent linear light
  const rAdjusted = adjust(red);
  const gAdjusted = adjust(green);
  const bAdjusted = adjust(blue);

  // Calculate luminance, accounting for how strongly we perceive each colour
  return 0.2126 * rAdjusted + 0.7152 * gAdjusted + 0.0722 * bAdjusted;
};

// Split the hex code into its red, green and blue values
const hextoRGB = (hex: string) => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return { r, g, b };
};

// Convert an sRGB value into a linear value for the luminance calculation
const adjust = (colour: number) =>
  colour <= 0.04045 ? colour / 12.92 : Math.pow((colour + 0.055) / 1.055, 2.4);

// Calculate these once as the text colours never change
const DARK_LUMINANCE = getColourContrast(DARK_TEXT);
const LIGHT_LUMINANCE = getColourContrast(LIGHT_TEXT);

// Compare both text colours against the background and choose the stronger contrast
export const compareColours = (bgColour: string) => {
  const bgLuminance = getColourContrast(bgColour);
  const darkContrast = getContrastRatio(bgLuminance, DARK_LUMINANCE);
  const lightContrast = getContrastRatio(bgLuminance, LIGHT_LUMINANCE);

  return darkContrast > lightContrast ? "dark" : "light";
};

// Contrast is always lighter colour divided by darker colour
const getContrastRatio = (luminance1: number, luminance2: number) => {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};
