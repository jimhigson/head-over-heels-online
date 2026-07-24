#!/usr/bin/env -S pnpm tsx

import { makeSpritesheetData } from "../src/sprites/spritesheet/spritesheetData/makeSpritesheetData";
// not macro-imported: this script runs under node, with no build step
import { octantIndexOfDirection } from "../src/utils/vectors/octantIndexOfDirection";

const { frame } = makeSpritesheetData({ playable: { head: {}, heels: {} } })
  .frames[`heels.walking.d${octantIndexOfDirection("towardsRight")}.3`];
// conveniently write to imagemagick's preferred crop format:
console.log(`${frame.w}x${frame.h}+${frame.x}+${frame.y}`);
