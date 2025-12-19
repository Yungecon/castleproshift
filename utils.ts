/**
 * Utility functions for the ProShift Training app
 */

/**
 * Converts a string to Title Case
 * @param str - The string to convert
 * @returns The title-cased string
 */
export const toTitleCase = (str: string): string => {
  if (!str) return "";
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};


