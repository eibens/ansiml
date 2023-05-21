import { AnsiTransformers } from "../mod.ts";
import type { AnsiNode } from "./ansi_node.ts";
import { stringify } from "./stringify.ts";

/** MAIN **/

export const TEXT: AnsiTransformers = new Proxy({} as AnsiTransformers, {
  get: () => {
    return (str: string) => str;
  },
});

export function toText(node: AnsiNode) {
  return stringify(node, TEXT);
}
