/*
This can only be run if http://localhost:8000 serves this repository's root.
Start a local web server with: deno run -A serve.ts
*/

/** @jsxImportSource http://localhost:8000 */

import { Ansi, AnsiNode } from "../mod.ts";
import { toAnsi } from "../utils/ansi.ts";

const node: AnsiNode = (
  <>
    Hello <Ansi commands={[["red"]]}>World</Ansi>!
  </>
);

console.log(toAnsi(node));
