# Verbatim from docs.copilotkit.ai/ms-agent-python/human-in-the-loop/tool-based
# (Python tab, `agent/src/agent.py`). NOT imported: the Quickstart agent at "/"
# already matches it (same instructions, frontend tools forwarded), and its
# name "sample_agent" collides with this repo's Shared State agent id.

# region hitl-agent-verbatim
from __future__ import annotations
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from agent_framework import Agent
from agent_framework import SupportsChatGetResponse
from agent_framework.openai import OpenAIChatClient
from agent_framework.ag_ui import add_agent_framework_fastapi_endpoint
from azure.identity import DefaultAzureCredential

load_dotenv()

def _build_chat_client() -> SupportsChatGetResponse:
    if bool(os.getenv("AZURE_OPENAI_ENDPOINT")):
        azure_api_key = os.getenv("AZURE_OPENAI_API_KEY")
        return OpenAIChatClient(
            model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-5.4-mini"),
            api_key=azure_api_key,
            credential=None if azure_api_key else DefaultAzureCredential(),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        )
    if bool(os.getenv("OPENAI_API_KEY")):
        return OpenAIChatClient(
            model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-5.4-mini"),
            api_key=os.getenv("OPENAI_API_KEY"),
        )
    raise RuntimeError("Set AZURE_OPENAI_ENDPOINT (uses az login unless AZURE_OPENAI_API_KEY is set) or OPENAI_API_KEY")

chat_client = _build_chat_client()
# Frontend tools registered with useHumanInTheLoop are automatically available
agent = Agent(
    name="sample_agent",
    instructions="You are a helpful assistant.",
    client=chat_client,
)

app = FastAPI(title="AG-UI Server (Python)")
add_agent_framework_fastapi_endpoint(app=app, agent=agent, path="/")
# endregion
