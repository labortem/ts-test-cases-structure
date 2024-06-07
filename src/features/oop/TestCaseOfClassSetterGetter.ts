import { IsClassGetterLike } from "utils/structure/isLike";
import { Class, Getter, Setter, TestCaseExtras } from "utils/signatures";
import {
	CanTestCaseThrow,
	IsTestCaseExtrasEmptyWithoutExpectedThrow,
	RemoveExpectedThrowFromTestCaseExtras,
} from "utils/utils";
import { TestCaseOfClassGetter, TestCaseOfClassSetter } from ".";

/**
 * Test case structure of a class setter and getter.
 * @internal
 * @typeParam C - Class to test.
 * @typeParam S - Setter to test.
 * @typeParam G - Getter to test.
 * @typeParam E - Extra content for the test cases.
 * @remarks This type is for class properties that does have both a setter and a getter. If you do only have a setter, use {@link TestCaseOfClassSetter | `TestCaseOfClassSetter`} instead, or if you have only a getter, use {@link TestCaseOfClassGetter | `TestCaseOfClassGetter`} instead.
 */
export type TestCaseOfClassSetterGetter<
	C extends Class,
	S extends Setter,
	G extends Getter = S,
	E extends TestCaseExtras | void = void,
> =
	E extends void ?
		IsClassGetterLike<C, false> extends true ? [S, G]
		: IsClassGetterLike<C, true> extends true ? [ConstructorParameters<C>, S, G]
		: never
	: CanTestCaseThrow<E> extends true ?
		IsClassGetterLike<C, false> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[S, G] | [E]
			:	[S, G, RemoveExpectedThrowFromTestCaseExtras<E>] | [E]
		: IsClassGetterLike<C, true> extends true ?
			IsTestCaseExtrasEmptyWithoutExpectedThrow<E> extends true ?
				[ConstructorParameters<C>, S, G] | [ConstructorParameters<C>, S, E]
			:	| [ConstructorParameters<C>, S, G, RemoveExpectedThrowFromTestCaseExtras<E>]
				| [ConstructorParameters<C>, S, E]
		:	never
	: IsClassGetterLike<C, false> extends true ? [S, G, E]
	: IsClassGetterLike<C, true> extends true ? [ConstructorParameters<C>, S, G, E]
	: never;
