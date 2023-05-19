import * as Generic from "./generic.ts";

/** MAIN **/

export type Transformers = Generic.Transformers<
  string,
  string
>;

export type Command<T extends Transformers> = Generic.Command<
  T,
  string,
  string
>;

/**
 * Represents an internal node in a tree of formatted text.
 */
export type Node<T extends Transformers> =
  | undefined
  | string
  | Node<T>[]
  | {
    /**
     * The children of this node.
     */
    children?: Node<T>;

    /**
     * Formatting instructions that are applied to the [children].
     *
     * A formatting instruction is a tuple of the form `[name, ...args]`.
     *
     * - `name` is the name of the formatter.
     * - `args` are the parameters to the transformer.
     */
    commands?: Command<T>[];
  };

/**
 * Transforms a node into a formatted string.
 *
 * @param node is the node that should be stringified.
 * @param transformers is the formatter dictionary that should be used.
 * @returns the formatted string.
 */
export function stringify<T extends Transformers>(
  node: Node<T>,
  transformers: T,
): string {
  // Return leaf nodes.
  if (typeof node === "undefined") return "";
  if (typeof node === "string") return node;

  // Wrap node arrays in a parent node.
  if (Array.isArray(node)) {
    node = {
      children: node,
      commands: [],
    };
  }

  const { commands, children } = node;

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
