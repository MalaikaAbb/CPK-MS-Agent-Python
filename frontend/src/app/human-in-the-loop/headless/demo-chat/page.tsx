"use client";

/**
 * Headless Interrupts:
 * https://docs.copilotkit.ai/ms-agent-python/human-in-the-loop/headless
 *
 * The page prints one fragment of its demo's `page.tsx`: the
 * `useFrontendTool({ name: "schedule_meeting", ... })` call from inside a
 * component body. It's mounted here verbatim, between the `region
 * headless-tool` markers, inside a bare component.
 *
 * Not filled in (route `broken`): the fragment calls `setPending` and
 * `resolverRef`, which the page never declares. They're left undeclared, with
 * `@ts-expect-error` on each use, so the handler throws a ReferenceError
 * when the agent calls `schedule_meeting`. The page also describes an "app
 * surface" picker but prints none, so there isn't one.
 *
 * Harness glue, NOT FROM THE DOC PAGE: the imports, the `PickerResult` type
 * (the fragment references it; its shape is inferred from the fields the
 * handler reads), the wrapper component and the chat layout. Agent: the page
 * prints no backend, so this reuses the useInterrupt page's scheduling agent
 * (`gen_ui_interrupt`).
 */

import {
  CopilotChat,
  CopilotChatConfigurationProvider,
  useFrontendTool,
} from "@copilotkit/react-core/v2";
import { z } from "zod";

import { DemoFrame } from "@/components/demo-frame";

// NOT FROM THE DOC PAGE: the type the fragment references.
type PickerResult = { chosen_label: string } | { cancelled: true };

function HeadlessScheduler() {
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
      // @ts-expect-error -- doc gap: `setPending` is never declared on the page
      setPending({ topic, attendee });
      const result = await new Promise<PickerResult>((resolve) => {
        // @ts-expect-error -- doc gap: `resolverRef` is never declared on the page
        resolverRef.current = resolve;
      });
      // @ts-expect-error -- doc gap: `setPending` is never declared on the page
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

  return null;
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/human-in-the-loop/headless"
      subtitle="useFrontendTool fragment · undeclared setPending/resolverRef (doc gap) · agent: gen_ui_interrupt"
    >
      <CopilotChatConfigurationProvider agentId="gen_ui_interrupt">
        <HeadlessScheduler />
        <CopilotChat className="h-full" />
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}
