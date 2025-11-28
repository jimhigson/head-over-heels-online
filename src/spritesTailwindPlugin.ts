import type { CSSRuleObject } from "tailwindcss/types/config";

import { imageSize } from "image-size";
import plugin from "tailwindcss/plugin";

import type { FramesWithSpeed, TextureId } from "./sprites/spriteSheetData";

import spritesheetPalette from "../gfx/spritesheetPalette.json";
import { sanitiseForClassName } from "./game/components/tailwindSprites/SanitiseForClassName";
import { zxSpectrumColors, zxSpectrumFrameRate } from "./originalGame";
import { isTextureId } from "./sprites/assertIsTextureId";
import { spritesheetData } from "./sprites/spriteSheetData";
import { halfbriteHex } from "./utils/colour/halfBrite";
import { objectEntriesIter } from "./utils/entries";

const spritesheetSize = imageSize("gfx/sprites.png");

// https://tailwindcss.com/docs/plugins
export const spritesTailwindPlugin = plugin(
  ({ addUtilities, addBase, addVariant, e }) => {
    const sanitiseId = (id: string) => e(sanitiseForClassName(id));

    const base: CSSRuleObject = {};

    const spriteStyles = (type: "background" | "mask") => ({
      [`${type}Image`]: `var(--spritesheetUrl)`,
      [`${type}Position`]: `calc(-1 * var(--x) * var(--scale, 1)) calc(-1 * var(--y) * var(--scale, 1) * var(--doubleHeight, 1))`,
      [`${type}Size`]: `calc(var(--spritesheetW) * var(--scale, 1)) calc( var(--spritesheetH) * var(--scale, 1) * var(--doubleHeight, 1))`,
    });

    const utilities: CSSRuleObject = {
      ".sprite": {
        display: "inline-block",
        width: `calc(var(--w) * var(--scale, 1))`,
        height: `calc(var(--h) * var(--scale, 1) * var(--doubleHeight, 1))`,
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

      // shadows are white on the spritesheet - let them be inverted to black:
      ".sprite-shadow": {
        filter: "invert(1)",
        mixBlendMode: "darken",
      },

      /**
       * sets the (unchanging during run time) vars to describe the spritesheet
       */
      ".set-spritesheet-vars": {
        "--spritesheetUrl": `url('gfx/sprites.png')`,
        "--spritesheetW": `${spritesheetSize.width}px`,
        "--spritesheetH": `${spritesheetSize.height}px`,
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
          clamp(0px, calc(18px - var(--w) * var(--scale)), calc(18px - var(--w) * var(--scale)))  
          clamp(0px, calc(18px - var(--h) * var(--scale)), calc(18px - var(--h) * var(--scale)))  
          0                                                         
        )`,
      },

      "sprites-uppercase": {
        // blank - left in for suggestions
      },
    };

    utilities[".loading-border"] = {
      "--c1": spritesheetPalette.pureBlack,
      "--c2": halfbriteHex(spritesheetPalette.shadow),
      "--stripeWidth": "5vh",
      background: `repeating-linear-gradient(
          to bottom,
          var(--c1) 0, var(--c1) calc(1.5 * var(--stripeWidth)),
          var(--c2) calc(1.5 * var(--stripeWidth)), var(--c2) calc(2 * var(--stripeWidth))
        )`,
      // smooth scrolling effect:
      backgroundSize: "100% calc(2 * var(--stripeWidth))",
      backgroundAttachment: "fixed",
      animation: "spectrum-load 0.5s linear infinite",
    };
    utilities[".zx-loading-border"] = {
      "--c1": zxSpectrumColors.zxRed,
      "--c2": zxSpectrumColors.zxCyan,
    };
    base["@keyframes spectrum-load"] = {
      from: {
        backgroundPosition: "0 0",
      },
      to: {
        backgroundPosition: "0 calc(2 * var(--stripeWidth))",
      },
    };

    for (const [
      textureId,
      {
        frame: { h, w, x, y },
      },
    ] of objectEntriesIter(spritesheetData.frames)) {
      utilities[`.texture-${sanitiseId(textureId)}`] = {
        "--w": `${w}px`,
        "--h": `${h}px`,
        "--x": `${x}px`,
        "--y": `${y}px`,
      };

      // allow sprites-uppercase class to work as an equivalent to
      // text-transform: upper
      const hudCharMatch = textureId.match(/^hud\.char\.(?<char>.+)$/);
      if (hudCharMatch) {
        const { char } = hudCharMatch.groups!;
        const uppercaseTextureId = `hud.char.${char.toUpperCase()}`;
        if (isTextureId(uppercaseTextureId)) {
          const upperCaseFrame = spritesheetData.frames[uppercaseTextureId];
          if (upperCaseFrame) {
            const {
              frame: { h: hUpper, w: wUpper, x: xUpper, y: yUpper },
            } = upperCaseFrame;
            // this is a char and there is also an upper-case version available:
            base[`.sprites-uppercase .texture-${sanitiseId(textureId)}`] = {
              "--w": `${wUpper}px`,
              "--h": `${hUpper}px`,
              "--x": `${xUpper}px`,
              "--y": `${yUpper}px`,
            };
          }
        }
      }
    }

    for (const [animationName, frames] of objectEntriesIter(
      spritesheetData.animations as Record<
        string,
        FramesWithSpeed<TextureId[]>
      >,
    )) {
      const pixiJsAnimationSpeed = frames.animationSpeed;
      const animationDuration =
        (frames.length * (1 / zxSpectrumFrameRate)) / pixiJsAnimationSpeed;

      utilities[`.texture-animated-${sanitiseId(animationName)}`] = {
        // x and y will be overwritten by the animation keyframes, but including here
        // makes the sprite appear correct if animation is disabled - eg, in playwright tests
        "--x": `${spritesheetData.frames[frames[0]].frame.x}px`,
        "--y": `${spritesheetData.frames[frames[0]].frame.y}px`,
        "--w": `${spritesheetData.frames[frames[0]].frame.w}px`,
        "--h": `${spritesheetData.frames[frames[0]].frame.h}px`,
        animation: `sprite-animation-${sanitiseId(animationName)} ${animationDuration}s steps(${frames.length}, end) infinite`,
      };

      utilities[`.texture-animated-once-${sanitiseId(animationName)}`] = {
        "--w": `${spritesheetData.frames[frames[0]].frame.w}px`,
        "--h": `${spritesheetData.frames[frames[0]].frame.h}px`,
        // let stay on the last frame after the animation ends:
        "--x": `${spritesheetData.frames[frames.at(-1)!].frame.x}px`,
        "--y": `${spritesheetData.frames[frames.at(-1)!].frame.y}px`,
        animation: `sprite-animation-${sanitiseId(animationName)} ${animationDuration}s steps(${frames.length}, end) 1`,
      };

      base[`@keyframes sprite-animation-${sanitiseId(animationName)}`] =
        Object.fromEntries(
          frames.map((frame, i) => [
            `${(i * 100) / (frames.length - 1)}%`,
            {
              "--x": `${spritesheetData.frames[frame].frame.x}px`,
              "--y": `${spritesheetData.frames[frame].frame.y}px`,
            },
          ]),
        );

      const reversedFrames = frames.toReversed();
      utilities[`.texture-animated-reversed-${sanitiseId(animationName)}`] = {
        "--w": `${spritesheetData.frames[reversedFrames[0]].frame.w}px`,
        "--h": `${spritesheetData.frames[reversedFrames[0]].frame.h}px`,
        animation: `sprite-animation-reversed-${sanitiseId(animationName)} ${animationDuration}s steps(${frames.length}, end) infinite`,
      };

      base[
        `@keyframes sprite-animation-reversed-${sanitiseId(animationName)}`
      ] = Object.fromEntries(
        reversedFrames.map((frame, i) => [
          `${(i * 100) / (frames.length - 1)}%`,
          {
            "--x": `${spritesheetData.frames[frame].frame.x}px`,
            "--y": `${spritesheetData.frames[frame].frame.y}px`,
          },
        ]),
      );
    }

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
  },
);
