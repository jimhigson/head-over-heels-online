import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { zxSpectrumColors } from "../../../originalGame";

export const buttonColours = {
  colourised: {
    jump: spritesheetPalette.metallicBlue,
    fire: spritesheetPalette.highlightBeige,
    carry: spritesheetPalette.moss,
    carryAndJump: spritesheetPalette.midRed,
    menu: spritesheetPalette.lightGrey,
  },
  zx: {
    jump: zxSpectrumColors.zxBlue,
    fire: zxSpectrumColors.zxYellow,
    carry: zxSpectrumColors.zxGreen,
    carryAndJump: zxSpectrumColors.zxRed,
    menu: zxSpectrumColors.zxWhite,
  },
};
