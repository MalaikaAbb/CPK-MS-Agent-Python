import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/tool-based" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Tool-based Generative UI exposes React components as tools to the agent using{" "}
          <code>useComponent</code>. When the agent decides to invoke the tool, CopilotKit
          renders the React component inline in the chat and passes the tool arguments as props.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The agent owns the decision of when to display the UI based on user intent and its instructions,
          while the frontend retains full control over the visual presentation and styling.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me a bar chart of quarterly revenue: Q1 45k, Q2 60k, Q3 75k, Q4 90k",
              "Render a bar chart of top programming languages by popularity",
            ]}
            expect="The agent calls render_bar_chart and an interactive bar chart card renders inline in the message stream."
            fail="The agent outputs plain text or markdown tables rather than invoking the component tool."
          />
        </div>
      </Panel>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            {
              file: "backend/doc_agents/chart_agent.py",
              region: "chart-agent-prompt",
            },
            {
              file: "frontend/src/app/generative-ui/tool-based/demo-chat/page.tsx",
            },
          ]}
        />
      </Panel>
    </>
  );
}

