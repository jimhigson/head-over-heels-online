import plugin from "tailwindcss/plugin";
import type { FramesWithSpeed, TextureId } from "./sprites/spriteSheetData";
import { spritesheetData } from "./sprites/spriteSheetData";
import { objectEntriesIter } from "./utils/entries";
import type { CSSRuleObject } from "tailwindcss/types/config";
import { imageSize } from "image-size";
import { zxSpectrumColors, zxSpectrumFrameRate } from "./originalGame";

const spritesheetSize = imageSize("gfx/sprites.png");

// https://tailwindcss.com/docs/plugins
export const spritesTailwindPlugin = plugin(
  ({ addUtilities, addBase, addVariant, e }) => {
    const animations: CSSRuleObject = {};

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
        filter: "brightness(1.8) grayscale(100%) contrast(999)",
        mixBlendMode: "lighten",
      },
      ".sprite-revert-to-two-tone": {
        filter: "brightness(1.8) grayscale(100%) contrast(999)",
        mixBlendMode: "luminosity",
      },
      ".sprite-revert-zxYellow": {
        filter:
          "brightness(1.8) grayscale(100%) contrast(999) brightness(0.5) sepia(1)  hue-rotate(30deg) saturate(5) brightness(5)",
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
    };

    utilities[".loading-border"] = {
      background: `repeating-linear-gradient(
          to bottom,
          ${zxSpectrumColors.zxCyan} 0, ${zxSpectrumColors.zxCyan} var(--block, 8px),
          ${zxSpectrumColors.zxRed} var(--block, 8px), ${zxSpectrumColors.zxRed} calc(2 * var(--block, 8px))
        )`,
      // smooth scrolling effect:
      backgroundSize: "100% calc(2 * var(--block, 8px))",
      animation: "spectrum-load 0.5s linear infinite",
    };
    animations["@keyframes spectrum-load"] = {
      from: {
        backgroundPosition: "0 0",
      },
      to: {
        backgroundPosition: "0 calc(2 * var(--block, 8px))",
      },
    };

    for (const [
      textureId,
      {
        frame: { h, w, x, y },
      },
    ] of objectEntriesIter(spritesheetData.frames)) {
      utilities[`.texture-${e(textureId)}`] = {
        "--w": `${w}px`,
        "--h": `${h}px`,
        "--x": `${x}px`,
        "--y": `${y}px`,
      };
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

      utilities[`.texture-animated-${e(animationName)}`] = {
        "--w": `${spritesheetData.frames[frames[0]].frame.w}px`,
        "--h": `${spritesheetData.frames[frames[0]].frame.h}px`,
        // 1s timing should be configurable based on values from stylesheet
        animation: `sprite-animation-${animationName.replaceAll(".", "_")} ${animationDuration}s steps(${frames.length}, end) infinite`,
      };

      animations[
        `@keyframes sprite-animation-${animationName.replaceAll(".", "_")}`
      ] = Object.fromEntries(
        frames.map((frame, i) => [
          `${(i * 100) / (frames.length - 1)}%`,
          {
            "--x": `${spritesheetData.frames[frame].frame.x}px`,
            "--y": `${spritesheetData.frames[frame].frame.y}px`,
          },
        ]),
      );
    }

    addUtilities(utilities);
    addBase(animations);
    // add a variant for zx-spectrum-colour palette
    // this can be done differently in tw4: https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants
    addVariant("zx", ".zx &");
    // for changing the colour of selected menu items:
    addVariant("selectedMenuItem", [
      // can put selectedMenuItem:foo on the top of the menu, and it will apply
      // to menu items with the selectedMenuItem class:
      "& .selectedMenuItem",
      // can put selectedMenuItem:foo inside menu items with the selectedMenuItem
      // class
      ".selectedMenuItem &",
    ]);
  },
);
