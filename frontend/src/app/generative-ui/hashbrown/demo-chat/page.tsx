"use client";

// [1] hashbrown: page setup
// [!code highlight:4]
import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { CopilotChat, CopilotChatConfigurationProvider } from "@copilotkit/react-core/v2";

import { DemoFrame } from "@/components/demo-frame";
import { HashBrownDashboard, HashBrownRenderMessage } from "../hashbrown-renderer";

export const AGENT_ID = "byoc_hashbrown";

// [2] hashbrown: chat component with assistantMessage slot
// [!code highlight:8]
export function Chat() {
  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        assistantMessage:
          HashBrownRenderMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
      labels={{
        welcomeMessageText:
          'Ask for a progressive dashboard (e.g., "Show me the quarterly sales analytics dashboard").',
      }}
    />
  );
}

export default function Page() {
  return (
    <DemoFrame
      parentPath="/generative-ui/hashbrown"
      subtitle="Hashbrown — @hashbrownai/react progressive JSON streaming"
    >
      <CopilotChatConfigurationProvider agentId={AGENT_ID}>
        <HashBrownDashboard>
          <div className="h-full">
            <Chat />
          </div>
        </HashBrownDashboard>
      </CopilotChatConfigurationProvider>
    </DemoFrame>
  );
}

