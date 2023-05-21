/*
This can only be run if http://localhost:8000 serves this repository's root.
Start a local web server with: deno run -A serve.ts
*/

/** @jsxImportSource http://localhost:8000 */

import { AnsiNode, Styled } from "../mod.ts";
import { toHtml } from "../utils/html.ts";

const node: AnsiNode = (
  <Styled background="yellow" color="black">
    This is <Styled italic>italic</Styled>, <Styled bold>bold</Styled>,{" "}
    <Styled strikethrough>strike-through</Styled>, and{" "}
    <Styled underline>underlined</Styled>.
  </Styled>
);

console.log(toHtml(node));
