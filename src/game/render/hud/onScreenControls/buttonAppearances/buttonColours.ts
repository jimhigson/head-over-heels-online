import type { ZxSpectrumHue } from "../../../../../originalGame";
import type { BlockstackPaletteColourName } from "../../../../../sprites/palette/spritesheetPalette";
import type { ButtonId } from "../OnScreenButtonRenderer";

export const buttonColours = {
  colourised: {
    jump: "pastelBlue",
    fire: "highlightBeige",
    carry: "moss",
    carryAndJump: "midRed",
    menu: "lightGrey",
    map: "lightGrey",
  } satisfies Record<ButtonId, BlockstackPaletteColourName>,
  zx: {
    jump: "blue",
    fire: "yellow",
    carry: "green",
    carryAndJump: "red",
    menu: "white",
    map: "white",
  } satisfies Record<ButtonId, ZxSpectrumHue>,
};
