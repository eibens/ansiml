import type * as ANSI from "./ansi.ts";

/** MAIN **/

export const TEXT = new Proxy<typeof ANSI>({} as typeof ANSI, {
  get: () => {
    return (str: string) => str;
  },
});
