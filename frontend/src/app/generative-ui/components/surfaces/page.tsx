import { RouteHeader } from "@/components/route-header";
import { Callout, Panel } from "@/components/ui";

/**
 * Reference-only: Surfaces
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/surfaces
 *
 * Not implemented. The page's code needs @copilotkit/react-core/v2/generative-ui,
 * which the installed CopilotKit (1.73.3 per the lockfile) does not ship. See
 * README §9 (Pending review).
 */
export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components/surfaces" />

      <Callout tone="warn" title="Reference only: needs a newer CopilotKit than this repo installs">
        <p>
          This repo's lockfile installs <code>@copilotkit/react-core</code>{" "}
          <strong>1.73.3</strong>, which has no{" "}
          <code>@copilotkit/react-core/v2/generative-ui</code> entry point. That
          entry point (<code>standardUI</code>, <code>createGenerativeUI</code>,{" "}
          <code>GenerativeUISurface</code>, &hellip;) first ships in 1.84. Every
          snippet on this page needs it, so none of it can compile or run here.
          Doc-sync does not bump dependencies, so the route is reference-only
          until the repo is upgraded. The docs don&apos;t state a minimum
          version.
        </p>
      </Callout>

      <Panel title="What the page covers">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <code>GenerativeUISurface</code> page targets the chat can fill, with an id, a description the agent reads, a <code>components</code> limit, <code>autoScroll</code> and per-item targets, plus the provider&apos;s per-component <code>errorBoundary</code>.
        </p>
      </Panel>
    </>
  );
}
