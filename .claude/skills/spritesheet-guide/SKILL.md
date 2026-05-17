---
name: spritesheet-guide
description: Spritesheet variant architecture reference — the six parallel spritesheets, initialisation flow, colourised vs uncolourised split, and how renderers pick a variant. Use when working on sprite rendering, palette swaps, or debugging "swopped spritesheet undefined" errors.
---

The renderer doesn't draw from a single spritesheet — it draws from up to **six** parallel spritesheets, each derived from the same source PNG with a different palette swap baked in via a Pixi filter. Selecting which one to sample is the renderer's job; building/tearing down the right ones is the main loop's job.

## The variant types

Defined in `src/sprites/spritesheet/variants/SpritesheetVariant.tsx`:

- `original` — the raw loaded PNG, no swaps. The base every other variant is derived from.
- `for-current-room` — palette-swapped to the current room's `(planet, colour)`. Most rendering uses this one.
- `deactivated` — the colour palette monsters/platforms render in when their `activated: false` state is showing. Visual cue.
- `doughnutted` — the palette stunned characters use after a doughnut hit.
- `sceneryPlayer` — used when a player needs to render in scenery colours (e.g. some teleporter overlays).
- `uncolourised` — for ZX Spectrum mode (`spriteOption.uncolourised: true`). The sprite art is recoloured to white-on-shadow so the user can see the per-room ZX colour-attribute via the room's tinting layer rather than baked into the sprite.

Each variant lives in its own file under `src/sprites/spritesheet/variants/<name>SpritesheetVariant.ts` with the exact same shape:

```ts
let swopped: AppSpritesheet | undefined = undefined;
export const destroyXxxSpritesheet = () => { /* destroy textures + sheet, set undefined */ };
export const createXxxSpritesheet = (...) => { destroyXxxSpritesheet(); swopped = createSpritesheetVariant(...); };
export const xxxSpritesheetVariant = (): AppSpritesheet => { if (swopped === undefined) throw ...; return swopped; };
```

The module-level `swopped` singleton is the variant. The accessor **throws** if it's undefined — variants must be built before any code reads them, never lazily.

## Initialisation flow

1. `gameMain.ts` calls `initOriginalSpritesheet(renderer)` followed by `createUncolourisedSpritesheet(renderer)`. So at game-start, two variants are present: `original` and `uncolourised`. (The latter is built up-front because it's a one-shot — its swap doesn't depend on room data.)
2. The first main-loop tick calls `tickSpritesheetVariants(renderer, planet, color, spriteOption)` (in `src/game/mainLoop/tickSpritesheetVariants.ts`). This is the **only** path that creates `for-current-room`, `deactivated`, `doughnutted`, and `sceneryPlayer`. They depend on the current room's `(scenery, colour)` so they can't be built until the player has entered a room.
3. Subsequent ticks call `tickSpritesheetVariants` again only when the room changes OR `spriteOption` changes (`MainLoop.ts:190-211`). Each rebuild destroys the previous variant first, then builds a fresh one — no caching across rooms.

## The colourised vs uncolourised split

`tickSpritesheetVariants` branches on `spriteOption.uncolourised`:

- **`uncolourised: true`** → `initAndBuildUncolourised`: ensures `original` is loaded, destroys `for-current-room`, creates `uncolourised`. Note: `deactivated`/`doughnutted`/`sceneryPlayer` are **not** built — uncolourised mode bypasses those code paths because per-room recolouring is what they exist to do.
- **`uncolourised: false`** → `initAndBuildColourised`: ensures `original` is loaded, destroys `uncolourised`, builds the four colourised variants.

So at any given moment the set of available variants is **either** `{original, uncolourised}` **or** `{original, for-current-room, deactivated, doughnutted, sceneryPlayer}` — never both. This is the trap: a renderer that picks a variant based on a stale `spriteOption.uncolourised` value can call `xxxSpritesheetVariant()` on a destroyed variant and hit the throw.

## How renderers pick a variant

`src/sprites/spritesheet/variants/getSpriteSheetVariant.tsx` is the single lookup point. Most item-appearance functions in `src/game/render/itemAppearances/*` follow the same pattern:

```ts
const variant: SpritesheetVariant =
  spriteOption.uncolourised ? "uncolourised" : "for-current-room";
const sprite = getSpriteSheetVariant(variant).textures[textureId];
```

The `spriteOption` here comes from `itemRenderContext.general.spriteOption`, which is captured from the redux store at renderer construction time. **If the captured value drifts from the current store value** between construction and access, the lookup will request a variant that no longer exists and `getSpriteSheetVariant` throws (`could not get spritesheet variant "X"`). This is the failure mode behind mid-game errors that mention `swopped spritesheet undefined`.

## `SpriteOption` shape and where it lives

```ts
type SpriteOption =
  | { name: "BlockStack"; uncolourised: false }
  | { name: "BlockStack"; uncolourised: true }
  | { name: "Toppy"; uncolourised: false };
```

Stored at `userSettings.userSettings.displaySettings.sprites`. The `name` selects the asset bundle (`BlockStack` is the default; `Toppy` is the alternate spritesheet). `uncolourised` is only valid for `BlockStack` because Toppy doesn't have a ZX-mode palette spec. Selectors:

- `selectSpritesOption`, `useSpritesOption` — full SpriteOption
- `selectIsUncolourised`, `useIsUncolourised` — boolean shorthand

Toggling sprites at runtime fires reducers in `userSettingsSlice` (`setSpritesOption`, `nextSpritesOption`, `toggleUserSetting`) — the next main-loop tick then sees the new `spriteOption`, hits the `spriteOptionEquals` change-check at `MainLoop.ts:193-196`, and rebuilds variants.
