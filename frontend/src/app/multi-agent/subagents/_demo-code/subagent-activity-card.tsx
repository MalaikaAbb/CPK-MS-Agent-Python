"use client";

// NOT FROM THE DOC PAGE: a minimal component, labelled. The demo Code tab of
// https://docs.copilotkit.ai/ms-agent-python/multi-agent/subagents renders
// <SubAgentActivityCard> and imports `SubAgentToolStatus` from
// "./subagent-activity-card", but doesn't ship that file. This is the smallest
// card that takes the props page.tsx passes. The showcase's larger, styled
// card (copied in siblings/agno .../_demo/subagents/subagent-activity-card.tsx)
// is decorative demo code, so it was left out.

import React from "react";

import type { SubAgentName } from "./delegation-log";

/** The three statuses useRenderTool reports. */
export type SubAgentToolStatus = "inProgress" | "executing" | "complete";

export function SubAgentActivityCard({
  subAgent,
  task,
  status,
  result,
}: {
  subAgent: SubAgentName;
  task?: string;
  status: SubAgentToolStatus;
  result?: string;
}) {
  return (
    <div className="my-2 rounded-md border border-dashed border-slate-300 p-3 text-xs dark:border-slate-700">
      <p className="font-semibold">
        {subAgent} · {status}
      </p>
      {task && <p className="mt-1">Task: {task}</p>}
      {result && <p className="mt-1 whitespace-pre-wrap">Result: {result}</p>}
    </div>
  );
}
