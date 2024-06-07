import { HasClassStaticMethodParameters, HasClassStaticMethodReturn } from "utils/structure/has";
import { Method } from "utils/signatures";

/**
 * Check if the given class static method matches the expected structure.
 * @internal
 * @typeParam SM - Static method to check.
 * @typeParam SMP - Wether or not the class static method is supposed to have parameters.
 * @typeParam SMR - Wether or not the class static method is supposed to return a value.
 * @remarks The returned type is `true` if the static class method matches the expected structure, `false` otherwise.
 */
export type IsClassStaticMethodLike<SM extends Method, SMP extends boolean, SMR extends boolean> =
	HasClassStaticMethodParameters<SM> extends SMP ?
		HasClassStaticMethodReturn<SM> extends SMR ?
			true
		:	false
	:	false;
