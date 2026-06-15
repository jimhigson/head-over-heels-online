---
name: editor-qa
description: QA the level editor via the chrome-devtools MCP — start the dev server, open it in a browser, dispatch actions, and verify Redux state. Use when testing editor features interactively.
---

## Starting the editor

```sh
eval "$(fnm env)" && fnm use && pnpm dev:editor
```

Run this in the background. The editor vite config is separate from the game's. Check the port with:

```sh
lsof -p <pid> -i -a 2>/dev/null | grep LISTEN
```

The URL will be `http://localhost:<port>/editor/`.

## Opening in Chrome

Use `mcp__chrome-devtools__new_page` with the editor URL. The editor loads directly — no menu navigation needed.

## Driving via bridged Chromium + Playwright (no chrome-devtools MCP)

In Claude Code on the web (and any sandbox without the `chrome-devtools` MCP
server connected), drive the editor with Playwright against the bridged browser
binary instead. The mechanics are the same — navigate, `page.evaluate` to read
`window._e2e_store`, dispatch actions — just scripted rather than via MCP tools.

Two environment gotchas, both required for `window._e2e_store` to exist:

- It is only exposed when `import.meta.env.MODE === "visual-regression"`
  (`src/store/store.ts`), so the editor must run in that mode — not the
  `development` mode that `pnpm dev:editor` uses.
- The `levelEditor` reducer is only included when `VITE_APP === "editor"`
  (`src/store/store.ts`). The editor's env files set this for `development`/
  `production` modes only, so when forcing `visual-regression` mode you must
  pass `VITE_APP=editor` explicitly or the editor crashes (`undefined` reading
  `campaignInProgress`).

Start the server (separate port to avoid clashing with a running dev server):

```sh
VITE_APP=editor node node_modules/vite/bin/vite.js \
  --config vite.editor.config.ts --mode visual-regression --port 5301 --strictPort
```

Bridge the browser binary if the Playwright CDN is blocked — see the `run-e2e`
skill's "Sandboxed environment" section. Import `chromium` from
`@playwright/test` (not `playwright`, which isn't symlinked at the top level),
and run the script from the project dir so the package resolves.

Load the bundled original campaign offline by importing it through the dev
server (Vite serves files outside the root under `<base>/@fs/<abs path>`, and
the editor base is `/editor/`), then dispatch `levelEditor/loadCampaign`:

```js
await page.evaluate(async () => {
  const mod = await import(
    "/editor/@fs/" + "<repo abs path>/src/_generated/originalCampaign/campaign.ts"
  );
  window._e2e_store.dispatch({
    type: "levelEditor/loadCampaign",
    payload: { campaign: mod.campaign },
  });
});
```

The map panel is the `div.overflow-y-auto.bg-editor-checkerboard` element (a
short scrollable window onto a tall SVG of every room). To screenshot a region
without the overflow clip, set the container's `style.height`/`overflow` large
via `page.evaluate`, then `page.screenshot({ clip })` around the area you want.

## Redux store access

The store is exposed at `window._e2e_store` (only in `visual-regression` mode —
see the bridged-Chromium section above). All editor state is under
`state.levelEditor`.

```js
const state = window._e2e_store.getState();
const le = state.levelEditor;

le.currentlyEditingRoomId        // which room is active
le.campaignInProgress.rooms      // all rooms keyed by ID
le.selectedJsonItemIds           // currently selected items
le.tool                          // current editing tool
```

## Dispatching editor actions

Dispatch actions directly via the store rather than clicking UI buttons — DOM uids become stale after re-renders.

```js
// Insert a room to the left
store.dispatch({ type: "levelEditor/insertRoom", payload: { direction: "left" } });

// Add a new room (default 8x8)
store.dispatch({ type: "levelEditor/addRoom", payload: { roomSize: { x: 8, y: 8 } } });

// Switch rooms
store.dispatch({ type: "levelEditor/changeToRoom", payload: "room_1" });

// Delete the current room
store.dispatch({ type: "levelEditor/removeRoom" });
```

All level editor actions are namespaced `levelEditor/`.

## Inspecting doors and room connections

```js
const rooms = store.getState().levelEditor.campaignInProgress.rooms;
for (const [roomId, room] of Object.entries(rooms)) {
  for (const [itemId, item] of Object.entries(room.items)) {
    if (item.type === "door") {
      console.log(roomId, itemId, item.config.direction, "→", item.config.toRoom, "toDoor:", item.config.toDoor);
    }
  }
}
```

Door config properties:
- `direction`: "left" | "right" | "away" | "towards"
- `toRoom`: destination room ID (or "$$final" for game exit)
- `toDoor`: ID of the corresponding door in the destination room (optional)

## Resetting to a blank campaign

**Option 1 — dispatch newCampaign:**

```js
store.dispatch({ type: "levelEditor/newCampaign" });
```

Creates a fresh single-room campaign. This is the cleanest reset.

**Option 2 — click the NEW button in the UI** (uid may change between renders).

## Persistence

Editor state is persisted to localStorage under `persist:hohol/levelEditor`. This means:
- **Reloading the page keeps the current campaign** — it rehydrates from localStorage.
- `newCampaign` dispatch resets the in-memory state, and persistence follows.
- If the state gets corrupted (e.g. bad `roomJsonEdited` dispatch), click "Clear all data" in the crash dialog, or run:

```js
localStorage.removeItem("persist:hohol/levelEditor");
```

Then reload.

## Verifying results

After dispatching an action, read the store state to verify. Don't rely on screenshots alone for structural verification — the Redux state is the source of truth.

```js
const le = store.getState().levelEditor;
const roomIds = Object.keys(le.campaignInProgress.rooms);
// Check room count, door connections, toDoor cross-links, etc.
```

For visual verification (button placement, rendering), take a screenshot after the state check.

## Gotchas

- **Stale uids:** After any state change that re-renders the toolbar (adding rooms, switching rooms), snapshot uids are invalidated. Prefer JS dispatch over clicking buttons.
- **roomJsonEdited pitfall:** The `roomJsonEdited` action expects a JSON string of the *entire room*. Passing malformed data corrupts the persisted state. Prefer dispatching specific actions instead.
- **Door width:** Doors occupy 2 block units. When centering on an N-unit wall, the position should be `(N - 2) / 2`, not `N / 2`.
