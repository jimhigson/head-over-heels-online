#!/usr/bin/env -S pnpm tsx

import { makeSpritesheetData } from "../src/sprites/spritesheet/spritesheetData/spriteSheetData";

const { frame } = makeSpritesheetData({ playable: { head: {}, heels: {} } })
  .frames["heels.walking.towardsRight.3"];
// conveniently write to imagemagick's preferred crop format:
console.log(`${frame.w}x${frame.h}+${frame.x}+${frame.y}`);
