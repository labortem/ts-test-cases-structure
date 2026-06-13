/**
 * Type-level assertion helpers for the test suite.
 * @internal
 * @remarks
 * These types carry no runtime behaviour. A test file "passes" if (and only if) it type-checks: every
 * {@link Expect | `Expect`} call constrains its argument to `true`, so a wrong {@link Equal | `Equal`} result
 * (i.e. `false`) becomes a compilation error. Run the suite with `tsc --noEmit` (see `tasks/test.sh`).
 */

/**
 * Resolves to `true` only when `A` and `B` are the exact same type, `false` otherwise.
 * @remarks
 * Uses the conditional-identity trick: two types are equal iff they are mutually identical inside an invariant
 * position. This is stricter than mutual assignability — `Equal<{ a: 1 }, { a: 1; b: 2 }>` is `false`. Union member
 * order is irrelevant, since `X | Y` and `Y | X` are the same type.
 */
export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/**
 * Compile-time guard that only accepts `true`. Anything else (notably `false`) is a type error.
 * @example
 * ```ts
 * type _ = Expect<Equal<TestedType, ExpectedType>>;
 * ```
 */
export type Expect<T extends true> = T;

/** Negation of {@link Equal | `Equal`}: `true` when `A` and `B` differ. */
export type NotEqual<A, B> = Equal<A, B> extends true ? false : true;

/**
 * Resolves to `true` when `A` is assignable to `B`, `false` otherwise.
 * @remarks
 * Wrapping both sides in a 1-tuple disables distribution over unions, so `A` is tested as a whole. Pair it with
 * {@link Expect | `Expect`} for negative cases (`Expect<Equal<Extends<Wrong, Structure>, false>>`); this is robust to
 * code formatting, unlike a `@ts-expect-error` directive on a multi-line value.
 */
export type Extends<A, B> = [A] extends [B] ? true : false;
