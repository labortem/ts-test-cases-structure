import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassSetter } from "./TestCaseOfClassSetter";

/*
 * Test cases structure of a class setter. The setter value type `S` is supplied explicitly.
 *   [ constructor parameters?, setter value ]  (+ optional extra object / expectedThrow split)
 */

class NoCtor {
	constructor() {}
}
class Ctor {
	constructor(a: string) {}
}

// --- Base structure -----------------------------------------------------------------------------------------------

type _noCtor = Expect<Equal<TestCaseOfClassSetter<typeof NoCtor, string>, [string]>>;
type _ctor = Expect<Equal<TestCaseOfClassSetter<typeof Ctor, string>, [[string], string]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<TestCaseOfClassSetter<typeof Ctor, string, { count: number }>, [[string], string, { count: number }]>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassSetter<typeof Ctor, string, { expectedThrow: RangeError }>,
		[[string], string] | [[string], { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassSetter<typeof Ctor, string, { expectedThrow: RangeError; count: number }>,
		[[string], string, { count: number }] | [[string], { expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[string], string], TestCaseOfClassSetter<typeof Ctor, string>>>;
