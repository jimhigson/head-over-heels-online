import { blockEncodeRgbBitDepth } from "./blockEncode";

// Using block encoding with 6 bits per channel, we need 512x512 texture
// 8x8 blocks of 64x64 pixels each
export const lutW = (2 ** blockEncodeRgbBitDepth) ** (3 / 2); // 64^1.5 = 512

export const lutSize = lutW * lutW;
