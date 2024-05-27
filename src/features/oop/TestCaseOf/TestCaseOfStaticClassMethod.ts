import { IsStaticClassMethodLike } from "utils/structure/isLike";
import { Method, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class static method.
 * @internal
 * @typeParam SM - Static method to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfStaticClassMethod<SM extends Method, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsStaticClassMethodLike<SM, false, false> extends true ? []
		: IsStaticClassMethodLike<SM, false, true> extends true ? [ReturnType<SM>]
		: IsStaticClassMethodLike<SM, true, false> extends true ? [Parameters<SM>]
		: IsStaticClassMethodLike<SM, true, true> extends true ? [Parameters<SM>, ReturnType<SM>]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsStaticClassMethodLike<SM, false, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[] | [E]
			:	[RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsStaticClassMethodLike<SM, false, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ReturnType<SM>] | [E]
			:	[ReturnType<SM>, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsStaticClassMethodLike<SM, true, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[Parameters<SM>] | [Parameters<SM>, E]
			:	[Parameters<SM>, RemoveExpectedThrowFromTestCaseExtras<E>] | [Parameters<SM>, E]
		: IsStaticClassMethodLike<SM, true, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[Parameters<SM>, ReturnType<SM>] | [Parameters<SM>, E]
			:	[Parameters<SM>, ReturnType<SM>, RemoveExpectedThrowFromTestCaseExtras<E>] | [Parameters<SM>, E]
		:	never
	: IsStaticClassMethodLike<SM, false, false> extends true ? [E]
	: IsStaticClassMethodLike<SM, false, true> extends true ? [ReturnType<SM>, E]
	: IsStaticClassMethodLike<SM, true, false> extends true ? [Parameters<SM>, E]
	: IsStaticClassMethodLike<SM, true, true> extends true ? [Parameters<SM>, ReturnType<SM>, E]
	: never;
