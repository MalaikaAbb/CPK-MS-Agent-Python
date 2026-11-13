// The MCP Apps page's `app/api/copilotkit/[[...slug]]/route.ts`.
// https://docs.copilotkit.ai/ms-agent-python/generative-ui/mcp-apps
//
// Two deviations, both labelled:
//
// 1. Agent: Microsoft Agent Framework, not the doc's BuiltInAgent. The page
//    builds `new BuiltInAgent({ model: "openai/gpt-6-luna", prompt: "You are a
//    helpful assistant." })`. Here `agent` is this repo's `mcp_apps` agent
//    (backend/doc_agents/mcp_apps_agent.py: the same prompt, no tools),
//    reached over AG-UI the way every other runtime route in this repo reaches
//    its agent. The published lines are kept below as comments.
// 2. basePath: published as "/api/copilotkit", which in this app is the main
//    runtime. Mounted at "/api/copilotkit-mcp-apps" so the MCP Apps middleware,
//    which the runtime applies to every registered agent, stays off the other
//    routes' agents.
//
// Everything else is the page's text, including the MCP server URL
// `http://localhost:3108/mcp`. The harness does not run that server. Start one
// of the ext-apps example servers the page links to on port 3108.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const AGENT_URL = process.env.MS_AGENT_URL ?? "http://localhost:8000";

// 1. Create your agent
// Published (not built, see note 1):
// const agent = new BuiltInAgent({
//   model: "openai/gpt-6-luna",
//   prompt: "You are a helpful assistant.",
// });
const agent = new HttpAgent({ url: `${AGENT_URL}/mcp-apps` });

// 2. Create a service adapter, empty if not relevant

// 3. Create the runtime with mcpApps configured
//#region mcp-apps-runtime
const runtime = new CopilotRuntime({
  agents: {
    default: agent,
  },
  mcpApps: {
    servers: [
      {
        type: "http",
        url: "http://localhost:3108/mcp",
        serverId: "my-server", // Recommended: stable identifier
      },
    ],
  },
  runner: new InMemoryAgentRunner(),
});
//#endregion

// 4. Create the API route
const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-mcp-apps", // published: "/api/copilotkit" (note 2)
});

export const GET = handler;
export const POST = handler;
