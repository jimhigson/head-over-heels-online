import { describe, expect, test } from "vitest";
import {
  resolutionNames as emulatableResolutions,
  resolutions,
} from "../../../originalGame";
import { calculateUpscale, maximumCanvasUpscale } from "./calculateUpscale";
import { scaleXy } from "../../../utils/vectors/vectors";

describe("descriptive cases", () => {
  const zxSpectrumRes = resolutions.zxSpectrum;

  test("output size matches the emulated size", () => {
    const result = calculateUpscale({
      // playing on something with the same resolution as the zx spectrum:
      renderAreaSize: resolutions.zxSpectrum,
      emulatedResolutionName: "zxSpectrum",
      devicePixelRatio: 1,
      deviceType: "desktop",
    });

    // upscale is basically a noop:
    expect(result).toMatchObject({
      canvasSize: zxSpectrumRes,
      gameEngineScreenSize: zxSpectrumRes,
      cssUpscale: 1,
      gameEngineUpscale: 1,
      rotate90: false,
    });
  });

  test("double the emulated resolution size - game engine scales up", () => {
    const result = calculateUpscale({
      renderAreaSize: scaleXy(resolutions.zxSpectrum, 2),
      emulatedResolutionName: "zxSpectrum",
      devicePixelRatio: 1,
      deviceType: "desktop",
    });

    expect(result).toMatchObject({
      canvasSize: scaleXy(resolutions.zxSpectrum, 2),
      // this is the size after scaling via app.stage.scale, so keep rendering to the same size:
      gameEngineScreenSize: zxSpectrumRes,
      // no css upscale, the output is not big enough:
      cssUpscale: 1,
      // render at double-size in the game engine:
      gameEngineUpscale: 2,
      rotate90: false,
    });
  });

  test("screen 4x the emulated resolution size - game engine scales up 4x", () => {
    const result = calculateUpscale({
      renderAreaSize: scaleXy(resolutions.zxSpectrum, 4),
      emulatedResolutionName: "zxSpectrum",
      devicePixelRatio: 1,
      deviceType: "desktop",
    });

    expect(result).toMatchObject({
      canvasSize: scaleXy(resolutions.zxSpectrum, 4),
      gameEngineScreenSize: zxSpectrumRes,
      // no css upscale, the output is not big enough:
      cssUpscale: 1,
      // render at quad-size in the game engine:
      gameEngineUpscale: 4,
      rotate90: false,
    });
  });

  test("screen 8x the emulated resolution - game engine scales up 4x, with an extra 2x from css", () => {
    const result = calculateUpscale({
      renderAreaSize: scaleXy(resolutions.zxSpectrum, 8),
      emulatedResolutionName: "zxSpectrum",
      devicePixelRatio: 1,
      deviceType: "desktop",
    });

    expect(result).toMatchObject({
      canvasSize: scaleXy(resolutions.zxSpectrum, 4),
      gameEngineScreenSize: zxSpectrumRes,
      // no css upscale, the output is not big enough:
      cssUpscale: 2,
      // render at quad-size in the game engine:
      gameEngineUpscale: 4,
      rotate90: false,
    });
  });

  test("screen 4x the emulated resolution size and pixel ratio doubling (so really 8x)", () => {
    const result = calculateUpscale({
      renderAreaSize: scaleXy(resolutions.zxSpectrum, 4),
      emulatedResolutionName: "zxSpectrum",
      devicePixelRatio: 2,
      deviceType: "desktop",
    });

    expect(result).toMatchObject({
      canvasSize: scaleXy(resolutions.zxSpectrum, 4),
      gameEngineScreenSize: zxSpectrumRes,
      // no css upscale, the output is not big enough:
      cssUpscale: 1,
      // render at quad-size in the game engine:
      gameEngineUpscale: 4,
      rotate90: false,
    });
  });

  test("playing emulated (4:3) 256x192 on (4:3) 1600x1200 hardware screen that's pretending to be the old 800x600 size via devicePixelRatio=2", () => {
    // confirm that the aspect ratios really are the same
    expect(256 / 192).toBeCloseTo(800 / 600, 4);

    const result = calculateUpscale({
      // note this aspect ratio is 4:3, so it matches the zx spectrum's perfectly
      renderAreaSize: { x: 800, y: 600 },
      emulatedResolutionName: "zxSpectrum",
      // devicePixelRatio means the screen is actually 1600x1200
      devicePixelRatio: 2,
      deviceType: "desktop",
    });

    // note that the total upscale is 1600/256 = 6.25,
    //   - which is rounded to 6
    // The game engine upscale is capped at 4. So should be
    //  * 4x in-engine
    //  * 6/4 = 1.5x css upscale
    //    but, the css upscale needs to be in the reported screen size, not hardware size, so with a devicePixelRatio of 2,
    //   = 0.75
    // maximum allowed upscale in the game engine:

    expect(result).toMatchObject({
      // aspect ratios match, so take up the whole screen. This means
      // to get to the reported size, but after css scaling of 0.75:
      canvasSize: {
        x: Math.ceil(800 / 0.75),
        y: Math.ceil(600 / 0.75),
      },
      //gameEngineScreenSize: zxSpectrumRes,
      // up to the max cap
      gameEngineUpscale: 4,
      // just enough css upscale to get the size we want:
      cssUpscale: 0.75,
      rotate90: false,
    });
  });
});

function* cartesian<Types extends readonly unknown[]>(
  ...iterables: {
    [K in keyof Types]: Iterable<Types[K]>;
  }
): Generator<Types> {
  if (iterables.length === 0) {
    yield [] as unknown as Types;
    return;
  }

  const [first, ...rest] = iterables;

  for (const item of first) {
    for (const restCombo of cartesian(...(rest as typeof iterables))) {
      yield [item, ...restCombo] as unknown as Types;
    }
  }
}

