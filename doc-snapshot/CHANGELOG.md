# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the sync on
`/doc-sync`. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

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

### 07:45 UTC — 6 pages, highest severity high

**High — Copilot Runtime**

`/ms-agent-python/copilot-runtime` · route `/copilot-runtime` · under “Setting Up the Runtime”

41 code lines, 13 prose lines changed. The number of fenced code blocks changed.

````diff
- The runtime is a lightweight server endpoint that you add to your backend. Here's a minimal example using Next.js:
+ The runtime is a lightweight server endpoint that you add to your backend:
- ```ts title="app/api/copilotkit/route.ts"
+ ```npm
+ npm install @copilotkit/runtime
+ ```
+ 
+ Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
````

**High — Headless Threads**

`/ms-agent-python/headless-threads` · route `/threads/headless` · under “Configure your Runtime with Enterprise Intelligence”

18 code lines, 14 prose lines changed.

````diff
- Your `CopilotRuntime` must be connected to Enterprise Intelligence before the thread UI can list and resume conversations. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, keep your existing Enterprise Intelligence Runtime configuration while adding the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
+ Your `CopilotRuntime` must be connected to Enterprise Intelligence before the thread UI can list and resume conversations. That connection is the `intelligence` option below — a `CopilotKitIntelligence` instance. If your app came from a CLI starter, this Runtime configuration is generated for you. Otherwise, follow [Connect your runtime to Intelligence](/ms-agent-python/premium/connect-your-runtime) for the full constructor, then return here to add the headless UI. Thread names are automatically generated by the LLM after the first message — you can disable this with `generateThreadNames: false`.
- import { CopilotRuntime } from "@copilotkit/runtime";
+ import {
+ CopilotKitIntelligence,
+ CopilotRuntime,
+ } from "@copilotkit/runtime/v2";
+ // Without `intelligence` the runtime runs in SSE mode and the thread
````

**High — Quickstart**

`/ms-agent-python/quickstart` · route `/quickstart` · under “Setup Copilot Runtime”

27 code lines, 1 heading, 15 prose lines changed.

````diff
- Create a new API route at `app/api/copilotkit/route.ts`:
+ Create a new API route at `app/api/copilotkit/[[...slug]]/route.ts`:
- ```tsx title="app/api/copilotkit/route.ts"
+ ```tsx title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
- ExperimentalEmptyAdapter,
- copilotRuntimeNextJSAppRouterEndpoint,
- } from "@copilotkit/runtime";
+ createCopilotRuntimeHandler,
````

**High — Thread & History Lifecycle**

`/ms-agent-python/threads-lifecycle` · route `/threads/lifecycle` · under “Scope Rich Threads to the signed-in user” · in a `ts` block

8 code lines, 5 prose lines changed.

````diff
+ import { CopilotKitIntelligence, CopilotRuntime } from "@copilotkit/runtime/v2";
+ 
+ // `apiKey` is the only required field. The key scopes the project, so there is
+ // no separate project or organization id to pass. See Connect your runtime.
+ const intelligence = new CopilotKitIntelligence({
+ apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ 
````

**Low — Inspector**

`/ms-agent-python/inspector` · route `/inspector` · under “What it shows”

21 prose lines changed.

````diff
- The CopilotKit Inspector is a built-in debugging tool that overlays on your app, giving you full visibility into what's happening between your frontend and your agents in real time.
+ The CopilotKit Inspector is a built-in debugging tool that overlays on your app.
+ The first open lands on **Home**. Later opens return to the last pane you used.
+ | **Home** | Project, runtime, services, and CopilotKit news. |
+ | **Memory** | Inspect long-term memory when Intelligence exposes it. |
- The primary navigation groups the Inspector into **Threads**, **Agents**, and
- **Learning**. Threads is the default. Open a real Thread to inspect its
+ The sidebar has three groups: **Home**, **Workbench** (Threads, Memory), and
````

**Low — Overview**

`/ms-agent-python/threads` · route `/threads` · under “Rich Threads”

20 prose lines changed.

````diff
+ <Callout type="info" title="See this in Inspector">
+ Open Inspector on localhost. Stay on **Threads** (it is the default).
+ Real threads appear when Intelligence is on. Enable Intelligence appears when it is off.
+ 
+ More detail: [Inspector](/ms-agent-python/inspector).
+ </Callout>
+ 
+ 
````

---

---

## 2026-08-20

### 11:18 UTC — 4 pages, highest severity none

**None — Rich Threads** · _new pages brought into tracking, not an upstream change_

Four doc pages that already existed upstream were added to `nav-config.ts` and
fetched into the snapshot for the first time, so there is no prior copy to diff
against:

- `/ms-agent-python/threads` · route `/threads`
- `/ms-agent-python/prebuilt-components/copilot-threads-drawer` · route `/threads/drawer`
- `/ms-agent-python/headless-threads` · route `/threads/headless`
- `/ms-agent-python/threads-lifecycle` · route `/threads/lifecycle`

`/ms-agent-python/threads-import` exists upstream and is deliberately left
untracked — see README §8.

---
