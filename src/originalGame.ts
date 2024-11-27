/** I don't distinguish (yet) reduced/bright colours in the original game: */
export const zxSpectrumRoomHue = [
  "yellow",
  "cyan",
  "green",
  "magenta",
  "white",
] as const;
export type ZxSpectrumRoomHue = (typeof zxSpectrumRoomHue)[number];
export type Shade = "basic" | "dimmed";
export type ZxSpectrumRoomColour = {
  hue: ZxSpectrumRoomHue;
  shade: Shade;
};
export const zxSpectrumFrameRate = 25; // machine did 50.08 or 50.02 :-) interlaced frames, hoh was at 25fps
export const originalGameFrameDuration = 1_000 / zxSpectrumFrameRate;
export const amigaLowResPal = { width: 320, height: 256 };
export const zxSpectrumResolution = { width: 256, height: 192 };
