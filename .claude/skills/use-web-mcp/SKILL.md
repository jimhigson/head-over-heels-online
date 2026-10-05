---
name: use-web-mcp
description: Get an agent talking to the Head over Heels game's and level editor's own webmcp tools - which builds expose them, connecting to the user's everyday Chrome or launching a dedicated webmcp-enabled one (incl. first-time setup on a new machine), pointing the chrome-devtools MCP at it, opening the app, and the calling pattern. Also lists the game's tools. For using the editor's tools, follow up with the editor-webmcp skill (or the editor's getUsageSkill tool).
---

The game and the level editor register **webmcp** tools with the browser (`document.modelContext.registerTool`). They give an agent direct, typed access to the app - no DOM scraping, no `_e2e_store` visual-regression build needed.

## Where the tools exist

| App | Enabled | Build |
|---|---|---|
| Level editor | always - not opt-in | every build, dev **and production** |
| Game | always - not opt-in | dev builds only (`import.meta.env.DEV`); never production |

A browser without webmcp registers nothing - the apps do without it (the game logs a `console.warn`).

- **Editor tools**: once connected, see the `editor-webmcp` skill, or call the editor's `getUsageSkill` tool, which returns the same guide.
- **Game tools** (`src/webMcp/createGameWebMcpTools.ts`): `getReduxState`, `dispatchAction`, `getActionLog` (shared, `src/webMcp/reduxWebMcpTools.ts`), plus `pressAction` (`action`, `holdMs?` - a game input action such as `jump`), `getMenuStack`, `getGameState` (`path?` into the running engine's state).

## 1. Connect to a webmcp Chrome

Stock Chrome has webmcp behind the `enable-webmcp-testing` flag, and the chrome-devtools MCP's own `--isolated` Chrome is a throwaway Puppeteer profile without it. There are two setups; the first lets the agent see the user's own tabs.

### Option A (preferred): the user's everyday Chrome

One-off setup per machine, done by the user in their normal Chrome:

1. `chrome://inspect/#remote-debugging` - turn remote debugging on. Chrome then listens on `127.0.0.1:9222` (check: `lsof -nP -iTCP:9222 -sTCP:LISTEN`).
2. `chrome://flags/#enable-webmcp-testing` - enable, then relaunch Chrome.
3. In `~/.claude.json`, set `mcpServers["chrome-devtools"].args` to include `--wsEndpoint=ws://127.0.0.1:9222/devtools/browser` and `--categoryExperimentalThirdParty` (not `--browserUrl` / `--isolated` / `--autoConnect`), then `/mcp` → reconnect `chrome-devtools`.

- The ws url needs no browser GUID - the bare `/devtools/browser` path is accepted.
- `--browserUrl=http://127.0.0.1:9222` does not work: in this mode Chrome serves no `/json/version`.
- `--autoConnect` does not work on macOS without Full Disk Access: it reads `~/Library/Application Support/Google/Chrome/DevToolsActivePort`, which macOS privacy protection blocks ("Operation not permitted") for processes under the terminal/IDE. The ws endpoint avoids reading that file.
- Chrome may ask the user to approve the debugging connection after a relaunch.

### Option B: a dedicated debug Chrome

A separate, persistent profile with the flag pre-set and a real debugging port:

```sh
PROFILE="$HOME/.cache/chrome-devtools-mcp/webmcp-profile"
mkdir -p "$PROFILE"
[ -f "$PROFILE/Local State" ] || echo '{"browser":{"enabled_labs_experiments":["enable-webmcp-testing@1"]}}' > "$PROFILE/Local State"
open -na "Google Chrome" --args --remote-debugging-port=9333 --user-data-dir="$PROFILE" --no-first-run --no-default-browser-check http://localhost:5210/
curl -s http://127.0.0.1:9333/json/version   # confirms the port is up
```

If it is already running (`curl` answers), reuse it.

Point an MCP server at it with `--browserUrl=http://127.0.0.1:9333` (eg a second `chrome-devtools-9333` entry in `~/.claude.json` alongside Option A's), then `/mcp` → reconnect.

## 2. Check the connection

- `list_pages` lists the browser's tabs; page ids change whenever Chrome relaunches or the MCP reconnects.
- "Could not find DevToolsActivePort" = the server is still running with `--autoConnect`; reconnect it after editing the config.
- webmcp present on a page: `evaluate_script` → `typeof document.modelContext === "object"`.

## 3. Open the app

Start servers with `pnpm dev` and read which ports it chose (game from 5200, editor from 5210 - it moves up if taken). Editor: `http://localhost:<editorPort>/` (or `/editor/`, depending on how it was started). Game: `http://localhost:<gamePort>/?cheats=1&track=0` (any dev-server page; `cheats`/`track` are optional).

## 4. Call tools - via `evaluate_script`

The MCP's `list_3p_developer_tools` / `execute_3p_developer_tool` do **not** see webmcp tools (they use a different, `window.__dtmcp` hook). Call webmcp from `evaluate_script`:

```js
async () => {
  const mc = document.modelContext;
  // tools register once the app has mounted - poll after a (re)load:
  let tools = [];
  for (let i = 0; i < 40 && !tools.some((t) => t.name === "getReduxState"); i++) {
    tools = await mc.getTools();
    await new Promise((r) => setTimeout(r, 500));
  }
  const call = async (name, args = {}) => {
    // Chrome wants the args as a JSON *string*, despite webmcp-types saying object:
    const result = JSON.parse(await mc.executeTool(tools.find((t) => t.name === name), JSON.stringify(args)));
    const text = result.content[0].text;
    return text === "undefined" ? undefined : JSON.parse(text);
  };
  return call("getUsageSkill");
}
```

- `executeTool` returns a JSON string `{content:[{type:"text",text}]}`; `text` is JSON, or the literal `"undefined"`.
- "Failed to parse input arguments" = you passed an object instead of a JSON string.
- "not of type 'RegisteredTool'" = the tools weren't registered yet (page still loading) - poll as above.

## Gotchas

- The chrome-devtools MCP only sees console messages from after it attached; if it reconnects, page ids change (`list_pages` again) and earlier logs are gone - ask the user to repeat the action.
- Prefer these MCP calls over standalone node CDP scripts.
