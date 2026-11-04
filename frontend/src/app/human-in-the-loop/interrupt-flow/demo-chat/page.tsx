"use client";

import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  useInterrupt,
} from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";

/**
 * Render the approval with `useInterrupt`
 *
 * Verbatim snippet from:
 * https://docs.copilotkit.ai/ms-agent-python/human-in-the-loop/interrupt-flow
 */

// region interrupt-flow
// [1] interrupt-based: render the approval with useInterrupt
// [!code highlight]
export function ApprovalPanel() {
  // renderInChat: false makes useInterrupt return the element, so render it yourself.
  const approval = useInterrupt({
    renderInChat: false,
    render: ({ interrupt, resolve, cancel }) => {
      if (!interrupt) return <></>;
      return (
        <div>
          <p>{interrupt.message}</p>
          {/* [!code highlight:2] */}
          <button onClick={() => resolve({ approved: true })}>Approve</button>
          <button onClick={() => cancel()}>Deny</button>
        </div>
      );
    },
  });

  return <div>{approval}</div>;
}
// endregion

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/interrupt-flow"
      subtitle="useInterrupt · interrupt_agent"
    >
      <CopilotChatConfigurationProvider agentId="interrupt_agent">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <div className="min-h-0 overflow-y-auto border-b border-slate-200 p-4 lg:border-b-0 lg:border-r dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Approval Panel
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Rendered outside the chat using{" "}
              <code>{"useInterrupt({ renderInChat: false })"}</code>.
            </p>

            <div className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-700">
              <div className="[&_p]:text-sm [&_p]:font-medium [&_p]:text-slate-800 dark:[&_p]:text-slate-200 [&_button]:mt-3 [&_button]:mr-2 [&_button]:rounded-md [&_button]:px-3 [&_button]:py-1.5 [&_button]:text-sm [&_button]:font-medium [&_button:first-of-type]:bg-[var(--harness-accent)] [&_button:first-of-type]:text-white [&_button:last-of-type]:border [&_button:last-of-type]:border-slate-300 dark:[&_button:last-of-type]:border-slate-600 [&_button:last-of-type]:text-slate-700 dark:[&_button:last-of-type]:text-slate-300">
                <ApprovalPanel />
              </div>
              <div className="mt-2 text-xs italic text-slate-400 dark:text-slate-500">
                When an approval interrupt is received from the server, the prompt and action buttons will appear above.
              </div>
            </div>
          </div>

          <div className="min-h-0">
            <CopilotChat
              agentId="interrupt_agent"
              labels={{
                welcomeMessageText:
                  'Ask me to delete a file (e.g., "Delete file notes.txt") to trigger an approval interrupt.',
              }}
            />
          </div>
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
