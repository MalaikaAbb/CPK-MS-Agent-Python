"use client";

import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import type { ReactNode } from "react";

import { DemoFrame } from "@/components/demo-frame";

// The MCP Apps page's `app/providers.tsx` and `app/page.tsx`, mounted one level
// in. The app root already renders its own provider and imports the v2 styles,
// so `layout.tsx` isn't repeated. One deviation: `runtimeUrl` is
// "/api/copilotkit-mcp-apps" (published: "/api/copilotkit"), the route that
// carries this page's `mcpApps` runtime.

//#region providers
function Providers({ children }: { children: ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit-mcp-apps" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
//#endregion

//#region page
function Page() {
    return (
        <main>
            <h1>Your App</h1>
            <CopilotSidebar />
        </main>
    );
}
//#endregion

export default function Demo() {
  return (
    <DemoFrame parentPath="/generative-ui/mcp-apps" subtitle="mcpApps → localhost:3108/mcp">
      <Providers>
        <Page />
      </Providers>
    </DemoFrame>
  );
}
