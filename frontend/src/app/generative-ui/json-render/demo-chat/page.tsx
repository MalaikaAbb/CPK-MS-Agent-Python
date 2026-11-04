"use client";

// [1] json-render: Chat component with assistantMessage slot
// [!code highlight:4]
import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { CopilotChat, CopilotChatConfigurationProvider } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { JsonRenderAssistantMessage } from "../json-render-renderer";
import { useByocJsonRenderSuggestions } from "../suggestions";

export const AGENT_ID = "byoc_json_render";

export function Chat() {
  useByocJsonRenderSuggestions();

  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        assistantMessage:
          JsonRenderAssistantMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
      labels={{
        welcomeMessageText:
          'Ask for a dashboard (e.g., "Show me the sales dashboard with revenue metrics and a quarterly bar chart").',
      }}
    />
  );
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/json-render"
      subtitle="JSON Render — @json-render/react component registry"
    >
      <CopilotChatConfigurationProvider agentId={AGENT_ID}>
        <div className="h-full">
          <Chat />
        </div>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}

