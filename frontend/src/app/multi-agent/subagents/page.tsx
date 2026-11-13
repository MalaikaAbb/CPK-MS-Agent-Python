import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

const DEMO = "frontend/src/app/multi-agent/subagents/_demo-code";

export default function Page() {
  return (
    <>
      <RouteHeader path="/multi-agent/subagents" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A supervisor agent has three tools, <code>research_agent</code>,{" "}
          <code>writing_agent</code> and <code>critique_agent</code>. Each one
          runs a separate <code>Agent</code> with its own prompt. Every
          delegation appends an entry to the <code>delegations</code> state
          slot and returns the full list through <code>state_update</code>, so
          the log next to the chat grows as the supervisor works. An{" "}
          <code>agent_middleware</code> copies the incoming state into a
          ContextVar, which lets the tools append to the list the client
          already holds instead of replacing it. In the chat, the frontend
          renders each delegation with <code>useRenderTool</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Write a short blog post about solar energy: research it, draft it, then critique the draft",
            ]}
            expect="Not yet checked in a browser. If it works as published: one activity card per delegation in the chat (research, writing, critique), and three entries in the delegation log, each with a result. No supervisor activity banner and no suggestion chips: those come from the unpublished modules below."
            fail="Log entries come back with result `sub-agent error: …` (see the event-loop note below), the chat shows no cards, or the page fails to load because the `subagents` agent is not registered."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="Doc gap — the Code tab imports modules it does not publish">
        <p>
          The demo Code tab&apos;s <code>page.tsx</code> imports four sibling
          modules that the tab does not ship. A missing module fails the
          Next.js build, so the harness handles each one as follows:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <code>./active-subagent</code> (<code>inferActiveSubAgent</code>):
            a helper function. <strong>Not written in.</strong> Its import and
            the <code>activeSubAgent</code> lines are commented out, so no
            active sub-agent is shown.
          </li>
          <li>
            <code>./suggestions</code> (<code>useSubagentsSuggestions</code>):
            showcase suggestion chips. Commented out, not written in.
          </li>
          <li>
            <code>./subagent-activity-card</code> (
            <code>SubAgentActivityCard</code>, <code>SubAgentToolStatus</code>):
            a UI component the page renders. Added as a minimal, labelled
            card, not from the doc page.
          </li>
          <li>
            <code>./demo-layout</code> (<code>DemoLayout</code>): a UI
            component the page renders. Added minimally, with its shape taken
            from the showcase copy in the agno harness and the supervisor
            banner left out. Not from the doc page.
          </li>
        </ul>
        <p className="mt-2">
          <code>delegation-log.tsx</code> and the backend module are
          byte-for-byte from the Code tab. <code>page.tsx</code> is too,
          except for the commented-out lines, each marked <code>HARNESS</code>.
        </p>
      </Callout>

      <Callout tone="warn" title="Likely runtime failure — kept as published">
        <p>
          <code>_invoke_sub_agent</code> is a sync bridge. It calls{" "}
          <code>asyncio.run(...)</code>, and when a loop is already running
          (as it is under FastAPI) it retries on a worker thread with a
          new loop. The sub-agents are built on the supervisor&apos;s chat
          client, which was created on the server&apos;s loop, so their calls
          can fail with a &ldquo;bound to a different event loop&rdquo; error.{" "}
          <code>_delegate</code> catches that and records only the
          exception class as the entry&apos;s result. The module is kept as
          published. Also, <code>Delegation.status</code> is typed as{" "}
          <code>&quot;completed&quot;</code> only, but the backend writes{" "}
          <code>running</code> and <code>failed</code> too.
        </p>
      </Callout>

      <Callout tone="info" title="Runtime registration">
        <p>
          The Code tab&apos;s <code>route.ts</code> registers{" "}
          <code>agents[&quot;subagents&quot;] = createAgent(&quot;/subagents&quot;)</code>.
          This harness does the same thing on <code>/api/copilotkit</code> with
          an <code>HttpAgent</code> pointed at the backend&apos;s{" "}
          <code>/subagents</code> mount. The demo&apos;s own{" "}
          <code>&lt;CopilotKit&gt;</code> sits inside the app&apos;s root
          provider, the same way the Quickstart demo does.
        </p>
      </Callout>

      <Panel title="Backend (demo Code tab, unchanged)">
        <SourceCodeGroup
          files={[
            { file: "backend/doc_agents/subagents_agent.py" },
            { file: "backend/main.py", region: "multi-agent-mounts" },
          ]}
        />
      </Panel>

      <Panel title="Frontend (demo Code tab)">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/page.tsx` },
            { file: `${DEMO}/delegation-log.tsx` },
          ]}
        />
      </Panel>

      <Panel title="Not from the doc page (minimal UI components)">
        <SourceCodeGroup
          files={[
            { file: `${DEMO}/demo-layout.tsx` },
            { file: `${DEMO}/subagent-activity-card.tsx` },
          ]}
        />
      </Panel>
    </>
  );
}
