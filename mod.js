const noColor = globalThis.Deno?.noColor ?? true;
let enabled = !noColor;
function setColorEnabled(value) {
  if (noColor) {
    return;
  }
  enabled = value;
}
function getColorEnabled() {
  return enabled;
}
function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run(str, code1) {
  return enabled
    ? `${code1.open}${str.replace(code1.regexp, code1.open)}${code1.close}`
    : str;
}
function reset(str) {
  return run(
    str,
    code([
      0,
    ], 0),
  );
}
function bold(str) {
  return run(
    str,
    code([
      1,
    ], 22),
  );
}
function dim(str) {
  return run(
    str,
    code([
      2,
    ], 22),
  );
}
function italic(str) {
  return run(
    str,
    code([
      3,
    ], 23),
  );
}
function underline(str) {
  return run(
    str,
    code([
      4,
    ], 24),
  );
}
function inverse(str) {
  return run(
    str,
    code([
      7,
    ], 27),
  );
}
function hidden(str) {
  return run(
    str,
    code([
      8,
    ], 28),
  );
}
function strikethrough(str) {
  return run(
    str,
    code([
      9,
    ], 29),
  );
}
function black(str) {
  return run(
    str,
    code([
      30,
    ], 39),
  );
}
function red(str) {
  return run(
    str,
    code([
      31,
    ], 39),
  );
}
function green(str) {
  return run(
    str,
    code([
      32,
    ], 39),
  );
}
function yellow(str) {
  return run(
    str,
    code([
      33,
    ], 39),
  );
}
function blue(str) {
  return run(
    str,
    code([
      34,
    ], 39),
  );
}
function magenta(str) {
  return run(
    str,
    code([
      35,
    ], 39),
  );
}
function cyan(str) {
  return run(
    str,
    code([
      36,
    ], 39),
  );
}
function white(str) {
  return run(
    str,
    code([
      37,
    ], 39),
  );
}
function gray(str) {
  return brightBlack(str);
}
function brightBlack(str) {
  return run(
    str,
    code([
      90,
    ], 39),
  );
}
function brightRed(str) {
  return run(
    str,
    code([
      91,
    ], 39),
  );
}
function brightGreen(str) {
  return run(
    str,
    code([
      92,
    ], 39),
  );
}
function brightYellow(str) {
  return run(
    str,
    code([
      93,
    ], 39),
  );
}
function brightBlue(str) {
  return run(
    str,
    code([
      94,
    ], 39),
  );
}
function brightMagenta(str) {
  return run(
    str,
    code([
      95,
    ], 39),
  );
}
function brightCyan(str) {
  return run(
    str,
    code([
      96,
    ], 39),
  );
}
function brightWhite(str) {
  return run(
    str,
    code([
      97,
    ], 39),
  );
}
function bgBlack(str) {
  return run(
    str,
    code([
      40,
    ], 49),
  );
}
function bgRed(str) {
  return run(
    str,
    code([
      41,
    ], 49),
  );
}
function bgGreen(str) {
  return run(
    str,
    code([
      42,
    ], 49),
  );
}
function bgYellow(str) {
  return run(
    str,
    code([
      43,
    ], 49),
  );
}
function bgBlue(str) {
  return run(
    str,
    code([
      44,
    ], 49),
  );
}
function bgMagenta(str) {
  return run(
    str,
    code([
      45,
    ], 49),
  );
}
function bgCyan(str) {
  return run(
    str,
    code([
      46,
    ], 49),
  );
}
function bgWhite(str) {
  return run(
    str,
    code([
      47,
    ], 49),
  );
}
function bgBrightBlack(str) {
  return run(
    str,
    code([
      100,
    ], 49),
  );
}
function bgBrightRed(str) {
  return run(
    str,
    code([
      101,
    ], 49),
  );
}
function bgBrightGreen(str) {
  return run(
    str,
    code([
      102,
    ], 49),
  );
}
function bgBrightYellow(str) {
  return run(
    str,
    code([
      103,
    ], 49),
  );
}
function bgBrightBlue(str) {
  return run(
    str,
    code([
      104,
    ], 49),
  );
}
function bgBrightMagenta(str) {
  return run(
    str,
    code([
      105,
    ], 49),
  );
}
function bgBrightCyan(str) {
  return run(
    str,
    code([
      106,
    ], 49),
  );
}
function bgBrightWhite(str) {
  return run(
    str,
    code([
      107,
    ], 49),
  );
}
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
  return run(
    str,
    code([
      38,
      5,
      clampAndTruncate(color),
    ], 39),
  );
}
function bgRgb8(str, color) {
  return run(
    str,
    code([
      48,
      5,
      clampAndTruncate(color),
    ], 49),
  );
}
function rgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code([
        38,
        2,
        color >> 16 & 255,
        color >> 8 & 255,
        color & 255,
      ], 39),
    );
  }
  return run(
    str,
    code([
      38,
      2,
      clampAndTruncate(color.r),
      clampAndTruncate(color.g),
      clampAndTruncate(color.b),
    ], 39),
  );
}
function bgRgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code([
        48,
        2,
        color >> 16 & 255,
        color >> 8 & 255,
        color & 255,
      ], 49),
    );
  }
  return run(
    str,
    code([
      48,
      2,
      clampAndTruncate(color.r),
      clampAndTruncate(color.g),
      clampAndTruncate(color.b),
    ], 49),
  );
}
const ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g",
);
function stripColor(string) {
  return string.replace(ANSI_PATTERN, "");
}
const mod = function () {
  return {
    setColorEnabled: setColorEnabled,
    getColorEnabled: getColorEnabled,
    reset: reset,
    bold: bold,
    dim: dim,
    italic: italic,
    underline: underline,
    inverse: inverse,
    hidden: hidden,
    strikethrough: strikethrough,
    black: black,
    red: red,
    green: green,
    yellow: yellow,
    blue: blue,
    magenta: magenta,
    cyan: cyan,
    white: white,
    gray: gray,
    brightBlack: brightBlack,
    brightRed: brightRed,
    brightGreen: brightGreen,
    brightYellow: brightYellow,
    brightBlue: brightBlue,
    brightMagenta: brightMagenta,
    brightCyan: brightCyan,
    brightWhite: brightWhite,
    bgBlack: bgBlack,
    bgRed: bgRed,
    bgGreen: bgGreen,
    bgYellow: bgYellow,
    bgBlue: bgBlue,
    bgMagenta: bgMagenta,
    bgCyan: bgCyan,
    bgWhite: bgWhite,
    bgBrightBlack: bgBrightBlack,
    bgBrightRed: bgBrightRed,
    bgBrightGreen: bgBrightGreen,
    bgBrightYellow: bgBrightYellow,
    bgBrightBlue: bgBrightBlue,
    bgBrightMagenta: bgBrightMagenta,
    bgBrightCyan: bgBrightCyan,
    bgBrightWhite: bgBrightWhite,
    rgb8: rgb8,
    bgRgb8: bgRgb8,
    rgb24: rgb24,
    bgRgb24: bgRgb24,
    stripColor: stripColor,
  };
}();
function stringify1(node) {
  if (typeof node === "string") return node;
  const { commands, children } = node;
  const body = children.map(stringify1).join("");
  return applyAll(...commands)(body);
}
function apply(command) {
  const [name, ...args] = command;
  const f = mod[name];
  return (x) => f(x, ...args);
}
function applyAll(...commands) {
  return (str) => {
    if (commands.length === 0) return str;
    const [command, ...rest] = commands;
    const y = apply(command)(str);
    return applyAll(...rest)(y);
  };
}
export { stringify1 as stringify };
