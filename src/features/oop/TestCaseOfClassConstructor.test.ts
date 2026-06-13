import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassConstructor } from "./TestCaseOfClassConstructor";

/*
 * Test cases structure of a class constructor.
 *   [ constructor parameters? ]  (+ optional extra object / expectedThrow split)
 */

class NoParams {
	constructor() {}
}
class Params {
	constructor(a: string, b: number) {}
}

// --- Base structure -----------------------------------------------------------------------------------------------

type _noParams = Expect<Equal<TestCaseOfClassConstructor<typeof NoParams>, []>>;
type _params = Expect<Equal<TestCaseOfClassConstructor<typeof Params>, [[string, number]]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<TestCaseOfClassConstructor<typeof Params, { count: number }>, [[string, number], { count: number }]>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassConstructor<typeof Params, { expectedThrow: RangeError }>,
		[[string, number]] | [[string, number], { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassConstructor<typeof Params, { expectedThrow: RangeError; count: number }>,
		[[string, number], { count: number }] | [[string, number], { expectedThrow: RangeError; count: number }]
	>
>;

// --- Negative cases -----------------------------------------------------------------------------------------------

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[string, number]], TestCaseOfClassConstructor<typeof Params>>>;
// The constructor parameters segment is mandatory (the constructor takes arguments).
type _missingParams = Expect<Equal<Extends<[], TestCaseOfClassConstructor<typeof Params>>, false>>;
