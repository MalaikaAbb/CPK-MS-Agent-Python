import { RouteHeader } from "@/components/route-header";
import { Callout, CodeBlock, Panel } from "@/components/ui";

/**
 * Reference-only: Components and surfaces (overview)
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components
 *
 * Not implemented. The section needs @copilotkit/react-core/v2/generative-ui,
 * which the installed CopilotKit (1.73.3 per the lockfile) doesn't ship. See
 * README §9 (Pending review).
 */

// The page's runtime sample, verbatim. Shown, not run. It's a TanStack
// BuiltInAgent factory; if this route is ever made live, it has to run on this
// framework's own agent instead (framework-own-agents).
const RUNTIME = `import { chat } from "@tanstack/ai";
import { openaiText } from "@tanstack/ai-openai";
import {
  BuiltInAgent,
  convertInputToTanStackAI,
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";

const agent = new BuiltInAgent({
  type: "tanstack",
  factory: ({ input, abortController }) => {
    const { messages, systemPrompts, tools } = convertInputToTanStackAI(input);
    return chat({
      adapter: openaiText("gpt-6-luna"),
      messages,
      systemPrompts: [
        "You are a helpful assistant. When a visual answer helps, render it with generative UI.",
        ...systemPrompts,
      ],
      tools,
      abortController,
    });
  },
});

const runtime = new CopilotRuntime({
  agents: { default: agent },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit" });

export const GET = handler;
export const POST = handler;`;

const PROVIDERS = `"use client";
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
import "@copilotkit/react-core/v2/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: standardUI }}>
      {children}
    </CopilotKitProvider>
  );
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/components" />

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
          A2UI 1.0 components drawn by the agent. You put a catalog on the
          provider (<code>generativeUI=&#123;&#123; ui: standardUI &#125;&#125;</code>)
          and the runtime adds a <code>render_ui</code> tool plus a guide to
          every run, so the model can answer with real UI (tables, charts,
          cards) that fills in as it streams. The only backend printed is a
          TanStack <code>BuiltInAgent</code> factory. This repo would have to
          run its own Microsoft Agent Framework agent in its place, and no
          such agent is wired while the route is reference-only.
        </p>
      </Panel>

      <Panel title="The page's provider and runtime (shown, not run)">
        <CodeBlock code={PROVIDERS} filename="app/providers.tsx (doc)" language="tsx" />
        <div className="mt-3">
          <CodeBlock code={RUNTIME} filename="app/api/copilotkit/[[...slug]]/route.ts (doc)" language="ts" />
        </div>
      </Panel>
    </>
  );
}
