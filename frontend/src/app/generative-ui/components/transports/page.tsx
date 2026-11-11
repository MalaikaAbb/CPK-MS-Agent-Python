// Ported from the aws-strands-py harness (itself ported from CPK-LangGraph-TS
// and aws-strands-ts). The ms-agent-python doc page is byte-identical to the
// strands one (diffed 2026-11-11). The page prints only a TanStack
// BuiltInAgent; these providers' runtime runs this repo's Microsoft Agent
// Framework `genui` agent instead (route callout).

import { RouteHeader } from "@/components/route-header";
import { SourceCode, SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const BASE = "frontend/src/app/generative-ui/components/transports/demo-chat";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/transports" />

      <Callout tone="warn" title="Agent: Microsoft Agent Framework, not the doc's BuiltInAgent">
        <p>
          The Components and surfaces pages publish a backend only as a TanStack{" "}
          <code>BuiltInAgent</code> factory, which is not a Microsoft Agent Framework agent. This
          harness runs its own framework&apos;s agent in that slot: a
          tool-free Microsoft Agent Framework <code>genui</code> agent
          (<code>backend/doc_agents/genui_agent.py</code>) whose prompt is the
          factory&apos;s, verbatim, reached over AG-UI through{" "}
          <code>/api/copilotkit-genui</code>. Doc gap, README §9 (Pending review). The
          page&apos;s frontend code below is kept verbatim and type-checked.
          Not yet checked in a browser.
        </p>
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The same catalog can reach the browser two ways: the agent calls a{" "}
          <code>render_ui</code> tool the runtime adds (checked server-side as
          it streams), or it writes <code>a2ui</code> code blocks inside its
          reply (checked in the browser). <code>agentIds</code> limits which
          agents get any of it, and the runtime&apos;s{" "}
          <code>generativeUI</code> option controls when the tool is added.
        </p>
        <div className="mt-4 space-y-3">
          <TryIt
            prompts={["Compare the Starter, Team, and Enterprise plans in a table"]}
            expect="Tool transport: the table arrives as a render_ui tool call. Markdown transport: the table sits inside the reply text. agentIds: [shop]: a plain text reply, since default is outside the list."
            fail="The 'as default' variant renders a component — agentIds was ignored."
          />
        </div>
      </Panel>

      <Panel title="The runtime" description="The page's CopilotRuntime sample, verbatim; its undefined agent is the Microsoft Agent Framework genui agent.">
        <SourceCode file="frontend/src/app/api/copilotkit-genui-transports/[[...slug]]/route.ts" />
      </Panel>

      <Panel title="The provider configs and demo">
        <SourceCodeGroup files={[{ file: `${BASE}/configs.ts` }, { file: `${BASE}/page.tsx` }]} />
      </Panel>

      <Callout tone="warn" title="Gaps and harness changes">
        <ul className="space-y-1.5">
          <li>
            · The runtime sample references an <code>agent</code> it never
            builds, and the section&apos;s only agent is a TanStack{" "}
            <code>BuiltInAgent</code>. Agent: Microsoft Agent Framework, not the doc&apos;s
            BuiltInAgent: <code>agent</code> is this repo&apos;s Microsoft Agent Framework{" "}
            <code>genui</code> agent (harness glue above the verbatim{" "}
            <code>CopilotRuntime</code> call).
          </li>
          <li>
            · The &ldquo;Only some agents&rdquo; sample lists a{" "}
            <code>shop</code> agent in <code>agentIds</code> that no page
            builds; none is registered.
          </li>
          <li>
            · The runtime sample sets no <code>runner</code>; it gets the
            runtime&apos;s default in-memory runner.
          </li>
        </ul>
      </Callout>
    </>
  );
}
