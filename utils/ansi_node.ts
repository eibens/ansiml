import type * as ANSI from "./ansi_transformers.ts";
import type { Command, Node } from "./stringify.ts";

export type AnsiTransformers = typeof ANSI;

export type AnsiNode = Node<typeof ANSI>;

export type AnsiCommand = Command<typeof ANSI, string, string>;
