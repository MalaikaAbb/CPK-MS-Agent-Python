import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/json-render" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Bring your own component library with <code>@json-render/react</code>. The agent emits a structured
          flat JSON spec (<code>&#123; root, elements &#125;</code>) matching a Zod catalog, which the frontend renders
          through a typed React component registry in the <code>messageView.assistantMessage</code> slot.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The custom renderer tolerates prose preamble and code fences, extracting and validating the spec
          before rendering through <code>&lt;JSONUIProvider&gt;</code> and <code>&lt;Renderer&gt;</code>.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={[
              "Show me the sales dashboard with metrics and a revenue chart",
              "Show a dashboard comparing Q3 regional sales with a pie chart",
            ]}
            expect="The agent streams a JSON spec that dynamically mounts MetricCard and BarChart/PieChart widgets inside the chat."
            fail="The agent displays raw JSON text or markdown code fences without rendering the interactive cards."
          />
        </div>
      </Panel>

      <Panel title="Source">
        <SourceCodeGroup
          files={[
            {
              file: "backend/doc_agents/byoc_json_render_agent.py",
            },
            {
              file: "frontend/src/app/generative-ui/json-render/catalog.ts",
            },
            {
              file: "frontend/src/app/generative-ui/json-render/registry.tsx",
            },
            {
              file: "frontend/src/app/generative-ui/json-render/json-render-renderer.tsx",
            },
            {
              file: "frontend/src/app/generative-ui/json-render/demo-chat/page.tsx",
            },
          ]}
        />
      </Panel>
    </>
  );
}

