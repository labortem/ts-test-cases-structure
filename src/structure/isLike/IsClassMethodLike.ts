import {
  HasClassConstructorParameters,
  HasClassMethodParameters,
  HasClassMethodReturn,
} from "structure/has";
import { Class, Method } from "signatures";

/**
 * Check if the given class method matches the expected structure.
 * @internal
 * @typeParam C - Class to check.
 * @typeParam M - Method to check.
 * @typeParam CP - Wether or not the class constructor is supposed to have parameters.
 * @typeParam MP - Wether or not the class method is supposed to have parameters.
 * @typeParam MR - Wether or not the class method is supposed to return a value.
 * @remarks The returned type is `true` if the class method matches the expected structure, `false` otherwise.
 */
export type IsClassMethodLike<
  C extends Class,
  M extends Method,
  CP extends boolean,
  MP extends boolean,
  MR extends boolean
> = HasClassConstructorParameters<C> extends CP
  ? HasClassMethodParameters<M> extends MP
    ? HasClassMethodReturn<M> extends MR
      ? true
      : false
    : false
  : false;
