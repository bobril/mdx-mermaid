import * as b from "bobril";
import * as mdx from "@bobril/mdx";
import * as mermaid from "@bobril/mermaid";

export function install(wrapCodeBlock?: b.IComponentFactory<mdx.IMdxCodeData>) {
    if (wrapCodeBlock === undefined) wrapCodeBlock = mdx.defaultComponents.CodeBlock;

    mdx.defaultComponents.CodeBlock = (data?: mdx.IMdxCodeData, children?: b.IBobrilChildren) => {
        var lang = data?.info || "";
        if (lang.toLowerCase() !== "mermaid") return wrapCodeBlock!(data, children);
        return (
            <b.ErrorBoundary
                fallback={(e) => (
                    <>
                        <div>Mermaid error: {(e as Error).message}</div>
                        {wrapCodeBlock!(data, children)}
                    </>
                )}
            >
                <b.Suspense fallback={<div>Rendering mermaid...</div>}>
                    <mermaid.Mermaid>{"" + children}</mermaid.Mermaid>
                </b.Suspense>
            </b.ErrorBoundary>
        );
    };
}
