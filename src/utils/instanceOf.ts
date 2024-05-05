import { Class } from "@tests/types/signatures";

/**
 * Get the instance type of a class.
 * @internal
 * @param c - Class to get the instance type of.
 * @typeParam C - Class to get the instance type of.
 * @returns Nothing.
 * @remarks That function MUST NOT be used at runtime, as it is only used for type-checking purposes in the test suites.
 */
export function instanceOf<C extends Class>(c: C): InstanceType<C> {
	return {} as any;
}
