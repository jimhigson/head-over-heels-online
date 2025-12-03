import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { zxSpectrumColors } from "../../../originalGame";

export const buttonColours = {
  colourised: {
    jump: spritesheetPalette.pastelBlue,
    fire: spritesheetPalette.highlightBeige,
    carry: spritesheetPalette.moss,
    carryAndJump: spritesheetPalette.midRed,
    menu: spritesheetPalette.lightGrey,
    map: spritesheetPalette.lightGrey,
  },
  zx: {
    jump: zxSpectrumColors.blue,
    fire: zxSpectrumColors.yellow,
    carry: zxSpectrumColors.green,
    carryAndJump: zxSpectrumColors.red,
    menu: zxSpectrumColors.white,
    map: zxSpectrumColors.white,
  },
};
