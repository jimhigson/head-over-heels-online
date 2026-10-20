---
name: spritesheet-guide
description: Spritesheet architecture reference — the original and per-room sheets, how variants are baked into one atlas, colourised vs uncolourised (speccy), how renderers pick a texture, and the sprites option. Use when working on sprite rendering, palette swaps, or spritesheet loading.
---

The renderer samples one atlas per room, built from the loaded spritesheet image with palette swaps baked in. `Spritesheets` (`src/sprites/spritesheet/Spritesheets.ts`) owns both sheets; the main loop decides when to rebuild them.

## The two sheets

- **`originalSpritesheet`** — the loaded image with the shadow preprocess baked in, never room-swopped. Built by `loadImage(renderer, spritesheetArtName)`, and re-baked at a new upscale factor when that changes.
- **`spritesheetForCurrentRoom`** — rebuilt by `rebuild(renderer, scenery, colour, spritesheetMeta, upscale)` through `buildRoomSheet`. Everything in-room samples this one; `shadowSpritesheet` is the same sheet.

## Variants are texture ids, not sheets

The room sheet holds every base frame swopped for the room, and every variant frame alongside it, under suffixed texture ids (`variantSuffixes` in `variantSpritesheetData.ts`): `deactivated`, `doughnutted`, `mirrorReflection`, `sceneryPlayer`, the arcade-button `action=…` colours and the door-hue ones. Each suffix bakes only where the spritesheet meta declares the swop (`bakeableVariantSuffixes`, `stripGroupPasses` in `variantSwopRecipes.ts`); an unbaked variant id aliases its base frame's rect, so every id always resolves.

Renderers pick a frame by id, never a sheet:

```ts
spritesheets.spritesheetForCurrentRoom.textures[
  variantTextureId(id, isReflection, doughnutted, deactivated, sceneryPlayer)
];
```

## Colourised vs uncolourised

`roomSpritesheetTextureSwops` gives each spritesheet its room swops. The uncolourised sheet (speccy) swops the whole sheet to near-white instead, bakes only the arcade-button variants, and is coloured at render time by a per-room tint.

## When the room sheet is rebuilt

`MainLoop` rebuilds it when the room changes, the upscale factor changes, the WebGL context is restored, or the tick's spritesheet meta differs from the room renderer's. A paused tick renders with the selected sheet's `spritesheetWhenPaused` (blockstack pauses as speccy). If the art sheet isn't loaded yet, the tick loads it first.

## The sprites option: a spritesheet name

```ts
type SpritesheetName = "blockstack" | "debug" | "speccy" | "toppy";
```

Stored at `userSettings.userSettings.displaySettings.sprites`, it names one of `spritesheetMetas`. `speccy` has `isUncolourisedOf: "blockstack"`: it draws BlockStack's art, uncoloured and tinted per room at render time (`spritesheetMeta.isUncolourisedOf !== undefined`, `spritesheetArtName(spritesheetMeta)`). Render code reads `general.spritesheetMeta`, never the option itself. Selectors:

- `selectSpritesheetName`, `useSpritesheetName` — the selected `SpritesheetName`
- `selectSpritesheetArtName`, `useSpritesheetArtName` — the sheet whose image is drawn
- `selectIsUncolourised`, `useIsUncolourised` — boolean shorthand

Toggling sprites at runtime fires reducers in `userSettingsSlice` (`setSpritesheetName`, `nextSpritesheetName`, `toggleUserSetting`) — the next main-loop tick then sees `general.spritesheetMeta` differ, and rebuilds the room sheet.
