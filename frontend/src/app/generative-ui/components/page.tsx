import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel } from "@/components/ui";

/**
 * Components and surfaces (overview): the demo in `demo-chat/` runs the page's code (see the callout).
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components
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

      <Callout tone="info" title="How this route is wired">
        <p>
          The demo runs the page&apos;s provider config on{" "}
          <code>/api/copilotkit-genui</code>. The agent is this repo&apos;s{" "}
          <code>/components</code> agent (<code>create_components_agent</code>),
          a Microsoft Agent Framework <code>Agent</code> standing in for the
          section&apos;s TanStack <code>BuiltInAgent</code> (same prompt, no
          tools). CopilotKit is 1.87 and <code>agent-framework-ag-ui</code> 1.8.1.
        </p>
        <p className="mt-2">
          The run&apos;s <code>render_ui</code> tool reaches the model with its
          full schema, but its guide does not: the MAF AG-UI adapter reads the
          run&apos;s context only on its A2UI v0.9 path, never into the prompt,
          and the page shows no MAF code for that, so none is added. Expect UI
          that may be rejected or incomplete until checked in a browser (README
          Known issues).
        </p>
      </Callout>

      <Panel title="The demo's code" description="The page's code as mounted in the demo (labelled where the harness adds an import, a runtime URL or a borrowed component). Snippets that cannot run are listed in the status note.">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/generative-ui/components/demo-chat/page.tsx" },
            { file: "frontend/src/app/api/copilotkit-genui/[[...slug]]/route.ts" },
            { file: "backend/agents.py" },
          ]}
        />
      </Panel>

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

      <Panel title="The page's provider and runtime, as printed">
        <CodeBlock code={PROVIDERS} filename="app/providers.tsx (doc)" language="tsx" />
        <div className="mt-3">
          <CodeBlock code={RUNTIME} filename="app/api/copilotkit/[[...slug]]/route.ts (doc)" language="ts" />
        </div>
      </Panel>
    </>
  );
}
