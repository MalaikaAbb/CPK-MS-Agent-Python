# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the `/doc-sync`
page. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-11-11

### 14:10 UTC — 36 pages, highest severity high

**High — Introduction** · _local snapshot edit, not an upstream change_

`/ms-agent-python` · routes `/`, `/doc-sync` · under “Introduction”

17 code lines, 23 prose lines changed. The number of fenced code blocks changed.

````diff
- ]}
- afterFeatures={
- <OpsPlatformCTA
- variant="card"
- title="Bring your Agent Framework agents to production"
- body="Add persistent threads and the inspector with CopilotKit Intelligence."
- ctaLabel="Create a free account"
- surface="docs_microsoft_agent_framework_overview"
````

**High — Readables**

`/ms-agent-python/agent-app-context` · route `/readables` · under “Consume the data in your AG-UI server” · in a `csharp` block

7 code lines changed.

````diff
+ #pragma warning disable OPENAI001
- .GetChatClient("gpt-5.4-mini")
+ .GetChatClient("gpt-6-luna")
+ .AsIChatClient().AsBuilder()
+ .ConfigureOptions(options => options.RawRepresentationFactory = _ =>
+ new OpenAI.Chat.ChatCompletionOptions { ReasoningEffortLevel = new("none") })
+ .Build()
````

**High — Authentication**

`/ms-agent-python/auth` · route `/auth` · under “Backend Setup” · in a `csharp` block

12 code lines changed.

````diff
+ #pragma warning disable OPENAI001
+ using Microsoft.Extensions.AI;
- var agent = openAI.GetChatClient("gpt-5.4-mini")
+ var agent = openAI.GetChatClient("gpt-6-luna")
+ .AsIChatClient().AsBuilder()
+ .ConfigureOptions(options => options.RawRepresentationFactory = _ =>
+ new OpenAI.Chat.ChatCompletionOptions { ReasoningEffortLevel = new("none") })
+ .Build()
````

**High — Frontend Tools**

`/ms-agent-python/frontend-tools` · route `/frontend-tools` · under “Create your AG-UI server” · in a `csharp` block

12 code lines changed.

````diff
+ #pragma warning disable OPENAI001
+ using Microsoft.Extensions.AI;
- .GetChatClient("gpt-5.4-mini")
+ .GetChatClient("gpt-6-luna")
+ .AsIChatClient().AsBuilder()
+ .ConfigureOptions(options => options.RawRepresentationFactory = _ =>
+ new OpenAI.Chat.ChatCompletionOptions { ReasoningEffortLevel = new("none") })
+ .Build()
````

**High — State Rendering**

`/ms-agent-python/generative-ui/state-rendering` · route `/generative-ui/state-rendering` · under “Stream state from your agent” · in a `csharp` block

11 code lines changed.

````diff
+ #pragma warning disable OPENAI001
- .GetChatClient("gpt-5.4-mini")
+ .GetChatClient("gpt-6-luna")
+ .AsIChatClient().AsBuilder()
+ .ConfigureOptions(options => options.RawRepresentationFactory = _ =>
+ new OpenAI.Chat.ChatCompletionOptions { ReasoningEffortLevel = new("none") })
+ .Build()
- model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o-mini"),
````

**High — Tool Rendering**

`/ms-agent-python/generative-ui/tool-rendering` · route `/generative-ui/tool-rendering` · under “Give your agent a tool to call” · in a `csharp` block

11 code lines changed.

````diff
+ #pragma warning disable OPENAI001
- .GetChatClient("gpt-5.4-mini")
+ .GetChatClient("gpt-6-luna")
+ .AsIChatClient().AsBuilder()
+ .ConfigureOptions(options => options.RawRepresentationFactory = _ =>
+ new OpenAI.Chat.ChatCompletionOptions { ReasoningEffortLevel = new("none") })
+ .Build()
- model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o-mini"),
````

**High — Threads Drawer** · _local snapshot edit, not an upstream change_

`/ms-agent-python/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · under “When should I use this?”

41 code lines, 1 heading, 25 prose lines changed. The number of fenced code blocks changed.

````diff
- server-side). <SignupLink surface="docs_drawer">Get a free developer account</SignupLink> to set that up.
+ server-side). <SignupLink surface="docs_drawer">Start cloud-hosted setup</SignupLink> to create or select a project.
- [scope Rich Threads to the signed-in user](/ms-agent-python/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
+ [scope AG-UI Streams to the signed-in user](/ms-agent-python/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
- body="Get persistent threads and realtime sync on the free Developer tier."
+ body="Connect a cloud-hosted project to get persistent threads and realtime sync."
+ ## Add your own "New conversation" button
+ 
````

**High — Quickstart** · _local snapshot edit, not an upstream change_

`/ms-agent-python/quickstart` · route `/quickstart` · under “Configure your environment” · in a `bash` block

20 code lines changed.

````diff
- OPENAI_CHAT_MODEL_ID=gpt-5.4-mini
+ OPENAI_CHAT_MODEL_ID=gpt-6-luna
- AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=gpt-5.4-mini
+ AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=gpt-6-luna
+ #pragma warning disable OPENAI001
+ using Microsoft.Extensions.AI;
- var agent = openAI.GetChatClient("gpt-5.4-mini").AsAIAgent(
+ var agent = openAI.GetChatClient("gpt-6-luna")
````

**High — Reading agent state**

`/ms-agent-python/shared-state/in-app-agent-read` · route `/shared-state/in-app-agent-read` · under “Define the Agent State” · in a `python` block

4 code lines changed.

````diff
- model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o-mini"),
+ model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-6-luna"),
- model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-4o-mini"),
+ model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-6-luna"),
````

**High — Writing agent state**

`/ms-agent-python/shared-state/in-app-agent-write` · route `/shared-state/in-app-agent-write` · under “Define the Agent State” · in a `python` block

4 code lines changed.

````diff
- model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o-mini"),
+ model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-6-luna"),
- model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-4o-mini"),
+ model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-6-luna"),
````

**High — Overview** · _local snapshot edit, not an upstream change_

`/ms-agent-python/threads` · route `/threads` · under “Rich Threads”

21 code lines, 10 headings, 86 prose lines changed.

````diff
- # Rich Threads
+ # AG-UI Streams
- > Build rich, persistent agent conversations that restore messages, generative UI, multimodal inputs, and live runs across sessions and devices.
+ > Complement any existing thread system with AG-UI Streams. Add the full spectrum of generative UI, multimodal inputs and file uploads, plus reconnection and catch-up after network interruptions and across tabs and devices.
- ## Overview
+ <span id="overview" />
- Rich Threads are the persistence and conversation layer behind your agent's conversations. Users get rich history, continuity across devices, reconnection to active runs, and ready-made thread controls.
+ CopilotKit Intelligence’s AG-UI Streams complement your existing thread system, whether you use LangGraph, Google ADK, Mastra, or a custom backend. Your framework keeps managing the conversation and agent state while Intelligence records the interactions delivered through CopilotKit.
````

**Medium — Copilot Runtime** · _local snapshot edit, not an upstream change_

`/ms-agent-python/copilot-runtime` · route `/copilot-runtime` · under “Runtime languages”

1 heading, 28 prose lines changed.

````diff
+ ## Runtime languages
+ 
+ **TypeScript is the default and most fully featured runtime. It is the only runtime that can run without CopilotKit Intelligence.** Use it for an open-source setup, or connect it to Intelligence when you need its services.
+ 
+ Python, Go, Ruby, and C#/.NET runtimes require an Intelligence project and server-side API key. They work with both [cloud-hosted](/ms-agent-python/intelligence/managed-intelligence-platform) and [self-hosted](/ms-agent-python/intelligence/self-hosting) Intelligence; they do not provide an in-memory or SQLite runner.
+ 
+ | Language | Host | Without Intelligence |
+ | --- | --- | --- |
````

**Medium — Slots** · _local snapshot edit, not an upstream change_

`/ms-agent-python/custom-look-and-feel/slots` · route `/custom-look-and-feel/slots` · under “`messageView` sub-slots”

1 heading, 10 prose lines changed.

````diff
+ | `workSummary`      | The "Working… / Worked for 9s" line when `toolCallDisplay` is `"turn"`.     |
- | `toolCallsView`    | Tool call visualization.           |
+ | `toolCallsView`    | Tool call visualization. Has its own sub-slot (see below). |
+ 
+ ### `toolCallsView` sub-slots
+ 
+ Available via `messageView={{ assistantMessage: { toolCallsView: { ... } } }}`:
+ 
````

**Low — AG-UI**

`/ms-agent-python/ag-ui` · route `/ag-ui` · under “How agents slot into the runtime”

3 prose lines changed.

````diff
+ To write the custom implementation yourself, and keep its own fields through
+ the clone in step 2, see [Write your own AG-UI agent](/ms-agent-python/backend/custom-ag-ui-agent).
+ 
````

**Low — Headless Threads** · _local snapshot edit, not an upstream change_

`/ms-agent-python/headless-threads` · route `/threads/headless` · under “Headless Threads”

48 prose lines changed.

````diff
+ Intelligence’s AG-UI streams power the history and delivery behind this custom UI. Use `useThreads` to list and manage conversations, and pass their `threadId` to your chat.
+ 
- CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
+ The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
- <OpsPlatformCTA
- variant="inline"
- title="Threads run in CopilotKit Intelligence"
- body="Get persistent threads and realtime sync on the free Developer tier."
````

**Low — Inspector** · _local snapshot edit, not an upstream change_

`/ms-agent-python/inspector` · route `/inspector` · under “Follow and reproduce a run”

2 prose lines changed.

````diff
- [Thread](/ms-agent-python/threads) and choose **Try from here**. Inspector copies its
+ [Thread](/ms-agent-python/AG-UI-Streams) and choose **Try from here**. Inspector copies its
````

**Info — Message history**

`/ms-agent-python/backend/message-history` · route `/backend/message-history`

Now tracked for the first time.

**Info — Jev: fast generative UI**

`/ms-agent-python/cookbook/jev-generative-ui` · route `/cookbook/jev-generative-ui`

Now tracked for the first time.

**Info — Markdown Rendering**

`/ms-agent-python/custom-look-and-feel/markdown` · route `/custom-look-and-feel/markdown`

Now tracked for the first time.

**Info — A2UI · Advanced**

`/ms-agent-python/generative-ui/a2ui/advanced` · route `/generative-ui/a2ui/advanced`

Now tracked for the first time.

**Info — A2UI - Dynamic Schema**

`/ms-agent-python/generative-ui/a2ui/dynamic-schema` · route `/generative-ui/a2ui/dynamic-schema`

Now tracked for the first time.

**Info — A2UI · Fixed Schema**

`/ms-agent-python/generative-ui/a2ui/fixed-schema` · route `/generative-ui/a2ui/fixed-schema`

Now tracked for the first time.

**Info — A2UI · Styling**

`/ms-agent-python/generative-ui/a2ui/styling` · route `/generative-ui/a2ui/styling`

Now tracked for the first time.

**Info — Frontend Cards**

`/ms-agent-python/generative-ui/frontend-cards` · route `/generative-ui/frontend-cards`

Now tracked for the first time.

**Info — Hashbrown**

`/ms-agent-python/generative-ui/hashbrown` · route `/generative-ui/hashbrown`

Now tracked for the first time.

**Info — JSON Render**

`/ms-agent-python/generative-ui/json-render` · route `/generative-ui/json-render`

Now tracked for the first time.

**Info — Open Generative UI**

`/ms-agent-python/generative-ui/open-generative-ui` · route `/generative-ui/open-generative-ui`

Now tracked for the first time.

**Info — Components as Tools**

`/ms-agent-python/generative-ui/tool-based` · route `/generative-ui/tool-based`

Now tracked for the first time.

**Info — HITL Overview**

`/ms-agent-python/human-in-the-loop` · route `/human-in-the-loop`

Now tracked for the first time.

**Info — Governed Actions**

`/ms-agent-python/human-in-the-loop/governed-actions` · route `/human-in-the-loop/governed-actions`

Now tracked for the first time.

**Info — Interrupt-based**

`/ms-agent-python/human-in-the-loop/interrupt-flow` · route `/human-in-the-loop/interrupt-flow`

Now tracked for the first time.

**Info — Tool-based**

`/ms-agent-python/human-in-the-loop/tool-based` · route `/human-in-the-loop/tool-based`

Now tracked for the first time.

**Info — Skill delivery**

`/ms-agent-python/intelligence/learned-skills` · route `/intelligence/learned-skills`

Now tracked for the first time.

**Info — User Memories**

`/ms-agent-python/intelligence/memories` · route `/intelligence/memories`

Now tracked for the first time.

**Info — Automatic Learning**

`/ms-agent-python/learning` · route `/learning`

Now tracked for the first time.

**Info — WebMCP**

`/ms-agent-python/webmcp` · route `/webmcp`

Now tracked for the first time.

---

## 2026-09-24

### 07:28 UTC — 2 pages, highest severity medium · _npm run drift:sync_

**Medium — /ms-agent-python/intelligence/memories**

`/ms-agent-python/intelligence/memories` · route `/intelligence/memories` · `ms-agent-python__intelligence__memories.md`

Headings / Structure changed. Hash ab76ca53 ➔ 4a49da0c.

````diff
- ## What is a memory?
- A memory is a short, durable statement about a user or a project, stored outside
- any single thread. "Prefers concise status updates" is a memory. The forty
- messages that revealed the preference are a thread.
+ ## Start with your coding agent
+ Copy this prompt into your coding agent to inspect your existing CopilotKit app and configure long-term memory for your users. Prefer to work through the setup yourself? Follow the manual steps below.
+ ### Copy this prompt into your coding agent
+ ```text
  … region truncated
````

**Medium — /ms-agent-python/learning**

`/ms-agent-python/learning` · route `/learning` · `ms-agent-python__learning.md`

Headings / Structure changed. Hash a78b7305 ➔ 60db9be2.

````diff
- ## How Automatic Learning works
- Learning starts with a container, which groups Threads from the same kind of work. Intelligence analyzes completed runs in that container and summarizes recurring patterns as Insights.
- When a pattern can be reused, Learning proposes a Skill. You review the supporting Threads and decide whether to publish it. A published Skill is a versioned set of instructions that you load into your agent; Learning does not change the model itself.
- Automatic Learning checks eligible containers on a daily schedule. After you approve a skill, [skill delivery](/ms-agent-python/intelligence/learned-skills) makes it available to connected agents. A scheduled run does not approve skills. Turning on delivery does not connect your agent for you.
+ ## Start with your coding agent
+ Copy this prompt into your coding agent to inspect your existing app and configure Automatic Learning for one focused workflow. Prefer to work through the setup yourself? Follow the manual steps below.
+ #### Copy this prompt into your coding agent
+ ```text
  … region truncated
````

---

---

---

## 2026-09-23

### 07:50 UTC — 16 pages, highest severity high · _npm run drift:sync_

**Low — /ms-agent-python/backend/message-history**

`/ms-agent-python/backend/message-history` · route `/backend/message-history` · `ms-agent-python__backend__message-history.md`

Prose / text phrasing updated. Hash abc21ea8 ➔ bfd05692.

````diff
- whole. `selfManagedAgents` belongs to the Enterprise Intelligence tier, so
+ whole. `selfManagedAgents` belongs to the Enterprise plan, so
````

**Medium — /ms-agent-python/custom-look-and-feel/headless-ui**

`/ms-agent-python/custom-look-and-feel/headless-ui` · route `/custom-look-and-feel/headless-ui` · `ms-agent-python__custom-look-and-feel__headless-ui.md`

Headings / Structure changed. Hash a21a10b7 ➔ a3881f0b.

````diff
- # Fully Headless UI
+ # Headless UI
````

**High — /ms-agent-python/headless-threads**

`/ms-agent-python/headless-threads` · route `/threads/headless` · `ms-agent-python__headless-threads.md`

Code block content changed. Hash 7b3469fd ➔ 63655c88.

````diff
- Your `CopilotRuntime` must be connected to CopilotKit Intelligence before the thread UI can list and resume conversations. That connection is the `intelligence` option below — a `CopilotKitIntelligence` instance. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, follow [Connect your runtime to Intelligence](/ms-agent-python/intelligence/connect-your-runtime) for the full constructor, then return here to add the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
- ```typescript title="server.ts"
- import {
- CopilotKitIntelligence,
+ Your `CopilotRuntime` must be connected to CopilotKit Intelligence before the thread UI can list and resume conversations. That connection is the `intelligence` option below — a `CopilotKitIntelligence` instance. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, follow [Connect your runtime to Intelligence](/ms-agent-python/intelligence/quickstart) for the full constructor, then return here to add the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
+ ```typescript title="server.ts"
+ import {
+ CopilotKitIntelligence,
  … region truncated
````

**Low — /ms-agent-python/inspector**

`/ms-agent-python/inspector` · route `/inspector` · `ms-agent-python__inspector.md`

Prose / text phrasing updated. Hash 8d2065c6 ➔ 49511d56.

````diff
- | Your goal                                      | Start here                          |
- | ---------------------------------------------- | ----------------------------------- |
- | Confirm that CopilotKit is connected           | **Home**, then **Agent**            |
- | Find out why a run or tool failed              | The red launcher or error pill      |
+ | Your goal                                      | Start here                              |
+ | ---------------------------------------------- | --------------------------------------- |
+ | Confirm that CopilotKit is connected           | **Home**, then **Agent**                |
+ | Find out why a run or tool failed              | The red launcher or error pill          |
  … region truncated
````

**Low — /ms-agent-python/prebuilt-components/copilot-threads-drawer**

`/ms-agent-python/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · `ms-agent-python__prebuilt-components__copilot-threads-drawer.md`

Prose / text phrasing updated. Hash 0b056af7 ➔ d0322c58.

````diff
- server-side). <SignupLink surface="docs_drawer">Start managed onboarding</SignupLink> to create or select a project.
- For multi-user applications, configure the Runtime to
- [scope Rich Threads to the signed-in user](/ms-agent-python/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
- <OpsPlatformCTA
+ server-side). <SignupLink surface="docs_drawer">Start cloud-hosted setup</SignupLink> to create or select a project.
+ For multi-user applications, configure the Runtime to
+ [scope Rich Threads to the signed-in user](/ms-agent-python/threads-lifecycle#scope-rich-threads-to-the-signed-in-user).
+ <OpsPlatformCTA
  … region truncated
````

**High — /ms-agent-python/programmatic-control**

`/ms-agent-python/programmatic-control` · route `/programmatic-control` · `ms-agent-python__programmatic-control.md`

Code block content changed. Hash 72bda00a ➔ e0cd246c.

````diff
- title="Fully Headless UI"
+ title="Headless UI"
````

**High — /ms-agent-python/threads**

`/ms-agent-python/threads` · route `/threads` · `ms-agent-python__threads.md`

Code block content changed. Hash fc5bb80b ➔ dab426d9.

````diff
- <div
- aria-label="A support workspace using Threads Drawer to move between customer conversations while CopilotChat renders the selected case details."
- className="shell-docs-radius-surface relative mb-4 overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] shadow-[0px_16px_24px_-8px_rgba(1,5,7,0.12)] ring-1 ring-inset ring-white/70 dark:shadow-[0px_16px_32px_-10px_rgba(0,0,0,0.45)] dark:ring-white/10"
- >
+ ## Overview
+ Rich Threads are the persistence and conversation layer behind your agent's conversations. Users get rich history, continuity across devices, reconnection to active runs, and ready-made thread controls.
+ <div
+ aria-label="A support workspace using Threads Drawer to move between customer conversations while CopilotChat renders the selected case details."
  … region truncated
````

**High — /ms-agent-python/threads-lifecycle**

---
