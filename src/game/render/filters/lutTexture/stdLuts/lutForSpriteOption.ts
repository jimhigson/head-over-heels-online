import type { Texture } from "pixi.js";

import type { SpritesheetMetadata } from "../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type { SpriteOption } from "../../../../../store/slices/userSettings/userSettingsSlice";

import { spritesheetMetaForOption } from "../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { voronoiLut } from "../voronoiLut";
import { blockstackToSpectrumLut } from "./blockstackToSpectrumLut";
import { resolveZxSpectrumMapping } from "./resolveZxSpectrumMapping";
import { spectrumLumLut } from "./spectrumLumLut";
import { toppyToSpectrumLut } from "./toppyToSpectrumLut";

let cachedTeleportingBlockstack: Texture | undefined;
let cachedTeleportingToppy: Texture | undefined;
let cachedTeleportingLum: Texture | undefined;

export const teleportingLutForSpriteOption = (
  spriteOption: SpriteOption,
): Texture => {
  if (spriteOption.uncolourised) {
    return (cachedTeleportingLum ??= spectrumLumLut());
  }
  switch (spriteOption.name) {
    case "BlockStack":
      return (cachedTeleportingBlockstack ??= blockstackToSpectrumLut());
    case "Toppy":
      return (cachedTeleportingToppy ??= toppyToSpectrumLut());
  }
};

const deathLutFromMeta = (meta: SpritesheetMetadata): Texture =>
  voronoiLut(
    resolveZxSpectrumMapping(meta, "mapToZxSpectrumForDeathEffectPalette"),
  );

let cachedDeathBlockstack: Texture | undefined;
let cachedDeathToppy: Texture | undefined;
let cachedDeathSpeccy: Texture | undefined;

export const deathLutForSpriteOption = (
  spriteOption: SpriteOption,
): Texture => {
  if (spriteOption.uncolourised) {
    return (cachedDeathSpeccy ??= deathLutFromMeta(
      spritesheetMetaForOption(spriteOption),
    ));
  }
  switch (spriteOption.name) {
    case "BlockStack":
      return (cachedDeathBlockstack ??= deathLutFromMeta(
        spritesheetMetaForOption(spriteOption),
      ));
    case "Toppy":
      return (cachedDeathToppy ??= deathLutFromMeta(
        spritesheetMetaForOption(spriteOption),
      ));
  }
};
