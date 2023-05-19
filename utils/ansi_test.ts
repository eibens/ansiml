import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import * as ANSI from "./ansi.ts";
import { Node, stringify } from "./stringify.ts";

/** HELPERS **/

const render = (x: Node<typeof ANSI>) => stringify(x, ANSI);

/** MAIN **/

Deno.test("stringify applies commands", () => {
  const actual = render({
    commands: [["cyan"]],
    children: ["foo"],
  });
  // \x1b: ESC character
  // [: start color code
  // 36: color cyan
  // 39: default foreground color (for reset)
  // m: set appearance of following chars
  const expected = "\x1b[36mfoo\x1b[39m";
  assertEquals(actual, expected);
});
