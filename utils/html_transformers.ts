/** HELPERS **/

type Num3 = [number, number, number];

type Rgb = number | {
  r: number;
  g: number;
  b: number;
};

const colors: Record<string, Num3> = {
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

function rgb(prop: "color" | "background") {
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

function todo<T extends unknown[]>(name: string) {
  return (str: string, ..._args: T) => {
    console.error(
      `warning: '${name}' command not implemented`,
    );
    return str;
  };
}

/** MAIN **/

export const bold = styleProp("font-weight", "bold");
export const underline = styleProp("text-decoration", "underline");
export const dim = styleProp("opacity", "0.5");
export const italic = styleProp("font-prop", "italic");
export const strikethrough = styleProp("text-decoration", "line-through");
export const hidden = styleProp("opacity", "0");

// color
export const black = color("color", colors.black);
export const blue = color("color", colors.blue);
export const cyan = color("color", colors.cyan);
export const green = color("color", colors.green);
export const magenta = color("color", colors.magenta);
export const red = color("color", colors.red);
export const white = color("color", colors.white);
export const yellow = color("color", colors.yellow);
export const gray = color("color", colors.gray);

// color bright
export const brightBlack = color("color", colors.black, true);
export const brightBlue = color("color", colors.blue, true);
export const brightCyan = color("color", colors.cyan, true);
export const brightGreen = color("color", colors.green, true);
export const brightMagenta = color("color", colors.magenta, true);
export const brightRed = color("color", colors.red, true);
export const brightWhite = color("color", colors.white, true);
export const brightYellow = color("color", colors.yellow, true);

// background
export const bgBlack = color("background", colors.black);
export const bgBlue = color("background", colors.blue);
export const bgCyan = color("background", colors.cyan);
export const bgGreen = color("background", colors.green);
export const bgMagenta = color("background", colors.magenta);
export const bgRed = color("background", colors.red);
export const bgWhite = color("background", colors.white);
export const bgYellow = color("background", colors.yellow);

// background bright
export const bgBrightBlack = color("background", colors.black, true);
export const bgBrightBlue = color("background", colors.blue, true);
export const bgBrightCyan = color("background", colors.cyan, true);
export const bgBrightGreen = color("background", colors.green, true);
export const bgBrightMagenta = color("background", colors.magenta, true);
export const bgBrightRed = color("background", colors.red, true);
export const bgBrightWhite = color("background", colors.white, true);
export const bgBrightYellow = color("background", colors.yellow, true);

// rgb
export const rgb24 = rgb("color");
export const bgRgb24 = rgb("background");

// misc
export const noop = (str: string) => str;

// TODO
export const inverse = todo("inverse");
export const reset = todo("reset");
export const rgb8 = todo<[number]>("rgb8");
export const bgRgb8 = todo<[number]>("bgRgb8");
export const stripColor = todo("stripColor");
