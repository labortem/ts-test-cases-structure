import { HasStaticClassGetterReturn } from "utils/structure/has";
import { Getter } from "utils/signatures";

/**
 * Check if the given class static getter matches the expected structure.
 * @internal
 * @typeParam SG - Getter to check.
 * @typeParam SGR - Wether or not the class static getter is supposed to return a value.
 * @remarks The returned type is `true` if the class static getter matches the expected structure, `false` otherwise.
 */
export type IsStaticClassGetterLike<SG extends Getter, SGR extends boolean> =
	HasStaticClassGetterReturn<SG> extends SGR ? true : false;
