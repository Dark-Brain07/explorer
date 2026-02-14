/**
 * Validates whether a string is a syntactically valid URL.
 * Uses the URL constructor to parse and validate the input string.
 *
 * @param url - The string to validate as a URL
 * @returns `true` if the string is a valid URL, `false` otherwise
 * @example
 * ```ts
 * validateUrl('https://explorer.stacks.co'); // true
 * validateUrl('not-a-url'); // false
 * ```
 */
export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
