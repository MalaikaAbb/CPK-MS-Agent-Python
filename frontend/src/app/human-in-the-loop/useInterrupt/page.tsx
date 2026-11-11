import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// The page's multi-interrupt fragment: a bare `useInterrupt(...)` call with no
// component around it. Shown, not mounted (one useInterrupt slot per page).
const MULTI = `useInterrupt({
  render: ({ interrupts, resolve, cancel }) => (
    <ul>
      {interrupts.map((i) => (
        <li key={i.id}>
          {i.message}
          <button onClick={() => resolve({ ok: true }, i.id)}>Approve</button>
          <button onClick={() => cancel(i.id)}>Cancel</button>
        </li>
      ))}
    </ul>
  ),
});`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/useInterrupt" />

      <Callout tone="warn" title="Doc gap: the frontend half of the demo is missing">
        <p>
          For this framework, the page says the pause isn&apos;t a real{" "}
          <code>interrupt()</code>. Instead, a <code>useFrontendTool</code>{" "}
          handler returns a Promise that resolves only when the user picks a
          slot in a time picker. That handler is the section the page
          introduces with &ldquo;The frontend&rdquo;, and on the live page it
          renders as a skipped snippet (region{" "}
          <code>frontend-promise-handler</code> missing for{" "}
          <code>ms-agent-python::gen-ui-interrupt</code>). The page has no Code
          tab to recover it from.
        </p>
        <p className="mt-2">
          The harness doesn&apos;t write that handler or the picker it renders.
          The backend agent is the page&apos;s, verbatim, and it instructs the
          model to always call <code>schedule_meeting</code>. With no
          frontend registration, that call has nothing to run it.
        </p>
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          How a run can stop and wait for a person. The page&apos;s main
          example adapts the idea for runtimes without a mid-tool pause: a
          frontend tool keeps the request open until the user answers. The
          rest of the page covers <code>useInterrupt</code> itself: the
          standard AG-UI <code>RUN_FINISHED</code> interrupt outcome vs the
          legacy <code>on_interrupt</code> custom event, an Approve / Cancel
          renderer, several interrupts in one run, and{" "}
          <code>responseSchema</code> (passed through to your UI, never
          validated on the client).
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Book a call with Sam to go over the Q3 roadmap"]}
            expect="Broken by design: the model calls schedule_meeting, no frontend handler is registered for it, and no time picker appears. The run ends without a booking, or stalls on the unresolved tool call."
            fail="A time picker appears. That would mean something registered schedule_meeting, which this route does not do."
          />
        </div>
      </Panel>

      <Callout tone="info" title="Interrupt-based HITL that does work in this repo">
        The <code>approval_mode=&quot;always_require&quot;</code> tool on{" "}
        <a href="/human-in-the-loop/interrupt-flow" className="text-[var(--accent)] underline underline-offset-4">
          Interrupt-based
        </a>{" "}
        pauses a real run and renders with <code>useInterrupt</code>.
        That&apos;s the pattern the page&apos;s Approve / Cancel example
        expects.
      </Callout>

      <Panel title="Backend (page's Python block, verbatim)">
        <SourceCodeGroup
          files={[
            { file: "backend/doc_agents/interrupt_agent.py" },
            { file: "backend/main.py", region: "use-interrupt-mount" },
          ]}
        />
      </Panel>

      <Panel title="Frontend">
        <SourceCodeGroup
          files={[{ file: "frontend/src/app/human-in-the-loop/useInterrupt/demo-chat/page.tsx" }]}
        />
        <div className="mt-3">
          <CodeBlock filename="Multi-interrupt fragment (shown, not mounted)" language="tsx" code={MULTI} />
        </div>
      </Panel>
    </>
  );
}
