import { Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class static setter.
 * @internal
 * @typeParam SS - Static setter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfStaticClassSetter<SS extends Setter, E extends TestCaseExtras | void = void> =
	E extends void ? [SS]
	: CanTestCaseThrow<E> extends true ?
		IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
			[SS] | [E]
		:	[SS, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
	:	[SS, E];
