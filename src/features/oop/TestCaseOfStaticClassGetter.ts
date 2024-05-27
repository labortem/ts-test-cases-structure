import { IsStaticClassGetterLike } from "utils/structure/isLike";
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
	E extends void ?
		IsStaticClassGetterLike<SG, false> extends true ? []
		: IsStaticClassGetterLike<SG, true> extends true ? [SG]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsStaticClassGetterLike<SG, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[] | [E]
			:	[RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsStaticClassGetterLike<SG, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[SG] | [E]
			:	[SG, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		:	never
	: IsStaticClassGetterLike<SG, false> extends true ? [E]
	: IsStaticClassGetterLike<SG, true> extends true ? [SG, E]
	: never;
