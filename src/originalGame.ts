/** I don't distinguish (yet) reduced/bright colours in the original game: */
export const zxSpectrumRoomHue = [
  "yellow",
  "cyan",
  "green",
  "magenta",
  "white",
] as const;
export type ZxSpectrumRoomHue = (typeof zxSpectrumRoomHue)[number];
export const zxSpectrumShades = ["basic", "dimmed"] as const;
export type ZxSpectrumShade = (typeof zxSpectrumShades)[number];
export type ZxSpectrumRoomColour = {
  hue: ZxSpectrumRoomHue;
  shade: ZxSpectrumShade;
};
export const zxSpectrumFrameRate = 25; // machine did 50.08 or 50.02 :-) interlaced frames, hoh was at 25fps
export const originalGameFrameDuration = 1_000 / zxSpectrumFrameRate;

export const resolutions = {
  // Amiga hires: just too many pixels, game doesn't fill enough of the screen
  //amigaHiResPal: { x: 640, y: 512 },
  amigaLowResPal: { x: 320, y: 256 },
  zxSpectrum: { x: 256, y: 192 },
  // there was never really a handheld port, and this is a bit big for period-correct
  // handhelds (gameboy was 160x120), but this is the smallest I can go to be playable
  // on modern phones and not be too small
  handheld: { x: 256, y: 135 },
};
export type ResolutionName = keyof typeof resolutions;
export const resolutionNames = Object.keys(resolutions) as ResolutionName[];

export const zxSpectrumColors = {
  // zx-spectrum colours:
  zxRed: "#f00",
  zxGreen: "#0f0",
  zxBlue: "#00f",
  zxCyan: "#0ff",
  zxMagenta: "#f0f",
  zxYellow: "#ff0",
  zxBlack: "#000",
  zxWhite: "#fff",
  zxRedDimmed: "#800",
  zxGreenDimmed: "#080",
  zxBlueDimmed: "#008",
  zxCyanDimmed: "#088",
  zxMagentaDimmed: "#808",
  zxYellowDimmed: "#880",
  zxBlackDimmed: "#000",
  zxWhiteDimmed: "#888",
};
