import { type HexColour } from "./utils/colour/HexColour";

export const zxSpectrumRoomHue = [
  "yellow",
  "cyan",
  "green",
  "magenta",
  "white",
] as const;
export type ZxSpectrumRoomHue = (typeof zxSpectrumRoomHue)[number];
export type ZxSpectrumHue = "black" | "blue" | "red" | ZxSpectrumRoomHue;
export const zxSpectrumShades = ["basic", "dimmed"] as const;
export type ZxSpectrumShade = (typeof zxSpectrumShades)[number];
export type ZxSpectrumPaletteColour =
  `${ZxSpectrumHue}${Capitalize<ZxSpectrumShade>}`;
export type ZxSpectrumRoomColour = {
  hue: ZxSpectrumRoomHue;
  shade: ZxSpectrumShade;
};
export const zxSpectrumFrameRate = 25; // machine did 50.08 or 50.02 :-) interlaced frames, hoh was at 25fps
export const originalGameFrameDuration = 1_000 / zxSpectrumFrameRate;

export const resolutions = {
  // Amiga hires: in game, too many pixels, game doesn't fill enough of the screen
  // but, in the level editor is quite useful
  amigaHiResPal: { name: "Amiga Hi-Res PAL", size: { x: 640, y: 512 } },
  // didn't have a HoH port, but is nicely between Amiga hires and low res
  classicMac: { name: "Classic Mac", size: { x: 512, y: 384 } },
  amigaLowResPal: { name: "Amiga Lo-Res PAL", size: { x: 320, y: 256 } },
  zxSpectrum: { name: "ZX Spectrum", size: { x: 256, y: 192 } },
  // there was never really a handheld port, and this is a bit big for period-correct
  // handhelds (gameboy was 160x120), but this is the smallest I can go to be playable
  // on modern phones and not be too small
  handheld: {
    name: "Handheld",
    size: {
      x: 256,
      // y chosen so the compact version of the 5 crowns display (only just) always
      // fits on the screen
      y: 141,
    },
  },
};
export type ResolutionName = keyof typeof resolutions;
export const resolutionNames = Object.keys(resolutions) as ResolutionName[];

export const zxSpectrumHexColours: Record<ZxSpectrumHue, HexColour> = {
  // zx-spectrum colours (mostly for tailwind):
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  yellow: "#ffff00",
  black: "#000000",
  white: "#ffffff",
};

export const zxSpectrumHexColoursDimmed: Record<ZxSpectrumHue, HexColour> = {
  // dimmed variants (B is 75% intensity, which approximately matches the original hardware):
  red: "#bb0000",
  green: "#00bb00",
  blue: "#0000bb",
  cyan: "#00bbbb",
  magenta: "#bb00bb",
  yellow: "#bbbb00",
  black: "#000000",
  white: "#bbbbbb",
};

export const zxSpectrumHexPaletteColours: Record<
  ZxSpectrumPaletteColour,
  HexColour
> = {
  redBasic: zxSpectrumHexColours.red,
  greenBasic: zxSpectrumHexColours.green,
  blueBasic: zxSpectrumHexColours.blue,
  cyanBasic: zxSpectrumHexColours.cyan,
  magentaBasic: zxSpectrumHexColours.magenta,
  yellowBasic: zxSpectrumHexColours.yellow,
  blackBasic: zxSpectrumHexColours.black,
  whiteBasic: zxSpectrumHexColours.white,
  redDimmed: zxSpectrumHexColoursDimmed.red,
  greenDimmed: zxSpectrumHexColoursDimmed.green,
  blueDimmed: zxSpectrumHexColoursDimmed.blue,
  cyanDimmed: zxSpectrumHexColoursDimmed.cyan,
  magentaDimmed: zxSpectrumHexColoursDimmed.magenta,
  yellowDimmed: zxSpectrumHexColoursDimmed.yellow,
  blackDimmed: zxSpectrumHexColoursDimmed.black,
  whiteDimmed: zxSpectrumHexColoursDimmed.white,
};

// don't know exact date but a guess based on the date of this review:
// https://www.everygamegoing.com/larticle/Head-Over-Heels-000/32831
export const releaseDateIso8601 = "1987-06-01T00:00:00Z";
