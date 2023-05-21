/** MAIN **/

/**
 * Type that removes the first element of a tuple type [T].
 */
export type Shift<T extends [unknown, ...unknown[]]> = T extends
  [unknown, ...infer R] ? R
  : never;

/**
 * Represents a parametric mapping from [X] to [Y].
 */
// deno-lint-ignore no-explicit-any
export type Transformer<X, Y, P extends any[]> = (x: X, ...args: P) => Y;

/**
 * A dictionary of named transformers.
 *
 * This type is intended to be used as a type bound for a concrete set of transformers,
 * hence the use of  as the type of the parameters.
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

/**
 * Represents an internal node in a tree of formatted text.
 */
export type Props<T extends Transformers<string, string>> = {
  /**
   * The children of this node.
   */
  children?: Children<T>;

  /**
   * Formatting instructions that are applied to the [children].
   *
   * A formatting instruction is a tuple of the form `[name, ...args]`.
   *
   * - `name` is the name of the formatter.
   * - `args` are the parameters to the transformer.
   */
  commands?: Command<T, string, string>[];
};

export type Node<T extends Transformers<string, string>> =
  | undefined
  | string
  | Props<T>;

export type Children<T extends Transformers<string, string>> =
  | Node<T>
  | Node<T>[];

/**
 * Transforms a node into a formatted string.
 *
 * @param node is the node that should be stringified.
 * @param transformers is the formatter dictionary that should be used.
 * @returns the formatted string.
 */
export function stringify<T extends Transformers<string, string>>(
  input: Children<T>,
  transformers: T,
): string {
  // Return leaf nodes.
  if (input == null) return "";
  if (typeof input === "boolean") return "";
  if (typeof input !== "object") return String(input);

  // Wrap node arrays in a parent node.
  if (Array.isArray(input)) {
    input = {
      children: input,
      commands: [],
    };
  }

  const { commands, children } = input;
  // Recurse on children and concatenate.
  const childArray = Array.isArray(children) ? children : [children];
  const content = childArray
    .map((child) => stringify(child, transformers)).join("");

  // Nothing to do if there are no commands.
  if (!commands) return content;

  // Apply commands to content.
  // In which direction should the commands be applied?
  // - Without reversing, `(f, g, h)` becomes `h(g(f(x)))`.
  // - With reversing, `(f, g, h)` becomes `f(g(h(x)))`.
  // The latter seems more intuitive.
  return [...commands]
    .reverse()
    .reduce((content, command) => {
      const [name, ...args] = command;
      return transformers[name](content, ...args);
    }, content);
}
