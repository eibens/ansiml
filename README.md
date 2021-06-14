# [AnsiML] - Markup Language for [ANSI Colors]

> [AnsiML] (ANSI Markup Language) uses a tree representation for inserting
> [ANSI colors] into strings. This allows for a strict separation between text
> and colors and thus semantic operations on formatted text. [AnsiML] comes with
> a functional, statically typed implementation in TypeScript for [Deno].

[![deno.land mod](https://img.shields.io/badge/deno.land-ansiml-lightgrey.svg?logo=deno)](https://deno.land/x/ansiml)
[![deno.land doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/ansiml/mod.ts)
![tag](https://img.shields.io/github/v/tag/eibens/ansiml)
![MIT license](https://img.shields.io/github/license/eibens/ansiml)
![CI](https://github.com/eibens/ansiml/workflows/ci/badge.svg)
[![Code coverage](https://img.shields.io/codecov/c/github/eibens/ansiml)](https://codecov.io/gh/eibens/ansiml)

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
terminal `string` values (leaf nodes) and non-terminal `Node` objects (internal
nodes).

## [mod.ts]

The `Command` type represents an ANSI color command as an array. The first
element of this array is the name of a function in the [ANSI colors module]. The
remaining elements are function arguments, for example an RGB color code:

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

The `Node` type associates a `Command` array with raw text. It is either a plain
`string`, or a tree node with `children` and `commands`. The following example
defines bold, blue text:

```ts
import { Node } from "https://deno.land/x/ansiml/mod.ts";

// Strings are leaf nodes in AnsiML.
const text: Node = "some text";

// This is an internal node in AnsiML.
// The commands apply to all children.
const internal: Node = {
  commands: [["bold"], ["rgb24", 0x88CCFF]],
  children: [text],
};
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

## [ansi.ts]

The `Ansi` type and object both define and implement the available ANSI color
commands. It defines a subset of the properties exported by the
[ANSI colors module]:

```ts
import { Ansi } from "https://deno.land/x/ansiml/ansi.ts";

// Print bold text.
console.log(Ansi.bold("some text"));

// Print blue text.
console.log(Ansi.rgb24("some text", 0x88CCFF));
```

## [demo.ts]

The [demo.ts] module defines a simple AnsiML example that can be run with
[deno]:

```sh
deno run https://deno.land/x/ansiml/demo.ts
```

# Related Work

[lgram] is used as the core of [AnsiML].

# That's it!

- Author: [Lukas Eibensteiner]
- Repository: [eibens/ansiml on GitHub]

<!-- links -->

[AnsiML]: #
[lgram]: https://github.com/eibens/lgram
[mod.ts]: mod.ts
[demo.ts]: demo.ts
[ansi.ts]: ansi.ts
[ANSI colors]: https://en.wikipedia.org/wiki/ANSI_escape_code
[Deno]: https://deno.land/
[ANSI colors module]: https://deno.land/std/fmt/colors.ts
[eibens/ansiml on GitHub]: https://github.com/eibens/ansiml
[Lukas Eibensteiner]: mailto:l.eibesnteiner@gmail.com
