import { HasClassConstructorParameters } from "../has";
import { Class } from "../../signatures";

/**
 * Check if the given class constructor matches the expected structure.
 * @internal
 * @typeParam C - Class to check.
 * @typeParam CP - Wether or not the class constructor is supposed to have parameters.
 * @remarks The returned type is `true` if the class constructor matches the expected structure, `false` otherwise.
 */
export type IsClassConstructorLike<C extends Class, CP extends boolean> =
	HasClassConstructorParameters<C> extends CP ? true : false;
