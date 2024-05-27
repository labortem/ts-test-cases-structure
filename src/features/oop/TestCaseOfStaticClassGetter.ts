import { Getter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class static getter.
 * @internal
 * @typeParam SG - Static getter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfStaticClassGetter<SG extends Getter, E extends TestCaseExtras | void = void> =
	E extends void ? [SG]
	: CanTestCaseThrow<E> extends true ?
		IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
			[SG] | [E]
		:	[SG, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
	:	[SG, E];
