import { Lookup, Pipe } from "https://deno.land/x/lgram@v0.0.0/mod.ts";
import { AnsiML } from "./ansiml.ts";

/**
 * Represents an AnsiML formatting instruction.
 */
export type Command = Lookup.Command<string, string, AnsiML>;

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
 * Transforms an AnsiML node into a formatted string.
 *
 * One can specify an AnsiML implementation with the `lang` parameter.
 *
 * @param node is the node that should be transformed.
 * @param lang is the language implementation that should be used.
 * @returns the ANSI formatted string.
 */
export function stringify(node: Node, lang: AnsiML): string {
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
  const content = nodes.map((child) => stringify(child, lang)).join("");

  // Apply the commands to the node content.
  return Pipe.apply(content, commands, (input, command) => {
    return Lookup.apply(input, command, lang);
  });
}
