import type { AnsiChildren, AnsiNode } from "./ansi_node.ts";
import { jsx } from "./jsx.ts";

/** MAIN **/

export function h<P>(
  type: (props: P) => AnsiNode,
  props: P & { children?: AnsiChildren },
  ...children: AnsiChildren[]
) {
  return jsx(type, {
    ...props,
    children: props?.children ?? children,
  });
}
