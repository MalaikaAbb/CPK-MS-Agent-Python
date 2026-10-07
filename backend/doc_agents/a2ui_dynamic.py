"""A2UI dynamic schema — docs.copilotkit.ai/ms-agent-python/generative-ui/a2ui/dynamic-schema

The region below is the page's `src/agents/a2ui_dynamic.py` block, verbatim.
`main.py` mounts `agent` at `/declarative-gen-ui` WITHOUT `a2ui_config`:
the page's recovery block mounts an `a2ui_recovery_agent` it never defines,
so that block is kept as reference only, in `docs_verbatim/a2ui_agent_server.py`.
"""

from __future__ import annotations

# harness glue (not on the page): the published snippet reads a module-level
# `chat_client` it never defines. This repo's shared builder supplies it.
from chat_client import build_chat_client

chat_client = build_chat_client()

# region a2ui-dynamic-agent
from agent_framework import Agent
from agent_framework_ag_ui import AgentFrameworkAgent

base_agent = Agent(
    client=chat_client,
    name="declarative_gen_ui_agent",
    instructions=(
        "Whenever a response would benefit from a rich visual — a dashboard, "
        "KPI summary, card layout, or chart — call `generate_a2ui` to draw it. "
        "Keep chat replies to one short sentence and let the UI do the talking."
    ),
)

# No A2UI tool here — the adapter auto-injects `generate_a2ui` when
# `injectA2UITool` is on. Binding one yourself would suppress auto-injection.
agent = AgentFrameworkAgent(agent=base_agent)
# endregion
