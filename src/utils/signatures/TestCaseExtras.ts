import { ExpectedThrowKey } from "../utils";

/**
 * Type for extra data that can be passed to a test case.
 * @internal
 * @remarks That type is an object which contains an optional pre-defined key, which is used to check if the test case is expected to throw an error.
 * @see {@link ExpectedThrowKey | `ExpectedThrowKey`} for the expecting to throw error key.
 */
export type TestCaseExtras = Record<string, any> & {
	[key in ExpectedThrowKey]?: abstract new (...args: any[]) => Error;
};
