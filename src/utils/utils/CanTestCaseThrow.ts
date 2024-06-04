import { TestCaseExtras } from "utils/signatures";
import { ExpectedThrowKey } from ".";

/**
 * Check if the {@link TestCaseExtras | `TestCaseExtras`} object contains a key which means the test case is expected to throw an error.
 * @internal
 * @typeParam C - {@link TestCaseExtras | `TestCaseExtras`} object to check.
 * @remarks The returned type is `true` if the {@link TestCaseExtras | `TestCaseExtras`} object contains the `expectedThrow` key, `false` otherwise.
 * @see {@link ExpectedThrowKey | `ExpectedThrowKey`} for the expecting to throw error key.
 * @see {@link TestCaseExtras | `TestCaseExtras`} for the test case extras object.
 * @example
 * ```ts
 * CanTestCaseThrow<{}> // false
 * CanTestCaseThrow<{ expectedThrow: Error }> // true
 * CanTestCaseThrow<{ expectedThrow: Error, timeout: number }> // true
 * ```
 */
export type CanTestCaseThrow<C extends TestCaseExtras | void> = ExpectedThrowKey extends keyof C ? true : false;
