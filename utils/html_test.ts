import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { toHtml } from "./html.ts";

/** MAIN **/

Deno.test("toHtml handles color", () => {
  const actual = toHtml({
    commands: [["cyan"]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(64, 191, 191)">foo</span>`);
});

Deno.test("toHtml handles background", () => {
  const actual = toHtml({
    commands: [["bgCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="background: rgb(64, 191, 191)">foo</span>`,
  );
});

Deno.test("toHtml handles bright", () => {
  const actual = toHtml({
    commands: [["brightCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="color: rgb(159, 223, 223)">foo</span>`,
  );
});

Deno.test("toHtml handles rgb24 color", () => {
  const actual = toHtml({
    commands: [["rgb24", 0x88CCFF]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: #88ccff">foo</span>`);
});

Deno.test("toHtml handles rgb24 with object", () => {
  const actual = toHtml({
    commands: [["rgb24", { r: 0.5, g: 0.75, b: 1 }]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(128, 191, 255)">foo</span>`);
});

Deno.test("toHtml handles todo as identity function", () => {
  const actual = toHtml({
    commands: [["rgb8", 0]],
    children: "foo",
  });
  assertEquals(actual, `foo`);
});
