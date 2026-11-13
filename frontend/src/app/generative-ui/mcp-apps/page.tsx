import { RouteHeader } from "@/components/route-header";
import { SourceCodeGroup } from "@/components/source-code";
import { Callout, CodeBlock, Panel, TryIt } from "@/components/ui";

// Published alternatives, shown as text and not mounted.
const USE_MIDDLEWARE = `import { MCPAppsMiddleware } from "@ag-ui/mcp-apps-middleware";

const agent = new BuiltInAgent({
  model: "openai/gpt-6-luna",
  prompt: "You are a helpful assistant.",
}).use(
  new MCPAppsMiddleware({
    mcpServers: [
      {
        type: "http",
        url: "http://localhost:3108/mcp",
        serverId: "my-server",
      },
    ],
  }),
);`;

const HTTP_TRANSPORT = `{
  type: "http",
  url: "http://localhost:3101/mcp",
  serverId: "my-http-server"
}`;

const SSE_TRANSPORT = `{
  type: "sse",
  url: "https://mcp.example.com/sse",
  headers: {
    "Authorization": "Bearer token"
  },
  serverId: "my-sse-server"
}`;

export default function Page() {
  return (
    <>
      <RouteHeader path="/generative-ui/mcp-apps" />

      <Callout tone="warn" title="Agent: Microsoft Agent Framework, not the doc's BuiltInAgent">
        <p>
          The page&apos;s runtime builds a CopilotKit <code>BuiltInAgent</code>{" "}
          (<code>openai/gpt-6-luna</code>, prompt &ldquo;You are a helpful
          assistant.&rdquo;). This harness runs its own framework&apos;s agent
          in that slot instead: <code>mcp_apps</code> in{" "}
          <code>backend/doc_agents/mcp_apps_agent.py</code>, with the same
          prompt and no tools, reached over AG-UI. The <code>mcpApps</code>{" "}
          config is the page&apos;s, verbatim. The runtime is mounted at{" "}
          <code>/api/copilotkit-mcp-apps</code> instead of{" "}
          <code>/api/copilotkit</code>, so its middleware stays off the other
          routes&apos; agents, and the provider&apos;s <code>runtimeUrl</code>{" "}
          points there.
        </p>
      </Callout>

      <Panel title="What it demonstrates">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          An MCP server supplies both a tool and the UI for it. The
          runtime&apos;s <code>mcpApps.servers</code> option adds the MCP
          Apps middleware to every agent it serves. When the agent calls one
          of the server&apos;s tools, the runtime fetches the tool&apos;s UI
          resource and the chat renders it inline. The frontend is a plain{" "}
          <code>CopilotSidebar</code>, with no MCP-specific code.
        </p>
        <div className="mt-4">
          <TryIt
            prompts={["What tools do you have?"]}
            expect="Not yet checked in a browser. With an ext-apps example server listening on http://localhost:3108/mcp, the agent lists that server's tools, and calling one renders its app inline in the sidebar."
            fail="Without a server on :3108, the runtime can't discover any MCP tools, so the agent answers in plain text with no tools. That's expected here unless you start one."
          />
        </div>
      </Panel>

      <Callout tone="warn" title="Needs an MCP server the harness does not run">
        The page points the runtime at <code>http://localhost:3108/mcp</code>{" "}
        and links the{" "}
        <a
          href="https://github.com/modelcontextprotocol/ext-apps"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] underline underline-offset-4"
        >
          modelcontextprotocol/ext-apps
        </a>{" "}
        example servers, but it doesn&apos;t say which one to run or how to
        start it on that port. Start one there yourself before you try the
        demo.
      </Callout>

      <Panel title="Runtime (verbatim apart from the agent and basePath)">
        <SourceCodeGroup
          files={[
            { file: "frontend/src/app/api/copilotkit-mcp-apps/[[...slug]]/route.ts" },
            { file: "backend/doc_agents/mcp_apps_agent.py", region: "mcp-apps-agent" },
            { file: "backend/main.py", region: "mcp-apps-mount" },
          ]}
        />
      </Panel>

      <Panel title="Provider and page">
        <SourceCodeGroup
          files={[{ file: "frontend/src/app/generative-ui/mcp-apps/demo-chat/page.tsx" }]}
        />
      </Panel>

      <Panel title="Shown, not mounted">
        <p className="mb-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The agent-scoped alternative attaches <code>MCPAppsMiddleware</code>{" "}
          with <code>.use()</code>. It needs{" "}
          <code>@ag-ui/mcp-apps-middleware</code>, which this repo doesn&apos;t
          install (the page says it&apos;s only needed for this form), and it
          is built on <code>BuiltInAgent</code>. The two transport shapes are
          config fragments.
        </p>
        <CodeBlock filename="app/api/copilotkit/route.ts (alternative)" language="ts" code={USE_MIDDLEWARE} />
        <div className="mt-3">
          <CodeBlock filename="HTTP transport" language="ts" code={HTTP_TRANSPORT} />
        </div>
        <div className="mt-3">
          <CodeBlock filename="SSE transport" language="ts" code={SSE_TRANSPORT} />
        </div>
      </Panel>
    </>
  );
}
