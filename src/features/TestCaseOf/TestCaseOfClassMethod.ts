import { IsClassMethodLike } from "utils/structure/isLike";
import { Class, Method, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class method.
 * @internal
 * @typeParam C - Class to test.
 * @typeParam M - Method to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassMethod<C extends Class, M extends Method, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsClassMethodLike<C, M, false, false, false> extends true ? []
		: IsClassMethodLike<C, M, false, false, true> extends true ? [ReturnType<M>]
		: IsClassMethodLike<C, M, false, true, false> extends true ? [Parameters<M>]
		: IsClassMethodLike<C, M, false, true, true> extends true ? [Parameters<M>, ReturnType<M>]
		: IsClassMethodLike<C, M, true, false, false> extends true ? [ConstructorParameters<C>]
		: IsClassMethodLike<C, M, true, false, true> extends true ? [ConstructorParameters<C>, ReturnType<M>]
		: IsClassMethodLike<C, M, true, true, false> extends true ? [ConstructorParameters<C>, Parameters<M>]
		: IsClassMethodLike<C, M, true, true, true> extends true ?
			[ConstructorParameters<C>, Parameters<M>, ReturnType<M>]
		:	never
	: CanTestCaseThrow<E> extends true ?
		IsClassMethodLike<C, M, false, false, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[] | [E]
			:	[RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassMethodLike<C, M, false, false, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ReturnType<M>] | [E]
			:	[ReturnType<M>, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassMethodLike<C, M, false, true, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[Parameters<M>] | [Parameters<M>, E]
			:	[Parameters<M>, RemoveExpectedThrowFromTestCaseExtras<E>] | [Parameters<M>, E]
		: IsClassMethodLike<C, M, false, true, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[Parameters<M>, ReturnType<M>] | [Parameters<M>, E]
			:	[Parameters<M>, ReturnType<M>, RemoveExpectedThrowFromTestCaseExtras<E>] | [Parameters<M>, E]
		: IsClassMethodLike<C, M, true, false, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>] | [ConstructorParameters<C>, E]
			:	[ConstructorParameters<C>, RemoveExpectedThrowFromTestCaseExtras<E>] | [ConstructorParameters<C>, E]
		: IsClassMethodLike<C, M, true, false, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, ReturnType<M>] | [ConstructorParameters<C>, E]
			:	| [ConstructorParameters<C>, ReturnType<M>, RemoveExpectedThrowFromTestCaseExtras<E>]
				| [ConstructorParameters<C>, E]
		: IsClassMethodLike<C, M, true, true, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, Parameters<M>] | [ConstructorParameters<C>, Parameters<M>, E]
			:	| [ConstructorParameters<C>, Parameters<M>, RemoveExpectedThrowFromTestCaseExtras<E>]
				| [ConstructorParameters<C>, Parameters<M>, E]
		: IsClassMethodLike<C, M, true, true, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, Parameters<M>, ReturnType<M>] | [ConstructorParameters<C>, Parameters<M>, E]
			:	| [ConstructorParameters<C>, Parameters<M>, ReturnType<M>, RemoveExpectedThrowFromTestCaseExtras<E>]
				| [ConstructorParameters<C>, Parameters<M>, E]
		:	never
	: IsClassMethodLike<C, M, false, false, false> extends true ? [E]
	: IsClassMethodLike<C, M, false, false, true> extends true ? [ReturnType<M>, E]
	: IsClassMethodLike<C, M, false, true, false> extends true ? [Parameters<M>, E]
	: IsClassMethodLike<C, M, false, true, true> extends true ? [Parameters<M>, ReturnType<M>, E]
	: IsClassMethodLike<C, M, true, false, false> extends true ? [ConstructorParameters<C>, E]
	: IsClassMethodLike<C, M, true, false, true> extends true ? [ConstructorParameters<C>, ReturnType<M>, E]
	: IsClassMethodLike<C, M, true, true, false> extends true ? [ConstructorParameters<C>, Parameters<M>, E]
	: IsClassMethodLike<C, M, true, true, true> extends true ?
		[ConstructorParameters<C>, Parameters<M>, ReturnType<M>, E]
	:	never;
