# Introduction

> Bring your Microsoft Agent Framework agents to your users with CopilotKit via AG-UI.

<FrameworkOverview
  frameworkName="Microsoft Agent Framework"
  frameworkIcon={<MicrosoftIcon className="h-12 w-12" />}
  header="Bring your Microsoft Agent Framework agents to your users"
  subheader="The Microsoft Agent Framework runs your agents. CopilotKit gives them a surface your users can see, interrupt and steer."
  guideLink="/microsoft-agent-framework/quickstart"
  initCommand="npx copilotkit@latest init"
  lede="The Microsoft Agent Framework gives you the agent: tools, threads and the host that runs them, in Python or .NET. What it does not give you is the surface. Somewhere for the conversation to happen, a way to show the run while it is running, and a moment for a person to step in. Each capability below builds on something your agent already does."
  supportedFeatures={[
    {
      title: "Generative UI",
      iconKey: "paintbrush",
      description:
        "Your agent calls tools and updates state as it runs. CopilotKit streams both to the browser and renders them as React components your users watch update while the agent works.",
      documentationLink: "/microsoft-agent-framework/generative-ui"
    },
    {
      title: "Human-in-the-loop",
      iconKey: "user",
      description:
        "Your agent can pause for a decision, or call a tool that lives in the browser. CopilotKit renders your own UI for either and resumes the run with the user's answer.",
      documentationLink: "/microsoft-agent-framework/human-in-the-loop"
    },
    {
      title: "Shared state",
      iconKey: "repeat",
      description:
        "Threads carry state between turns on the server. CopilotKit mirrors it into your app and back, so a user edit and an agent write land in the same place.",
      documentationLink: "/microsoft-agent-framework/shared-state"
    }
  ]}
  capabilitiesFootnote={{
    text: "Chat surfaces, headless UI, frontend tools and multi-agent flows work with the Microsoft Agent Framework too.",
    linkLabel: "And more",
    href: "/microsoft-agent-framework/build-with-agents"
  }}
  connect={{
    intro:
      "Your agent keeps running as its own service, with the AG-UI bridge from agent_framework_ag_ui in front of it. CopilotKit reaches that service over HTTP, so nothing inside the agent changes.",
    filename: "app/api/copilotkit/route.ts",
    language: "ts",
    guideLink: "/microsoft-agent-framework/quickstart"
  }}
  showcase={{
    integration: "ms-agent-python",
    integrationBySlug: {
      "ms-agent-python": "ms-agent-python",
      "ms-agent-dotnet": "ms-agent-dotnet",
      "ms-agent-harness-dotnet": "ms-agent-harness-dotnet"
    },
  ]}
  afterFeatures={
    <OpsPlatformCTA
      variant="card"
      title="Bring your Agent Framework agents to production"
      body="Add persistent threads and the inspector with CopilotKit Intelligence."
      ctaLabel="Create a free account"
      surface="docs_microsoft_agent_framework_overview"
    />
  }
  tutorialLink="/microsoft-agent-framework/quickstart"
/>

export const GET = handler;
export const POST = handler;
```

</FrameworkOverview>
