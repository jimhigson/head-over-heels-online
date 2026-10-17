---
name: editor-webmcp
description: Drive the Head over Heels level editor through its webmcp tools - read and dispatch redux, load campaigns, add and edit rooms, and read and auto-fix the campaign's verification issues. Assumes webmcp access to the editor page already works (see use-web-mcp for getting that). The editor's own getUsageSkill tool returns this same text.
---

The level editor registers webmcp tools in every build, dev and production. This covers what they do and how to use them well; it assumes you can already call them.

## Tools

| Tool | Args | Does |
|---|---|---|
| `getUsageSkill` | - | returns this guide |
| `getReduxState` | `path?` dotted, eg `levelEditor.campaignInProgress.rooms.room_1` | reads the store (or part) |
| `getCurrentRoomId` | - | the id of the room the editor is showing |
| `getCurrentRoomJson` | - | the json of the room the editor is showing |
| `getRoomItems` | `pattern?`, `roomId?` | a room's items (default the current room). Without `pattern`, `{itemId: item}`; with one, `{path: value}` for just what it picks out - see [Item patterns](#item-patterns). Prefer this to `getCurrentRoomJson` |
| `getSelectedItems` | - | the selected items in the current room, id -> item json |
| `setRoomItems` | `items` | adds, replaces (whole item json) or removes (`null`) items in the current room by id, as one undoable edit |
| `setRoomItemValues` | `pattern`, `value` | sets `value` everywhere the [pattern](#item-patterns) picks out in the current room's items, as one undoable edit. A last part naming one key (`config.toRoom`) inserts it if absent; any other last part replaces only existing values. Returns the paths set |
| `listRooms` | - | every room in the campaign, as `{id, planet}` |
| `getOpenCampaign` | - | the open campaign's `locator` and `meta` |
| `getEditorView` | - | camera angle, tool, current sub-room, grid resolution, and `openRoomTabs` (in order, each `{roomId, isPreview}` - a preview tab is replaced by the next room browsed to) |
| `dispatchAction` | `type`, `payload?` | dispatches a plain redux action |
| `getActionLog` | `typePrefix?` | last 50 actions - **dev builds only** (empty in production) |
| `getVerificationIssues` | - | the same errors/warnings as the toolbar's verify button, each with `fixable`, `fixText` and `issueData` |
| `fixVerificationIssue` | `verifier`, `issueData` (both unchanged from `getVerificationIssues`) | auto-fixes that one issue, as the verify dialog's Fix button does; re-checks first, so stale or non-fixable issues are refused. Returns the issues remaining |
| `fixAllVerificationIssues` | - | auto-fixes every fixable issue, as "Fix all" does. Returns the issues remaining - any a fix caused show here, to fix in turn |
| `loadCampaign` | `username?`, `campaignName?`, `version?` | loads a campaign like the Open dialog (discards unsaved changes). No username/name = the sequel campaign |
| `closeRoomTab` | `roomId` | closes a room's tab like its x (the last tab can't be closed; closing the current room's moves to the next tab); returns `openRoomTabs` |
| `closeOtherRoomTabs` | `roomId` | closes every tab but that room's, which becomes current; returns `openRoomTabs` |
| `pinRoomTab` | `roomId` | keeps a preview tab open when browsing on, like double-clicking it; returns `openRoomTabs` |
| `playtest` | `fromStart?`, `playAsHeels?` | plays the open campaign, unsaved, like the toolbar's play button: opens the game in a new tab (**one per call**) and returns its `url` |
| `getPlaytestUrl` | `fromStart?`, `playAsHeels?` | the `url` `playtest` would open, opening nothing - use this when you only need the url, or want to open the game in a tab you control |
| `revertCampaign` | - | reloads the open campaign as last saved, like the toolbar's revert button (discards unsaved changes) |
| `saveCampaign` | `campaignName?`, `publish?`, `overwriteConfirmed?` | saves a new version to the db like the toolbar's save button, showing the same flash/failure dialog; with `campaignName`, saves as that name like the Save As dialog. Returns `saved` (the new locator), `saveFailed`, or `needsConfirmation` when the name is another existing campaign - ask the user before re-calling with `overwriteConfirmed: true` |
| `moveItemsToRoom` | `roomId`, `subRoomId?`, `itemIds?` (default the selection) | moves items from the current room to another like dropping them on its map tile: same offset from the room's corner, nudged to the nearest free whole-block spot; walls/floors/doors stay; links between items that don't both move are dropped; teleporters follow. The other room becomes current |
| `insertRoom` | `direction`: left/right/away/towards/up/down | adds a room next to the current one like the map's insert buttons (up/down create a room above/below); returns `currentRoomId` (it becomes the current room) |
| `addRoom` | `roomSize?` `{x,y}` | adds a room like the toolbar's add-room button; returns `addedRoomId` (it becomes the current room) |

## Item patterns

`getRoomItems` takes a `pattern` to fetch only what you need rather than the whole room. A pattern is dot-separated parts, matched from the room's items object - so the first part matches item ids. Each part is one of:

| part | matches |
| --- | --- |
| `door1` | exactly that key |
| `*` | any key |
| `door*` | any key starting `door` |
| `[type=door]` | any key whose value has `type` `door` |
| `[config.which=skiHead]` | the same, with a dotted (nested) property |

Results are `{ path: value }`, the path being dotted from the items object, so ids always come back. Examples:

| to find | pattern |
| --- | --- |
| one item | `door1` |
| all doors | `[type=door]` |
| where every door leads | `[type=door].config.toRoom` |
| a kind of monster | `[config.which=skiHead]` |
| every item's position | `*.position` |
| items sitting above the floor | `[position.z=1]` |
| a door's destination, by id prefix | `door*.config.toRoom` |

Values are compared as strings, and only equality is supported - for anything else, fetch a narrower set and filter it yourself.

## Keeping the campaign valid

**After every turn that changes the campaign, call `getVerificationIssues`.** For each new issue:

- if it is `fixable` and the fix is well understood and obvious (its `fixText` says exactly what changes, and that is clearly what's wanted), fix it with `fixVerificationIssue`
- otherwise - not fixable, or the fix isn't clear-cut - tell the user about it and offer to fix it, rather than guessing

Edits (including auto-fixes) are not saved to the database until saved - say so. Only call `saveCampaign` when the user asks to save.

## Recipes

- **Current room**: `getCurrentRoomId`, or `getCurrentRoomJson` for its whole json.
- **Change room** (also selects it): `dispatchAction` `levelEditor/changeToRoom` payload `{roomId, subRoomId: "*"}`.
- **Change part of an item**: `setRoomItemValues`, eg pattern `[type=door].config.toRoom` value `"room_3"` - rather than rewriting the whole room json.
- **Edit a room's json**: read it with `getCurrentRoomJson`, edit a copy, dispatch `levelEditor/roomJsonEdited` `{roomJson, timestamp: Date.now()}`. It replaces the **current** room - `changeToRoom` first. Changing `roomJson.id` renames the room (and repoints references). Setting a `nonContiguousRelationship` on one room mirrors it onto the partner automatically.
- **Scenery / colour**: `levelEditor/changeRoomScenery` `{sceneryName, timestamp}` and `levelEditor/changeRoomColour` `{colour, timestamp}` act on the **selected** rooms.
- **Tool**: `levelEditor/setTool` eg `{type: "pointer"}` or `{type: "item", item: {type: "door", config: {direction: "away", toRoom: "+"}}}`.

## Gotchas

- `getReduxState` stringifies with repeated objects shown as `"[circular]"` - check a value you read doesn't contain it before writing it back via `roomJsonEdited`.
- Synthetic `PointerEvent`s dispatched on the editor canvas drive hover/picking fine, but have no real pointer capture - bugs involving capture only reproduce with a real mouse.
- Only redux and these tools are reachable; the pixi app isn't on `window`.
