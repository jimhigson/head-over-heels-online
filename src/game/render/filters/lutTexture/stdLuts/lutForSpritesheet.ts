import { type Texture } from "pixi.js";

import { type SpritesheetMetadata } from "../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { voronoiLut } from "../voronoiLut";
import { blockstackToSpectrumLut } from "./blockstackToSpectrumLut";
import { resolveZxSpectrumMapping } from "./resolveZxSpectrumMapping";
import { spectrumLumLut } from "./spectrumLumLut";
import { toppyToSpectrumLut } from "./toppyToSpectrumLut";

let cachedTeleportingBlockstack: Texture | undefined;
let cachedTeleportingToppy: Texture | undefined;
let cachedTeleportingLum: Texture | undefined;

export const teleportingLutForSpritesheet = (
  spritesheetMeta: SpritesheetMetadata,
): Texture => {
  switch (spritesheetMeta.name) {
    case "speccy":
      return (cachedTeleportingLum ??= spectrumLumLut());
    case "blockstack":
      return (cachedTeleportingBlockstack ??= blockstackToSpectrumLut());
    case "toppy":
      return (cachedTeleportingToppy ??= toppyToSpectrumLut());
    case "debug":
      throw new Error("not available");
    default:
      spritesheetMeta.name satisfies never;
      throw new Error(`unknown spritesheet "${spritesheetMeta.name}"`);
  }
};

const deathLutFromSpritesheetMeta = (
  spritesheetMeta: SpritesheetMetadata,
): Texture =>
  voronoiLut(
    resolveZxSpectrumMapping(
      spritesheetMeta,
      "mapToZxSpectrumForDeathEffectPalette",
    ),
  );

let cachedDeathBlockstack: Texture | undefined;
let cachedDeathToppy: Texture | undefined;
let cachedDeathSpeccy: Texture | undefined;

export const deathLutForSpritesheet = (
  spritesheetMeta: SpritesheetMetadata,
): Texture => {
  switch (spritesheetMeta.name) {
    case "speccy":
      return (cachedDeathSpeccy ??=
        deathLutFromSpritesheetMeta(spritesheetMeta));
    case "blockstack":
      return (cachedDeathBlockstack ??=
        deathLutFromSpritesheetMeta(spritesheetMeta));
    case "toppy":
      return (cachedDeathToppy ??=
        deathLutFromSpritesheetMeta(spritesheetMeta));
    case "debug":
      throw new Error("not available");
    default:
      spritesheetMeta.name satisfies never;
      throw new Error(`unknown spritesheet "${spritesheetMeta.name}"`);
  }
};
