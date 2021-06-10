// The available commands are based on the exported API of this module:
import * as fmt from "https://deno.land/std@0.91.0/fmt/colors.ts";

/**
 * Represents the abstract syntax tree of AnsiML.
 *
 * The `commands` array defines the formatting commands that are applied to the `children`.
 */
export type Node = string | {
  commands: Command[];
  children: Node[];
};

/**
 * Represents an ANSI formatting instruction.
 *
 * Instead of directly calling formatting functions, we define the `Command` data structure to represent such calls. For example, function calls `bold(str)` and `rgb24(str, 0x88CCFF)` can be represented by `["bold"]` and `["rgb24", 0x88CCFF]`. Note how the commands are independent from the particular string `str` that should be transformed.
 */
export type Command =
  | [SimpleCommandName]
  | ["rgb8" | "bgRgb8", number]
  | ["rgb24" | "bgRgb24", number | Rgb];

/**
 * Represents a 24-bit RGB color as an object.
 *
 * The ANSI color module does not export its own RGB interface, so we redefine it here.
 */
export type Rgb = {
  r: number;
  g: number;
  b: number;
};

// These are miscellaneous exports from the [ANSI color module] that we will ignore.
type MiscName =
  | "code"
  | "run"
  | "getColorEnabled"
  | "setColorEnabled";

// These are commands that have additional arguments, i.e. a color code or RGB structure.
type ComplexCommandName =
  | "rgb24"
  | "rgb8"
  | "bgRgb24"
  | "bgRgb8";

// Every export from the [ANSI color module] that is not a `MiscName` or `ComplexCommandName` is the name of a simple command.
type SimpleCommandName = keyof Omit<
  typeof fmt,
  MiscName | ComplexCommandName
>;

/**
 * Transforms an AnsiML node into a string formatted with ANSI escape codes.
 *
 * @param node is the node that should be transformed.
 * @returns the ANSI formatted string.
 */
export function stringify(node: Node): string {
  if (typeof node === "string") return node;
  const { commands, children } = node;
  const body = children.map(stringify).join("");
  return applyAll(...commands)(body);
}

/**
 * Creates a function that applies the specified command to a given string and returns the result.
 *
 * @param command is the command that should be applied.
 * @returns a function that applies the command.
 */
function apply(command: Command): (x: string) => string {
  type Formatter = (x: string, ...args: [] | [number | Rgb]) => string;
  const [name, ...args] = command;
  const f = fmt[name] as Formatter;
  return (x) => f(x, ...args);
}

/**
 * Get a function that applies the specified commands to a string.
 *
 * The commands are applied in order. For Example, `applyAll(["bold"], ["italic"])(str)` is equivalent to calling `italic(bold(str))`.
 *
 * @param commands are the commands that should be applied.
 * @returns a function that applies the commands.
 */
function applyAll(...commands: Command[]): (x: string) => string {
  return (str) => {
    // Base case: identity mapping.
    if (commands.length === 0) return str;
    // Apply the first command.
    const [command, ...rest] = commands;
    const y = apply(command)(str);
    // Recursively apply the remaining commands.
    return applyAll(...rest)(y);
  };
}
