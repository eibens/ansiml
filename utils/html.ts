import { AnsiNode, AnsiTransformers } from "./ansi_node.ts";
import * as HTML from "./html_transformers.ts";
import { stringify } from "./stringify.ts";

/** MAIN **/

export { HTML };

export function toHtml(node: AnsiNode) {
  return stringify<AnsiTransformers>(node, HTML);
}
