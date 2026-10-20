import { describe, expect, test } from "vitest";

import { entries } from "../../../utils/entries";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { spritesheetMetas } from "./spritesheetMetaData";

describe.for(
  // debug and uncolourised sheets share another sheet's frame data, so add
  // nothing to snapshot:
  entries(spritesheetMetas).filter(
    ([, spritesheetMeta]) =>
      spritesheetMeta.debug !== true &&
      spritesheetMeta.isUncolourisedOf === undefined,
  ),
)("%s", ([, spritesheetMeta]) => {
  test("frame names", () => {
    const { frames } = playableSpritesheetData(spritesheetMeta.playable);
    expect(Object.keys(frames).sort()).toMatchSnapshot();
  });

  test("animations", () => {
    const { animations } = playableSpritesheetData(spritesheetMeta.playable);
    expect(animations).toMatchSnapshot();
  });
});
