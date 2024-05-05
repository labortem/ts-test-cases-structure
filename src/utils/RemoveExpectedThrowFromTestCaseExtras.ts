import { TestCaseExtras } from "signatures";
import { ExpectedThrowKey } from "utils/ExpectedThrowKey";

/**
 * Remove the expected throw key from the given {@link TestCaseExtras | `TestCaseExtras`} object.
 * @internal
 * @typeParam E - {@link TestCaseExtras | `TestCaseExtras`} object to remove the expected throw key from.
 * @see {@link ExpectedThrowKey | `ExpectedThrowKey`} for the expecting to throw error key.
 * @see {@link TestCaseExtras | `TestCaseExtras`} for the test case extras object.
 * @example
 * ```ts
 * RemoveExpectedThrowFromTestCaseExtras<{}> // {}
 * RemoveExpectedThrowFromTestCaseExtras<{ expectedThrow: Error }> // {}
 * RemoveExpectedThrowFromTestCaseExtras<{ expectedThrow: Error, timeout: number }> // { timeout: number }
 * ```
 */
export type RemoveExpectedThrowFromTestCaseExtras<E extends TestCaseExtras | void> = Omit<E, ExpectedThrowKey>;
