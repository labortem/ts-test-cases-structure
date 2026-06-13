import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassStaticSetter } from "./TestCaseOfClassStaticSetter";

/*
 * Test cases structure of a static class setter. No constructor segment for static members.
 *   [ setter value ]  (+ optional extra object / expectedThrow split)
 */

// --- Base structure -----------------------------------------------------------------------------------------------

type _base = Expect<Equal<TestCaseOfClassStaticSetter<string>, [string]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<Equal<TestCaseOfClassStaticSetter<string, { count: number }>, [string, { count: number }]>>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassStaticSetter<string, { expectedThrow: RangeError }>,
		[string] | [{ expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassStaticSetter<string, { expectedThrow: RangeError; count: number }>,
		[string, { count: number }] | [{ expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[string], TestCaseOfClassStaticSetter<string>>>;
