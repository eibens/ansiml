import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sendJsxRuntime } from "./mod.ts";

/** MAIN **/

if (import.meta.main) {
  const app = new Application();

  app.use(sendJsxRuntime({
    root: "./",
  }));

  console.log("Serving: http://localhost:8000/");
  await app.listen({ port: 8000 });
}
