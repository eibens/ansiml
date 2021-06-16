import { Command, Node, stringify } from "./mod.ts";
import { stringify as stringifyHtml } from "./html.ts";

const pretty: Command[] = [
  ["bold"],
  ["rgb24", 0x88CCFF],
];

const node: Node = {
  commands: [["italic"]],
  children: [
    "This text is ",
    {
      commands: pretty,
      children: "pretty blue!",
    },
  ],
};

console.log(
  stringify(node),
);

console.log(
  stringifyHtml(node),
);
