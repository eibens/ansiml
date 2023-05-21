import type { AnsiChildren, AnsiNode } from "./ansi_node.ts";
import "./jsx.d.ts";

/** HELPERS **/

function createNode<P>(
  type: (props: P) => AnsiNode,
  props: P & {
    children?: AnsiChildren;
  },
) {
  if (typeof type === "string") {
    if (type === "ansi") {
      return props;
    } else {
      throw new Error(`Invalid tag name: ${type}`);
    }
  }

  if (typeof type !== "function") {
    throw new Error(`Invalid tag type: ${type}`);
  }

  return type(props);
}

/** MAIN **/

export const jsx = createNode;
export const jsxs = createNode;
export const jsxDEV = createNode;

export function Fragment(props: {
  children?: AnsiChildren;
}) {
  return props.children;
}
