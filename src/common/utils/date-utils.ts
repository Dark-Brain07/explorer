/**
 * Formats a Unix timestamp into a short, human-readable date string.
 * Uses the 'en-GB' locale to produce a format like "14 Feb".
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns A short formatted date string (e.g., "14 Feb")
 * @example
 * ```ts
 * formatDateShort(1707926400000); // "14 Feb"
 * ```
 */
export function formatDateShort(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}
