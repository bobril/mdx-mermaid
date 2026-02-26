# mdx-mermaid

Mermaid code block integration for `@bobril/mdx`.

## Usage

```ts
import { install } from "@bobril/mdx-mermaid";

install();
```

If you also use `@bobril/mdx/highlighter`, install highlighter first and then call `install()` from this package.

```ts
import * as mdxCodeBlock from "@bobril/mdx/highlighter";
import { install } from "@bobril/mdx-mermaid";
import * as styles from "@bobril/highlighter/styles";

mdxCodeBlock.setDefaultCodeBlock(styles.docco);
install();
```

## What it does

- Intercepts MDX code blocks with `info="mermaid"` (case-insensitive)
- Renders diagrams with `@bobril/mermaid`
- Wraps render in `ErrorBoundary` + `Suspense`
- Falls back to wrapped code block on Mermaid render error
