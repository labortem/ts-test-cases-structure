import { Getter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";
import { TestCaseOfClassStaticSetter, TestCaseOfClassStaticSetterGetter } from ".";

/**
 * Test case structure of a class static getter.
 * @internal
 * @typeParam SG - Static getter to test.
 * @typeParam E - Extra content for the test cases.
 * @remarks This type is for static properties that does only have a getter. If you do only have a setter, use {@link TestCaseOfClassStaticSetter | `TestCaseOfClassStaticSetter`} instead, or if you have both, use {@link TestCaseOfClassStaticSetterGetter | `TestCaseOfClassStaticSetterGetter`} instead.
 */
export type TestCaseOfClassStaticGetter<SG extends Getter, E extends TestCaseExtras | void = void> =
	E extends void ? [SG]
	: CanTestCaseThrow<E> extends true ?
		IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
			[SG] | [E]
		:	[SG, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
	:	[SG, E];
