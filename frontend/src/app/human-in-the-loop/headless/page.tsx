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
            expect="Not yet checked in a browser. The app surface on the left shows the topic and three slot buttons, and nothing appears in the chat. Picking a slot makes the agent confirm the booked time. Cancel makes it say the meeting wasn't scheduled."
            fail="The picker never appears (the tool call didn't reach the handler), or the chat hangs after a pick (the Promise was never resolved)."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="Doc gap: only a fragment is printed">
        <p>
          The page prints just the <code>useFrontendTool(...)</code> call from
          its demo&apos;s <code>page.tsx</code> (it&apos;s indented inside a
          component). That call uses <code>setPending</code>,{" "}
          <code>resolverRef</code> and <code>PickerResult</code> without
          declaring them, and the page describes an &ldquo;app surface&rdquo;
          picker without printing one. The fragment is mounted verbatim. The
          labelled minimum around it (imports, the state/ref declarations, the
          type, and a three-button <code>TimePicker</code>) isn&apos;t from
          the doc page. The page prints no backend, so the route reuses the
          scheduling agent from the useInterrupt page (
          <code>gen_ui_interrupt</code>).
        </p>
        <p className="mt-2">
          The prose says the resolver ref is keyed by tool-call id so that
          concurrent calls can&apos;t overwrite each other. The printed code
          uses one plain ref, so a second concurrent call replaces the first
          call&apos;s resolver. Kept as printed.
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
