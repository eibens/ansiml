import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { toText } from "./text.ts";

/** MAIN **/

Deno.test("stringify applies commands", () => {
  const actual = toText({
    commands: [["cyan"]],
    children: ["foo"],
  });
  const expected = "foo";
  assertEquals(actual, expected);
});
