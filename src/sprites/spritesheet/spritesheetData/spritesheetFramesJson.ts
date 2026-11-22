import { keys } from "../../../utils/entries";
import { makeSpritesheetData } from "./makeSpritesheetData";
import { spritesheetMetas } from "./spritesheetMetaData";

/**
 * every sheet's frames, as json in a stable order - for build-time macros
 * whose output depends on where the frames are
 */
export const spritesheetFramesJson = (): string =>
  keys(spritesheetMetas)
    .sort()
    .map((spritesheetName) =>
      JSON.stringify(
        makeSpritesheetData(spritesheetMetas[spritesheetName]).frames,
      ),
    )
    .join("");
