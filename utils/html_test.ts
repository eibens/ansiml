import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import * as ANSI from "./ansi.ts";
import * as HTML from "./html.ts";
import { Node, stringify } from "./stringify.ts";

/** HELPERS **/

// NOTE: Use ANSI type to check that HTML is at least feature equivalent.
const render = (x: Node<typeof ANSI>) => stringify(x, HTML);

/** MAIN **/

Deno.test("stringify handles color", () => {
  const actual = render({
    commands: [["cyan"]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(64, 191, 191)">foo</span>`);
});

Deno.test("stringify handles background", () => {
  const actual = render({
    commands: [["bgCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="background: rgb(64, 191, 191)">foo</span>`,
  );
});

Deno.test("stringify handles bright", () => {
  const actual = render({
    commands: [["brightCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="color: rgb(159, 223, 223)">foo</span>`,
  );
});

Deno.test("stringify handles rgb24 color", () => {
  const actual = render({
    commands: [["rgb24", 0x88CCFF]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: #88ccff">foo</span>`);
});

Deno.test("stringify handles rgb24 with object", () => {
  const actual = render({
    commands: [["rgb24", { r: 0.5, g: 0.75, b: 1 }]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(128, 191, 255)">foo</span>`);
});

Deno.test("stringify handles todo as identity function", () => {
  const actual = render({
    commands: [["rgb8", 0]],
    children: "foo",
  });
  assertEquals(actual, `foo`);
});
