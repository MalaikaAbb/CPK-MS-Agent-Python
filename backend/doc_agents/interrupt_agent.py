"""Pausing the Agent for Input — docs.copilotkit.ai/ms-agent-python/human-in-the-loop/useInterrupt

Everything below the import block is the page's Python block, verbatim
(`src/agents/interrupt_agent.py`). The page prints no imports, so the
import block is harness glue: the names the snippet uses, imported from where
the rest of this repo imports them. Mounted at `/gen-ui-interrupt` (the
page's demo id) in main.py.

The agent has no tools of its own. The page says `schedule_meeting` is
registered on the frontend with a Promise-returning `useFrontendTool`
handler, but that snippet is missing from the page ("snippet skipped:
region 'frontend-promise-handler' missing"). The harness doesn't write it,
so this agent's tool calls have no handler. See the route.
"""

from __future__ import annotations

# region harness-imports (not on the page)
from textwrap import dedent

from agent_framework import Agent, BaseChatClient
from agent_framework_ag_ui import AgentFrameworkAgent
# endregion

# region interrupt-agent
# src/agents/interrupt_agent.py
SYSTEM_PROMPT = dedent(
    """
    You are a scheduling assistant. Whenever the user asks you to book a call
    or schedule a meeting, you MUST call the `schedule_meeting` tool. Pass a
    short `topic` describing the purpose of the meeting and, if known, an
    `attendee` describing who the meeting is with.

    The `schedule_meeting` tool is implemented on the client: it surfaces a
    time-picker UI to the user and returns the user's selection. After the
    tool returns, briefly confirm whether the meeting was scheduled and at
    what time, or note that the user cancelled. Do NOT ask for approval
    yourself — always call the tool and let the picker handle the decision.

    Keep responses short and friendly. After you finish executing tools,
    always send a brief final assistant message summarizing what happened so
    the message persists.
    """.strip()
)


def create_interrupt_agent(chat_client: BaseChatClient) -> AgentFrameworkAgent:
    """Instantiate the scheduling-only agent used by the interrupt-adapted demos."""
    base_agent = Agent(
        client=chat_client,
        name="scheduling_agent",
        instructions=SYSTEM_PROMPT,
        # No backend tools. `schedule_meeting` is registered on the frontend
        # via `useFrontendTool` and dispatched through the CopilotKit runtime.
        # When the agent calls `schedule_meeting`, the request is routed to
        # the frontend handler, which returns a Promise that only resolves
        # once the user picks a slot — equivalent to `interrupt()` in the
        # LangGraph reference.
        tools=[],
    )

    return AgentFrameworkAgent(
        agent=base_agent,
        name="CopilotKitMicrosoftAgentFrameworkInterruptAgent",
        description=(
            "Scheduling assistant for the interrupt-adapted demos. Delegates "
            "the time-picker interaction to a frontend tool."
        ),
        require_confirmation=False,
    )
# endregion
