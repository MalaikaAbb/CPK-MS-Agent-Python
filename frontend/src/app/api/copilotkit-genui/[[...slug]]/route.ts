import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";

// The runtime every Components and surfaces demo points at. It comes from the
// overview page's `app/api/copilotkit/[[...slug]]/route.ts`
// (https://docs.copilotkit.ai/ms-agent-python/generative-ui/components).
//
// Agent: Microsoft Agent Framework, not the doc's BuiltInAgent. The page
// builds `agent` as a TanStack `BuiltInAgent` factory. Here it is this repo's
// `genui` agent (backend/doc_agents/genui_agent.py) over AG-UI, which is how
// every other runtime route in this repo reaches its agent. The
// `CopilotRuntime` options are the page's. The route has its own path instead
// of `/api/copilotkit`, so the catalog's `render_ui` never reaches other
// routes' agents. README §9 (Pending review).
const AGENT_URL = process.env.MS_AGENT_URL ?? "http://localhost:8000";

const agent = new HttpAgent({ url: `${AGENT_URL}/genui` });

const runtime = new CopilotRuntime({
  agents: { default: agent },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-genui",
});

export const GET = handler;
export const POST = handler;
