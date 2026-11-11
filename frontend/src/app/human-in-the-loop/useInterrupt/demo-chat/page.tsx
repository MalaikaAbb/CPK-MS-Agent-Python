"use client";

import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  useInterrupt,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

/**
 * Pausing the Agent for Input:
 * https://docs.copilotkit.ai/ms-agent-python/human-in-the-loop/useInterrupt
 *
 * The chat runs the page's `create_interrupt_agent` (agent id
 * `gen_ui_interrupt`). That agent calls a frontend `schedule_meeting` tool,
 * but the page's `useFrontendTool` Promise-handler snippet is missing
 * ("snippet skipped: region 'frontend-promise-handler' missing"). The harness
 * doesn't write it in, so no `schedule_meeting` handler is registered here.
 *
 * `ApprovalInterrupt` is the page's "Approve / Cancel example", verbatim. It
 * is mounted so its useInterrupt slot is live, but this agent never emits an
 * interrupt, so it stays empty.
 */

// region approval-interrupt
function ApprovalInterrupt() {
  useInterrupt({
    render: ({ interrupt, resolve, cancel }) => (
      <div className="p-3 border rounded">
        <p>{interrupt?.message ?? "Approve this action?"}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => resolve({ approved: true })}>Approve</button>
          <button onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    ),
  });
  return null;
}
// endregion

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/useInterrupt"
      subtitle="agent: gen_ui_interrupt · no schedule_meeting handler (missing snippet)"
    >
      <CopilotChatConfigurationProvider agentId="gen_ui_interrupt">
        <ApprovalInterrupt />
        <CopilotChat className="h-full" />
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
