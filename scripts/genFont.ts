#!/usr/bin/env -S pnpm tsx
import { buildGlyphs, designFor } from "./font/geometry/fontDesign";
import { outlineContoursFor } from "./font/geometry/glyphOutline";
import { squareGlyphContours } from "./font/geometry/squareGlyphContours";
import {
  buildIfChanged,
  manifestPath,
  outputPath,
  smoothManifestPath,
  smoothOutputPath,
} from "./font/node/buildFont";
import { decodeSpritesheet } from "./font/node/decodeSpritesheet";
import { readGlyphOverrides } from "./font/node/readGlyphOverrides";
import { spritesheetPath } from "./font/spritesheetPath";

const image = await decodeSpritesheet(spritesheetPath);
const forceRebuild = process.argv.includes("--force");

buildIfChanged(
  designFor(buildGlyphs(image, squareGlyphContours)),
  manifestPath,
  outputPath,
  forceRebuild,
);
buildIfChanged(
  designFor(buildGlyphs(image, outlineContoursFor(readGlyphOverrides()))),
  smoothManifestPath,
  smoothOutputPath,
  forceRebuild,
);
