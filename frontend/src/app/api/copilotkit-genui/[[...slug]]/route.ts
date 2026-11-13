import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

/**
 * The Components and surfaces runtime.
 *
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components ("Add
 * the runtime and an agent"): `new CopilotRuntime({ agents: { default: agent },
 * runner: new InMemoryAgentRunner() })`, served multi-route at `[[...slug]]`,
 * as published. Mounted at `/api/copilotkit-genui`, not `/api/copilotkit`, so
 * the catalogs these demos send never reach the other routes' agents.
 *
 * `agent` is this repo's `/components` MAF agent
 * (`backend/agents.py: create_components_agent`), reached with `HttpAgent` like
 * `/api/copilotkit` reaches its agents, instead of the section's TanStack
 * `BuiltInAgent` (framework-own-agents).
 */
const AGENT_URL = process.env.MS_AGENT_URL ?? "http://localhost:8000";

const agent = new HttpAgent({ url: `${AGENT_URL}/components` });

const runtime = new CopilotRuntime({
  agents: { default: agent },
  runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit-genui" });

export const GET = handler;
export const POST = handler;
