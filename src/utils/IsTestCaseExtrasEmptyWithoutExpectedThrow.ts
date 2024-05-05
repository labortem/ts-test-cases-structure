import { TestCaseExtras } from "signatures";
import { RemoveExpectedThrowFromTestCaseExtras } from "utils";

/**
 * Check if the {@link TestCaseExtras | `TestCaseExtras`} object is empty without the expected throw key.
 * @internal
 * @see {@link ExpectedThrowKey | `ExpectedThrowKey`} for the expecting to throw error key.
 * @see {@link TestCaseExtras | `TestCaseExtras`} for the test case extras object.
 * @remarks The returned type is `true` if the {@link TestCaseExtras | `TestCaseExtras`} object is empty without the expected throw key, `false` otherwise.
 * @example
 * ```ts
 * IsTestCaseExtrasEmptyWithoutExpectedThrow<{}> // true
 * IsTestCaseExtrasEmptyWithoutExpectedThrow<{ expectedThrow: Error }> // true
 * IsTestCaseExtrasEmptyWithoutExpectedThrow<{ expectedThrow: Error, timeout: number }> // false
 * ```
 */
export type IsTestCaseExtrasEmptyWithoutExpectedThrow<
  E extends TestCaseExtras | void
> = keyof RemoveExpectedThrowFromTestCaseExtras<E> extends never ? true : false;
