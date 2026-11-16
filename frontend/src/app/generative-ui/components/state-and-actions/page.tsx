import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, Panel } from "@/components/ui";

/**
 * State and actions: the page's two complete catalogs run in `demo-chat/`, with
 * only the components the page names but never defines added (see the callout).
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/state-and-actions
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/state-and-actions" />

      <Callout tone="warn" title="Partly mounted: components defined, the cart is not">
        <p>
          The demo mounts the page&apos;s two complete catalogs on{" "}
          <code>/api/copilotkit-genui</code> (the <code>/components</code> MAF
          agent). The only code added is a <code>ProductCard</code> for the
          live-state catalog, which the page registers but never defines, plus
          the imports the snippets leave out.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>Not filled in:</strong> the <code>Cart</code> type and 
            <code>cart</code> instance, so neither <code>CartState</code> nor 
            <code>CartActions</code> is mounted. The live-state card has no cart
            state to bind <code>inCart</code> to, and &ldquo;Add to cart&rdquo;
            returns the function&apos;s error in the page&apos;s own alert.
          </li>
          <li>
            <strong>Shown, not run:</strong> the <code>events</code> and 
            <code>writable</code> fragments and the function declarations: they
            name no component and sit in no catalog.
          </li>
          <li>
            <strong>Agent:</strong> <code>render_ui</code> reaches the model
            without its guide (the MAF AG-UI adapter keeps the run&apos;s context
            out of the prompt), so cards may be rejected until that is fixed.
          </li>
        </ul>
      </Callout>

      <Panel title="The demo's code" description="The page's catalogs and ProductCard as mounted; the defined ProductCard and added imports are labelled in the source.">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/components/state-and-actions/demo-chat/state-catalog.tsx" },
            { file: "frontend/src/app/generative-ui/components/state-and-actions/demo-chat/functions-catalog.tsx" },
            { file: "frontend/src/app/generative-ui/components/state-and-actions/demo-chat/page.tsx" },
          ]}
        />
      </Panel>

      <Panel title="What the page covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Binding app state into props, functions that run on a click, events sent to the agent, and <code>writable</code> props that keep what users type.
        </p>
      </Panel>
    </>
  );
}
