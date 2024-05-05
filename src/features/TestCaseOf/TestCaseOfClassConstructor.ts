import { IsClassConstructorLike } from "../../utils/structure/isLike";
import { Class, TestCaseExtras } from "../../utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "../../utils/utils";

/**
 * Test case structure of a class constructor
 * @internal
 * @typeParam C - Class to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassConstructor<C extends Class, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsClassConstructorLike<C, false> extends true ? []
		: IsClassConstructorLike<C, true> extends true ? [ConstructorParameters<C>]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsClassConstructorLike<C, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[] | [E]
			:	[RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassConstructorLike<C, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>] | [ConstructorParameters<C>, E]
			:	[ConstructorParameters<C>, RemoveExpectedThrowFromTestCaseExtras<E>] | [ConstructorParameters<C>, E]
		:	never
	: IsClassConstructorLike<C, false> extends true ? [E]
	: IsClassConstructorLike<C, true> extends true ? [ConstructorParameters<C>, E]
	: never;
