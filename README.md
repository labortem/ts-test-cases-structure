# TypeScript test cases structure

## A Labortem NPM package

### What is it?

This package is used to describe unit test cases structure.

Supported test cases structures:

-   Object-Oriented Programming:
    -   Class constructor
    -   Class method
    -   Class getter / setter
    -   Static class method
    -   Static class getter / setter

### How to use it

#### Basic usage

A test case structure is an array of types divided in multiple parts. In the case of a class test method, the first part
is the constructor arguments, the second part is the parameters of the method, and the last part is the return type, as
follows:

```ts
class ExampleClass {
	constructor(a: number) {
		// ...
	}

	method(a: string, b: boolean): boolean {
		// ...
	}
}

const TESTED_CLASS = ExampleClass;
const TESTED_METHOD = instanceOf(TESTED_CLASS).method;

type TestCaseStructure = TestCaseOfClassMethod<typeof TESTED_CLASS, typeof TESTED_METHOD>;
/*
	[[number], [string, boolean], boolean]
 */
```

#### Getter & setter

As TypeScript allows to set setter and getter with different types, there is no way to determine if the type of the
property is describing a getter, or a setter, or both. It is required to provide types directly trough the test cases
structure. There are 3 types for each combinasion of getter and setter (getter only, setter only, getter and setter).

```ts
class GetterAndSetterClass {
	get value(): number {
		// ...
	}

	set value(value: string) {
		// ...
	}
}

const TESTED_CLASS = GetterAndSetterClass;

type TEST_OF_GETTER = TestCaseOfClassGetter<typeof TESTED_CLASS, number>;
/*
	[number]
 */

type TEST_OF_SETTER = TestCaseOfClassSetter<typeof TESTED_CLASS, string>;
/*
	[string]
 */

type TEST_OF_GETTER_AND_SETTER = TestCaseOfClassSetterGetter<typeof TESTED_CLASS, number, string>;
/*
	[number, string]
 */
```

#### Test cases with generics

This typing system does support generics for both the class and its properties, you need to proceed as follows:

```ts
class GenericExampleClass<A> {
	genericMethod<B>(a: A): B {
		// ...
	}
}

const TESTED_CLASS = GenericExampleClass<string>;
const TESTED_METHOD = instanceOf(TESTED_CLASS).genericMethod<boolean>;

type TestCaseStructure = TestCaseOfClassMethod<typeof TESTED_CLASS, typeof TESTED_METHOD>;
/*
    [[string], boolean]
 */
```

#### Extra object

The extra object is available in any test cases structure. It is always an optional type parameter located at the end of
the generic type. It allows the tester to insert additional elements into the test case (eg. "_how many times does the
callback function have been called?_").

```ts
class ExampleClass {
	method(a: number): boolean {
		// ...
	}
}

const TESTED_CLASS = ExampleClass;
const TESTED_METHOD = instanceOf(TESTED_CLASS).method;

type TestCaseStructure = TestCaseOfClassMethod<typeof TESTED_CLASS, typeof TESTED_METHOD, { anExtraElement: string }>;
/*
    [[number], boolean, {
        anExtraElement: string;
    }]
 */
```

##### Manage errors

A key is reserved in the extra object, which is `expectedThrow`. When providing a value to this key (which must be typed
as an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)), the test case
structure does have two structures:

-   In case the tested code does its work correctly, we **do not** expect errors,
-   In case the tested code does throw an error, an error is expected to throw instead of getting a return (if the
    tested code is normally supposed to return something).

```ts
// BASE CODE

class ExampleClass {
	method(a: number): boolean {
		if (a < 0) {
			throw new RangeError("I do not want negative numbers!");
		}
		return true;
	}
}

// TEST CASE STRUCTURE
const TESTED_CLASS = ExampleClass;
const TESTED_METHOD = instanceOf(TESTED_CLASS).method;

type TestCaseStructure = TestCaseOfClassMethod<
	typeof TESTED_CLASS,
	typeof TESTED_METHOD,
	{ expectedThrow: RangeError; anotherExtraElement: string }
>;

/*
    // In case the method is correctly executed, there is no throw, but a return is expected.
    [[number], boolean, {
        anotherExtraElement: string;
    }]

    |

    // In case the method throws an error, there is no return, but an error is expected.
    [[number], {
        expectedThrow: RangeError;
        anotherExtraElement: string;
    }]
 */
```

> :bookmark_tabs: In case there is no error, the `expectedThrow` key is omitted from the test case structure.

---

Feel free to use this package if you find it and think it may help you during your tests development!

Made with :heart: by

-   [Ratibus11](https://github.com/ratibus11), main maintainer
