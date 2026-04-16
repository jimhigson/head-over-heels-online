import type { CSSRuleObject } from "tailwindcss/types/config";

import { imageSize } from "image-size";
import plugin from "tailwindcss/plugin";

import spritesheetPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { zxSpectrumColors } from "../../originalGame";
import { isTextureId } from "../../sprites/assertIsTextureId";
import {
  type FramesWithSpeed,
  makeSpritesheetData,
  type TextureId,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { halfbriteHex } from "../../utils/colour/halfBrite";
import {
  entries,
  fromAllEntries,
  objectEntriesIter,
} from "../../utils/entries";
import {
  animatedSpriteIndirectCssVars,
  animatedSpriteSpecificCssVars,
  animationCssVarValues,
  keyframesForAnimatedSprite,
  spriteSpecificCssVars,
} from "./spriteCss";

const spritesheetSize = imageSize("gfx/sprites.png");

// https://tailwindcss.com/docs/plugins
export const spritesTailwindPlugin = plugin(
  ({ addUtilities, addBase, addVariant, e }) => {
    /**
     * A full version of the spritesheet data with every possible sprite loaded. So tailwind thinks every possible
     * textureId exists. postcss can cut them down from there to what's actually used
     */
    const fullSpritesheetData = makeSpritesheetData({
      playable: {
        head: {},
        heels: {},
      },
    });

    const perSheetData = fromAllEntries(
      entries(spritesheetMetas).map(
        ([name, meta]) => [name, makeSpritesheetData(meta)] as const,
      ),
    );

    const animationsAreEqual = (
      a: FramesWithSpeed<TextureId[]>,
      b: FramesWithSpeed<TextureId[]>,
    ) =>
      a.length === b.length &&
      a.animationSpeed === b.animationSpeed &&
      a.every((frame, i) => frame === b[i]);

    const sanitiseId = (id: string) => e(sanitiseForClassName(id));

    const base: CSSRuleObject = {};

    const spriteStyles = (type: "background" | "mask") => ({
      [`${type}Image`]: `var(--spritesheetUrl)`,
      [`${type}Position`]: `calc(-1 * var(--x) * var(--totalScale) * 1px) calc(-1 * var(--y) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
      [`${type}Size`]: `calc(var(--spritesheetW) * var(--totalScale) * 1px) calc(var(--spritesheetH) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
    });

    const bugFrame =
      fullSpritesheetData.frames["thisIsABug" as TextureId].frame;

    const utilities: CSSRuleObject = {
      ".sprite": {
        "--totalScale": `calc(var(--scale, 1) * var(--sprite-scale, 1))`,
        "--x": `${bugFrame.x}`,
        "--y": `${bugFrame.y}`,
        "--w": `${bugFrame.w}`,
        "--h": `${bugFrame.h}`,
        display: "inline-block",
        width: `calc(var(--w) * var(--totalScale) * 1px)`,
        height: `calc(var(--h) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
        imageRendering: "pixelated",
        ...spriteStyles("background"),
      },
      ".sprite-tinted": {
        backgroundImage: "none",
        backgroundPosition: "unset",
        backgroundSize: "unset",
        ...spriteStyles("mask"),
        backgroundColor: `currentColor`,
      },

      // eg, on the original title screen, the sprites were white, and had none of their black pixels
      // shown due to colour-clash
      ".sprite-revert-to-white": {
        filter: "brightness(3) grayscale(100%) contrast(999)",
        mixBlendMode: "lighten",
      },
      ".sprite-revert-to-two-tone": {
        filter: "brightness(3) grayscale(100%) contrast(999)",
        mixBlendMode: "luminosity",
      },
      ".sprite-revert-to-two-tone-dim": {
        filter: "brightness(3) grayscale(100%) contrast(999) brightness(0.75)",
        mixBlendMode: "normal",
      },
      ".sprite-revert-zxYellow": {
        filter:
          "brightness(1.8) grayscale(100%) contrast(999) brightness(0.5) sepia(1)  hue-rotate(30deg) saturate(5) brightness(5)",
        mixBlendMode: "normal",
      },
      ".sprite-revert-zxMagenta": {
        filter:
          "brightness(1.8) grayscale(100%) contrast(999) brightness(0.5) sepia(1)  hue-rotate(262deg) saturate(8)",
        mixBlendMode: "normal",
      },

      ".sprite-shadow": {
        mixBlendMode: "darken",
      },

      /**
       * sets the default vars to describe the spritesheet
       */
      ".set-spritesheet-vars": {
        "--spritesheetW": `${spritesheetSize.width}`,
        "--spritesheetH": `${spritesheetSize.height}`,
      },
      ".blockstack-spritesheet": {
        "--spritesheetUrl": `url('gfx/sprites.png')`,
      },
      ".toppy-spritesheet": {
        "--spritesheetUrl": `url('gfx/spritesToppy.png')`,
      },
      ".sprite-scale-2": {
        "--sprite-scale": "2",
      },
      ".sprites-double-height": {
        "--doubleHeight": "2",
      },
      ".sprites-normal-height": {
        "--doubleHeight": "1",
      },
      ".pixelated": {
        imageRendering: "pixelated",
      },

      // sets the css vars for the editor buttons/toolbars etc
      ".scale-editor": {
        "--scale": "2",
        "--block": `16px`,
      },
      ".unscaled": {
        "--scale": "1",
        "--block": `8px`,
      },
      ".bg-editor-checkerboard": {
        background: `repeating-conic-gradient(${spritesheetPalette.pureBlack} 0 25%, ${halfbriteHex(spritesheetPalette.shadow)} 0 50%) 50% / calc(4*var(--block)) calc(4*var(--block))`,
        backgroundAttachment: "fixed",
      },
      ".bg-checkerboard-stifled-alphas": {
        background: `repeating-conic-gradient(
          transparent 0 25%, #000 0 50%) 50% / calc(2px*var(--scale)) calc(2px*var(--scale)
        )`,
        backgroundAttachment: "fixed",
      },
      ".sprite-in-glyph-margin": {
        "--scale": "0.75",
        // since monaco is hard-coded to 18px for glyph margin icons, we can't set the width/height
        // of the element. Instead of relying on the element's size to clip the spritesheet, a clip-path
        // does the same:
        "clip-path": `inset(
          0                                                         
          clamp(0px, calc(18px - var(--w) * var(--scale) * 1px), calc(18px - var(--w) * var(--scale) * 1px))
          clamp(0px, calc(18px - var(--h) * var(--scale) * 1px), calc(18px - var(--h) * var(--scale) * 1px))  
          0                                                         
        )`,
      },

      "sprites-uppercase": {
        // blank - left in for suggestions
      },
    };

    // s(offset) is shorthand for a sin-based wobble that shifts each band
    // boundary independently. --t is animated from 0 to 360, and each stop
    // uses a different offset so the bands breathe out of phase.
    const s = (offset: number) => `0.04 * sin(${offset}deg + var(--t) * 1deg)`;
    const stop = (base: number, offset: number) =>
      `calc((${base} + ${s(offset)}) * var(--patternLength))`;

    utilities[".loading-border"] = {
      "--c1": halfbriteHex(spritesheetPalette.metallicBlue),
      "--c2": halfbriteHex(spritesheetPalette.pastelBlue),
      "--patternLength": "15vh",
      "--t": "0",
      background: `repeating-linear-gradient(
          to bottom,
          var(--c1) 0,                  var(--c1) ${stop(0.075, 0)},
          var(--c2) ${stop(0.075, 0)},  var(--c2) ${stop(0.175, 47)},
          var(--c1) ${stop(0.175, 47)}, var(--c1) ${stop(0.35, 131)},
          var(--c2) ${stop(0.35, 131)}, var(--c2) ${stop(0.425, 203)},
          var(--c1) ${stop(0.425, 203)},var(--c1) ${stop(0.65, 97)},
          var(--c2) ${stop(0.65, 97)},  var(--c2) ${stop(0.725, 271)},
          var(--c1) ${stop(0.725, 271)},var(--c1) ${stop(0.8, 163)},
          var(--c2) ${stop(0.8, 163)},  var(--c2) calc(1 * var(--patternLength))
        )`,
      backgroundSize: "100% var(--patternLength)",
      backgroundAttachment: "fixed",
      animation:
        "loading-border-scroll-down 1s steps(24) infinite, loading-border-flux 1s steps(24) infinite, loading-bars-colour-cycle 12s steps(4, end) infinite",
    };
    utilities[".zx-loading-border"] = {
      animation:
        "loading-border-scroll-down 1s steps(20) infinite, loading-border-flux 1s steps(20) infinite, zx-loading-bars-colour-cycle 6s steps(2, end) infinite",
    };
    base["@property --t"] = {
      syntax: `"<number>"`,
      inherits: "false",
      "initial-value": "0",
    };
    base["@keyframes loading-border-scroll-down"] = {
      from: {
        backgroundPosition: "0 0",
      },
      to: {
        backgroundPosition: "0 var(--patternLength)",
      },
    };
    base["@keyframes loading-border-flux"] = {
      from: {
        "--t": "0",
      },
      to: {
        "--t": "360",
      },
    };
    base["@keyframes zx-loading-bars-colour-cycle"] = {
      "0%": {
        "--c1": zxSpectrumColors.red.toHex(),
        "--c2": zxSpectrumColors.cyan.toHex(),
      },
      "50%": {
        "--c1": zxSpectrumColors.yellow.toHex(),
        "--c2": zxSpectrumColors.blue.toHex(),
      },
      "100%": {
        "--c1": zxSpectrumColors.yellow.toHex(),
        "--c2": zxSpectrumColors.blue.toHex(),
      },
    };
    base["@keyframes loading-bars-colour-cycle"] = {
      "0%": {
        "--c1": halfbriteHex(spritesheetPalette.metallicBlue),
        "--c2": halfbriteHex(spritesheetPalette.pastelBlue),
      },
      "25%": {
        "--c1": halfbriteHex(spritesheetPalette.midRed),
        "--c2": halfbriteHex(spritesheetPalette.highlightBeige),
      },
      "50%": {
        "--c1": halfbriteHex(spritesheetPalette.moss),
        "--c2": halfbriteHex(spritesheetPalette.swop_cyan),
      },
      "75%": {
        "--c1": halfbriteHex(spritesheetPalette.pink),
        "--c2": halfbriteHex(spritesheetPalette.white),
      },
    };

    for (const [
      textureId,
      {
        frame: { h, w, x, y },
      },
    ] of objectEntriesIter(fullSpritesheetData.frames)) {
      utilities[`.texture-${sanitiseId(textureId)}`] = spriteSpecificCssVars(
        w,
        h,
        x,
        y,
      );

      // allow sprites-uppercase class to work as an equivalent to
      // text-transform: upper
      const hudCharMatch = textureId.match(/^hud\.char\.(?<char>.+)$/);
      if (hudCharMatch) {
        const { char } = hudCharMatch.groups!;
        const uppercaseTextureId = `hud.char.${char.toUpperCase()}`;
        if (isTextureId(uppercaseTextureId, fullSpritesheetData)) {
          const upperCaseFrame = fullSpritesheetData.frames[uppercaseTextureId];
          if (upperCaseFrame) {
            const {
              frame: { h: hUpper, w: wUpper, x: xUpper, y: yUpper },
            } = upperCaseFrame;
            // this is a char and there is also an upper-case version available:
            base[`.sprites-uppercase .texture-${sanitiseId(textureId)}`] = {
              "--w": `${wUpper}`,
              "--h": `${hUpper}`,
              "--x": `${xUpper}`,
              "--y": `${yUpper}`,
            };
          }
        }
      }
    }

    type AnimationsRecord = Record<string, FramesWithSpeed<TextureId[]>>;
    const blockStackAnimations = perSheetData.BlockStack!
      .animations as AnimationsRecord;
    const toppyAnimations = perSheetData.Toppy!.animations as AnimationsRecord;
    const allAnimationNames = new Set([
      ...Object.keys(blockStackAnimations),
      ...Object.keys(toppyAnimations),
    ]);

    const blockStackVars: CSSRuleObject = {};
    const toppyVars: CSSRuleObject = {};

    for (const animationName of allAnimationNames) {
      const bsFrames = blockStackAnimations[animationName];
      const toppyFrames = toppyAnimations[animationName];

      const shared =
        bsFrames && toppyFrames && animationsAreEqual(bsFrames, toppyFrames);

      const emitUtilities = (
        frames: FramesWithSpeed<TextureId[]>,
        cssVarsFn: (
          ...args: Parameters<typeof animatedSpriteSpecificCssVars>
        ) => CSSRuleObject,
      ) => {
        utilities[`.texture-animated-${sanitiseId(animationName)}`] = cssVarsFn(
          animationName,
          sanitiseId,
          frames,
          fullSpritesheetData,
        );
        utilities[`.texture-animated-reversed-${sanitiseId(animationName)}`] =
          cssVarsFn(
            animationName,
            sanitiseId,
            frames,
            fullSpritesheetData,
            true,
          );
      };

      const assignKeyframesToUtility = (
        frames: FramesWithSpeed<TextureId[]>,
        spritesheetData: ReturnType<typeof makeSpritesheetData>,
        keyframePrefix = "",
      ) => {
        const normalUtility = utilities[
          `.texture-animated-${sanitiseId(animationName)}`
        ] as object;
        Object.assign(
          normalUtility,
          keyframesForAnimatedSprite(
            animationName,
            sanitiseId,
            frames,
            spritesheetData,
            keyframePrefix,
          ),
        );
      };

      if (shared) {
        // identical in both spritesheets — direct animation shorthand, no CSS vars
        emitUtilities(bsFrames, animatedSpriteSpecificCssVars);
        assignKeyframesToUtility(bsFrames, fullSpritesheetData);
      } else {
        // differing or exclusive — use CSS variable indirection
        const referenceFrames = bsFrames ?? toppyFrames;
        emitUtilities(referenceFrames, animatedSpriteIndirectCssVars);

        // the base utility class has --x/--y from the reference frames' first frame
        // in fullSpritesheetData. For spritesheets where the first frame is at a
        // different position, emit an override so that static rendering (eg,
        // Playwright with animations disabled) shows the correct fallback frame.
        const baseUtility = utilities[
          `.texture-animated-${sanitiseId(animationName)}`
        ] as Record<string, string>;
        const baseFallbackX = baseUtility["--x"];
        const baseFallbackY = baseUtility["--y"];

        const sheetAnimationVariation = (
          frames: FramesWithSpeed<TextureId[]> | undefined,
          sheetData: ReturnType<typeof makeSpritesheetData>,
          sheetPrefix: string,
        ): Record<string, unknown> => {
          if (frames === undefined) return {};

          assignKeyframesToUtility(frames, sheetData, sheetPrefix);

          const result: Record<string, unknown> = animationCssVarValues(
            animationName,
            sanitiseId,
            frames,
            sheetData,
            sheetPrefix,
          );

          const fallback = sheetData.frames[frames[0]];
          if (fallback) {
            const overrides: Record<string, string> = {};
            if (`${fallback.frame.x}` !== baseFallbackX) {
              overrides["--x"] = `${fallback.frame.x}`;
            }
            if (`${fallback.frame.y}` !== baseFallbackY) {
              overrides["--y"] = `${fallback.frame.y}`;
            }
            if (Object.keys(overrides).length > 0) {
              result[`& .texture-animated-${sanitiseId(animationName)}`] =
                overrides;
            }
          }

          return result;
        };

        Object.assign(
          blockStackVars,
          sheetAnimationVariation(
            bsFrames,
            perSheetData.BlockStack,
            "blockstack-",
          ),
        );
        Object.assign(
          toppyVars,
          sheetAnimationVariation(toppyFrames, perSheetData.Toppy, "toppy-"),
        );
      }
    }

    Object.assign(
      utilities[".blockstack-spritesheet"] as object,
      blockStackVars,
    );
    Object.assign(utilities[".toppy-spritesheet"] as object, toppyVars);

    utilities[".sprite-play-once"] = {
      animationIterationCount: "1",
    };

    addUtilities(utilities);
    addBase(base);
    // add a variant for zx-spectrum-colour palette
    // this can be done differently in tw4: https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants
    addVariant("zx", ".zx &");

    // for different screen size things:
    addVariant("mobile", ".mobile &");
    addVariant("desktop", ".desktop &");
    addVariant("tablet", ".tablet &");

    addVariant("resAmiga", ".resAmigaLowResPal &");
    addVariant("resZx", ".resSpectrum &");
    addVariant("resHandheld", ".resHandheld &");

    addVariant("colourised", ".colourised &");
    // for changing the colour of selected menu items:
    addVariant("selectedMenuItem", [
      // can put selectedMenuItem:foo on the top of the menu, and it will apply
      // to menu items with the selectedMenuItem class:
      "& .selectedMenuItem",
      // can also put selectedMenuItem:foo on the menu item itself:
      "&.selectedMenuItem",
      // can put selectedMenuItem:foo inside menu items with the selectedMenuItem
      // class
      ".selectedMenuItem &",
    ]);
    addVariant("disabledMenuItem", [
      // can put selectedMenuItem:foo on the top of the menu, and it will apply
      // to menu items with the selectedMenuItem class:
      "& [data-menuitem_disabled=true]",
      // can put selectedMenuItem:foo inside menu items with the selectedMenuItem
      // class
      "[data-menuitem_disabled=true] &",
    ]);

    // the device is in portrait mode, so the output to the screen needs to be rotated to appear in landscape
    addVariant("portrait-rot", [
      // allow stacking with other variants:
      ".portrait-rot&",
      // descendants:
      ".portrait-rot &",
    ]);

    addVariant("sprites-uppercase", [
      ".sprites-uppercase&",
      ".sprites-uppercase &",
    ]);

    addVariant("activated", [
      "button:hover &",
      // how cmd-k marks a command in the list as selected:
      "[data-selected='true'] &",
    ]);
  },
);
