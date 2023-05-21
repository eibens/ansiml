import type * as ANSI from "./ansi_transformers.ts";
import type { Command, Node } from "./stringify.ts";

/** MAIN **/

export type AnsiTransformers = typeof ANSI;

export type AnsiNode = Node<AnsiTransformers>;

export type AnsiCommand = Command<AnsiTransformers, string, string>;
