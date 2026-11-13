import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

/**
 * Markdown mode: the demo in `demo-chat/` runs the page's code (see the callout).
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/markdown-mode
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/markdown-mode" />

      <Callout tone="warn" title="How this route is wired">
        <p>
          The demo runs the page&apos;s provider config on{" "}
          <code>/api/copilotkit-genui</code>. The agent is this repo&apos;s{" "}
          <code>/components</code> agent (<code>create_components_agent</code>),
          a Microsoft Agent Framework <code>Agent</code> standing in for the
          section&apos;s TanStack <code>BuiltInAgent</code> (same prompt, no
          tools). CopilotKit is 1.87 and <code>agent-framework-ag-ui</code> 1.8.1.
        </p>
        <p className="mt-2">
          Expect no UI. Markdown mode sends the component schema and the fence
          guide only as context entries, and the MAF AG-UI adapter never puts the
          run&apos;s context into the prompt (the page shows no MAF code for
          that), so the model never learns the format (README Known issues).
        </p>
      </Callout>

      <Panel title="The demo's code" description="The page's code as mounted in the demo (labelled where the harness adds an import, a runtime URL or a borrowed component). Snippets that cannot run are listed in the status note.">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/components/markdown-mode/demo-chat/page.tsx" },
          ]}
        />
      </Panel>

      <Panel title="What the page covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The agent writes A2UI operations in <code>a2ui</code> code blocks inside its reply (<code>transport: &quot;markdown&quot;</code>), and <code>sendContext: false</code> moves the catalog into <code>forwardedProps</code>.
        </p>
      </Panel>
    </>
  );
}
