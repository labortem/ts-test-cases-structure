import { Equal, Expect, Extends } from "../../tests/assert";
import { instanceOf } from "./instanceOf";
import { TestCaseOfClassMethod } from "./TestCaseOfClassMethod";

/*
 * Test cases structure of a class method.
 *
 * The output tuple keeps only the relevant segments, in order:
 *   [ constructor parameters?, method parameters?, return type? ]
 * A segment is dropped when the constructor has no parameters / the method has no parameters / the method returns void.
 */

// --- Fixtures: every combination of (constructor has params) x (method has params) x (method returns) -------------

class NoCtor_NoParams_NoReturn {
	constructor() {}
	m(): void {}
}
class NoCtor_NoParams_Return {
	constructor() {}
	m(): bigint {
		return 0n;
	}
}
class NoCtor_Params_NoReturn {
	constructor() {}
	m(a: string, b: boolean): void {}
}
class NoCtor_Params_Return {
	constructor() {}
	m(a: string, b: boolean): bigint {
		return 0n;
	}
}
class Ctor_NoParams_NoReturn {
	constructor(c: number) {}
	m(): void {}
}
class Ctor_NoParams_Return {
	constructor(c: number) {}
	m(): bigint {
		return 0n;
	}
}
class Ctor_Params_NoReturn {
	constructor(c: number) {}
	m(a: string, b: boolean): void {}
}
class Ctor_Params_Return {
	constructor(c: number) {}
	m(a: string, b: boolean): bigint {
		return 0n;
	}
}

// Derive the method type the way a consumer does: `instanceOf(Class).method`.
const m_NoCtor_NoParams_NoReturn = instanceOf(NoCtor_NoParams_NoReturn).m;
const m_NoCtor_NoParams_Return = instanceOf(NoCtor_NoParams_Return).m;
const m_NoCtor_Params_NoReturn = instanceOf(NoCtor_Params_NoReturn).m;
const m_NoCtor_Params_Return = instanceOf(NoCtor_Params_Return).m;
const m_Ctor_NoParams_NoReturn = instanceOf(Ctor_NoParams_NoReturn).m;
const m_Ctor_NoParams_Return = instanceOf(Ctor_NoParams_Return).m;
const m_Ctor_Params_NoReturn = instanceOf(Ctor_Params_NoReturn).m;
const m_Ctor_Params_Return = instanceOf(Ctor_Params_Return).m;

// --- Base structure (no extra object) -----------------------------------------------------------------------------

type _empty = Expect<
	Equal<TestCaseOfClassMethod<typeof NoCtor_NoParams_NoReturn, typeof m_NoCtor_NoParams_NoReturn>, []>
>;
type _ret = Expect<
	Equal<TestCaseOfClassMethod<typeof NoCtor_NoParams_Return, typeof m_NoCtor_NoParams_Return>, [bigint]>
>;
type _params = Expect<
	Equal<TestCaseOfClassMethod<typeof NoCtor_Params_NoReturn, typeof m_NoCtor_Params_NoReturn>, [[string, boolean]]>
>;
type _paramsRet = Expect<
	Equal<
		TestCaseOfClassMethod<typeof NoCtor_Params_Return, typeof m_NoCtor_Params_Return>,
		[[string, boolean], bigint]
	>
>;
type _ctor = Expect<
	Equal<TestCaseOfClassMethod<typeof Ctor_NoParams_NoReturn, typeof m_Ctor_NoParams_NoReturn>, [[number]]>
>;
type _ctorRet = Expect<
	Equal<TestCaseOfClassMethod<typeof Ctor_NoParams_Return, typeof m_Ctor_NoParams_Return>, [[number], bigint]>
>;
type _ctorParams = Expect<
	Equal<
		TestCaseOfClassMethod<typeof Ctor_Params_NoReturn, typeof m_Ctor_Params_NoReturn>,
		[[number], [string, boolean]]
	>
>;
type _all = Expect<
	Equal<
		TestCaseOfClassMethod<typeof Ctor_Params_Return, typeof m_Ctor_Params_Return>,
		[[number], [string, boolean], bigint]
	>
>;

// --- Extra object (no `expectedThrow` key): appended as the last segment ------------------------------------------

type _extra = Expect<
	Equal<
		TestCaseOfClassMethod<typeof Ctor_Params_Return, typeof m_Ctor_Params_Return, { count: number }>,
		[[number], [string, boolean], bigint, { count: number }]
	>
>;

// --- `expectedThrow` only: the structure splits into "returns" | "throws" ----------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassMethod<typeof Ctor_Params_Return, typeof m_Ctor_Params_Return, { expectedThrow: RangeError }>,
		[[number], [string, boolean], bigint] | [[number], [string, boolean], { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras: extras follow on each branch (throw key stripped from the "returns" one) -----

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassMethod<
			typeof Ctor_Params_Return,
			typeof m_Ctor_Params_Return,
			{ expectedThrow: RangeError; count: number }
		>,
		| [[number], [string, boolean], bigint, { count: number }]
		| [[number], [string, boolean], { expectedThrow: RangeError; count: number }]
	>
>;

// --- Negative cases: malformed structures must be rejected -------------------------------------------------------

type AllStructure = TestCaseOfClassMethod<typeof Ctor_Params_Return, typeof m_Ctor_Params_Return>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[number], [string, boolean], bigint], AllStructure>>;
// The return segment is mandatory here (the method returns a value).
type _missingReturn = Expect<Equal<Extends<[[number], [string, boolean]], AllStructure>, false>>;
// The first method parameter must be a `string`, not a `number`.
type _wrongParam = Expect<Equal<Extends<[[number], [number, boolean], bigint], AllStructure>, false>>;
