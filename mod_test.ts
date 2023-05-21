import "./mod.ts";

/** MAIN **/

Deno.test("examples run", async () => {
  const dir = Deno.readDirSync("./examples");
  for (const file of dir) {
    if (file.isFile) {
      await import(`./examples/${file.name}`);
    }
  }
});
