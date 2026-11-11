import Link from "next/link";

import { RouteHeader } from "@/components/route-header";
import { Callout, Panel } from "@/components/ui";

const link = "text-[var(--accent)] underline underline-offset-4";

/**
 * The HITL overview page has no code. It describes the two patterns and links
 * to them, so this route is a reference page that points at the routes that
 * implement each one.
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop" />

      <Panel title="What it covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A short page on choosing a HITL pattern for Microsoft Agent
          Framework agents, with no code of its own. The choice depends on
          who owns the decision:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Backend owns it</strong>: a backend tool is marked as
            needing approval. The run pauses before the tool runs,{" "}
            <code>useInterrupt</code> draws the prompt, and the answer resumes
            the run. Live on{" "}
            <Link href="/human-in-the-loop/interrupt-flow" className={link}>
              Interrupt-based
            </Link>
            , and as a hook-level walkthrough on{" "}
            <Link href="/human-in-the-loop/useInterrupt" className={link}>
              Pausing the Agent for Input
            </Link>
            .
          </li>
          <li>
            <strong>Frontend owns it</strong>: a browser tool registered with{" "}
            <code>useHumanInTheLoop</code> renders UI and waits for the
            user before it returns. Live on{" "}
            <Link href="/human-in-the-loop/tool-based" className={link}>
              Tool-based
            </Link>
            .
          </li>
        </ul>
      </Panel>

      <Callout tone="info" title="Card links on the doc page">
        The page&apos;s two cards link to <code>/human-in-the-loop/interrupt-flow</code>{" "}
        and <code>/human-in-the-loop/tool-based</code> without the{" "}
        <code>/ms-agent-python</code> prefix, so on docs.copilotkit.ai they go
        to the default framework&apos;s pages, not this framework&apos;s.
      </Callout>
    </>
  );
}
