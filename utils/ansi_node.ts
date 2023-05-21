import type * as ANSI from "./ansi_transformers.ts";
import type { Children, Command, Node, Props } from "./stringify.ts";

/** MAIN **/

export type AnsiTransformers = typeof ANSI;

export type AnsiProps = Props<AnsiTransformers>;

export type AnsiNode = Node<AnsiTransformers>;

export type AnsiChildren = Children<AnsiTransformers>;

export type AnsiCommand = Command<AnsiTransformers, string, string>;
