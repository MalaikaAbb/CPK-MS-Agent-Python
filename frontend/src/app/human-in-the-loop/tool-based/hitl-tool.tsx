"use client";

/**
 * The page's `page.tsx` block, verbatim between the region markers. `Page` is
 * the page's own name; it registers the tool and renders nothing.
 */

// #region hitl-tool — verbatim
import { useHumanInTheLoop } from "@copilotkit/react-core/v2" // [!code highlight]
import { z } from "zod"

export function Page() {
  // ...

  useHumanInTheLoop({
    name: "humanApprovedCommand",
    description: "Ask human for approval to run a command.",
    parameters: z.object({
      command: z.string().describe("The command to run"),
    }),
    render: ({ args, respond }) => {
      if (!respond) return <></>;
      return (
        <div>
          <pre>{args.command}</pre>
          {/* [!code highlight:2] */}
          <button onClick={() => respond(`Command is APPROVED`)}>Approve</button>
          <button onClick={() => respond(`Command is DENIED`)}>Deny</button>
        </div>
      );
    },
  });

  // ...
}
// #endregion
