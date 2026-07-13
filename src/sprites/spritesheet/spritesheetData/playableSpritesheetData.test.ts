import { describe, expect, test } from "vitest";

import { entries } from "../../../utils/entries";
import { playableSpritesheetData } from "./playableSpritesheetData";
import { spritesheetMetas } from "./spritesheetMetaData";

describe.for(
  // debug sheets copy their frame data from the sheet they were drawn over,
  // so add nothing to snapshot:
  entries(spritesheetMetas).filter(([, meta]) => meta.debug !== true),
)("%s", ([, meta]) => {
  test("frame names", () => {
    const { frames } = playableSpritesheetData(meta.playable);
    expect(Object.keys(frames).sort()).toMatchSnapshot();
  });

  test("animations", () => {
    const { animations } = playableSpritesheetData(meta.playable);
    expect(animations).toMatchSnapshot();
  });
});
