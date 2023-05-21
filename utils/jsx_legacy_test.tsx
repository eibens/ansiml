/** @jsx h */
/** @jsxFrag Fragment */
import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { Ansi, Fragment, h } from "../mod.ts";
import { toAnsi } from "./ansi.ts";
import { AnsiNode } from "./ansi_node.ts";

/** MAIN **/

Deno.test("h uses props.children over implicit children", () => {
  const node = <Ansi children="Child">implicit</Ansi>;
  assertEquals(toAnsi(node), "Child");
});

Deno.test("Fragment works", () => {
  const node = <>Text</>;
  assertEquals(toAnsi(node), "Text");
});

Deno.test("custom component works", () => {
  function Link(props: {
    children?: AnsiNode;
  }) {
    const { children } = props;
    return <Ansi commands={[["blue"]]}>{children}</Ansi>;
  }

  const node = <Link>Link</Link>;
  assertEquals(toAnsi(node), "\x1b[34mLink\x1b[39m");
});
