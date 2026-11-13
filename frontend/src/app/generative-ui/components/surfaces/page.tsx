import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

/**
 * Surfaces: the demo in `demo-chat/` runs the page's code (see the callout).
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/surfaces
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/surfaces" />

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
            { file: "frontend/src/app/generative-ui/components/surfaces/demo-chat/page.tsx" },
            { file: "frontend/src/app/generative-ui/components/surfaces/demo-chat/targets.tsx" },
            { file: "frontend/src/app/generative-ui/components/surfaces/demo-chat/surfaces.css" },
          ]}
        />
      </Panel>

      <Panel title="What the page covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>GenerativeUISurface</code> page targets the chat can fill, with an id, a description the agent reads, a <code>components</code> limit, <code>autoScroll</code> and per-item targets, plus the provider&apos;s per-component <code>errorBoundary</code>.
        </p>
      </Panel>
    </>
  );
}
