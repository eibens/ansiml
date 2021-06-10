# AnsiML - Markup Language for ANSI Colors

> **AnsiML** (ANSI Markup Language) uses a tree representation for inserting
> [ANSI escape codes] into strings. This allows one to retain a separation
> between text and colors until the last possible moment. This project is
> implemented in TypeScript for [Deno].

[![deno.land mod](https://img.shields.io/badge/deno.land-ansiml-lightgrey.svg?logo=deno)](https://deno.land/x/ansiml)
[![deno.land doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/ansiml/mod.ts)
![tag](https://img.shields.io/github/v/tag/eibens/ansiml)
![MIT license](https://img.shields.io/github/license/eibens/ansiml)
![CI](https://github.com/eibens/ansiml/workflows/ci/badge.svg)
[![Code coverage](https://img.shields.io/codecov/c/github/eibens/ansiml)](https://codecov.io/gh/eibens/ansiml)

# Motivation

[ANSI escape codes] are special character sequences for adding colors to console
output. In [Deno] you can use the [ANSI colors module] to directly add these
codes to a piece of text. Yet, once text contains colors, changing it becomes
difficult. Consider these hypothetical tasks:

1. You want to print text with a maximum of 80 columns. If you do not explicitly
   ignore the ANSI escape codes in the text while inserting line breaks, the
   lines will end up shorter than they need to be.
2. You want to print syntax-highlighted source code with line numbers to the
   console. If you insert the line numbers into the text, syntax-highlighting
   for multi-line comments and multi-line strings might be broken by the colors
   for the line numbers. But if you add the line numbers before
   syntax-highlighting, the highlighter will not able to parse the code.

The complexity of these tasks increases significantly due to [ANSI escape codes]
being included directly in the text. **AnsiML** solves this with an intermediate
representation that keeps colors separate from the actual text.

# [mod.ts]

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
const text: Node = {
  commands: [["bold"], ["rgb24", 0x88CCFF]],
  children: [text],
};
```

The `stringify` function converts a `Node` into a string with
[ANSI escape codes]. It is used to render AnsiML:

```ts
import { stringify } from "https://deno.land/x/ansiml/mod.ts";

// Render text with ANSI colors.
const ansi = stringify({
  commands: [["bold"], ["rgb24", 0x88CCFF]],
  children: ["some text"],
});

// Outputs bold, blue text.
console.log(ansi);
```

# [demo.ts]

The [demo.ts] module defines a simple AnsiML example that can be run with
[deno]:

```sh
deno run https://deno.land/x/ansiml/demo.ts
```

# That's it!

For more information consider the source code repository
[eibens/ansiml on GitHub].

<!-- links -->

[eibens/ansiml on GitHub]: https://github.com/eibens/ansiml
[mod.ts]: mod.ts
[demo.ts]: demo.ts
[ANSI escape codes]: https://en.wikipedia.org/wiki/ANSI_escape_code
[Deno]: https://deno.land/
[ANSI colors module]: https://deno.land/std/fmt/colors.ts
[ansi-cmd repository]: https://github.com/eibens/ansi-cmd
