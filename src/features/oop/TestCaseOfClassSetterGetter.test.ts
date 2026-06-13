import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassSetterGetter } from "./TestCaseOfClassSetterGetter";

/*
 * Test cases structure of a class property exposing both a setter and a getter (with possibly different types).
 *   [ constructor parameters?, setter value, getter value ]  (+ optional extra object / expectedThrow split)
 * The getter type `G` defaults to the setter type `S` when omitted.
 */

class NoCtor {
	constructor() {}
}
class Ctor {
	constructor(a: string) {}
}

// --- Base structure -----------------------------------------------------------------------------------------------

type _noCtor = Expect<Equal<TestCaseOfClassSetterGetter<typeof NoCtor, string, number>, [string, number]>>;
type _ctor = Expect<Equal<TestCaseOfClassSetterGetter<typeof Ctor, string, number>, [[string], string, number]>>;

// Getter type defaults to the setter type.
type _defaultGetter = Expect<Equal<TestCaseOfClassSetterGetter<typeof NoCtor, string>, [string, string]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<
		TestCaseOfClassSetterGetter<typeof Ctor, string, number, { count: number }>,
		[[string], string, number, { count: number }]
	>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassSetterGetter<typeof Ctor, string, number, { expectedThrow: RangeError }>,
		[[string], string, number] | [[string], string, { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassSetterGetter<typeof Ctor, string, number, { expectedThrow: RangeError; count: number }>,
		[[string], string, number, { count: number }] | [[string], string, { expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[string], string, number], TestCaseOfClassSetterGetter<typeof Ctor, string, number>>>;
