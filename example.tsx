import * as b from "bobril";
import * as mdx from "@bobril/mdx";
import { install } from "./index";

install();

const releaseFlow = [
    "flowchart LR",
    "    Author[Write docs] --> Commit[Commit changes]",
    "    Commit --> Build[bb build]",
    "    Build --> Preview{Looks good?}",
    "    Preview -->|yes| Publish[Publish docs]",
    "    Preview -->|no| Author",
].join("\n");

const requestSequence = [
    "sequenceDiagram",
    "    participant U as User",
    "    participant M as @bobril/mdx",
    "    participant MM as @bobril/mdx-mermaid",
    "    participant R as @bobril/mermaid",
    "    U->>M: Render code block info=mermaid",
    "    M->>MM: Delegate CodeBlock",
    "    MM->>R: Render diagram source",
    "    R-->>U: SVG diagram",
].join("\n");

const installState = [
    "stateDiagram-v2",
    "    [*] --> Idle",
    "    Idle --> Parsing: install()",
    "    Parsing --> Rendering: info=mermaid",
    "    Rendering --> Fallback: render error",
    "    Fallback --> Idle",
    "    Rendering --> Idle: success",
].join("\n");

b.init(() => (
    <>
        <mdx.H level={1}>{"MDX Mermaid Playground"}</mdx.H>
        <mdx.P>
            {"This demo installs "}
            <mdx.Code>{"@bobril/mdx-mermaid"}</mdx.Code>
            {" and renders Mermaid diagrams from "}
            <mdx.Code>{"CodeBlock"}</mdx.Code>
            {" nodes."}
        </mdx.P>
        <mdx.P>
            <mdx.Strong>{"Quick links: "}</mdx.Strong>
            <mdx.A href="https://bobril.com/mdx-mermaid/" target="_blank">
                {"Live example"}
            </mdx.A>
            {" | "}
            <mdx.A href="https://github.com/bobril/mdx-mermaid" target="_blank">
                {"GitHub"}
            </mdx.A>
            {" | "}
            <mdx.A href="https://github.com/bobril/mermaid" target="_blank">
                {"@bobril/mermaid"}
            </mdx.A>
        </mdx.P>
        <mdx.H level={2}>{"Release flow"}</mdx.H>
        <mdx.CodeBlock info="mermaid">
            {releaseFlow}
        </mdx.CodeBlock>
        <mdx.H level={2}>{"Sequence (case-insensitive info)"}</mdx.H>
        <mdx.CodeBlock info="MERMAID">
            {requestSequence}
        </mdx.CodeBlock>
        <mdx.H level={2}>{"Installer state transitions"}</mdx.H>
        <mdx.CodeBlock info="mermaid">
            {installState}
        </mdx.CodeBlock>
        <mdx.H level={2}>{"Fallback behavior"}</mdx.H>
        <mdx.P>{"Non-mermaid code blocks are passed through untouched."}</mdx.P>
        <mdx.CodeBlock info="ts">
            {'const language = "ts";\nconst intercepted = language.toLowerCase() === "mermaid";'}
        </mdx.CodeBlock>
        <mdx.Table>
            <mdx.Thead>
                <mdx.Tr>
                    <mdx.Th align="left">{"Input"}</mdx.Th>
                    <mdx.Th align="left">{"Output"}</mdx.Th>
                </mdx.Tr>
            </mdx.Thead>
            <mdx.Tbody>
                <mdx.Tr>
                    <mdx.Td>
                        <mdx.Code>{'info="mermaid"'}</mdx.Code>
                    </mdx.Td>
                    <mdx.Td>{"Rendered diagram"}</mdx.Td>
                </mdx.Tr>
                <mdx.Tr>
                    <mdx.Td>
                        <mdx.Code>{'info="MERMAID"'}</mdx.Code>
                    </mdx.Td>
                    <mdx.Td>{"Rendered diagram"}</mdx.Td>
                </mdx.Tr>
                <mdx.Tr>
                    <mdx.Td>
                        <mdx.Code>{'info="ts"'}</mdx.Code>
                    </mdx.Td>
                    <mdx.Td>{"Original wrapped code block"}</mdx.Td>
                </mdx.Tr>
            </mdx.Tbody>
        </mdx.Table>
    </>
));
