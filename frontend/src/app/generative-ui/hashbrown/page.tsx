import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/hashbrown" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Stream a structured sales dashboard progressively using <code>@hashbrownai/react</code>&apos;s UI kit
          and progressive JSON parser (<code>useJsonParser</code>). The agent emits a catalog-constrained JSON
          envelope (<code>&#123; ui: [...] &#125;</code>) that parses and mounts visual components in real-time as tokens arrive.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The dashboard kit exposes <code>metric</code>, <code>pieChart</code>, <code>barChart</code>, <code>dealCard</code>,
          and Markdown, allowing the assistant to interleave narrative commentary with live analytics.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me the sales analytics dashboard with revenue metrics and a breakdown pie chart",
              "Generate a monthly trend bar chart and top renewal deal card",
            ]}
            expect="The assistant streams a JSON object that renders progressively into MetricCard, BarChart, and DealCard elements."
            fail="The assistant outputs unparsed JSON strings or plain text without rendering the UI kit elements."
          />
        </div>
      </Panel>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            {
              file: "backend/doc_agents/byoc_hashbrown_agent.py",
            },
            {
              file: "frontend/src/app/generative-ui/hashbrown/hashbrown-renderer.tsx",
            },
            {
              file: "frontend/src/app/generative-ui/hashbrown/demo-chat/page.tsx",
            },
          ]}
        />
      </Panel>
    </>
  );
}

