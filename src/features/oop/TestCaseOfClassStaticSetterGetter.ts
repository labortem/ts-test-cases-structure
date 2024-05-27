import { Getter, Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";
import { TestCaseOfClassStaticGetter, TestCaseOfClassStaticSetter } from ".";

/**
 * Test case structure of a class static setter and getter.
 * @internal
 * @typeParam SS - Static setter to test.
 * @typeParam SG - Static getter to test.
 * @typeParam E - Extra content for the test cases.
 * @remarks This type is for static properties that does have both a setter and a getter. If you do only have a setter, use {@link TestCaseOfClassStaticSetter | `TestCaseOfClassStaticSetter`} instead, or if you do only have a getter, use {@link TestCaseOfClassStaticGetter | `TestCaseOfClassStaticGetter`} instead.
 */
export type TestCaseOfClassStaticSetterGetter<
	SS extends Setter,
	SG extends Getter = SS,
	E extends TestCaseExtras | void = void,
> =
	E extends void ? [SS, SG]
	: CanTestCaseThrow<E> extends true ?
		IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
			[SS, SG] | [SS, E]
		:	[SS, SG, RemoveExpectedThrowFromTestCaseExtras<E>] | [SS, E]
	:	[SS, SG, E];
