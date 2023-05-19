type HexColor = `#${string}`;
type RgbColor = `rgb(${number}, ${number}, ${number})`;
type AnsiColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";
type Color = HexColor | RgbColor | AnsiColor;

export type X = {
  background: Color;
  color: Color;
  textDecoration?: "underline" | "line-through" | "none";
  fontWeight: "bold" | "normal";
};
