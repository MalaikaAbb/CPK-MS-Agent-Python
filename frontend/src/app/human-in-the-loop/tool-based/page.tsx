import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

/**
 * https://docs.copilotkit.ai/ms-agent-python/human-in-the-loop/tool-based
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/tool-based" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A human-in-the-loop approval built from a frontend tool. The page
          registers <code>humanApprovedCommand</code> with{" "}
          <code>useHumanInTheLoop</code>: when the agent wants to run a command
          it calls that tool, the chat renders the command with Approve and
          Deny buttons, and the run waits. Your click becomes the tool&apos;s
          result (<code>Command is APPROVED</code> or{" "}
          <code>Command is DENIED</code>), and the agent continues from it.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Nothing is declared on the backend. The tool travels with each run
          over AG-UI, and <code>agent-framework-ag-ui</code> hands it to the
          model as a client tool, so the Python agent needs no tool of its own.
          This is the difference from{" "}
          <a className="text-[var(--accent)] underline underline-offset-4" href="/human-in-the-loop/interrupt-flow">
            Interrupt-based
          </a>
          , where the agent owns an approval-gated backend tool.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Run the command `ls -la` in my home directory",
              "Please delete the build folder with rm -rf ./build",
              "Restart the web server with sudo systemctl restart nginx",
            ]}
            expect="A card appears in the chat with the command in a code block and Approve / Deny buttons, and the agent stops until you click. Approve: the agent says the command was approved. Deny: it says the command was denied and does not claim to have run it. Nothing actually runs; the tool only returns your answer."
            fail="The agent answers in prose without a card (it never called humanApprovedCommand — name the tool or ask it to run a command), or the card stays after you click (the respond call did not reach the run)."
          />
        </div>
      </Panel>

      <Callout tone="info" title="How this route is wired">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code>hitl-tool.tsx</code> is the page&apos;s <code>page.tsx</code>{" "}
            block, verbatim. Its <code>Page</code> registers the tool and returns
            nothing, so mounting it as JSX is a type error; it is kept as
            published with <code>@ts-expect-error</code> in the demo.
          </li>
          <li>
            The chat runs on <code>my_agent</code>, this repo&apos;s Quickstart
            agent. It has the page&apos;s prompt (&ldquo;You are a helpful
            assistant.&rdquo;); the page&apos;s Python agent is the same with no
            tools, while <code>my_agent</code> also carries Tool
            Rendering&apos;s <code>get_weather</code>, which these prompts never
            use.
          </li>
          <li>
            The page&apos;s Step 1 links to the LangGraph quickstart and a
            coagent starter, and its &ldquo;What is this?&rdquo; links point at{" "}
            <code>/microsoft-agent-framework/frontend-tools</code>; the embedded
            demo is the .NET feature viewer. None of these is Python-specific.
          </li>
        </ul>
      </Callout>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/human-in-the-loop/tool-based/hitl-tool.tsx" },
            { file: "frontend/src/app/human-in-the-loop/tool-based/demo-chat/page.tsx" },
          ]}
        />
      </Panel>
    </>
  );
}
