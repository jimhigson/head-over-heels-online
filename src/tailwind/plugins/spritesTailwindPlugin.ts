import { imageSize } from "image-size";
import plugin from "tailwindcss/plugin";
import { type CSSRuleObject } from "tailwindcss/types/config";

import spritesheetPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import toppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { editorUiScale } from "../../editor/editorUiScale";
import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { zxSpectrumColors } from "../../originalGame";
import { makeBaseSpritesheetData } from "../../sprites/spritesheet/spritesheetData/makeBaseSpritesheetData";
import {
  type BaseTextureId,
  type FramesWithSpeed,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { halfbriteHex } from "../../utils/colour/halfbrite";
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

const spritesheetSize = imageSize("gfx/sprites.webp");

// https://tailwindcss.com/docs/plugins
export const spritesTailwindPlugin = plugin(
  ({ addUtilities, addBase, addVariant, e }) => {
    /**
     * A full version of the spritesheet data with every possible sprite loaded. So tailwind thinks every possible
     * textureId exists. postcss can cut them down from there to what's actually used
     */
    const fullSpritesheetData = makeBaseSpritesheetData({
      playable: {
        head: {},
        heels: {},
      },
    });

    const perSheetData = fromAllEntries(
      entries(spritesheetMetas).map(
        ([name, meta]) => [name, makeBaseSpritesheetData(meta)] as const,
      ),
    );

    const animationsAreEqual = (
      a: FramesWithSpeed<BaseTextureId[]>,
      b: FramesWithSpeed<BaseTextureId[]>,
    ) =>
      a.length === b.length &&
      a.animationSpeed === b.animationSpeed &&
      a.every((frame, i) => frame === b[i]);

    // an animation whose frames are copyFrom copies has the same frame ids in
    // both sheets but different on-sheet coords (the copy is aliased to its
    // source's region), so it must not take the "shared" path that reads coords
    // from the override-less fullSpritesheetData
    const animationUsesCopyFrom = (
      frames: FramesWithSpeed<BaseTextureId[]> | undefined,
      sheetName: keyof typeof spritesheetMetas,
    ) =>
      frames?.some(
        (f) =>
          spritesheetMetas[sheetName].overrides?.[f]?.copyFrom !== undefined,
      ) ?? false;

    const sanitiseId = (id: string) => e(sanitiseForClassName(id));

    const base: CSSRuleObject = {};

    // the HUD font, its native 8px-cell size, and single-line leading apply
    // everywhere by default; --block / --scale fallbacks keep this valid even
    // before those vars cascade in. Multi-line text opts in via .text-multi-line
    base["body"] = {
      fontFamily: '"HeadOverHeels", monospace',
      fontSize: "var(--block, 8px)",
      lineHeight: "calc(10px * var(--scale, 1))",
    };

    const spriteStyles = (type: "background" | "mask") => ({
      [`${type}Image`]: `var(--spritesheetUrl)`,
      [`${type}Position`]: `calc(-1 * var(--x) * var(--totalScale) * 1px) calc(-1 * var(--y) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
      [`${type}Size`]: `calc(var(--spritesheetW) * var(--totalScale) * 1px) calc(var(--spritesheetH) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
    });

    const bugFrame =
      fullSpritesheetData.frames["thisIsABug" as BaseTextureId].frame;

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
        // horizontally mirrored copies (copyFrom flipX) set --flip: -1; default
        // 1 is the identity for every other sprite
        transform: "scaleX(var(--flip, 1))",
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
        "--spritesheetUrl": `url('gfx/sprites.webp')`,
      },
      ".toppy-spritesheet": {
        "--spritesheetUrl": `url('gfx/spritesToppy.webp')`,
      },
      ".sprite-scale-2": {
        "--sprite-scale": "2",
      },
      // horizontally mirror a sprite (the `.sprite` base reads --flip into its
      // transform); used for copyFrom flipX copies
      ".sprite-flip-x": {
        "--flip": "-1",
      },
      ".sprites-double-height": {
        "--doubleHeight": "2",
      },
      ".sprites-normal-height": {
        "--doubleHeight": "1",
      },
      // the real-text equivalent of .sprites-double-height. The HeadOverHeels
      // font is variable on a custom "HGHT" axis whose peak (1) makes every
      // glyph genuinely twice as tall at the same width - so unlike a CSS
      // transform this reserves real line height and wraps, centres and stacks
      // like any other text.
      //
      // the `top` nudge: the font's ascent/descent metrics are fixed at the
      // single-height values (8px up / 2px down per 8px em) because metrics
      // can't reliably vary with the axis (there is no MVAR tag for hhea
      // ascent, and Chrome ignores MVAR for inline-box metrics anyway). The
      // browser therefore places the baseline by half-leading centring the
      // 10px content box in this 20px line box: (20 - 10) / 2 + 8 = 13px down.
      // The doubled ink extends 16px above the baseline, so it overshoots the
      // top of the line box by 16 - 13 = 3px (and falls the same 3px short of
      // the bottom). Shifting the ink down by exactly those 3px (scaled) makes
      // the glyphs fill the line box precisely: grid gaps above and below the
      // line are then honoured. position:relative moves only the paint - the
      // reserved layout space is unaffected.
      //
      // --textDoubleHeightNudge exists so that text which must share a
      // baseline with single-height text on the same line can opt out (see
      // .text-double-height-on-baseline)
      ".text-double-height": {
        fontVariationSettings: '"HGHT" 1',
        lineHeight: "calc(20px * var(--scale, 1))",
        position: "relative",
        top: "calc(var(--textDoubleHeightNudge, 3px) * var(--scale, 1))",
      },
      // for double-height text mixed inline with single-height text (eg the
      // main menu's "HEAD over HEELS" heading): keep the font's true shared
      // baseline instead of the ink nudge. The doubled ink then extends above
      // the line box, so the surrounding layout must have headroom
      ".text-double-height-on-baseline": {
        "--textDoubleHeightNudge": "0px",
      },
      // a 1px-gap, 1px-thick pixel-grid underline. The font itself declares
      // exactly this (post.underlinePosition/underlineThickness, set in
      // buildVariableFont.py) - but Chromium's default CSS underline ignores a
      // font's post-table metrics entirely (verified: rendering was pixel-
      // identical between our font and a copy with wildly different declared
      // metrics), so the position/thickness must be asserted here instead.
      // Plain tailwind `underline` only sets text-decoration-line and leaves
      // Chrome's built-in (non-pixel-aligned) heuristic in charge
      ".text-underline": {
        textDecorationLine: "underline",
        // break around descenders (g/y/j/…) rather than drawing through them
        textDecorationSkipInk: "auto",
        textUnderlineOffset: "calc(1px * var(--scale, 1))",
        textDecorationThickness: "calc(1px * var(--scale, 1))",
      },
      ".pixelated": {
        imageRendering: "pixelated",
      },
      ".text-single-line": {
        lineHeight: "calc(10px * var(--scale, 1))",
      },
      ".text-multi-line": {
        lineHeight: "calc(11px * var(--scale, 1))",
      },
      // opt back in to text selection where the app-wide select-none on <body>
      // would otherwise block it (eg to copy an error message from a dialog)
      ".allow-select": {
        "-webkit-user-select": "text",
        userSelect: "text",
        "& ::selection": {
          backgroundColor: "var(--colour-shadow)",
          color: "white",
        },
      },

      // sets the css vars for the editor buttons/toolbars etc
      ".scale-editor": {
        "--scale": `${editorUiScale}`,
        "--block": `16px`,
        fontSize: "16px",
        lineHeight: "20px",
      },
      ".unscaled": {
        "--scale": "1",
        "--block": `8px`,
        fontSize: "8px",
        lineHeight: "10px",
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
        "--scale": "1",
        // monaco sizes glyph-margin icons inline (≈18px square); force the element
        // to 24px (needs !important to beat monaco's inline width/height) so the
        // sprite renders at full size. The clip-path then trims any part of the
        // spritesheet that falls outside the 24px box.
        width: "24px !important",
        height: "24px !important",
        "clip-path": `inset(
          0
          clamp(0px, calc(24px - var(--w) * var(--scale) * 1px), calc(24px - var(--w) * var(--scale) * 1px))
          clamp(0px, calc(24px - var(--h) * var(--scale) * 1px), calc(24px - var(--h) * var(--scale) * 1px))
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
    utilities[".toppy-loading-border"] = {
      animation:
        "loading-border-scroll-down 1s steps(24) infinite, loading-border-flux 1s steps(24) infinite, toppy-loading-bars-colour-cycle 12s steps(4, end) infinite",
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
    base["@keyframes toppy-loading-bars-colour-cycle"] = {
      "0%": {
        "--c1": halfbriteHex(toppyPalette.cool3),
        "--c2": halfbriteHex(toppyPalette.cool1),
      },
      "25%": {
        "--c1": halfbriteHex(toppyPalette.pink2),
        "--c2": halfbriteHex(toppyPalette.warm3),
      },
      "50%": {
        "--c1": halfbriteHex(toppyPalette.cool2),
        "--c2": halfbriteHex(toppyPalette.warm1),
      },
      "75%": {
        "--c1": halfbriteHex(toppyPalette.pink1),
        "--c2": halfbriteHex(toppyPalette.warm2),
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
        false,
        fullSpritesheetData,
      );
    }

    type AnimationsRecord = Record<string, FramesWithSpeed<BaseTextureId[]>>;
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
        bsFrames &&
        toppyFrames &&
        animationsAreEqual(bsFrames, toppyFrames) &&
        !animationUsesCopyFrom(bsFrames, "BlockStack") &&
        !animationUsesCopyFrom(toppyFrames, "Toppy");

      const emitUtilities = (
        frames: FramesWithSpeed<BaseTextureId[]>,
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
        frames: FramesWithSpeed<BaseTextureId[]>,
        spritesheetData: ReturnType<typeof makeBaseSpritesheetData>,
        keyframePrefix = "",
        elideOverride?: { x?: boolean; y?: boolean },
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
            elideOverride,
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

        // --x / --y can be elided from every keyframe step only when all frames
        // in every sheet variant agree on a single value. The reversed utility
        // class is only emitted once (no per-sheet override), so each sheet's
        // keyframe needs to be safe against the reference sheet's fallback too.
        const variantFrameXYs: { x: number; y: number }[] = [];
        for (const [frames, sheetData] of [
          [bsFrames, perSheetData.BlockStack] as const,
          [toppyFrames, perSheetData.Toppy] as const,
        ]) {
          if (!frames || !sheetData) {
            continue;
          }
          for (const id of frames) {
            const frame = sheetData.frames[id];
            if (frame) {
              variantFrameXYs.push(frame.frame);
            }
          }
        }
        const [firstVariantFrame] = variantFrameXYs;
        const elideAcrossSheets = firstVariantFrame && {
          x: variantFrameXYs.every((f) => f.x === firstVariantFrame.x),
          y: variantFrameXYs.every((f) => f.y === firstVariantFrame.y),
        };

        const sheetAnimationVariation = (
          frames: FramesWithSpeed<BaseTextureId[]> | undefined,
          sheetData: ReturnType<typeof makeBaseSpritesheetData>,
          sheetPrefix: string,
        ): Record<string, unknown> => {
          if (frames === undefined) {
            return {};
          }

          assignKeyframesToUtility(
            frames,
            sheetData,
            sheetPrefix,
            elideAcrossSheets || undefined,
          );

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

    // copyFrom: a copy has no pixels of its own on the sheet (its own region is
    // blanked to transparent), so under its sheet's ancestor class redirect the
    // crop to the source region and mirror it for flipX copies. The override-less
    // base `.texture-*` class keeps the copy's own coords, used by sheets (eg
    // BlockStack) that have real art there and don't declare the copy.
    for (const [sheetName, meta] of entries(spritesheetMetas)) {
      const { overrides } = meta;
      if (overrides === undefined) {
        continue;
      }
      const sheetData = perSheetData[sheetName];
      if (sheetData === undefined) {
        continue;
      }
      const ancestor = utilities[
        sheetName === "Toppy" ? ".toppy-spritesheet" : ".blockstack-spritesheet"
      ] as Record<string, CSSRuleObject>;

      for (const [copyId, override] of objectEntriesIter(overrides)) {
        const copyFrom = override?.copyFrom;
        if (copyFrom === undefined || sheetData.frames[copyId] === undefined) {
          continue;
        }
        const { frame } = sheetData.frames[copyId];
        const selector = `& .texture-${sanitiseId(copyId)}`;
        ancestor[selector] = {
          ...ancestor[selector],
          "--x": `${frame.x}`,
          "--y": `${frame.y}`,
          ...(copyFrom.flipX === true && { "--flip": "-1" }),
        };
      }

      // animations built entirely of flipped copies need the mirror on their
      // animated element too; the per-frame crop is already redirected via the
      // per-sheet keyframes forced by animationUsesCopyFrom
      for (const [animId, frames] of objectEntriesIter(sheetData.animations)) {
        if (!frames.every((f) => overrides[f]?.copyFrom?.flipX === true)) {
          continue;
        }
        for (const prefix of ["", "reversed-"]) {
          const selector = `& .texture-animated-${prefix}${sanitiseId(animId)}`;
          ancestor[selector] = { ...ancestor[selector], "--flip": "-1" };
        }
      }
    }

    utilities[".sprite-play-once"] = {
      animationIterationCount: "1",
    };

    addUtilities(utilities);
    addBase(base);
    // add a variant for zx-spectrum-colour palette
    // this can be done differently in tw4: https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants
    addVariant("zx", ".zx &");
    addVariant("toppy", ".toppy-spritesheet &");

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
