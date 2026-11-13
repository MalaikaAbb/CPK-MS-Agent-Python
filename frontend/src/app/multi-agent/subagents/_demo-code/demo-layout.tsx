"use client";

// NOT FROM THE DOC PAGE: a minimal component, labelled. The demo Code tab
// renders <DemoLayout delegations isRunning activeSubAgent> from
// "./demo-layout" but doesn't ship it. Shape adapted from the showcase copy
// in siblings/agno (multi-agent/subagents/_demo/subagents/demo-layout.tsx):
// the published DelegationLog beside a CopilotChat on the `subagents` agent.
// The showcase's supervisor activity banner is left out because it is fed
// by `inferActiveSubAgent`, an unpublished helper this harness doesn't write
// in. That's why `activeSubAgent` is optional here, and page.tsx's prop is
// commented out.

import React from "react";
import { CopilotChat } from "@copilotkit/react-core/v2";

import { DelegationLog, type Delegation, type SubAgentName } from "./delegation-log";

export function DemoLayout({
  delegations,
  isRunning,
}: {
  delegations: Delegation[];
  isRunning: boolean;
  activeSubAgent?: { subAgent: SubAgentName; task: string } | null;
}) {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <div className="min-h-0 overflow-y-auto p-4">
        <DelegationLog delegations={delegations} isRunning={isRunning} />
      </div>
      <div className="min-h-0">
        <CopilotChat agentId="subagents" className="h-full" />
      </div>
    </div>
  );
}
