import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassStaticSetterGetter } from "./TestCaseOfClassStaticSetterGetter";

/*
 * Test cases structure of a static class property exposing both a setter and a getter. No constructor segment.
 *   [ setter value, getter value ]  (+ optional extra object / expectedThrow split)
 * The getter type `SG` defaults to the setter type `SS` when omitted.
 */

// --- Base structure -----------------------------------------------------------------------------------------------

type _base = Expect<Equal<TestCaseOfClassStaticSetterGetter<string, number>, [string, number]>>;

// Getter type defaults to the setter type.
type _defaultGetter = Expect<Equal<TestCaseOfClassStaticSetterGetter<string>, [string, string]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<TestCaseOfClassStaticSetterGetter<string, number, { count: number }>, [string, number, { count: number }]>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassStaticSetterGetter<string, number, { expectedThrow: RangeError }>,
		[string, number] | [string, { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassStaticSetterGetter<string, number, { expectedThrow: RangeError; count: number }>,
		[string, number, { count: number }] | [string, { expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[string, number], TestCaseOfClassStaticSetterGetter<string, number>>>;
