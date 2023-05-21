import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { toAnsi } from "./ansi.ts";

/** MAIN **/

Deno.test("stringify applies commands", () => {
  const actual = toAnsi({
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
