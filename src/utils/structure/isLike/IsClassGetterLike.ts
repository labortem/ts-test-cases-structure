import { HasClassConstructorParameters } from "utils/structure/has";
import { Class, Getter } from "utils/signatures";

/**
 * Check if the given class getter matches the expected structure.
 * @internal
 * @typeParam C - Class to check.
 * @typeParam CP - Wether or not the class constructor is supposed to have parameters.
 * @remarks The returned type is `true` if the class getter matches the expected structure, `false` otherwise.
 * @remarks A getter does always return a value.
 */
export type IsClassGetterLike<C extends Class, CP extends boolean> =
	HasClassConstructorParameters<C> extends CP ? true : false;
