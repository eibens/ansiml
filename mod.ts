import { Lookup, Pipe } from "https://deno.land/x/lgram@v0.0.0/mod.ts";
import { Ansi } from "./ansi.ts";

/**
 * Represents an AnsiML formatting instruction.
 */
export type Command = Lookup.Command<string, string, Ansi>;

/**
 * Represents the abstract syntax tree of AnsiML.
 *
 * The `commands` array defines the formatting instructions that are applied to the `children`.
 */
export type Node = string | Node[] | {
  commands: Command[];
  children: Node;
};

/**
 * Transforms an AnsiML node into a string formatted with ANSI escape codes.
 *
 * @param node is the node that should be transformed.
 * @returns the ANSI formatted string.
 */
export function stringify(node: Node): string {
  // Base case for recursion.
  if (typeof node === "string") return node;

  // Convert Node[] to a node object.
  if (Array.isArray(node)) {
    node = {
      children: node,
      commands: [],
    };
  }
  const { commands, children } = node;

  // Recurse on children and concatenate.
  const nodes = Array.isArray(children) ? children : [children];
  const content = nodes.map(stringify).join("");

  // Apply the commands to the node content.
  return Pipe.apply(content, commands, (input, command) => {
    return Lookup.apply(input, command, Ansi);
  });
}
