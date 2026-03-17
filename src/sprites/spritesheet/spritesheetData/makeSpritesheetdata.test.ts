import { expect, test } from "vitest";

import { makeSpritesheetData } from "./makeSpritesheetData";

test("for tailwind plugin we must have all possible frames and animations", () => {
  const { frames, animations } = makeSpritesheetData({
    playable: {
      head: {},
      heels: {},
    },
  });

  expect(frames).toMatchSnapshot();
  expect(animations).toMatchSnapshot();
});
