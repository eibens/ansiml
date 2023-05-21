/*
This can only be run if http://localhost:8000 serves this repository's root.
Start a local web server with: deno run -A serve.ts
*/

/** @jsxImportSource http://localhost:8000 */

import { AnsiNode } from "../mod.ts";
import { toAnsi } from "../utils/ansi.ts";

const node: AnsiNode = (
  <>
    Hello <ansi commands={[["red"]]}>World</ansi>!
  </>
);

console.log(toAnsi(node));