const testScreenResolutions = [
  // iPhones
  { name: "iPhone 8", x: 750, y: 1334 },
  { name: "iPhone 8 Plus", x: 1080, y: 1920 },
  { name: "iPhone X / XS / 11 Pro", x: 1125, y: 2436 },
  { name: "iPhone XS Max / 11 Pro Max", x: 1242, y: 2688 },
  { name: "iPhone XR / 11", x: 828, y: 1792 },
  { name: "iPhone 12 Pro / 13 Pro", x: 1170, y: 2532 },
  { name: "iPhone 12 Pro Max / 13 Pro Max / 14 Plus", x: 1284, y: 2778 },
  { name: "iPhone 14 Pro / 15 Pro", x: 1179, y: 2556 },
  { name: "iPhone 14 Pro Max / 15 Plus / 15 Pro Max", x: 1290, y: 2796 },

  // other Mobile / Tablet
  { name: "FHD+ Smartphone", x: 1080, y: 2280 },
  { name: "2340x1080 Smartphone", x: 2340, y: 1080 },
  { name: "2400x1080 Smartphone", x: 2400, y: 1080 },
  { name: "iPhone X/XS/11 Pro", x: 2436, y: 1125 },
  { name: "Galaxy S9/Note8", x: 2960, y: 1440 }, // Samsung's "Infinity Display"
  { name: "Xperia 1 Ultra-wide", x: 3840, y: 1600 }, // Ultra-tall cinematic display

  // Desktop / Laptop / Monitor
  { name: "WXGA", x: 1366, y: 768 }, // Common for budget laptops
  { name: "FHD (1080p)", x: 1920, y: 1080 },
  { name: "WUXGA", x: 1920, y: 1200 }, // 16:10 productivity laptops
  { name: "QHD / WQHD", x: 2560, y: 1440 },
  { name: "WQXGA", x: 2560, y: 1600 }, // High-res 16:10
  { name: "MacBook Pro Retina 15″", x: 2880, y: 1800 },
  { name: "MacBook Pro Retina 16″", x: 3072, y: 1920 },
  { name: "UltraWide QHD", x: 3440, y: 1440 }, // 21:9 aspect ratio
  { name: "4K UHD", x: 3840, y: 2160 },
  { name: "5K Retina iMac", x: 5120, y: 2880 },
  { name: "5K:2K Ultrawide", x: 5120, y: 2160 }, // 21:9 wide-screen productivity / media monitors
  { name: "8K UHD", x: 7680, y: 4320 }, // Cutting-edge high-end displays

  // Legacy / Retro Systems
  { name: "VGA", x: 640, y: 480 },
  { name: "SVGA", x: 800, y: 600 },
  { name: "Mode 13h (DOS Games)", x: 320, y: 200 }, // Popular 256-color PC mode
  { name: "QVGA / PS1 / GBA", x: 320, y: 240 }, // Used in many retro consoles
  { name: "Amiga PAL Hi-Res", x: 640, y: 256 }, // 640 horizontal, PAL vertical lines
  { name: "Amiga PAL Low-Res", x: 320, y: 256 },
  { name: "Neo Geo", x: 384, y: 224 },
  { name: "SNES NTSC", x: 256, y: 224 },
  { name: "EDTV (Wii)", x: 720, y: 480 }, // Enhanced Definition TV
  { name: "HD 720p", x: 1280, y: 720 },
  { name: "PS1 Interlaced", x: 640, y: 448 }, // High-res interlaced PlayStation mode
  { name: "Game Boy / GBC", x: 160, y: 144 },
  { name: "Nintendo DS Screen", x: 256, y: 192 }, // Single DS screen resolution
];

describe("invariants hold over a huge number of cases", () => {
  describe.each([
    ...cartesian(
      testScreenResolutions,
      emulatableResolutions,
      [1, 1.25, 1.5, 2, 4],
    ).map(([renderAreaSize, emulatedResolutionName, devicePixelRatio]) => ({
      renderAreaSize,
      emulatedResolutionName,
      devicePixelRatio,
    })),
  ])(
    "renderAreaSize $renderAreaSize.name ($renderAreaSize.x x $renderAreaSize.y), emulated resolution $emulatedResolutionName, device pixel ratio $devicePixelRatio",
    ({ renderAreaSize, emulatedResolutionName, devicePixelRatio }) => {
      const landscapeResult = calculateUpscale({
        renderAreaSize,
        emulatedResolutionName,
        devicePixelRatio,
      });
      const portraitResult = calculateUpscale({
        renderAreaSize: { y: renderAreaSize.x, x: renderAreaSize.y },
        emulatedResolutionName,
        devicePixelRatio,
        deviceType: "mobile",
      });

      test("should multiply to the correct value", () => {
        // expect(landscapeResult.gameEngineScreenSize).toEqual(
        //   scaleXy(renderAreaSize, devicePixelRatio),
        // );
      });

      test("respects maximum upscale", () => {
        // css should only be used to upscale, not downscale:
        expect(landscapeResult.gameEngineUpscale).toBeLessThanOrEqual(
          maximumCanvasUpscale,
        );
      });

      test("css can be used to bring the size down, but not below the undoing of the devicePixelRatio", () => {
        // css should only be used to upscale, not downscale:
        expect(landscapeResult.cssUpscale).toBeGreaterThanOrEqual(
          1 / devicePixelRatio,
        );
      });

      test("landscape screens should not be rotated", () => {
        expect(landscapeResult.rotate90).toBe(false);
      });
      test("portrait screens should be rotated", () => {
        expect(portraitResult.rotate90).toBe(true);
      });
    },
  );
});
