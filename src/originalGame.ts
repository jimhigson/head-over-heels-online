import { Color } from "pixi.js";

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

export const zxSpectrumColors = {
  // zx-spectrum colours (mostly for tailwind):
  red: new Color("#f00"),
  green: new Color("#0f0"),
  blue: new Color("#00f"),
  cyan: new Color("#0ff"),
  magenta: new Color("#f0f"),
  yellow: new Color("#ff0"),
  black: new Color("#000"),
  white: new Color("#fff"),
};

export const zxSpectrumColorsDimmed = {
  // dimmed variants (B is 75% intensity, which approximately matches the original hardware):
  red: new Color("#B00"),
  green: new Color("#0B0"),
  blue: new Color("#00B"),
  cyan: new Color("#0BB"),
  magenta: new Color("#B0B"),
  yellow: new Color("#BB0"),
  black: new Color("#000"),
  white: new Color("#BBB"),
};

// don't know exact date but a guess based on the date of this review:
// https://www.everygamegoing.com/larticle/Head-Over-Heels-000/32831
export const releaseDateIso8601 = "1987-06-01T00:00:00Z";

export const zxSpectrumDimmed = (c: Color) => {
  const [r, g, b] = c.toUint8RgbArray();
  // 0.5 seems a bit too dim, 0.75 seems to match the original hardware better
  const hb = new Color({ r: r * 0.75, g: g * 0.75, b: b * 0.75 });
  return hb;
};

export function zxSpectrumColor(colour: ZxSpectrumRoomColour): Color;
export function zxSpectrumColor(
  hue: ZxSpectrumHue,
  shade?: ZxSpectrumShade,
): Color;
export function zxSpectrumColor(
  hueOrColour: ZxSpectrumHue | ZxSpectrumRoomColour,
  shade?: ZxSpectrumShade,
): Color {
  const { hue, shade: resolvedShade } =
    typeof hueOrColour === "object" ? hueOrColour : (
      { hue: hueOrColour, shade: shade ?? "basic" }
    );
  const hues =
    resolvedShade === "dimmed" ? zxSpectrumColorsDimmed : zxSpectrumColors;
  return hues[hue];
}
