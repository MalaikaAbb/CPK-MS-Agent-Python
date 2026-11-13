import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

/**
 * Theming: the demo in `demo-chat/` runs the page's code (see the callout).
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/theming
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/theming" />

      <Callout tone="info" title="How this route is wired">
        <p>
          The demo runs the page&apos;s provider config on{" "}
          <code>/api/copilotkit-genui</code>. The agent is this repo&apos;s{" "}
          <code>/components</code> agent (<code>create_components_agent</code>),
          a Microsoft Agent Framework <code>Agent</code> standing in for the
          section&apos;s TanStack <code>BuiltInAgent</code> (same prompt, no
          tools). CopilotKit is 1.87 and <code>agent-framework-ag-ui</code> 1.8.1.
        </p>
        <p className="mt-2">
          The run&apos;s <code>render_ui</code> tool reaches the model with its
          full schema, but its guide does not: the MAF AG-UI adapter reads the
          run&apos;s context only on its A2UI v0.9 path, never into the prompt,
          and the page shows no MAF code for that, so none is added. Expect UI
          that may be rejected or incomplete until checked in a browser (README
          Known issues).
        </p>
      </Callout>

      <Panel title="The demo's code" description="The page's code as mounted in the demo (labelled where the harness adds an import, a runtime URL or a borrowed component). Snippets that cannot run are listed in the status note.">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/components/theming/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/components/theming/demo-chat/dark-mode.tsx" },
            { file: "frontend/src/app/generative-ui/components/theming/demo-chat/theming.css" },
          ]}
        />
      </Panel>

      <Panel title="What the page covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The provider&apos;s <code>theme</code> CSS variables, a typed <code>GenerativeUITheme</code> file, dark-mode overrides, map styles and <code>.a2ui-surface</code> CSS.
        </p>
      </Panel>
    </>
  );
}
