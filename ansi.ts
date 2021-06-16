export type { Command, Node } from "./stringify.ts";
import { AnsiML } from "./ansiml.ts";
import { Node, stringify as _stringify } from "./stringify.ts";
import * as fmt from "https://deno.land/std@0.91.0/fmt/colors.ts";

/**
 * Transforms an AnsiML node into a string formatted with ANSI colors.
 *
 * @param node is the node that should be transformed.
 * @returns a string containing ANSI escape codes.
 */
export function stringify(node: Node) {
  return _stringify(node, Ansi);
}

// NOTE: This verifies that the `fmt` object is compatible with AnsiML.
const _typeTest: AnsiML = fmt;

// NOTE: These export of `std/fmt/colors.ts` do not follow the `(x: string, ...args: any[]) => string` scheme and thus cannot be part of the interface.
const ignore = {
  code: null,
  run: null,
  getColorEnabled: null,
  setColorEnabled: null,
};

export type Ansi = AnsiML;

export const Ansi: Ansi = Object.keys(fmt)
  .filter((key) => !(key in ignore))
  .map((key) => key as keyof AnsiML)
  .reduce((obj, key) => ({ ...obj, [key]: fmt[key] }), {} as AnsiML);
