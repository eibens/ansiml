import { AnsiChildren } from "../mod.ts";
import { AnsiCommand, AnsiNode } from "../utils/ansi_node.ts";

/** MAIN **/

export const CONSOLE_COLORS = {
  blue: "blue",
  cyan: "cyan",
  green: "green",
  magenta: "magenta",
  red: "red",
  yellow: "yellow",
  white: "white",
  black: "black",
  gray: "gray",
};

export type LiteralColor = keyof typeof CONSOLE_COLORS;

export type HexColor = `#${string}`;

export type RgbColor = `rgb(${string})`;

export type RgbObjectColor = {
  r: number;
  g: number;
  b: number;
};

export type Color =
  | LiteralColor
  | HexColor
  | RgbColor
  | RgbObjectColor;

export type StyledProps = {
  background?: Color;
  color?: Color;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  children?: AnsiChildren;
};

export function Styled(props: StyledProps): AnsiNode {
  const {
    background,
    color,
    bold,
    underline,
    strikethrough,
    italic,
    children,
  } = props;

  const commands = [
    underline && ["underline"],
    strikethrough && ["strikethrough"],
    bold && ["bold"],
    italic && ["italic"],
    color === "black" && ["black"],
    color === "blue" && ["blue"],
    color === "cyan" && ["cyan"],
    color === "green" && ["green"],
    color === "magenta" && ["magenta"],
    color === "red" && ["red"],
    color === "white" && ["white"],
    color === "yellow" && ["yellow"],
    color === "gray" && ["gray"],
    background === "black" && ["bgBlack"],
    background === "blue" && ["bgBlue"],
    background === "cyan" && ["bgCyan"],
    background === "green" && ["bgGreen"],
    background === "magenta" && ["bgMagenta"],
    background === "red" && ["bgRed"],
    background === "white" && ["bgWhite"],
    background === "yellow" && ["bgYellow"],
    background === "gray" && ["bgGray"],
  ]
    .filter((command) => command)
    .map((command) => command as AnsiCommand);

  return {
    children,
    commands,
  };
}
