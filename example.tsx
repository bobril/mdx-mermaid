import * as b from "bobril";
import * as mdx from "@bobril/mdx";
import { install } from "./index";

install();

b.init(() => (
    <>
        <mdx.H level={1}>{"Example for @bobril/mdx-mermaid"}</mdx.H>
        <mdx.P>{"Mermaid code blocks are rendered as diagrams."}</mdx.P>
        <mdx.CodeBlock info="mermaid">
            {`graph TD;
            A-->B;
            A-->C;
            B-->D;
            C-->D;`}
        </mdx.CodeBlock>
        <mdx.H level={2}>{"Non-mermaid block is passed through"}</mdx.H>
        <mdx.CodeBlock info="ts">{'const hello = "world";'}</mdx.CodeBlock>
    </>
));
