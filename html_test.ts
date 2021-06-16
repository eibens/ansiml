import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { stringify } from "./html.ts";

Deno.test("stringify handles color", () => {
  const actual = stringify({
    commands: [["cyan"]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(64, 191, 191)">foo</span>`);
});

Deno.test("stringify handles background", () => {
  const actual = stringify({
    commands: [["bgCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="background: rgb(64, 191, 191)">foo</span>`,
  );
});

Deno.test("stringify handles bright", () => {
  const actual = stringify({
    commands: [["brightCyan"]],
    children: "foo",
  });
  assertEquals(
    actual,
    `<span style="color: rgb(159, 223, 223)">foo</span>`,
  );
});

Deno.test("stringify handles rgb24 color", () => {
  const actual = stringify({
    commands: [["rgb24", 0x88CCFF]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: #88ccff">foo</span>`);
});

Deno.test("stringify handles rgb24 with object", () => {
  const actual = stringify({
    commands: [["rgb24", { r: 0.5, g: 0.75, b: 1 }]],
    children: "foo",
  });
  assertEquals(actual, `<span style="color: rgb(128, 191, 255)">foo</span>`);
});

Deno.test("stringify handles todo as identity function", () => {
  const actual = stringify({
    commands: [["rgb8", 0]],
    children: "foo",
  });
  assertEquals(actual, `foo`);
});
