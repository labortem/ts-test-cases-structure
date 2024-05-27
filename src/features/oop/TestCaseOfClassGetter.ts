import { IsClassGetterLike } from "utils/structure/isLike";
import { Class, Getter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";
import { TestCaseOfClassSetter, TestCaseOfClassSetterGetter } from ".";

/**
 * Test case structure of a class getter.
 * @internal
 * @typeParam C - Class to test.
 * @typeParam G - Getter to test.
 * @typeParam E - Extra content for the test cases.
 * @remarks This type is for class properties that does only have a getter. If you do only have a setter, use {@link TestCaseOfClassSetter | `TestCaseOfClassSetter`} instead, or if you have both, use {@link TestCaseOfClassSetterGetter | `TestCaseOfClassSetterGetter`} instead.
 */
export type TestCaseOfClassGetter<C extends Class, G extends Getter, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsClassGetterLike<C, false> extends true ? [G]
		: IsClassGetterLike<C, true> extends true ? [ConstructorParameters<C>, G]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsClassGetterLike<C, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[G] | [E]
			:	[G, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassGetterLike<C, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, G] | [ConstructorParameters<C>, E]
			:	[ConstructorParameters<C>, G, RemoveExpectedThrowFromTestCaseExtras<E>] | [ConstructorParameters<C>, E]
		:	never
	: IsClassGetterLike<C, false> extends true ? [G, E]
	: IsClassGetterLike<C, true> extends true ? [ConstructorParameters<C>, G, E]
	: never;
