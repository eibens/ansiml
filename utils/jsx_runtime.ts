import type * as ANSI from "./ansi.ts";
import { Node } from "./stringify.ts";

/** MAIN **/

export function jsx<P>(
  type: (props: P) => Node<typeof ANSI>,
  props: P,
) {
  return type(props);
}

export const jsxs = jsx;

export function Fragment(
  props: { children: Node<typeof ANSI> },
) {
  return props.children;
}
