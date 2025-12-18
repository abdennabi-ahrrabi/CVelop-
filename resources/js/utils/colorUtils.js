/**
 * Color Utilities for Auto-Contrast and Color Manipulation
 * Used by the Business Card design system
 */

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color string (with or without #)
 * @returns {object|null} RGB object {r, g, b} or null if invalid
 */
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

/**
 * Convert RGB values to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color string with #
 */
export function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate relative luminance of a color (WCAG 2.1 formula)
 * @param {string} hex - Hex color string
 * @returns {number} Luminance value between 0 and 1
 */
export function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0.5;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Get contrasting text color based on background luminance
 * @param {string} backgroundColor - Hex background color
 * @param {string} lightColor - Color to use on dark backgrounds (default: white)
 * @param {string} darkColor - Color to use on light backgrounds (default: dark gray)
 * @returns {string} The contrasting color
 */
export function getContrastColor(backgroundColor, lightColor = '#ffffff', darkColor = '#1f2937') {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? darkColor : lightColor;
}

/**
 * Calculate contrast ratio between two colors (WCAG 2.1)
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG standards
 * @param {string} textColor - Text hex color
 * @param {string} backgroundColor - Background hex color
 * @param {string} level - 'AA' (4.5:1) or 'AAA' (7:1)
 * @returns {boolean} Whether contrast meets the standard
 */
export function meetsContrastRequirements(textColor, backgroundColor, level = 'AA') {
    const ratio = getContrastRatio(textColor, backgroundColor);
    return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
}

/**
 * Convert hex color to RGBA string
 * @param {string} hex - Hex color
 * @param {number} opacity - Opacity value 0-1
 * @returns {string} RGBA color string
 */
export function hexToRgba(hex, opacity) {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(255, 255, 255, ${opacity})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Lighten a color by a percentage
 * @param {string} hex - Hex color
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} Lightened hex color
 */
export function lightenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const factor = percent / 100;
    const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
    const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
    const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));

    return rgbToHex(r, g, b);
}

/**
 * Darken a color by a percentage
 * @param {string} hex - Hex color
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened hex color
 */
export function darkenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const factor = 1 - percent / 100;
    const r = Math.round(rgb.r * factor);
    const g = Math.round(rgb.g * factor);
    const b = Math.round(rgb.b * factor);

    return rgbToHex(r, g, b);
}

/**
 * Get a secondary text color (slightly transparent version of contrast color)
 * @param {string} backgroundColor - Hex background color
 * @returns {string} RGBA color string for secondary text
 */
export function getSecondaryTextColor(backgroundColor) {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.7)';
}

/**
 * Check if a color is light or dark
 * @param {string} hex - Hex color
 * @returns {boolean} True if light, false if dark
 */
export function isLightColor(hex) {
    return getLuminance(hex) > 0.5;
}
