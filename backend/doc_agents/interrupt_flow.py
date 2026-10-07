"""Interrupt-based HITL — docs.copilotkit.ai/ms-agent-python/human-in-the-loop/interrupt-flow

The tool region is the page's Python block, verbatim. The page never says which
agent carries the tool, so the agent below is harness glue: the Quickstart's
name and instructions with `tools=[delete_file]`. Mounted at `/interrupt_flow`.
"""

from __future__ import annotations

# harness glue (not on the page): the published snippet reads a module-level
# `chat_client` it never defines. This repo's shared builder supplies it.
from chat_client import build_chat_client

chat_client = build_chat_client()

# region delete-file-tool
from agent_framework import tool

@tool(
    name="delete_file",
    description="Delete a file",
    approval_mode="always_require", # [!code highlight]
)
def delete_file(filename: str) -> str:
    return f"Deleted {filename}."
# endregion

# region interrupt-agent-glue
from agent_framework import Agent

agent = Agent(
    name="MyAgent",
    instructions="You are a helpful assistant.",
    client=chat_client,
    tools=[delete_file],
)
# endregion
