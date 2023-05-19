import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { Node, stringify } from "./stringify.ts";

/** HELPERS **/

const FORMAT = {
  curly: (str: string) => `{${str}}`,
  square: (str: string) => `[${str}]`,
  round: (str: string) => `(${str})`,
};

const render = (x: Node<typeof FORMAT>) => stringify(x, FORMAT);

/** MAIN **/

Deno.test("stringify applies commands", () => {
  const actual = render({
    commands: [["curly"], ["square"], ["round"]],
    children: "foo",
  });
  const expected = "{[(foo)]}";
  assertEquals(actual, expected);
});

Deno.test("stringify renders array of nodes", () => {
  const actual = render(["foo", "bar"]);
  assertEquals(actual, "foobar");
});

Deno.test("stringify renders single child node", () => {
  const actual = render({
    commands: [],
    children: "text",
  });
  assertEquals(actual, "text");
});

Deno.test("stringify can handle undefined", () => {
  const actual = render(undefined);
  assertEquals(actual, "");
});

Deno.test("stringify can handle undefined commands", () => {
  const actual = render({
    commands: undefined,
    children: "text",
  });
  assertEquals(actual, "text");
});
