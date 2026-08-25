# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the sync on
`/doc-sync`. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-08-21

### 16:05 UTC — 2 pages, highest severity medium

**Medium — Quickstart**

`/ms-agent-python/quickstart` · route `/quickstart` · under “🎉 Start chatting!”

1 heading, 13 prose lines changed.

````diff
+ 
+ <Step>
+ ### Open Inspector and confirm setup
+ 
+ On localhost, click the Inspector button in the corner of the app.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
````

**Low — Inspector**

`/ms-agent-python/inspector` · route `/inspector` · under “Showing or hiding the Inspector”

7 prose lines changed.

````diff
+ `NEXT_PUBLIC_COPILOTKIT_LICENSE_KEY` is a browser-visible publishable key and is
+ a **different credential** from the server-side `INTELLIGENCE_API_KEY` that
+ `copilotkit project select` writes into your `.env`. The server-side key is
+ consumed by the `CopilotKitIntelligence` client described in
+ [Runtime endpoints](/ms-agent-python/backend/runtime-endpoints). Do not substitute one for the
+ other, and never expose the server-side key to the browser.
+ 
````

---

## 2026-08-17

### 13:46 UTC — 1 page, highest severity low

**Low — Readables** · _local snapshot edit, not an upstream change_

`/ms-agent-python/agent-app-context` · route `/agent-app-context` · under “Implementation”

3 prose lines changed.

````diff
- 
+ Check out the [Frontend Data
+ documentation](/integrations/langgraph/agent-app-context)
````
