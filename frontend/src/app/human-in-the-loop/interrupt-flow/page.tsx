import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/interrupt-flow" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Gate a backend tool behind an approval that the agent raises itself, and render it with <code>useInterrupt</code>.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Microsoft Agent Framework can mark a backend tool as approval-gated using{" "}
          <code>approval_mode=&quot;always_require&quot;</code>. When the agent decides to call that tool, it does not run it.
          It ends the run with an AG-UI interrupt, which carries the pending tool call to your frontend.
          Your UI asks the user, and your answer resumes the agent.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Delete file notes.txt",
              "Please delete data.csv",
            ]}
            expect="The run stops, an approval prompt appears in the Approval Panel with Approve and Deny buttons. Clicking Approve resumes the agent and executes the tool."
            fail="The agent describes the action in prose and never calls delete_file, or executes without asking for approval."
          />
        </div>
      </Panel>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            {
              file: "backend/doc_agents/interrupt_flow.py",
              region: "delete-file-tool",
            },
            {
              file: "frontend/src/app/human-in-the-loop/interrupt-flow/demo-chat/page.tsx",
              region: "interrupt-flow",
            },
          ]}
        />
      </Panel>
    </>
  );
}
