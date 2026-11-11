import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

// The Transports page's `app/api/copilotkit/route.ts`. The page prints only
// the `CopilotRuntime` call, with an `agent` it never defines. The only agent
// in the section is the overview's TanStack `BuiltInAgent` factory.
//
// Agent: Microsoft Agent Framework, not the doc's BuiltInAgent. `agent` is
// this repo's `genui` agent over AG-UI. Harness glue: the imports, `agent` and
// the handler. The `shop` agent named by the "Only some agents" sample is
// never built by any page, so it isn't registered. README §9 (Pending
// review).
const AGENT_URL = process.env.MS_AGENT_URL ?? "http://localhost:8000";

const agent = new HttpAgent({ url: `${AGENT_URL}/genui` });

//#region transports-runtime
const runtime = new CopilotRuntime({
  agents: { default: agent },
  generativeUI: true,
});
//#endregion

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit-genui-transports",
});

export const GET = handler;
export const POST = handler;
