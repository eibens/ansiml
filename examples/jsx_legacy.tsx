/** @jsx h */
/** @jsxFrag Fragment */

import { AnsiNode, Fragment, h } from "../mod.ts";
import { toAnsi } from "../utils/ansi.ts";

const node: AnsiNode = (
  <>
    Hello <ansi commands={[["red"]]}>World</ansi>!
  </>
);

console.log(toAnsi(node));
