import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { format } from "prettier";

import { type GlyphOverrides } from "../geometry/glyphOverrides";

export const glyphOverridesPath = "scripts/font/glyphOverrides.json";

export const readGlyphOverrides = (): GlyphOverrides =>
  existsSync(glyphOverridesPath) ?
    JSON.parse(readFileSync(glyphOverridesPath, "utf8"))
  : {};

/**
 * written through prettier, so the committed file reads the way every other
 * json in the repo does and an edit shows up as a diff of the shape that
 * changed rather than of the whole formatting
 */
export const writeGlyphOverrides = async (overrides: GlyphOverrides) =>
  writeFileSync(
    glyphOverridesPath,
    await format(JSON.stringify(overrides), { parser: "json" }),
    "utf8",
  );
