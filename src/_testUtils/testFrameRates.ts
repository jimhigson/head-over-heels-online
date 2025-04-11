export const testFrameRates = [
  12.5, // every other frame, PAL
  25, // original game, PAL
  29.97, // NTSC real
  30, // NTSC almost
  40,
  45,
  46,
  50, // double original (interlaced)
  50.04, // double original (interlaced, measured)
  60, // most common; ios Safari throttle
  75, // typical/high
  79.638, // boundary found for head being able to jump too high (failed, frame rate not fast enough) - before sub-steps
  79.639, // boundary found for head being able to jump too high (passed, frame rate *is* fast enough) - before sub-steps
  80,
  90,
  100, // fast PAL/SECAM (flicker-free crt etc)
  120, // eg macbook pro w/promotion
  144, // high desktop monitor update rate
  200, // very fast PAL/SECAM
  240, // very high desktop monitor update rate
  260, // highest supported
];
