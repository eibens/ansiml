import { Command, Node, stringify } from "./mod.ts";

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
