import { toFileUrl } from "https://deno.land/std@0.188.0/path/mod.ts";
import { join } from "https://deno.land/std@0.188.0/path/win32.ts";
import * as es from "https://deno.land/x/esbuild@v0.15.10/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";
import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";

/** MAIN **/

export function sendJsxRuntime(options: {
  root: string;
  tempFile?: string;
  importMapUrl?: URL;
}): Middleware {
  const {
    root,
    tempFile = "./jsx-runtime.temp.tsx",
    importMapUrl,
  } = options;

  return async (ctx, next) => {
    const path = ctx.request.url.pathname;
    const file = join(root, path);

    if (!file.endsWith("/jsx-runtime")) {
      return next();
    }

    const source = new URL(tempFile, import.meta.url);
    const output = toFileUrl(Deno.makeTempFileSync());
    const jsxRuntime = new URL("./jsx-runtime", import.meta.url);
    const code = await Deno.readTextFile(jsxRuntime);
    await Deno.writeTextFile(source, code, { createNew: true });

    await es.build({
      outfile: output.pathname,
      platform: "browser",
      format: "esm",
      bundle: true,
      minify: true,
      sourcemap: false,
      watch: false,
      supported: {
        "top-level-await": true,
      },
      entryPoints: [
        source.pathname,
      ],
      plugins: [
        denoPlugin({
          importMapURL: importMapUrl,
        }),
      ],
    });

    // remove source file
    await Deno.remove(source);

    const body = await Deno.readTextFile(output);

    ctx.response.body = body;
    ctx.response.type = "application/javascript";

    console.log("Served jsx-runtime");
  };
}
