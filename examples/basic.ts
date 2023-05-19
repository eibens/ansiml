// Prints a basic AnsiML example.
// Usage: deno run example.ts

import { ANSI, Node, stringify } from "../mod.ts";

const node: Node<typeof ANSI> = {
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

const output = stringify(node, ANSI);

console.log(output);
