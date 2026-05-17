---
name: redux-guide
description: Redux store architecture reference — slice layout, intra-slice composition patterns (extraReducers, listeners, cross-slice actions), intent-revealing reducers, persistence, listener API conventions, and the app-typed vs slice-typed hook hierarchy. Use when working on state management, slices, listeners, or redux hooks.
---

## Slices

The store is split into focused slices, each owning one concern. Wired up in
`src/store/store.ts` via `combineSlices`:

- `userSettings` — display, sound, input assignments, sprite/skin choice. **Persisted.**
- `savedGames` — per-campaign saves dict + `lastSavedCampaignLocator`. **Persisted.**
- `spritesheetOverride` — local override for spritesheet selection. **Persisted.**
- `gameInPlay` — live in-game state: current campaign locator, characters' rooms-explored, scrolls-read, freeCharacters, reincarnationPoint, gameRunning, cheatsOn. Not persisted directly — survives reload only via the snapshot saved into `savedGames`.
- `gameMenus` — open menu stack, focussed item, key-assignment-in-progress.
- `upscale` — derived from displaySettings; recomputed on emulated-resolution and display changes via listeners.
- `campaignsApi` / `githubApi` — RTK Query slices for fetching campaigns/db data and GitHub data.
- `gameAssetsLoading` — tracks loading progress for assets.

Slices are deliberately small, single-purpose, and each owns its own
`reducers` block. Cross-slice writes are forbidden — slices never reach
into each other's state directly.

## Intra-slice composition

Three patterns coordinate behaviour across slices:

1. **`extraReducers` — react to another slice's action with my own state change.**
   The owning slice declares the action; reacting slices subscribe via
   `extraReducers(builder)` with `builder.addCase(externalAction, ...)`.
   The action is a noop in its owner slice if its only purpose is to
   broadcast — e.g. `savedGameLoadedOnAppLoad` is a noop in `savedGamesSlice`,
   but `gameInPlaySlice` and `gameMenusSlice` use `extraReducers` to
   populate their own state from its payload. This is the cleanest
   mechanism — atomic state update across slices in one dispatch, no
   listener cascades, no race risk.

2. **Listener middleware — cross-slice reads or cascade dispatches.**
   When a slice needs to read state from another slice or dispatch a
   follow-up action conditional on cross-slice state, register a
   `startAppListening` effect. Lives in `<slice>/<slice>Listeners.ts`.
   Examples: `lostAllLives` → if a `reincarnationPoint` exists in
   `gameInPlay`, dispatch `gameEndedMenusOpened({offerReincarnation: true})`,
   else cascade into `gameOver`. `gameOver` → savedGamesListener removes
   the campaign's save. Each listener only dispatches actions from its
   own slice's domain (or from the slice broadcasting a domain event).

3. **Top-level cross-slice actions for full resets** — `clearAllData` is
   declared at the top level (not owned by a slice) and every slice
   handles it via `extraReducers` to reset to its initial state. Use
   sparingly; only for "blat the whole world" operations.

### Intent-revealing reducers in gameMenusSlice

`gameMenusSlice` exposes named reducers that describe the *intent* of a
menu transition rather than a generic "set the menu stack". Listeners
from other slices dispatch these by name:

- `crownsMenuShown(crownsMenuParam)` — show the crowns dialog (with optional music).
- `gameStartedMenusOpened({showCrowns})` — set up menus for a new game start.
- `gameEndedMenusOpened({offerReincarnation, scoreAlreadyShown?})` — set up score / mainMenu / offerReincarnation post-gameOver.
- `scrollContentMenuShown(scrollConfig)` — show a markdown scroll dialog.
- `reincarnationRestartMenuShown()` — show the reincarnated-restart confirmation.

The reducer owns the menu-stack shape; the caller describes the event,
not the resulting menu list. Devtools then show the actual transition
(`gameMenus/gameEndedMenusOpened`) instead of a generic blat.

## Persist

Per-slice persistors, with their own keys.
Version numbers of the persist match the version number of the game.

## Listener API use

When writing a listener with `startAppListening`, always destructure the
needed methods (`dispatch`, `getState`, etc.)

```ts
// good
startAppListening({
  actionCreator: someAction,
  effect(action, { dispatch, getState }) {
    const { foo } = getState();
    dispatch(otherAction(foo));
  },
});

// avoid
startAppListening({
  actionCreator: someAction,
  effect(action, api) {
    const { foo } = api.getState();
    api.dispatch(otherAction(foo));
  },
});
```

## Redux hooks: app-typed vs slice-typed

There are three layers of redux hook in this codebase. Pick the right one for where the calling code lives.

| Hook | Source | State binding |
|---|---|---|
| `useSelector` / `useDispatch` (base) | `react-redux` | generic — caller declares the type |
| `useAppSelector` / `useAppDispatch` (app-typed) | `src/store/hooks` | bound to the full app `RootState` / `AppDispatch` |
| `use<Slice>SliceSelector` / `use<Slice>SliceDispatch` (slice-typed) | the slice file | bound to that slice's narrow `StateWith<X>` only |

**Rule:**
- Files inside `src/` (the app) → use the **app-typed** wrappers from `src/store/hooks`. They have access to the full RootState anyway.
- Files inside any `packages/<x>` → use the **slice-typed** wrappers exported from the slice file. A package can't depend on the app's RootState, and shouldn't claim to read the whole store when it only touches one slice.
- The base `react-redux` hooks shouldn't normally be called directly — use one of the typed wrappers instead.

### Slice-typed hook pattern

Each slice file in a package exports a triple of narrow types and pre-typed hooks:

```ts
// packages/hoh-foo/src/fooSlice.ts
import { createSlice, type ThunkAction, type ThunkDispatch, type UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const fooSlice = createSlice({ name: "foo", /* ... */ });

export type StateWithFoo = { [fooSlice.reducerPath]: FooState };

export type FooSliceThunk<R = void> = ThunkAction<
  R,
  StateWithFoo,
  unknown,
  UnknownAction
>;

export const useFooSliceSelector = useSelector.withTypes<StateWithFoo>();
export const useFooSliceDispatch = useDispatch.withTypes<
  ThunkDispatch<StateWithFoo, unknown, UnknownAction>
>();
```

The narrow state shape says "I require a store with this slice mounted at its reducerPath" — and nothing more. Any RootState that includes the slice satisfies the constraint structurally.

A `FooSliceThunk` can `getState()` and see `StateWithFoo` only — so reading another slice's state through `getState()` fails typecheck. **If a thunk needs data from another slice, take it as a parameter.** The hook calling the thunk subscribes to that other slice's data via its own typed hook and passes it in. This keeps slice-to-slice coupling explicit at call sites instead of buried inside `getState()`.
