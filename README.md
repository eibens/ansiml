# [AnsiML] - Markup Language for ANSI Colors

AnsiML is a library for inserting [ANSI Colors] into strings, implemented in
TypeScript for [Deno]. Text and colors are strictly separated, thus enabling
semantic operations on ANSI colored text and rendering to different output
formats.

[![License][license-shield]](LICENSE) [![Deno doc][deno-doc-shield]][deno-doc]
[![Deno module][deno-land-shield]][deno-land]
[![Github tag][github-shield]][github] [![Build][build-shield]][build]
[![Code coverage][coverage-shield]][coverage]

[github]: https://github.com/eibens/ansiml
[github-shield]: https://img.shields.io/github/v/tag/eibens/ansiml?label&logo=github
[coverage-shield]: https://img.shields.io/codecov/c/github/eibens/ansiml?logo=codecov&label
[license-shield]: https://img.shields.io/github/license/eibens/ansiml?color=informational
[coverage]: https://codecov.io/gh/eibens/ansiml
[build]: https://github.com/eibens/ansiml/actions/workflows/ci.yml
[build-shield]: https://img.shields.io/github/actions/workflow/status/eibens/ansiml/ci.yml?branch=main
[deno-doc]: https://doc.deno.land/https/deno.land/x/ansiml/mod.ts
[deno-doc-shield]: https://img.shields.io/badge/doc-informational?logo=deno
[deno-land]: https://deno.land/x/ansiml
[deno-land-shield]: https://img.shields.io/badge/x/ansiml-informational?logo=deno&label

# Introduction

[ANSI colors] are character codes for adding colors to console output. Yet, once
the color codes are mixed with the text, operations on the text become
difficult. Consider these scenarios:

- We want to print colored text with a maximum of 80 columns. If we do not
  handle the color codes while calculating the positions of the line breaks, the
  lines will end up shorter than they need to be.

- We want to print syntax-highlighted source code with colored line numbers to
  the console. Inserting the line numbers into the source might break the parser
  of the syntax highlighter. Inserting the line numbers after syntax
  highlighting might overwrite the colors of the highlighted code.

[AnsiML] solves this with an intermediate representation that keeps color codes
separate from the actual text. It represents colored text as a tree of terminal
`string` values (leaf nodes) and non-terminal `Node` objects or `Node[]` arrays
(internal nodes). A node object can have a sequence of color commands.

```ts
type Node = string | Node[] | {
  commands?: Command[];
  children?: Node;
};
```

The commands are based on the [ANSI colors module] found in the [Deno] standard
library. Each command is an array, where the first element is the name of a
formatter, and the remaining elements are the arguments of the formatter.

# Note on jsx-runtime

The modern way of configuring JSX is via the `jsxImportSource` compiler option,
specified either in the TypeScript `compilerOptions` file or as a pragma
comment. This can be an URL or bare specifier (defined in an import map).
TypeScript will then append `/jsx-runtime` to this specifier and try to import
it as a module. This module is expected a bunch of functions, mainly `jsx`,
`jsxs`, and `Fragment`.

Unfortunately, Deno will fail to interpret a module named `jsx-runtime` as a
TypeScript module because it does not end in `.ts` or `.tsx`. The workaround is
to host the module on a CDN that serves the module with the correct MIME type.
In order to run the examples in the repository, use `deno run -A server.ts` to
serve the module locally.

<!-- links -->

[AnsiML]: #
[mod.ts]: mod.ts
[ansi.ts]: ansi.ts
[ANSI colors]: https://en.wikipedia.org/wiki/ANSI_escape_code
[Deno]: https://deno.land/
[ANSI colors module]: https://deno.land/std/fmt/colors.ts
