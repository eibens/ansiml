import type { AnsiChildren, AnsiNode } from "./ansi_node.ts";

/** MAIN **/

export function jsx<P>(
  type: (props: P) => AnsiNode,
  props: P & {
    children?: AnsiChildren;
  },
) {
  return type(props);
}

export const jsxs = jsx;

export function Fragment(props: {
  children?: AnsiChildren;
}) {
  return props.children;
}
