import { Equal, Expect } from "../../tests/assert";
import { instanceOf } from "./instanceOf";

/*
 * `instanceOf` is a type-level helper (never executed at runtime): it yields the instance type of a class so that a
 * consumer can reference its methods/accessors when building a test case structure.
 */

class Example {
	constructor(a: number) {}
	method(a: string): boolean {
		return true;
	}
	get value(): number {
		return 0;
	}
}

const instance = instanceOf(Example);

// The returned type is the class instance type.
type _instance = Expect<Equal<typeof instance, InstanceType<typeof Example>>>;

// Members are reachable with their real signatures.
type _method = Expect<Equal<typeof instance.method, (a: string) => boolean>>;
type _value = Expect<Equal<typeof instance.value, number>>;
