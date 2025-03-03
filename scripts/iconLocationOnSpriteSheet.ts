#!/usr/bin/env -S pnpm tsx

import { spritesheetData } from "../src/sprites/spriteSheetData";

const { frame } = spritesheetData.frames["head.falling.right"];
// conveniently write to imagemagick's preferred crop format:
console.log(`${frame.w}x${frame.h}+${frame.x}+${frame.y}`);
