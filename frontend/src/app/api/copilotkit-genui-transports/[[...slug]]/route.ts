import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

/**
 * The Transports page's runtime.
 *
 * https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/transports
 * prints `new CopilotRuntime({ agents: { default: agent }, generativeUI: true })`
 * (verbatim below). `agent` is the same `/components` MAF agent as
 * `/api/copilotkit-genui` (framework-own-agents swap for the section's
 * `BuiltInAgent`); mounted at `/api/copilotkit-genui-transports` so
 * `generativeUI: true` stays on this page. The page's "Only some agents"
 * sample names a `shop` agent; no page publishes one, so none is registered.
 */
const AGENT_URL = process.env.MS_AGENT_URL ?? "http://localhost:8000";

const agent = new HttpAgent({ url: `${AGENT_URL}/components` });

const runtime = new CopilotRuntime({
  agents: { default: agent },
  generativeUI: true,
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit-genui-transports" });

export const GET = handler;
export const POST = handler;
