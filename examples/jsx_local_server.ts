/*
Use the `-r` if you want the latest version of the local JSX runtime.
Otherwise, the version in the cache will be used.

```bash
deno run -A -r examples/jsx_local_server.ts
*/

import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sendJsxRuntime } from "../mod.ts";

/** MAIN **/

if (import.meta.main) {
  const jsxRuntime = sendJsxRuntime({
    root: new URL("../", import.meta.url),
  });

  new Application()
    .use(jsxRuntime)
    .listen({ port: 8000 });

  // Now that the server is running, we can import the example.
  const example = new URL("./jsx_local.tsx", import.meta.url);
  await import(example.pathname);

  // Terminate process to stop server.
  Deno.exit(0);
}
