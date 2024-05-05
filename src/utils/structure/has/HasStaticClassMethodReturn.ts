import { Method } from "../../signatures";

/**
 * Check if the given class static method does return a value.
 * @internal
 * @typeParam SM - Static ethod to check.
 * @remarks The returned type is `true` if the static method does return a value, `false` otherwise.
 */
export type HasStaticClassMethodReturn<SM extends Method> = ReturnType<SM> extends [] ? false : true;
