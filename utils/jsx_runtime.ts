import type { AnsiNode } from "./ansi_node.ts";

/** MAIN **/

export function jsx<P>(
  type: (props: P) => AnsiNode,
  props: P,
) {
  return type(props);
}

export const jsxs = jsx;

export function Fragment(props: {
  children: AnsiNode;
}) {
  return props.children;
}
