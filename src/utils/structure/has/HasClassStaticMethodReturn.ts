import { Method } from "@src/utils/signatures";

/**
 * Check if the given class static method does return a value.
 * @internal
 * @typeParam SM - Static method to check.
 * @remarks The returned type is `true` if the static method does return a value, `false` otherwise.
 */
export type HasClassStaticMethodReturn<SM extends Method> = ReturnType<SM> extends void ? false : true;
