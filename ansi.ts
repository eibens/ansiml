import * as fmt from "https://deno.land/std@0.91.0/fmt/colors.ts";

// NOTE: These export of `std/fmt/colors.ts` do not follow the `(x: string, ...args: any[]) => string` scheme and thus cannot be part of the interface.
const ignore = {
  code: null,
  run: null,
  getColorEnabled: null,
  setColorEnabled: null,
};

/**
 * Defines the commands available in AnsiML.
 */
export type Ansi = Omit<typeof fmt, keyof typeof ignore>;

/**
 * An object that provides the implementation of AnsiML.
 *
 * The AnsiML implementation is equivalent to the https://deno.land/std/fmt/colors.ts module, minus the ignored exports.
 */
export const Ansi: Ansi = Object.keys(fmt)
  .filter((key) => !(key in ignore))
  .map((key) => key as keyof Ansi)
  .reduce((obj, key) => ({ ...obj, [key]: fmt[key] }), {} as Ansi);
