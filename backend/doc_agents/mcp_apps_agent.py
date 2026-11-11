"""The agent behind /generative-ui/mcp-apps.

https://docs.copilotkit.ai/ms-agent-python/generative-ui/mcp-apps

Agent: Microsoft Agent Framework, not the doc's BuiltInAgent. The page's
runtime builds `new BuiltInAgent({ model: "openai/gpt-6-luna", prompt: "You are
a helpful assistant." })`, a CopilotKit-generic agent. This harness runs its
own framework's agent in that slot instead: a plain `Agent` with the snippet's
prompt verbatim and no tools, because the snippet defines none. The MCP
server's tools come from the runtime's `mcpApps` middleware, which adds them
to the run, and `agent-framework-ag-ui` forwards them to the model as client
tools. The model comes from the shared chat client, not the snippet's
`openai/gpt-6-luna` string.
"""

from __future__ import annotations

from agent_framework import Agent, BaseChatClient

# region mcp-apps-agent
#: The BuiltInAgent snippet's prompt, verbatim.
MCP_APPS_PROMPT = "You are a helpful assistant."


def create_mcp_apps_agent(chat_client: BaseChatClient) -> Agent:
    return Agent(
        name="mcp_apps",
        instructions=MCP_APPS_PROMPT,
        client=chat_client,
    )
# endregion
