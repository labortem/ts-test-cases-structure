import { Getter } from "signatures";

/**
 * Check if the given class getter does return a value.
 * @internal
 * @typeParam G - Getter to check.
 * @remarks The returned type is `true` if the getter does return a value, `false` otherwise.
 */
export type HasClassGetterReturn<G extends Getter> = G extends void ? false : true;
