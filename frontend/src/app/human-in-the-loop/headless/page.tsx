import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel, TryIt } from "@/components/ui";

export default function Page() {
  return (
    <>
      <RouteHeader path="/human-in-the-loop/headless" />

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Resolving a pause from UI that isn&apos;t in the chat. This
          framework has no native interrupt, so the page registers{" "}
          <code>schedule_meeting</code> with <code>useFrontendTool</code>. Its
          async handler puts the request in React state, so a separate app
          surface can draw a picker. The handler then waits on a Promise that
          the picker resolves. <code>render: () =&gt; null</code> keeps the
          chat transcript free of tool UI.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["Book a call with Sam to go over the Q3 roadmap"]}
            expect="Broken by design: the agent calls schedule_meeting, and the page's handler throws a ReferenceError (setPending is not defined) because the page never declares its state or ref. No picker exists anywhere, since the page prints none."
            fail="A picker appears or a meeting is booked. That would mean something declared the missing state or picker."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="Doc gap: only a fragment is printed (route broken)">
        <p>
          The page prints just the <code>useFrontendTool(...)</code> call from
          its demo&apos;s <code>page.tsx</code>. That call uses{" "}
          <code>setPending</code> and <code>resolverRef</code>, which the page
          never declares, and the page describes an &ldquo;app surface&rdquo;
          picker without printing one. The fragment is mounted verbatim and
          those names are <strong>not</strong> filled in. Each use carries an{" "}
          <code>@ts-expect-error</code>, so the handler throws when the agent
          calls the tool. There is no picker. The harness adds only imports,
          the <code>PickerResult</code> type the fragment references, and a
          wrapper. The page prints no backend, so the route reuses the
          useInterrupt page&apos;s scheduling agent (
          <code>gen_ui_interrupt</code>).
        </p>
        <p className="mt-2">
          The prose says the resolver ref is keyed by tool-call id, but the
          printed code assigns one plain ref.
        </p>
      </Callout>

      <Panel title="Frontend">
        <SourceCodeGroup
          files={[{ file: "frontend/src/app/human-in-the-loop/headless/demo-chat/page.tsx" }]}
        />
      </Panel>

      <Panel title="Backend (from the useInterrupt page)">
        <SourceCodeGroup
          files={[
            { file: "backend/doc_agents/interrupt_agent.py", region: "interrupt-agent" },
            { file: "backend/main.py", region: "use-interrupt-mount" },
          ]}
        />
      </Panel>
    </>
  );
}
