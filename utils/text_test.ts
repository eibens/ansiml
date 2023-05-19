import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { Node, stringify } from "./stringify.ts";
import { TEXT } from "./text.ts";

/** HELPERS **/

const render = (x: Node<typeof TEXT>) => stringify(x, TEXT);

/** MAIN **/

Deno.test("stringify applies commands", () => {
  const actual = render({
    commands: [["cyan"]],
    children: ["foo"],
  });
  const expected = "foo";
  assertEquals(actual, expected);
});
