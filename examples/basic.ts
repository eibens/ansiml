// Prints a basic AnsiML example.
// Usage: deno run example.ts

import { AnsiNode, toAnsi, toHtml } from "../mod.ts";

const node: AnsiNode = {
  commands: [
    ["bgRgb24", { r: 128, g: 192, b: 255 }],
  ],
  children: [
    "Hello, ",
    {
      commands: [
        ["bold"],
        ["underline"],
      ],
      children: "World!",
    },
  ],
};

console.log(toAnsi(node));
console.log(toHtml(node));
