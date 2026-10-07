"""Tool-based Generative UI — docs.copilotkit.ai/ms-agent-python/generative-ui/tool-based

The page's agent block passes `chat_client=`, which the shipped `Agent` does
not accept (see docs_verbatim/chart_agent.py). The prompt is kept verbatim; the
remedy region is the only line that differs from the page. Mounted at
`/gen-ui-tool-based` by `main.py`.
"""

from __future__ import annotations

# harness glue (not on the page): the published snippet reads a module-level
# `chat_client` it never defines. This repo's shared builder supplies it.
from chat_client import build_chat_client

chat_client = build_chat_client()

# region chart-agent-prompt
SYSTEM_PROMPT = """
You are a data visualization assistant.

When the user asks for a chart, call `render_bar_chart` with a concise
title and a `data` array of `{label, value}` items.
"""
# endregion

# region chart-agent-remedy
from agent_framework import Agent

# Remedy: `client=` instead of the page's `chat_client=`.
agent = Agent(
    client=chat_client,
    instructions=SYSTEM_PROMPT,
)
# endregion
