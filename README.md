# [AnsiML] - Markup Language for [ANSI Colors]

> [AnsiML] (ANSI Markup Language) uses a tree representation for inserting
> [ANSI colors] into strings. This allows for a strict separation between text
> and colors and thus semantic operations on formatted text. [AnsiML] comes with
> a functional, statically typed implementation in TypeScript for [Deno].

[![License][license-shield]](LICENSE) [![Deno doc][deno-doc-shield]][deno-doc]
[![Deno module][deno-land-shield]][deno-land]
[![Github tag][github-shield]][github] [![Build][build-shield]][build]
[![Code coverage][coverage-shield]][coverage]

# Motivation

[ANSI colors] are special character sequences for adding colors to console
output. In [Deno] you can use the [ANSI colors module] to directly add these
codes to a piece of text. Yet, once text contains colors, changing it becomes
difficult. The complexity of implementing operations on formatted text increases
significantly when [ANSI colors] are included directly in the text. [AnsiML]
solves this with an intermediate representation that keeps colors separate from
the actual text.

# Scenarios

- You want to print ANSI formatted text with a maximum of 80 columns. If you do
  not parse the ANSI colors in the text while calculating the positions of the
  line breaks, the lines will end up shorter than they need to be.

- You want to print syntax-highlighted source code with line numbers to the
  console. If you insert the line numbers into the text, syntax-highlighting for
  multi-line comments or string might be broken by the colors for the line
  numbers. But if you add the line numbers before syntax-highlighting, the
  highlighter will not able to parse the code.

# Documentation

[AnsiML] exposes a TypeScript API for [Deno]. It represents AnsiML as a tree of
terminal `string` values (leaf nodes) and non-terminal `Node` objects or
`Node[]` arrays (internal nodes). A node object may have a sequence of commands,
which are based on the [ANSI colors module] found in the [Deno] standard
library.

## [ansi.ts]

The `Ansi` type and object both define and implement the available ANSI
commands. It essentially re-exports the [ANSI colors module], but omits some of
the exports that cannot be used as commands:

```ts
import { Ansi } from "https://deno.land/x/ansiml/ansi.ts";

// Print bold text.
console.log(Ansi.bold("some text"));

// Print blue text.
console.log(Ansi.rgb24("some text", 0x88CCFF));
```

## [mod.ts]

The `Command` type represents an ANSI color as an array. The first element of
this array is the name of a function on the `Ansi` object exported from
[ansi.ts]. The remaining elements are the function arguments, for example an RGB
color code:

```ts
import { Command } from "https://deno.land/x/ansiml/mod.ts";

// Simple command.
const bold: Command = ["bold"];

// Command with an argument.
const blue: Command = ["rgb24", 0x88CCFF];

// Commands are strongly typed.
// This is not a command since it has a typo.
const invalid = ["bodl"];
```

The `Node` defines an AnsiML tree structure. It is either a plain `string`, an
object that associates a `children` node with an array of commands, or simply an
array of nodes.

```ts
import { Node } from "https://deno.land/x/ansiml/mod.ts";

// Strings are leaf nodes.
const text: Node = "some text";

// This is an internal node.
// The commands apply to all children.
const internal: Node = {
  commands: [["bold"], ["rgb24", 0x88CCFF]],
  children: text,
};

// An array of nodes is also a node.
// The nodes will be concatenated.
const nodes: Node = [
  text,
  "\n",
  internal,
];
```

The `stringify` function converts a `Node` into a string with [ANSI colors]. It
is used to render [AnsiML]:

```ts
import { stringify } from "https://deno.land/x/ansiml/mod.ts";

// Render text with ANSI colors.
const ansi = stringify({
  commands: [["bold"], ["rgb24", 0x88CCFF]],
  children: ["some text"],
});

// Print bold, blue text.
console.log(ansi);
```

## [demo.ts]

The [demo.ts] module defines a simple AnsiML example that can be run with
[deno]:

```sh
deno run https://deno.land/x/ansiml/demo.ts
```

# Related Work

[AnsiML] uses [lgram] under the hood.

<!-- links -->

[AnsiML]: #
[lgram]: https://github.com/eibens/lgram
[mod.ts]: mod.ts
[demo.ts]: demo.ts
[ansi.ts]: ansi.ts
[ANSI colors]: https://en.wikipedia.org/wiki/ANSI_escape_code
[Deno]: https://deno.land/
[ANSI colors module]: https://deno.land/std/fmt/colors.ts

<!-- badges -->

[github]: https://github.com/eibens/ansiml
[github-shield]: https://img.shields.io/github/v/tag/eibens/ansiml?label&logo=github
[coverage-shield]: https://img.shields.io/codecov/c/github/eibens/ansiml?logo=codecov&label
[license-shield]: https://img.shields.io/github/license/eibens/ansiml?color=informational
[coverage]: https://codecov.io/gh/eibens/ansiml
[build]: https://github.com/eibens/ansiml/actions/workflows/ci.yml
[build-shield]: https://img.shields.io/github/workflow/status/eibens/ansiml/ci?logo=github&label
[deno-doc]: https://doc.deno.land/https/deno.land/x/ansiml/mod.ts
[deno-doc-shield]: https://img.shields.io/badge/doc-informational?logo=deno
[deno-land]: https://deno.land/x/ansiml
[deno-land-shield]: https://img.shields.io/badge/x/ansiml-informational?logo=deno&label
