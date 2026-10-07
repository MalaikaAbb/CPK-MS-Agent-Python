# Doc drift changelog

What the CopilotKit docs changed under this repo, written by whichever sync
ran — the `/doc-sync` page or `npm run drift:sync`. Only pages that actually
moved are recorded — a sync that finds everything unchanged writes nothing
here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-08-26

### 10:41 UTC — 8 pages, highest severity high

**High — Quickstart**

`/ms-agent-python/quickstart` · route `/quickstart` · under “Quickstart”

15 code lines, 26 prose lines changed. The number of fenced code blocks changed.

````diff
- body="Add persistent threads and the inspector with the Enterprise Intelligence Platform."
+ body="Add persistent threads and the inspector with CopilotKit Intelligence."
- <SignupLink surface="docs_microsoft_agent_framework_quickstart_step1">Sign up for a free developer account</SignupLink> on our Enterprise Intelligence Platform to get a license key. You'll use it later to enable persistent threads and the inspector.
+ <SignupLink surface="docs_microsoft_agent_framework_quickstart_step1">Sign up for a free developer account</SignupLink> for CopilotKit Intelligence to get a license key. You'll use it later to enable persistent threads and the inspector.
- - **Enterprise Intelligence Platform** — persistent threads and the inspector. Choose **Yes** to scaffold a project pre-wired for the platform (the CLI walks you through sign-up, or you can [create an account](https://dashboard.operations.copilotkit.ai/?utm_source=docs&utm_medium=cta&utm_campaign=intelligence&utm_content=docs_cli_prompt) first), or **No** for a standard Microsoft Agent Framework setup.
+ - **CopilotKit Intelligence** — persistent threads and the inspector. Choose **Yes** to scaffold a project pre-wired for the platform (the CLI walks you through sign-up, or you can [create an account](https://dashboard.operations.copilotkit.ai/?utm_source=docs&utm_medium=cta&utm_campaign=intelligence&utm_content=docs_cli_prompt) first), or **No** for a standard Microsoft Agent Framework setup.
+ CopilotKitIntelligence,
- InMemoryAgentRunner,
````

**High — Overview**

`/ms-agent-python/threads` · route `/threads` · under “Get started”

6 code lines, 2 headings, 24 prose lines changed.

````diff
- Create a new CopilotKit app connected to cloud-hosted Enterprise Intelligence. Your application and CopilotKit Runtime run locally while Enterprise Intelligence stores and synchronizes Rich Threads.
+ Create a new CopilotKit app connected to cloud-hosted CopilotKit Intelligence. Your application and CopilotKit Runtime run locally while CopilotKit Intelligence stores and synchronizes Rich Threads.
- Enterprise Intelligence.
+ CopilotKit Intelligence.
- sign-in and Enterprise Intelligence project selection when needed. Use the
+ sign-in and CopilotKit Intelligence project selection when needed. Use the
- manual Enterprise Intelligence environment configuration. Do not set up a local
+ manual CopilotKit Intelligence environment configuration. Do not set up a local
````

**Medium — Copilot Runtime**

`/ms-agent-python/copilot-runtime` · route `/copilot-runtime` · under “Enterprise Intelligence Platform”

2 headings, 2 prose lines changed.

````diff
- ### Enterprise Intelligence Platform
+ ### CopilotKit Intelligence
- Features like [threads](/ms-agent-python/threads) and the [inspector](/ms-agent-python/inspector) are provided through the runtime and the Enterprise Intelligence Platform. These give you conversation persistence and debugging capabilities out of the box.
+ Features like [threads](/ms-agent-python/threads) and the [inspector](/ms-agent-python/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
````

**Medium — Headless Threads**

`/ms-agent-python/headless-threads` · route `/threads/headless` · under “What is this?”

2 headings, 14 prose lines changed.

````diff
- CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes Enterprise Intelligence Platform threads with realtime synchronization via WebSocket. Threads work with any agent framework — the Enterprise Intelligence Platform stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
+ CopilotKit Rich Threads enable persistent, resumable multi-turn conversations. The `useThreads` hook lists, creates, renames, archives, and deletes CopilotKit Intelligence threads with realtime synchronization via WebSocket. Threads work with any agent framework — CopilotKit Intelligence stores conversation history server-side, so users can close their browser and pick up where they left off. It does not list or mutate native LangGraph, ADK, or other framework stores unless your backend explicitly bridges those systems. Thread metadata updates (renames, archives, new threads) appear on connected clients without polling.
- title="Threads run on the Enterprise Intelligence Platform"
+ title="Threads run in CopilotKit Intelligence"
- - A CopilotKit application connected to Enterprise Intelligence
+ - A CopilotKit application connected to CopilotKit Intelligence
- Enterprise Intelligence. To move historical Google ADK or LangGraph
+ CopilotKit Intelligence. To move historical Google ADK or LangGraph
````

**Low — Introduction**

`/ms-agent-python` · routes `/`, `/doc-sync` · under “Introduction”

2 prose lines changed.

````diff
- body="Add persistent threads and the inspector with the Enterprise Intelligence Platform."
+ body="Add persistent threads and the inspector with CopilotKit Intelligence."
````

**Low — AG-UI**

`/ms-agent-python/ag-ui` · route `/ag-ui` · under “The proxy pattern”

2 prose lines changed.

````diff
- routing, and CopilotKit Enterprise Intelligence without changing how the
+ routing, and CopilotKit Intelligence without changing how the
````

**Low — Threads Drawer**

`/ms-agent-python/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer` · under “When should I use this?”

4 prose lines changed.

````diff
- It requires the Enterprise Intelligence Platform (threads are stored and synced
+ It requires CopilotKit Intelligence (threads are stored and synced
- title="Threads run on the Enterprise Intelligence Platform"
+ title="Threads run in CopilotKit Intelligence"
````

**Low — Thread & History Lifecycle**

`/ms-agent-python/threads-lifecycle` · route `/threads/lifecycle` · under “The lifecycle at a glance”

12 prose lines changed.

````diff
- 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (the Enterprise Intelligence Platform, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [Threads & Persistence Architecture](/ms-agent-python/premium/threads-explained) for the full server-side model.
+ 2. **Run.** Messages and tool calls stream under that `threadId`. If a server-side store is configured (CopilotKit Intelligence, or a persisting `AgentRunner`), they are persisted as they happen so the thread can be replayed later. A runtime with no persistence layer keeps nothing server-side. See [Threads & Persistence Architecture](/ms-agent-python/premium/threads-explained) for the full server-side model.
- Replay requires a **server-side store to replay from**: the Enterprise Intelligence Platform, or a persisting `AgentRunner` (e.g. the SQLite runner). A self-hosted runtime with no persistence layer has nothing to replay, so `connectAgent()` returns an empty stream and the conversation starts blank. If history isn't restoring, check that a store is configured, not the client code. The [Persistence Architecture](/ms-agent-python/premium/threads-explained) page covers how replay works server-side.
+ Replay requires a **server-side store to replay from**: CopilotKit Intelligence, or a persisting `AgentRunner` (e.g. the SQLite runner). A self-hosted runtime with no persistence layer has nothing to replay, so `connectAgent()` returns an empty stream and the conversation starts blank. If history isn't restoring, check that a store is configured, not the client code. The [Persistence Architecture](/ms-agent-python/premium/threads-explained) page covers how replay works server-side.
- Enterprise Intelligence combines that application user identity with the
+ CopilotKit Intelligence combines that application user identity with the
- | **CopilotKit threads** | Conversation list + full AG-UI event history (messages, tool calls, state), with realtime sync | The Enterprise Intelligence Platform, via `useThreads` |
+ | **CopilotKit threads** | Conversation list + full AG-UI event history (messages, tool calls, state), with realtime sync | CopilotKit Intelligence, via `useThreads` |
````

---

## 2026-08-24

### 07:49 UTC — 1 page, highest severity high · _npm run drift:sync_

**High — /ms-agent-python/intelligence/learned-skills**

`/ms-agent-python/intelligence/learned-skills` · route `/intelligence/learned-skills` · `ms-agent-python__intelligence__learned-skills.md`

Code fence count changed. Hash ca354076 ➔ 048169d9.

````diff
- Skill delivery makes one Learning container's published skills available to an agent without another CLI download or process restart. A framework adapter adds an alphabetical catalog and two tools.
- <Image
- src="/images/cloud-hosted/cloud-hosted-skill-delivery.png"
- alt="The Skills tab of a Learning container in cloud-hosted Intelligence. The Skill delivery toggle is on, and skill candidates wait for review."
+ Skill delivery makes published skills from one or more Learning containers available to an agent without another CLI download or process restart. A framework adapter adds an alphabetical catalog and two tools.
+ <Image
+ src="/images/cloud-hosted/cloud-hosted-skill-delivery.png"
+ alt="The Skills tab of a Learning container in cloud-hosted Intelligence. The Skill delivery toggle is on, and skill candidates wait for review."
  … region truncated
````

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

## 2026-08-20

Code block content changed. Hash e5a59613 ➔ 7bb48f64.

````diff
- [Connect your runtime to Intelligence](/ms-agent-python/intelligence/connect-your-runtime) covers the
+ [Connect your runtime to Intelligence](/ms-agent-python/intelligence/quickstart) covers the
````

**High — /ms-agent-python/quickstart**

`/ms-agent-python/quickstart` · route `/quickstart` · `ms-agent-python__quickstart.md`

Code block content changed. Hash 48619c1e ➔ 301ed030.

---
