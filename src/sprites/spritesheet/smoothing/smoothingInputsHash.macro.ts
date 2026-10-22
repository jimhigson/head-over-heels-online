import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * the smoothing's own code and shaders, and the code outside it that decides where
 * the frames go on the smoothed sheet
 */
const sourcePaths = [
  "src/sprites/spritesheet/smoothing",
  "src/sprites/spritesheet/repackSpritesheetForSmoothUpscale.ts",
  "src/sprites/spritesheet/spritesheetData/packAllFrames.ts",
  "src/sprites/spritesheet/spritesheetData/tilingOffsets.ts",
];

const filesUnder = (path: string): string[] =>
  statSync(path).isDirectory() ?
    readdirSync(path, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(entry.parentPath, entry.name))
  : [path];

/**
 * A hash of everything an upscaled sheet's pixels depend on besides the
 * art: the smoothing's code and shaders, the repacking code, and every sheet's
 * frames. A stored sheet made with any other is stale.
 *
 * import using `with { type: "macro" };` since it reads the sources at build
 * time
 */
export const smoothingInputsHash = (
  /**
   * every sheet's frames, as evaluated
   */
  spritesheetFramesJson: string,
): string => {
  const hash = createHash("sha256");
  for (const path of sourcePaths.flatMap(filesUnder).sort()) {
    hash.update(path);
    hash.update(readFileSync(path));
  }
  hash.update(spritesheetFramesJson);
  return hash.digest("hex").slice(0, 16);
};
