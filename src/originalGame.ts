
/** I don't distinguish (yet) reduced/bright colours in the original game: */
export const zxSpectrumRoomColours = ['yellow', 'green', 'cyan', 'magenta', 'white'] as const;
export type ZxSpectrumRoomColours = (typeof zxSpectrumRoomColours)[number];
export const zxSpectrumFrameRate = 50; // actually 50.08 or 50.02 :-)
export const zxSpectrumResolution = { width: 256, height: 192 };


