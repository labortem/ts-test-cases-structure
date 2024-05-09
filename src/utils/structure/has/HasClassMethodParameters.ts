import { Method } from "utils/signatures";

/**
 * Check if the given class method does have parameters.
 * @internal
 * @typeParam M - Method to check.
 * @remarks The returned type is `true` if the method does have parameters, `false` otherwise.
 */
export type HasClassMethodParameters<M extends Method> = Parameters<M> extends [] ? false : true;
