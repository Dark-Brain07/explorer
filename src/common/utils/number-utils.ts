/**
 * Validates whether a number is a valid unsigned 128-bit integer.
 * In the Stacks ecosystem, uint128 is used for token amounts and other
 * values that require large unsigned integers.
 *
 * @param value - The number or bigint to validate
 * @returns `true` if the value is a non-negative integer, `false` otherwise
 * @example
 * ```ts
 * isUint128(42); // true
 * isUint128(-1); // false
 * isUint128(3.14); // false
 * ```
 */
export function isUint128(value: number | bigint): boolean {
  // we could also add a check for maxUint128
  // const maxUint128 = BigInt('340282366920938463463374607431768211455'); // 2^128 - 1
  // value <= Number(maxUint128);
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * Checks if a string can be parsed as a valid number.
 *
 * @param value - The string to check
 * @returns `true` if the string represents a valid number, `false` otherwise
 * @example
 * ```ts
 * isStringNumber('42'); // true
 * isStringNumber('3.14'); // true
 * isStringNumber('abc'); // false
 * ```
 */
export function isStringNumber(value: string): boolean {
  return !isNaN(Number(value));
}

/**
 * Computes the power of a bigint base raised to an integer exponent.
 * This is needed because the native `**` operator for BigInt doesn't
 * accept a regular number as the exponent in all environments.
 *
 * @param base - The bigint base value
 * @param exp - The non-negative integer exponent
 * @returns The result of base^exp as a bigint
 * @example
 * ```ts
 * bigintPow(BigInt(2), 10); // 1024n
 * bigintPow(BigInt(10), 6); // 1000000n
 * ```
 */
export function bigintPow(base: bigint, exp: number): bigint {
  let result = BigInt(1);
  for (let i = 0; i < exp; i++) result = result * base;
  return result;
}

