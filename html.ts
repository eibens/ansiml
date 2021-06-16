export type { Command, Node } from "./stringify.ts";
import { AnsiML, Rgb } from "./ansiml.ts";
import { Node, stringify as _stringify } from "./stringify.ts";

/**
 * Transforms an AnsiML node into a string formatted with ANSI colors.
 *
 * @param node is the node that should be transformed.
 * @returns a string containing ANSI escape codes.
 */
export function stringify(node: Node): string {
  return _stringify(node, Html);
}

type Num3 = [number, number, number];

const rgb: Record<string, Num3> = {
  black: [0, 0, 0],
  blue: [0, 0, 1],
  cyan: [0, 1, 1],
  green: [0, 1, 0],
  yellow: [1, 1, 0],
  white: [1, 1, 1],
  magenta: [1, 0, 1],
  red: [1, 0, 0],
  gray: [0.5, 0.5, 0.5],
};

export type Html = AnsiML;

export const Html: Html = {
  // formatting
  bold: styleProp("font-weight", "bold"),
  underline: styleProp("text-decoration", "underline"),
  dim: styleProp("opacity", "0.5"),
  italic: styleProp("font-prop", "italic"),
  strikethrough: styleProp("text-decoration", "line-through"),
  hidden: styleProp("opacity", "0"),

  // color
  black: color("color", rgb.black),
  blue: color("color", rgb.blue),
  cyan: color("color", rgb.cyan),
  green: color("color", rgb.green),
  magenta: color("color", rgb.magenta),
  red: color("color", rgb.red),
  white: color("color", rgb.white),
  yellow: color("color", rgb.yellow),
  gray: color("color", rgb.gray),

  // color bright
  brightBlack: color("color", rgb.black, true),
  brightBlue: color("color", rgb.blue, true),
  brightCyan: color("color", rgb.cyan, true),
  brightGreen: color("color", rgb.green, true),
  brightMagenta: color("color", rgb.magenta, true),
  brightRed: color("color", rgb.red, true),
  brightWhite: color("color", rgb.white, true),
  brightYellow: color("color", rgb.yellow, true),

  // background
  bgBlack: color("background", rgb.black),
  bgBlue: color("background", rgb.blue),
  bgCyan: color("background", rgb.cyan),
  bgGreen: color("background", rgb.green),
  bgMagenta: color("background", rgb.magenta),
  bgRed: color("background", rgb.red),
  bgWhite: color("background", rgb.white),
  bgYellow: color("background", rgb.yellow),

  // background bright
  bgBrightBlack: color("background", rgb.black, true),
  bgBrightBlue: color("background", rgb.blue, true),
  bgBrightCyan: color("background", rgb.cyan, true),
  bgBrightGreen: color("background", rgb.green, true),
  bgBrightMagenta: color("background", rgb.magenta, true),
  bgBrightRed: color("background", rgb.red, true),
  bgBrightWhite: color("background", rgb.white, true),
  bgBrightYellow: color("background", rgb.yellow, true),

  // TODO
  inverse: todo("inverse"),
  reset: todo("reset"),
  rgb8: todo("rgb8"),
  bgRgb8: todo("bgRgb8"),
  rgb24: rgb24("color"),
  bgRgb24: rgb24("background"),
  stripColor: todo("stripColor"),
};

function color(prop: "color" | "background", rgb: Num3, bright = false) {
  const t = bright ? 0.5 : 0;
  const color = cssColor(brighten(rgb, t));
  return styleProp(prop, color);
}

function styleProp(prop: string, value: string) {
  return style(`${prop}: ${value}`);
}

function style(style: string) {
  return (str: string) => `<span style="${style}">${str}</span>`;
}

function rgb24(prop: "color" | "background") {
  return (str: string, rgb: Rgb) => {
    return styleProp(prop, cssColor(rgb))(str);
  };
}

function cssColor(rgb: Rgb | Num3): string {
  if (typeof rgb === "number") {
    return "#" + rgb.toString(16);
  }
  const num3: Num3 = Array.isArray(rgb) ? rgb as Num3 : [rgb.r, rgb.g, rgb.b];
  return `rgb(${cssBytes(num3).join(", ")})`;
}

function cssBytes(rgb: Num3): Num3 {
  return rgb.map((x) => Math.round(x * 255)) as Num3;
}

function brighten(rgb: Num3, t: number): Num3 {
  const linear = (l: number, u: number, t: number): number => {
    return l + t * (u - l);
  };
  return rgb
    .map((x) => linear(0.25, 0.75, x))
    .map((x) => linear(x, 1, t)) as Num3;
}

function todo(name: string) {
  return (str: string) => {
    console.error(
      `warning: '${name}' command not implemented for ansiml/html.ts`,
    );
    return str;
  };
}
