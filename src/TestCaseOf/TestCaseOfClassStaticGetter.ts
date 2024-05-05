import { IsClassStaticGetterLike } from "@tests/types/structure/isLike";
import { Getter, TestCaseExtras } from "@tests/types/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "@tests/types/utils";

/**
 * Test case structure of a class static getter.
 * @internal
 * @typeParam SG - Static getter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassStaticGetter<SG extends Getter, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsClassStaticGetterLike<SG, false> extends true ? []
		: IsClassStaticGetterLike<SG, true> extends true ? [SG]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsClassStaticGetterLike<SG, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[] | [E]
			:	[RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassStaticGetterLike<SG, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[SG] | [E]
			:	[SG, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		:	never
	: IsClassStaticGetterLike<SG, false> extends true ? [E]
	: IsClassStaticGetterLike<SG, true> extends true ? [SG, E]
	: never;
