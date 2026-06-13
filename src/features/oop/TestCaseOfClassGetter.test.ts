import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassGetter } from "./TestCaseOfClassGetter";

/*
 * Test cases structure of a class getter. The getter value type `G` is supplied explicitly.
 *   [ constructor parameters?, getter value ]  (+ optional extra object / expectedThrow split)
 */

class NoCtor {
	constructor() {}
}
class Ctor {
	constructor(a: string) {}
}

// --- Base structure -----------------------------------------------------------------------------------------------

type _noCtor = Expect<Equal<TestCaseOfClassGetter<typeof NoCtor, number>, [number]>>;
type _ctor = Expect<Equal<TestCaseOfClassGetter<typeof Ctor, number>, [[string], number]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<TestCaseOfClassGetter<typeof Ctor, number, { count: number }>, [[string], number, { count: number }]>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassGetter<typeof Ctor, number, { expectedThrow: RangeError }>,
		[[string], number] | [[string], { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassGetter<typeof Ctor, number, { expectedThrow: RangeError; count: number }>,
		[[string], number, { count: number }] | [[string], { expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[string], number], TestCaseOfClassGetter<typeof Ctor, number>>>;
