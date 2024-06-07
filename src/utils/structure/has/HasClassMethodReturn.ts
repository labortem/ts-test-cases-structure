import { Method } from "utils/signatures";

/**
 * Check if the given class method does return a value.
 * @internal
 * @typeParam M - Method to check.
 * @remarks The returned type is `true` if the method does return a value, `false` otherwise.
 */
export type HasClassMethodReturn<M extends Method> = ReturnType<M> extends void ? false : true;
