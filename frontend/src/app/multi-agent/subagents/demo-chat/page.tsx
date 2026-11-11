"use client";

import { DemoFrame } from "@/components/demo-frame";

import SubagentsDemo from "../_demo-code/page";

/**
 * The page's `subagents` demo Code-tab page.tsx. It brings its own
 * `<CopilotKit runtimeUrl="/api/copilotkit" agent="subagents">`, so the
 * runtime registers a `subagents` agent (the Code tab's route.ts does
 * `agents["subagents"] = createAgent("/subagents")`), backed by
 * backend/doc_agents/subagents_agent.py mounted at /subagents.
 */
export default function Page() {
  return (
    <DemoFrame parentPath="/multi-agent/subagents" subtitle="agent: subagents">
      <SubagentsDemo />
    </DemoFrame>
  );
}
