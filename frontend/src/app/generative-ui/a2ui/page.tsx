import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { SourceCode } from "@/components/source-code";
import { Callout, CodeBlock, Panel } from "@/components/ui";

// The A2UI overview page's two snippets, as published. Shown, not mounted:
// the setup block declares `const runtime` twice and uses an undefined
// `myAgent`, because it lists two alternatives, so it can't compile as one
// file. The ops container is a shape sketch with `...` placeholders.
const SETUP_SNIPPET = `import { CopilotRuntime } from "@copilotkit/runtime";

// Simple — enable with defaults
const runtime = new CopilotRuntime({
  agents: { default: myAgent },
  a2ui: true,
});

// Or customise — e.g. inject a render tool into the agent
const runtime = new CopilotRuntime({
  agents: { default: myAgent },
  a2ui: {
    injectA2UITool: true,
  },
});`;

const OPS_SNIPPET = `{
    "a2ui_operations": [
        {"version": "v0.9", "createSurface": {"surfaceId": ..., "catalogId": ...}},
        {"version": "v0.9", "updateComponents": {"surfaceId": ..., "components": [...]}},
        {"version": "v0.9", "updateDataModel": {"surfaceId": ..., "path": "/", "value": {...}}},
    ]
}`;

const link = "text-[var(--accent)] underline underline-offset-4";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/a2ui" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The landing page for A2UI. It has no demo of its own. It says that
          A2UI is switched on with an <code>a2ui</code> key on{" "}
          <code>CopilotRuntime</code>, and that without that key A2UI
          tool results show up as plain text. It also says a surface is three
          operations (<code>createSurface</code>, <code>updateComponents</code>,{" "}
          <code>updateDataModel</code>) inside an <code>a2ui_operations</code>{" "}
          container, and it points to two approaches. The working surfaces in
          this harness live on those approach pages:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <Link href="/generative-ui/a2ui/fixed-schema" className={link}>
              Fixed Schema
            </Link>
            : a tool returns the operations container itself, with a schema
            loaded from JSON.
          </li>
          <li>
            Dynamic Schema (<code>/generative-ui/a2ui/dynamic-schema</code>):
            a secondary LLM writes the schema and data, and the{" "}
            <code>agent-framework-ag-ui</code> adapter builds the container.
          </li>
        </ul>
      </Panel>

      <Panel title="Setup snippet (as published, not mounted)">
        <CodeBlock filename="app/api/copilotkit/route.ts" language="ts" code={SETUP_SNIPPET} />
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          This harness&apos;s real runtime uses the object form, scoped to one
          agent: <code>a2ui: {"{"} agents: [&quot;a2ui_agent&quot;], injectA2UITool: false {"}"}</code>.
          The reasons are given in the comment above it in the file below.
        </p>
      </Panel>

      <Callout tone="warn" title="Why the snippet is shown rather than run">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            It declares <code>const runtime</code> twice (two alternatives
            in one block), so it can&apos;t compile as one file.
          </li>
          <li>
            <code>myAgent</code> is never defined. In this harness the agents
            are Microsoft Agent Framework endpoints reached through{" "}
            <code>HttpAgent</code>.
          </li>
          <li>
            It imports <code>CopilotRuntime</code> from{" "}
            <code>@copilotkit/runtime</code>, while every other runtime page
            for this framework uses <code>@copilotkit/runtime/v2</code>.
          </li>
        </ul>
      </Callout>

      <Panel title="The operations container (as published)">
        <CodeBlock filename="a2ui_operations (shape)" language="python" code={OPS_SNIPPET} />
      </Panel>

      <Panel title="Where this harness enables A2UI">
        <SourceCode file="frontend/src/app/api/copilotkit/[[...slug]]/route.ts" />
      </Panel>
    </>
  );
}
