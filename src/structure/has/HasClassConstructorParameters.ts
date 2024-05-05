import { Class } from "@tests/types/signatures";

/**
 * Check if the given class does have constructor parameters.
 * @internal
 * @typeParam C - Class to check.
 * @remarks The returned type is `true` if the class does have constructor parameters, `false` otherwise.
 */
export type HasClassConstructorParameters<C extends Class> = ConstructorParameters<C> extends [] ? false : true;
