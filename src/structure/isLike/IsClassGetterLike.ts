import { HasClassConstructorParameters, HasClassGetterReturn } from "@tests/types/structure/has";
import { Class, Getter } from "@tests/types/signatures";

/**
 * Check if the given class getter matches the expected structure.
 * @internal
 * @typeParam C - Class to check.
 * @typeParam G - Getter to check.
 * @typeParam CP - Wether or not the class constructor is supposed to have parameters.
 * @typeParam RG - Wether or not the class getter is supposed to return a value.
 * @remarks The returned type is `true` if the class getter matches the expected structure, `false` otherwise.
 */
export type IsClassGetterLike<C extends Class, G extends Getter, CP extends boolean, GR extends boolean> =
	HasClassConstructorParameters<C> extends CP ?
		HasClassGetterReturn<G> extends GR ?
			true
		:	false
	:	false;
