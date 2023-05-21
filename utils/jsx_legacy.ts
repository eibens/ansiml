import type { AnsiNode } from "./ansi_node.ts";

/** MAIN **/

export function h<P>(
  type: (props: P) => AnsiNode,
  props: P & { children?: AnsiNode },
  ...children: AnsiNode[]
) {
  return type({
    ...props,
    children: props?.children ?? children,
  });
}
