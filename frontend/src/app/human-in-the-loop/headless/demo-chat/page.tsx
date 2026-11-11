"use client";

/**
 * Headless Interrupts:
 * https://docs.copilotkit.ai/ms-agent-python/human-in-the-loop/headless
 *
 * The page prints one fragment of its demo's `page.tsx`: the
 * `useFrontendTool({ name: "schedule_meeting", ... })` call, which sits inside
 * a component body. That fragment is between the `region headless-tool`
 * markers, verbatim. Everything around it is NOT FROM THE DOC PAGE and is
 * kept to the minimum the fragment needs in order to mount:
 *
 * - the imports;
 * - `PickerResult` (a type) and the `pending` state / `resolverRef` ref that
 *   the fragment calls but never declares;
 * - `TimePicker`, a minimal app-surface UI component that shows the pending
 *   request and resolves the ref (the page names the "app surface" but
 *   prints no component for it);
 * - the layout: chat on one side, app surface on the other.
 *
 * Agent: the page prints no backend. The demo id is `interrupt-headless`, and
 * the section's only scheduling agent is the useInterrupt page's
 * `create_interrupt_agent` (agent id `gen_ui_interrupt`), which tells the
 * model to call `schedule_meeting`. This route reuses it.
 */

import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  useFrontendTool,
} from "@copilotkit/react-core/v2";
import { useRef, useState } from "react";
import { z } from "zod";

import { DemoFrame } from "@/components/demo-frame";

// NOT FROM THE DOC PAGE: the shapes the fragment uses.
type PickerResult = { chosen_label: string } | { cancelled: true };
type Pending = { topic: string; attendee?: string };

function HeadlessScheduler() {
  // NOT FROM THE DOC PAGE: state and ref the fragment calls but never declares.
  const [pending, setPending] = useState<Pending | null>(null);
  const resolverRef = useRef<((result: PickerResult) => void) | null>(null);

  // region headless-tool
  useFrontendTool({
    name: "schedule_meeting",
    description:
      "Ask the user to pick a time slot for a meeting via a picker popup " +
      "that appears outside the chat. Blocks until the user chooses a " +
      "slot or cancels.",
    parameters: z.object({
      topic: z
        .string()
        .describe("Short human-readable description of the meeting."),
      attendee: z
        .string()
        .optional()
        .describe("Who the meeting is with (optional)."),
    }),
    // Async handler: sets the pending payload so the popup renders, then
    // returns a Promise that only resolves once the user interacts with the
    // popup. This is the MS Agent shim for the LangGraph headless interrupt
    // `resume` flow.
    handler: async ({
      topic,
      attendee,
    }: {
      topic: string;
      attendee?: string;
    }): Promise<string> => {
      setPending({ topic, attendee });
      const result = await new Promise<PickerResult>((resolve) => {
        resolverRef.current = resolve;
      });
      setPending(null);
      if ("cancelled" in result && result.cancelled) {
        return "User cancelled. Meeting NOT scheduled.";
      }
      if ("chosen_label" in result) {
        return `Meeting scheduled for ${result.chosen_label}.`;
      }
      return "User did not pick a time. Meeting NOT scheduled.";
    },
    // Render nothing inside the chat — the UI lives in the app surface.
    render: () => null,
  });
  // endregion

  return (
    <TimePicker
      pending={pending}
      onResult={(result) => resolverRef.current?.(result)}
    />
  );
}

/**
 * NOT FROM THE DOC PAGE: a minimal picker for the "app surface". The page
 * describes it but prints no component. Fixed slot labels, no calendar.
 */
const SLOTS = ["Tomorrow 10:00", "Tomorrow 14:00", "Friday 09:30"];

function TimePicker({
  pending,
  onResult,
}: {
  pending: Pending | null;
  onResult: (result: PickerResult) => void;
}) {
  if (!pending) {
    return (
      <p className="text-sm text-slate-500">
        No pending request. Ask the chat to book a meeting.
      </p>
    );
  }
  return (
    <div className="space-y-3 text-sm">
      <p>
        <strong>{pending.topic}</strong>
        {pending.attendee ? ` with ${pending.attendee}` : ""}
      </p>
      <div className="flex flex-wrap gap-2">
        {SLOTS.map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-md border border-slate-300 px-3 py-1.5 dark:border-slate-600"
            onClick={() => onResult({ chosen_label: label })}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-slate-500 underline"
          onClick={() => onResult({ cancelled: true })}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/headless"
      subtitle="useFrontendTool · picker outside the chat · agent: gen_ui_interrupt"
    >
      <CopilotChatConfigurationProvider agentId="gen_ui_interrupt">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <div className="min-h-0 overflow-y-auto border-b border-slate-200 p-4 lg:border-b-0 lg:border-r dark:border-slate-800">
            <h2 className="mb-3 text-base font-semibold">App surface</h2>
            <HeadlessScheduler />
          </div>
          <div className="min-h-0">
            <CopilotChat className="h-full" />
          </div>
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
