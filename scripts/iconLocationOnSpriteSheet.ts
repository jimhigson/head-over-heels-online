#!/usr/bin/env -S pnpm tsx

import { spritesheetData } from "../src/sprites/spritesheet/spritesheetData/spriteSheetData";

const { frame } = spritesheetData.frames["heels.walking.towardsRight.3"];
// conveniently write to imagemagick's preferred crop format:
console.log(`${frame.w}x${frame.h}+${frame.x}+${frame.y}`);
