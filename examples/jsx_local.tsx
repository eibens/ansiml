/*
This can only be run if http://localhost:8000/jsx-runtime serves the JSX runtime.
See examples/jsx_local_server.ts for more information.
*/

/** @jsxImportSource http://localhost:8000 */

import { ANSI, Ansi, HTML, Node, stringify, TEXT } from "../mod.ts";

const node: Node<typeof ANSI> = (
  <>
    <Ansi commands={[["red"]]}>test</Ansi>test
  </>
);

console.log("TEXT:", stringify(node, TEXT));
console.log("ANSI:", stringify(node, ANSI));
console.log("HTML:", stringify(node, HTML));
