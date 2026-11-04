"use client";

// [3] useComponent import
// [!code highlight:2]
import { useComponent, CopilotChat, CopilotChatConfigurationProvider } from "@copilotkit/react-core/v2";
import { z } from "zod";

import { DemoFrame } from "@/components/demo-frame";

/**
 * Tool-based Generative UI (Components as Tools)
 *
 * Verbatim snippet from:
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/tool-based
 */

// [4] useComponent schema
const barChartPropsSchema = z.object({
  title: z.string().describe("The concise chart title"),
  data: z.array(
    z.object({
      label: z.string().describe("Category or item label"),
      value: z.number().describe("Numeric metric value"),
    }),
  ).describe("Array of label-value items to display"),
});

type BarChartProps = z.infer<typeof barChartPropsSchema>;

// [5] BarChart component
function BarChart(props: BarChartProps) {
  const { title, data } = props;
  const maxValue = Math.max(...(data?.map((d) => d.value) ?? [1]), 1);

  return (
    <div className="my-3 w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title || "Bar Chart"}
      </h3>
      <div className="space-y-2">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            const percentage = Math.min(100, Math.max(8, (item.value / maxValue) * 100));
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>{item.label}</span>
                  <span className="font-mono text-slate-900 dark:text-slate-200">{item.value}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-2.5 rounded-full bg-[var(--harness-accent,#2563eb)] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-400">Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  // [4] useComponent registration
  // [!code highlight:6]
  useComponent({
    name: "render_bar_chart",
    description: "Display a bar chart with labeled numeric values.",
    parameters: barChartPropsSchema,
    render: BarChart,
  });

  return (
    <DemoFrame
      parentPath="/generative-ui/tool-based"
      subtitle="useComponent · chart_agent"
    >
      <CopilotChatConfigurationProvider agentId="chart_agent">
        <CopilotChat
          agentId="chart_agent"
          labels={{
            welcomeMessageText:
              'Ask for a visual chart (e.g. "Show me a chart of browser market share" or "Create a bar chart of top 5 programming languages").',
          }}
        />
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}

