import { IsClassSetterLike } from "utils/structure/isLike";
import { Class, Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";

/**
 * Test case structure of a class setter.
 * @internal
 * @typeParam C - Class to test.
 * @typeParam S - Setter to test.
 * @typeParam E - Extra content for the test cases.
 */
export type TestCaseOfClassSetter<C extends Class, S extends Setter, E extends TestCaseExtras | void = void> =
	E extends void ?
		IsClassSetterLike<C, false> extends true ? [S]
		: IsClassSetterLike<C, true> extends true ? [ConstructorParameters<C>, S]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsClassSetterLike<C, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[S] | [E]
			:	[S, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassSetterLike<C, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, S] | [ConstructorParameters<C>, E]
			:	[ConstructorParameters<C>, S, RemoveExpectedThrowFromTestCaseExtras<E>] | [ConstructorParameters<C>, E]
		:	never
	: IsClassSetterLike<C, false> extends true ? [S, E]
	: IsClassSetterLike<C, true> extends true ? [ConstructorParameters<C>, S, E]
	: never;
