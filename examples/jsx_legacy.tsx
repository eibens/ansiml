/** @jsx h */
/** @jsxFrag Fragment */

import { Ansi, AnsiNode, Fragment, h } from "../mod.ts";
import { toAnsi } from "../utils/ansi.ts";

const node: AnsiNode = (
  <>
    Hello <Ansi commands={[["red"]]}>World</Ansi>!
    <Ansi children="Child" />
  </>
);

console.log(toAnsi(node));
