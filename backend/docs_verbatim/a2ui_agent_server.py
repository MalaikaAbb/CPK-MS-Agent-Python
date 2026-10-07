# Verbatim from docs.copilotkit.ai/ms-agent-python/generative-ui/a2ui/dynamic-schema
# ("Backend — recovery and other policy"). NOT imported: `app` and
# `a2ui_recovery_agent` are never defined on the page.

# region a2ui-recovery-endpoint
add_agent_framework_fastapi_endpoint(
    app=app,
    agent=a2ui_recovery_agent,
    path="/a2ui_recovery",
    a2ui_config={
        "recovery": {"maxAttempts": 3},
        "default_catalog_id": "declarative-gen-ui-catalog",
    },
)
# endregion
