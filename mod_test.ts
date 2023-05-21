import "./mod.ts";

/** MAIN **/

Deno.test("run examples", async () => {
  const dir = Deno.readDirSync("./examples");
  for (const file of dir) {
    if (file.isFile) {
      try {
        await import(`./examples/${file.name}`);
      } catch (e) {
        const skip = e.message.includes(
          "error sending request for url (http://localhost:8000/jsx-runtime)",
        );
        if (skip) {
          console.warn(
            `Skipping example ${file.name} because server is not running.`,
          );
        } else {
          throw e;
        }
      }
    }
  }
});
