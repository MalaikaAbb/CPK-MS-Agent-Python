# Verbatim from docs.copilotkit.ai/ms-agent-python/generative-ui/tool-based,
# both `src/agents/chart_agent.py` blocks in page order. NOT imported:
#   Agent(chat_client=...) raises
#   TypeError: Agent.__init__() got an unexpected keyword argument 'chat_client'
# on agent-framework-core 1.20 (the parameter is `client`). Run in page order,
# the Agent also reads SYSTEM_PROMPT before it is defined. The runnable copy is
# doc_agents/chart_agent.py (region chart-agent-remedy).

# region chart-agent-verbatim
from agent_framework import Agent

agent = Agent(
    chat_client=chat_client,
    instructions=SYSTEM_PROMPT,
)

SYSTEM_PROMPT = """
You are a data visualization assistant.

When the user asks for a chart, call `render_bar_chart` with a concise
title and a `data` array of `{label, value}` items.
"""
# endregion
