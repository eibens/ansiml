/** @jsx h */
/** @jsxFrag Fragment */
import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { toAnsi } from "./ansi.ts";
import { Fragment } from "./jsx.ts";
import { h } from "./jsx_legacy.ts";

/** MAIN **/

Deno.test("numeric child", () => {
  const node = <ansi>{42}</ansi>;
  assertEquals(toAnsi(node), "42");
});

Deno.test("string child", () => {
  const node = <ansi>hello</ansi>;
  assertEquals(toAnsi(node), "hello");
});

Deno.test("array child", () => {
  const node = <ansi>{["hello", "world"]}</ansi>;
  assertEquals(toAnsi(node), "helloworld");
});

Deno.test("boolean child is not rendered", () => {
  const node = <ansi>{true}</ansi>;
  assertEquals(toAnsi(node), "");
});

Deno.test("null child is not rendered", () => {
  const node = <ansi>{null}</ansi>;
  assertEquals(toAnsi(node), "");
});

Deno.test("undefined child is not rendered", () => {
  const node = <ansi>{undefined}</ansi>;
  assertEquals(toAnsi(node), "");
});

Deno.test("fragments", () => {
  const node = (
    <>
      <>hello</>
      <>world</>
    </>
  );
  assertEquals(toAnsi(node), "helloworld");
});

Deno.test("uses props.children over implicit children", () => {
  const node = <ansi children="Child">implicit</ansi>;
  assertEquals(toAnsi(node), "Child");
});

Deno.test("custom children prop type", () => {
  function MyComponent(props: {
    children: string;
  }) {
    const { children } = props;
    return <ansi>{children}</ansi>;
  }

  //const node = <MyComponent>hello</MyComponent>;
  //assertEquals(toAnsi(node), "hello");
});

Deno.test("intrinsic ansi element", () => {
  const node = <ansi commands={[["blue"]]}>hello</ansi>;
  assertEquals(toAnsi(node), "\x1b[34mhello\x1b[39m");
});
