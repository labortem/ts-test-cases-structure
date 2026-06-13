import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassStaticGetter } from "./TestCaseOfClassStaticGetter";

/*
 * Test cases structure of a static class getter. No constructor segment for static members.
 *   [ getter value ]  (+ optional extra object / expectedThrow split)
 */

// --- Base structure -----------------------------------------------------------------------------------------------

type _base = Expect<Equal<TestCaseOfClassStaticGetter<number>, [number]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<Equal<TestCaseOfClassStaticGetter<number, { count: number }>, [number, { count: number }]>>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassStaticGetter<number, { expectedThrow: RangeError }>,
		[number] | [{ expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassStaticGetter<number, { expectedThrow: RangeError; count: number }>,
		[number, { count: number }] | [{ expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[number], TestCaseOfClassStaticGetter<number>>>;
