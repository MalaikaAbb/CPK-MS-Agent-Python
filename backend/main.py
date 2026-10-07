"""Serves the Microsoft Agent Framework agents over AG-UI.

`add_agent_framework_fastapi_endpoint` mounts an agent at a path on a normal
FastAPI app. The Quickstart mounts one agent at `/`; this harness mounts three,
because the Shared State and State Rendering pages each define their own
`state_schema` and cannot share one agent (see `agents.py`).

The optional bearer-token middleware is the Authentication page's Python
sample. It stays inert unless `AUTH_BEARER_TOKEN` is set, so the app runs
unauthenticated by default.
"""

from __future__ import annotations

import os
from pathlib import Path

import uvicorn
from agent_framework.ag_ui import add_agent_framework_fastapi_endpoint
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware

# Prefer backend/.env (what the docs describe as agent/.env), then fall back to
# a repo-root .env so a single top-level file also works.
_BACKEND_ENV = Path(__file__).parent / ".env"
_ROOT_ENV = Path(__file__).parent.parent / ".env"
load_dotenv(_BACKEND_ENV)
load_dotenv(_ROOT_ENV, override=False)

from agents import (  # noqa: E402 - must follow load_dotenv
    create_main_agent,
    create_sample_agent,
    create_search_agent,
)
from chat_client import build_chat_client  # noqa: E402

PORT = int(os.getenv("AGENT_PORT", "8000"))

_ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "AGENT_CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]

if not (os.getenv("OPENAI_API_KEY") or os.getenv("AZURE_OPENAI_ENDPOINT")):
    raise SystemExit(
        "No model provider configured.\n"
        f"Create {_BACKEND_ENV} (or a repo-root .env) from .env.example and set "
        "OPENAI_API_KEY, or AZURE_OPENAI_ENDPOINT for Azure OpenAI."
    )

app = FastAPI(title="CopilotKit + Microsoft Agent Framework (Python)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# [1] authentication: bearer middleware
# [!code highlight]
# region auth-middleware
REQUIRED_BEARER_TOKEN = os.getenv("AUTH_BEARER_TOKEN")

AGENT_PATHS = {
    "/",
    "/sample_agent",
    "/search_agent",
    # Added with the Generative UI / HITL / Multi-agent pages (harness glue —
    # the docs' demo bundle never publishes its `agent_server.py`).
    "/gen-ui-tool-based",
    "/declarative-gen-ui",
    "/a2ui-fixed-schema",
    "/byoc-json-render",
    "/byoc-hashbrown",
    "/open-gen-ui",
    "/open-gen-ui-advanced",
    "/interrupt_flow",
    "/subagents",
}


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    # Protect the AG-UI endpoints if a token is configured.
    if REQUIRED_BEARER_TOKEN and request.url.path in AGENT_PATHS:
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token"
            )
        token = auth_header.split(" ", 1)[1].strip()
        if token != REQUIRED_BEARER_TOKEN:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
    return await call_next(request)
# endregion


@app.get("/health")
async def health() -> dict[str, object]:
    """Not part of the docs — lets the app's home page report reachability."""
    return {"status": "ok", "agents": sorted(AGENT_PATHS), "authRequired": bool(REQUIRED_BEARER_TOKEN)}


chat_client = build_chat_client()

# [2] quickstart: agent endpoint
# [!code highlight]
# Quickstart / Tool Rendering / everything with no state schema.
add_agent_framework_fastapi_endpoint(app=app, agent=create_main_agent(chat_client), path="/")

# Shared State read + write, and Readables.
#
# `default_state` seeds the language before the first run. The docs seed it from
# the frontend with `useAgent({ initialState })`, but that prop does not exist on
# `useAgent` in @copilotkit/react-core 1.66.2 — `default_state` here is the
# shipped equivalent.
# [3] shared state: agent endpoint
# [!code highlight]
add_agent_framework_fastapi_endpoint(
    app=app,
    agent=create_sample_agent(chat_client),
    path="/sample_agent",
    default_state={"language": "english"},
)

# [4] state rendering: agent endpoint
# [!code highlight]
# State Rendering.
add_agent_framework_fastapi_endpoint(
    app=app, agent=create_search_agent(chat_client), path="/search_agent"
)

# --------------------------------------------------------------------------
# Generative UI, Human-in-the-loop, and Multi-agent pages.
#
# Every agent below lives in `doc_agents/`. The paths are harness glue: they
# are the paths the docs' demo runtime routes call (`/byoc-json-render`,
# `/open-gen-ui`, `/subagents`, ...), but the server file that mounts them is
# not published. Prose-only pages get a path named after their demo id.
# --------------------------------------------------------------------------
from doc_agents import a2ui_dynamic, a2ui_fixed, chart_agent, interrupt_flow  # noqa: E402
from doc_agents.byoc_hashbrown_agent import create_byoc_hashbrown_agent  # noqa: E402
from doc_agents.byoc_json_render_agent import create_byoc_json_render_agent  # noqa: E402
from doc_agents.open_gen_ui_advanced_agent import (  # noqa: E402
    create_open_gen_ui_advanced_agent,
)
from doc_agents.open_gen_ui_agent import create_open_gen_ui_agent  # noqa: E402
from doc_agents.subagents_agent import create_subagents_agent  # noqa: E402

# region gen-ui-mounts
add_agent_framework_fastapi_endpoint(app=app, agent=chart_agent.agent, path="/gen-ui-tool-based")
# Dynamic schema: no `a2ui_config` — see doc_agents/a2ui_dynamic.py. (It would
# be ignored anyway: the endpoint only forwards a2ui_config when it wraps a bare
# agent, and the page's module already returns an AgentFrameworkAgent.)
add_agent_framework_fastapi_endpoint(app=app, agent=a2ui_dynamic.agent, path="/declarative-gen-ui")
add_agent_framework_fastapi_endpoint(app=app, agent=a2ui_fixed.agent, path="/a2ui-fixed-schema")
add_agent_framework_fastapi_endpoint(
    app=app, agent=create_byoc_json_render_agent(chat_client), path="/byoc-json-render"
)
add_agent_framework_fastapi_endpoint(
    app=app, agent=create_byoc_hashbrown_agent(chat_client), path="/byoc-hashbrown"
)
add_agent_framework_fastapi_endpoint(
    app=app, agent=create_open_gen_ui_agent(chat_client), path="/open-gen-ui"
)
add_agent_framework_fastapi_endpoint(
    app=app,
    agent=create_open_gen_ui_advanced_agent(chat_client),
    path="/open-gen-ui-advanced",
)
# endregion

# region hitl-mounts
add_agent_framework_fastapi_endpoint(app=app, agent=interrupt_flow.agent, path="/interrupt_flow")
# endregion

# region multi-agent-mounts
add_agent_framework_fastapi_endpoint(
    app=app, agent=create_subagents_agent(chat_client), path="/subagents"
)
# endregion

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
