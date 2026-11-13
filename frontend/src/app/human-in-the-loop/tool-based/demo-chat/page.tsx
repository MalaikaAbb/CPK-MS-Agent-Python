"use client";

import { CopilotChat } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

import { Page as HitlTool } from "../hitl-tool";

/**
 * The page's `Page` registers `humanApprovedCommand` and renders nothing; the
 * chat beside it runs on `my_agent`, the Quickstart agent. Its Python is
 * the same as the page's agent, which forwards frontend tools automatically.
 */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/human-in-the-loop/tool-based" subtitle="agent: my_agent">
      {/* @ts-expect-error harness: doc bug, not fixed — the page's `Page` has no return statement, so its type is `void`, which is not a valid JSX element type */}
      <HitlTool />
      <CopilotChat agentId="my_agent" className="h-full" />
    </DemoFrame>
  );
}
