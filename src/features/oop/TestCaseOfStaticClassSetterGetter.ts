import { Getter, Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class static setter and getter.
 * @internal
 * @typeParam SS - Static setter to test.
 * @typeParam SG - Static getter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfStaticClassSetterGetter<
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
