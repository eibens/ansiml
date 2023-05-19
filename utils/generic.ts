/** MAIN **/

/**
 * Type that removes the first element of a tuple type `T`.
 */
export type Shift<T extends [unknown, ...unknown[]]> = T extends
  [unknown, ...infer R] ? R
  : never;

/**
 * Represents a parametric mapping from X to Y.
 */
// deno-lint-ignore no-explicit-any
export type Transformer<X, Y, P extends any[]> = (x: X, ...args: P) => Y;

/**
 * A dictionary of named transformers.
 *
 * This type is intended to be used as a type bound for a concrete set of transformers,
 * hence the use of `any` as the type of the parameters.
 */
// NOTE: Changing `any` to `unknown` leads to type conflicts in test code.
// Changing it to `never` leads to type errors in `apply`.
// deno-lint-ignore no-explicit-any
export type Transformers<X, Y> = Record<PropertyKey, Transformer<X, Y, any[]>>;

/**
 * Represents a transformer application as a tuple.
 *
 * - The first element is the name of the transformer in the dictionary.
 * - The remaining elements are the parameters to the transformer
 *   without the input value `X`.
 */
export type Command<T extends Transformers<X, Y>, X, Y> = {
  [K in keyof T]: [K, ...Shift<Parameters<T[K]>>];
}[keyof T];
