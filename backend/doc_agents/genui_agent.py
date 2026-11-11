"""The agent behind every /generative-ui/components/* route.

https://docs.copilotkit.ai/ms-agent-python/generative-ui/components

Agent: Microsoft Agent Framework, not the doc's BuiltInAgent. The Components
and surfaces pages print their backend only as a TanStack `BuiltInAgent`
factory (`new BuiltInAgent({ type: "tanstack", factory: ... })`), which is a
framework-generic agent, not a Microsoft Agent Framework one. This harness
runs its own framework's agent in that slot instead: a plain `Agent` with no
tools (the factory defines none of its own) and the factory's system prompt,
verbatim.

The page asks only that the agent pass the run's tools and context to its
model. `agent-framework-ag-ui` forwards the run's `render_ui` as a client
tool. Run context (the catalog guide) reaches the model only through the
Agent App Context page's `ContextAwareAgent` (agents.py, region
`context-agent`), the same wrapper `/readables` uses. This is repo wiring
from that page, not something the Components pages print. Record of the
swap: README §9 (Pending review).
"""

from __future__ import annotations

from agent_framework import Agent, BaseChatClient
from agent_framework_ag_ui import AgentFrameworkAgent

from agents import ContextAwareAgent

# region genui-agent
#: The TanStack factory's own system prompt, verbatim.
GENUI_PROMPT = (
    "You are a helpful assistant. When a visual answer helps, render it with "
    "generative UI."
)


def create_genui_agent(chat_client: BaseChatClient) -> AgentFrameworkAgent:
    base_agent = Agent(
        name="genui",
        instructions=GENUI_PROMPT,
        client=chat_client,
    )

    return ContextAwareAgent(
        agent=base_agent,
        name="genui",
        description="Components and surfaces: renders generative UI from the run's catalog.",
        require_confirmation=False,
    )
# endregion
