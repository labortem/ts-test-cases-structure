import { Getter } from "signatures";

/**
 * Check if the given class static getter does return a value.
 * @internal
 * @typeParam G - Static getter to check.
 * @remarks The returned type is `true` if the static getter does return a value, `false` otherwise.
 */
export type HasClassStaticGetterReturn<G extends Getter> = G extends void ? false : true;
