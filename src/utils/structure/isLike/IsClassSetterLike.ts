import { HasClassConstructorParameters } from "utils/structure/has";
import { Class } from "utils/signatures";

/**
 * Check if the given class setter matches the expected structure.
 * @internal
 * @typeParam C - Class to check.
 * @typeParam CP - Wether or not the class constructor is supposed to have parameters.
 * @remarks The returned type is `true` if the class setter matches the expected structure, `false` otherwise.
 */
export type IsClassSetterLike<C extends Class, CP extends boolean> =
	HasClassConstructorParameters<C> extends CP ? true : false;
