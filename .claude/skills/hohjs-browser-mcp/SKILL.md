---
name: hohjs-browser-mcp
description: Drive the Head over Heels remake's UI via the chrome-devtools MCP. Use this skill when the user asks for browser automation, capturing localStorage, dispatching game actions, or anything that involves driving the running game on localhost.
---

Driving this game's UI via the chrome-devtools MCP has known quirks; following these patterns avoids the trial-and-error from prior sessions.

## Dev server

Default URL: `http://localhost:5200/?cheats=1&track=0`. Add `?cheats=1` to expose the cheats panel; add `&track=0` to disable analytics tracking.

For URL-driven scenarios:
- `?campaignName=data:<base64>` — playtest mode (campaign encoded in URL).
- `?campaignAuthorUserId=<userId>&campaignName=<name>` — community/named campaign URL.
- `?device=mobile` — force mobile device-detection (useful for testing touch UI on a desktop browser).

## Starting a game from the main menu

A fresh page load lands on the **main menu** even with a `#roomId` hash — the hash does **not** auto-start a game, and `window._e2e_gamePageGameAi` stays `undefined` until a game is actually running. To get into a room:

1. Click **Play the game** (`[data-menuitem_id="playGame"]`).
2. On the "Select which game" submenu, click the campaign you want — e.g. **Original Remastered** (the burnt-in original campaign, the one playable offline).
3. An intro **crowns dialog** appears and blocks the room from rendering. **Click anywhere on the dialog to dismiss it** and enter the room:

   ```js
   document.querySelector('[data-dialog-id="crowns"]').click();
   ```

   The whole dialog is the click target — don't hunt for a button. This is exactly what the `exitCrownsDialog` e2e helper does (`page.click('[data-dialog-id="crowns"]')`).

Only after the crowns dialog detaches does `window._e2e_gamePageGameAi.gameState` populate and the room render. To jump straight to a specific room once a game is running, use the cheats goto-room buttons (`[data-test-id="cheats-goto-room-<roomId>"]`), not the URL hash.

## Clicking menu items: do NOT use MCP click directly

Menu items are `<li role="menuitem">` styled with `display: contents`. The element has zero bounding rect, so coordinate-based clicking (Playwright actionability check) **fails with a timeout** ("did not become interactive within 5000ms").

**Two working approaches:**

### Option 1 — `evaluate_script` with DOM-direct `.click()` (preferred)

```js
document.querySelector('[data-menuitem_id="playGame"]').click()
```

The click event bubbles up to the menuitem's onSelect handler. Works for any menu item. No bounding-box check.

### Option 2 — MCP click on the label-container child

In a verbose snapshot, each menuitem has children. The second child (the label container `<div>`, sized roughly `wide × 30px`) has a real bounding box and is clickable via MCP. Click bubbles up to the parent's handler.

```
uid=8_3 menuitem "⏩⏩ Back to the game"
  uid=9_44 ignored          ← icon container (small, 48×30)
  uid=9_50 generic          ← label-container DIV (large, ~384×30) ← click this
```

Use `take_snapshot({ verbose: true })` to expose child nodes; without verbose, only the menuitem itself appears.

### Cheats panel buttons (and anything else that's a real `<button>`)

Regular buttons (cheats panel, dialog content buttons) work with MCP click directly — they have normal bounding boxes. Only menu items inside `MenuItems` need the workarounds above.

## Keyboard input

`mcp__chrome-devtools__press_key` synthesises keystrokes that **don't reach the game's input handlers** (the game listens on `window` for KeyboardEvent; MCP's keypress doesn't fire there). Use:

```js
window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter" }))
window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter" }))
```

This is the same pattern e2e tests use (`dispatchKeyPress` in `e2e/testUtils/gameInteractions.ts`).

## Reading state

The redux store is exposed as `window._e2e_store`:

```js
window._e2e_store.getState().gameMenus.openMenus.map(m => m.menuId)
window._e2e_store.getState().gameInPlay.gameInPlay.campaignLocator
```

The game state (live engine state, not redux) is at `window._e2e_gamePageGameAi.gameState`:

```js
window._e2e_gamePageGameAi.gameState.currentCharacterName
window._e2e_gamePageGameAi.gameState.characterRooms[
  window._e2e_gamePageGameAi.gameState.currentCharacterName
].id
```

## localStorage / persisted save

Per-slice persist keys (post slice-split):
- `persist:hohol/savedGames` — saves dict + lastSavedCampaignLocator
- `persist:hohol/userSettings` — display/sound/input preferences
- `persist:hohol/spritesheetOverride` — uploaded-spritesheet override

Each is double-encoded JSON: outer object has stringified field-by-field children plus a `_persist` metadata stringified.

To trigger a save, dispatch a save-causing action — easiest is a cheats room change, which calls `saveGameThunk`:

```js
document.querySelector('[data-test-id="cheats-open-button"]').click();
await new Promise(r => setTimeout(r, 300));
document.querySelector('[data-test-id="cheats-goto-room-egyptus1"]').click();
await new Promise(r => setTimeout(r, 1500));
```

After ~1.5s the save is in `localStorage.getItem("persist:hohol/savedGames")`.

## Reference: e2e test conventions

`e2e/testUtils/menuNavigation.ts` and `e2e/testUtils/gameInteractions.ts` have battle-tested helpers for the same operations. Patterns to mirror:

- Selectors: `[data-menuitem_id="..."]`, `[data-dialog-id="..."]`, `[data-test-id="cheats-..."]`.
- Wait for dialog: poll for `[data-dialog-id="X"]` to appear/detach.
- Always wait ~500–1500ms after a state-changing action before reading state (gives the game tick + redux dispatch time to settle).
