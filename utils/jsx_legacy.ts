import type { AnsiNode } from "./ansi_node.ts";
import { jsx } from "./jsx.ts";

/** MAIN **/

export function h<P>(
  type: (props: P) => AnsiNode,
  props: P & { children?: AnsiNode },
  ...children: AnsiNode[]
) {
  return jsx(type, {
    ...props,
    children: props?.children ?? children,
  });
}
