import { IsClassGetterLike, IsClassMethodLike } from "structure/isLike";
import { Class, Getter, TestCaseExtras } from "signatures";
import {
  CanTestCaseThrow,
  IsTestCaseExtrasEmptyWithoutExpectedThrow,
  RemoveExpectedThrowFromTestCaseExtras,
} from "utils";

/**
 * Test case structure of a class getter.
 * @internal
 * @typeParam C - Class to test.
 * @typeParam G - Getter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassGetter<
  C extends Class,
  G extends Getter,
  E extends TestCaseExtras | void = void
> = E extends void
  ? IsClassGetterLike<C, G, false, false> extends true
    ? []
    : IsClassGetterLike<C, G, false, true> extends true
    ? [G]
    : IsClassGetterLike<C, G, true, false> extends true
    ? [ConstructorParameters<C>]
    : IsClassGetterLike<C, G, true, true> extends true
    ? [ConstructorParameters<C>, G]
    : never
  : CanTestCaseThrow<E> extends true
  ? IsClassGetterLike<C, G, false, false> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [] | [E]
      : [RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
    : IsClassGetterLike<C, G, false, true> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [G] | [E]
      : [G, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
    : IsClassGetterLike<C, G, true, false> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [ConstructorParameters<C>] | [ConstructorParameters<C>, E]
      :
          | [ConstructorParameters<C>, RemoveExpectedThrowFromTestCaseExtras<E>]
          | [ConstructorParameters<C>, E]
    : IsClassGetterLike<C, G, true, true> extends true
    ? IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true
      ? [ConstructorParameters<C>, G] | [ConstructorParameters<C>, E]
      :
          | [
              ConstructorParameters<C>,
              G,
              RemoveExpectedThrowFromTestCaseExtras<E>
            ]
          | [ConstructorParameters<C>, E]
    : never
  : IsClassGetterLike<C, G, false, false> extends true
  ? [E]
  : IsClassGetterLike<C, G, false, true> extends true
  ? [G, E]
  : IsClassGetterLike<C, G, true, false> extends true
  ? [ConstructorParameters<C>, E]
  : IsClassGetterLike<C, G, true, true> extends true
  ? [ConstructorParameters<C>, G, E]
  : never;
