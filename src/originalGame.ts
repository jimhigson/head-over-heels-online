/** I don't distinguish (yet) reduced/bright colours in the original game: */
export const zxSpectrumRoomColours = [
  "yellow",
  "green",
  "cyan",
  "magenta",
  "white",
] as const;
export type ZxSpectrumRoomColour = (typeof zxSpectrumRoomColours)[number];
export const zxSpectrumFrameRate = 25; // machine did 50.08 or 50.02 :-) interlaced frames, hoh was at 25fps
export const zxSpectrumFrameDuration = 1_000 / zxSpectrumFrameRate;
export const zxSpectrumResolution = { width: 256, height: 192 };
