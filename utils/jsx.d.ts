import { AnsiProps } from "./ansi_node.ts";

/** MAIN **/

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ansi: AnsiProps;
    }
  }
}
