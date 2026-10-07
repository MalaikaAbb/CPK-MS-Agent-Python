"""A2UI fixed schema — docs.copilotkit.ai/ms-agent-python/generative-ui/a2ui/fixed-schema

Both regions are the page's two `src/agents/a2ui_fixed.py` blocks, verbatim and
in page order. `main.py` mounts `agent` at `/a2ui-fixed-schema`.

`a2ui_schemas/flight_schema.json` is NOT printed on the page (only its Button
fragment is). It is copied unchanged from the `ms-agent-python::a2ui-fixed-schema`
demo bundle, which is not embedded on this page.
"""

from __future__ import annotations

# harness glue (not on the page): the published snippet reads a module-level
# `chat_client` it never defines. This repo's shared builder supplies it.
from chat_client import build_chat_client

chat_client = build_chat_client()

# region a2ui-fixed-tool
import json
from pathlib import Path
from typing import Annotated

from agent_framework import tool
from pydantic import Field

CATALOG_ID = "copilotkit://flight-fixed-catalog"
SURFACE_ID = "flight-fixed-schema"

FLIGHT_SCHEMA = json.load(
    open(Path(__file__).parent / "a2ui_schemas" / "flight_schema.json")
)


@tool(name="display_flight", description="Show a flight card for the given trip.")
def display_flight(
    origin: Annotated[str, Field(description="3-letter origin code, e.g. 'SFO'.")],
    destination: Annotated[str, Field(description="3-letter destination code.")],
    airline: Annotated[str, Field(description="Airline name.")],
    price: Annotated[str, Field(description="Price string, e.g. '$289'.")],
) -> str:
    """Show a flight card for the given trip."""
    ops = [
        {"version": "v0.9", "createSurface": {"surfaceId": SURFACE_ID, "catalogId": CATALOG_ID}},
        {"version": "v0.9", "updateComponents": {"surfaceId": SURFACE_ID, "components": FLIGHT_SCHEMA}},
        {"version": "v0.9", "updateDataModel": {"surfaceId": SURFACE_ID, "path": "/", "value": {"origin": origin, "destination": destination, "airline": airline, "price": price}}},
    ]
    return json.dumps({"a2ui_operations": ops})
# endregion

# region a2ui-fixed-agent
from agent_framework import Agent
from agent_framework_ag_ui import AgentFrameworkAgent

base_agent = Agent(
    client=chat_client,
    name="a2ui_fixed_agent",
    instructions="You help users find flights. Call `display_flight` with origin, destination, airline, and price.",
    tools=[display_flight],
)

agent = AgentFrameworkAgent(agent=base_agent)
# endregion
