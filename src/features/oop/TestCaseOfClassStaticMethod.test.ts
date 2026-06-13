import { Equal, Expect, Extends } from "../../tests/assert";
import { TestCaseOfClassStaticMethod } from "./TestCaseOfClassStaticMethod";

/*
 * Test cases structure of a static class method. There is no constructor segment for static members.
 *   [ method parameters?, return type? ]  (+ optional extra object / expectedThrow split)
 */

class S {
	static none(): void {}
	static ret(): bigint {
		return 0n;
	}
	static params(a: string, b: boolean): void {}
	static all(a: string, b: boolean): bigint {
		return 0n;
	}
}

const none = S.none;
const ret = S.ret;
const params = S.params;
const all = S.all;

// --- Base structure -----------------------------------------------------------------------------------------------

// BUG: a `void`-returning static method should yield `[]`, but `HasClassStaticMethodReturn` compares
// `ReturnType` to `[]` instead of `void` (unlike the instance-method predicate `HasClassMethodReturn`), so the
// empty return segment `[void]` is wrongly kept. This locks the CURRENT (buggy) output — change the expected type
// to `[]` once `src/utils/structure/has/HasClassStaticMethodReturn.ts` is fixed.
type _none = Expect<Equal<TestCaseOfClassStaticMethod<typeof none>, [void]>>;
type _ret = Expect<Equal<TestCaseOfClassStaticMethod<typeof ret>, [bigint]>>;
// BUG: same root cause as `_none` — the expected type should be `[[string, boolean]]` (no return segment).
type _params = Expect<Equal<TestCaseOfClassStaticMethod<typeof params>, [[string, boolean], void]>>;
type _all = Expect<Equal<TestCaseOfClassStaticMethod<typeof all>, [[string, boolean], bigint]>>;

// --- Extra object (no `expectedThrow`) ----------------------------------------------------------------------------

type _extra = Expect<
	Equal<TestCaseOfClassStaticMethod<typeof all, { count: number }>, [[string, boolean], bigint, { count: number }]>
>;

// --- `expectedThrow` only -----------------------------------------------------------------------------------------

type _throwOnly = Expect<
	Equal<
		TestCaseOfClassStaticMethod<typeof all, { expectedThrow: RangeError }>,
		[[string, boolean], bigint] | [[string, boolean], { expectedThrow: RangeError }]
	>
>;

// --- `expectedThrow` + other extras -------------------------------------------------------------------------------

type _throwAndExtra = Expect<
	Equal<
		TestCaseOfClassStaticMethod<typeof all, { expectedThrow: RangeError; count: number }>,
		| [[string, boolean], bigint, { count: number }]
		| [[string, boolean], { expectedThrow: RangeError; count: number }]
	>
>;

// A well-formed structure is assignable.
type _valid = Expect<Extends<[[string, boolean], bigint], TestCaseOfClassStaticMethod<typeof all>>>;
