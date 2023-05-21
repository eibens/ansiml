import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { send } from "https://deno.land/x/oak@v11.1.0/send.ts";

/** MAIN **/

if (import.meta.main) {
  new Application()
    .use(async (ctx) => {
      await send(ctx, ctx.request.url.pathname, {
        root: new URL("./", import.meta.url).pathname,
      });
      if (ctx.request.url.pathname === "/jsx-runtime") {
        ctx.response.headers.set("content-type", "text/javascript");
      }
    })
    .listen({ port: 8000 });

  console.log("Serving repository at: http://localhost:8000");
}
