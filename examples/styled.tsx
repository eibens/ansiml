/** @jsxImportSource http://localhost:8000 */

import { ANSI, Node, Styled } from "../mod.ts";
import { toHtml } from "../utils/html.ts";

const node: Node<typeof ANSI> = (
  <Styled background="yellow" color="black">
    This is <Styled italic>italic</Styled>, <Styled bold>bold</Styled>,{" "}
    <Styled strikethrough>strike-through</Styled>, and{" "}
    <Styled underline>underlined</Styled>.
  </Styled>
);

console.log(toHtml(node));
