import { AnsiNode } from "./ansi_node.ts";
import * as ANSI from "./ansi_transformers.ts";
import { stringify } from "./stringify.ts";

/** MAIN **/

export { ANSI };

export function toAnsi(node: AnsiNode) {
  return stringify(node, ANSI);
}
