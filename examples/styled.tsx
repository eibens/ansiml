/** @jsx h */
import { AnsiNode, h, Styled } from "../mod.ts";
import { toHtml } from "../utils/html.ts";

const node: AnsiNode = (
  <Styled background="yellow" color="black">
    This is <Styled italic>italic</Styled>, <Styled bold>bold</Styled>,{" "}
    <Styled strikethrough>strike-through</Styled>, and{" "}
    <Styled underline>underlined</Styled>.
  </Styled>
);

console.log(toHtml(node));
