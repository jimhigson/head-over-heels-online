#!/usr/bin/env -S pnpm tsx
import { buildGlyphs, designFor } from "./font/geometry/fontDesign";
import { outlineContoursFor } from "./font/geometry/glyphOutline";
import { squareGlyphContours } from "./font/geometry/squareGlyphContours";
import {
  buildIfChanged,
  type FontFormat,
  isFontFormat,
  manifestPath,
  outputPath,
  smoothManifestPath,
  smoothOutputPath,
} from "./font/node/buildFont";
import { decodeSpritesheet } from "./font/node/decodeSpritesheet";
import { readGlyphOverrides } from "./font/node/readGlyphOverrides";
import { spritesheetPath } from "./font/spritesheetPath";

const formatArgument = (): FontFormat => {
  const flagAt = process.argv.indexOf("--format");
  if (flagAt === -1) {
    return "woff2";
  }
  const asked = process.argv[flagAt + 1];
  if (asked === undefined || !isFontFormat(asked)) {
    throw new Error(`--format takes "woff2" or "ttf", not ${asked}`);
  }
  return asked;
};

const format = formatArgument();
const image = await decodeSpritesheet(spritesheetPath);
const forceRebuild = process.argv.includes("--force");

buildIfChanged(
  designFor(buildGlyphs(image, squareGlyphContours), "HeadOverHeels"),
  manifestPath,
  outputPath(format),
  forceRebuild,
);
buildIfChanged(
  designFor(
    buildGlyphs(image, outlineContoursFor(readGlyphOverrides())),
    "HeadOverHeelsSmooth",
  ),
  smoothManifestPath,
  smoothOutputPath(format),
  forceRebuild,
);
