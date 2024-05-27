import { Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";
import { TestCaseOfClassStaticGetter, TestCaseOfClassStaticSetterGetter } from ".";

/**
 * Test case structure of a class static setter.
 * @internal
 * @typeParam SS - Static setter to test.
 * @typeParam E - Extra content for the test cases.
 * @remarks This type is for static properties that does only have a setter. If you do only have a getter, use {@link TestCaseOfClassStaticGetter | `TestCaseOfClassStaticGetter`} instead, or if you have both, use {@link TestCaseOfClassStaticSetterGetter | `TestCaseOfClassStaticSetterGetter`} instead.
 */
export type TestCaseOfClassStaticSetter<SS extends Setter, E extends TestCaseExtras | void = void> =
	E extends void ? [SS]
	: CanTestCaseThrow<E> extends true ?
		IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
			[SS] | [E]
		:	[SS, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
	:	[SS, E];
