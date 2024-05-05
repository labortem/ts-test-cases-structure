import { IsClassStaticMethodLike } from "structure/isLike";
import { Method, TestCaseExtras } from "signatures";
import {
  CanTestCaseThrow,
  IsTestCaseExtrasEmptyWithoutExpectedThrow,
  RemoveExpectedThrowFromTestCaseExtras,
} from "utils";

/**
 * Test case structure of a class static method.
 * @internal
 * @typeParam SM - Static method to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassStaticMethod<
  SM extends Method,
  E extends TestCaseExtras | void = void
> = E extends void
  ? IsClassStaticMethodLike<SM, false, false> extends true
    ? []
    : IsClassStaticMethodLike<SM, false, true> extends true
    ? [ReturnType<SM>]
    : IsClassStaticMethodLike<SM, true, false> extends true
    ? [Parameters<SM>]
    : IsClassStaticMethodLike<SM, true, true> extends true
    ? [Parameters<SM>, ReturnType<SM>]
    : never
  : CanTestCaseThrow<E> extends true
  ? IsClassStaticMethodLike<SM, false, false> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [] | [E]
      : [RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
    : IsClassStaticMethodLike<SM, false, true> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [ReturnType<SM>] | [E]
      : [ReturnType<SM>, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
    : IsClassStaticMethodLike<SM, true, false> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [Parameters<SM>] | [Parameters<SM>, E]
      :
          | [Parameters<SM>, RemoveExpectedThrowFromTestCaseExtras<E>]
          | [Parameters<SM>, E]
    : IsClassStaticMethodLike<SM, true, true> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [Parameters<SM>, ReturnType<SM>] | [Parameters<SM>, E]
      :
          | [
              Parameters<SM>,
              ReturnType<SM>,
              RemoveExpectedThrowFromTestCaseExtras<E>
            ]
          | [Parameters<SM>, E]
    : never
  : IsClassStaticMethodLike<SM, false, false> extends true
  ? [E]
  : IsClassStaticMethodLike<SM, false, true> extends true
  ? [ReturnType<SM>, E]
  : IsClassStaticMethodLike<SM, true, false> extends true
  ? [Parameters<SM>, E]
  : IsClassStaticMethodLike<SM, true, true> extends true
  ? [Parameters<SM>, ReturnType<SM>, E]
  : never;
