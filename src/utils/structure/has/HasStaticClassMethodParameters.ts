import { Method } from "../../signatures";

/**
 * Check if the given class static method does have parameters.
 * @internal
 * @typeParam M - Method to check.
 * @remarks The returned type is `true` if the static method does have parameters, `false` otherwise.
 */
export type HasStaticClassMethodParameters<SM extends Method> = Parameters<SM> extends [] ? false : true;
