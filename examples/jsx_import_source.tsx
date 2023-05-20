/** @jsxImportSource https://deno.land/x/ansiml@v0.0.4 */

import { ANSI, Ansi, HTML, Node, stringify, TEXT } from "../mod.ts";

const node: Node<typeof ANSI> = (
  <>
    <Ansi commands={[["red"]]}>test</Ansi>test
  </>
);

console.log("TEXT:", stringify(node, TEXT));
console.log("ANSI:", stringify(node, ANSI));
console.log("HTML:", stringify(node, HTML));
