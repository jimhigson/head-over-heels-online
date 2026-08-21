import { imageSize } from "image-size";
import plugin from "tailwindcss/plugin";
import { type CSSRuleObject } from "tailwindcss/types/config";

import spritesheetPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import toppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { editorUiScale } from "../../editor/editorUiScale";
import { zxSpectrumColors } from "../../originalGame";
import { halfbriteHex } from "../../utils/colour/halfbrite";

const spritesheetSize = imageSize("gfx/sprites.webp");

// https://tailwindcss.com/docs/plugins
export const spritesTailwindPlugin = plugin(
  ({ addUtilities, addBase, addVariant }) => {
    const base: CSSRuleObject = {};

    // the HUD font, its native 8px-cell size, and single-line leading apply
    // everywhere by default; --block / --scale fallbacks keep this valid even
    // before those vars cascade in. Multi-line text opts in via .text-multi-line
    base["body"] = {
      // both HeadOverHeels variants are registered dynamically via the
      // FontFace api (see useSmoothUiAssets) - smooth ui swaps --ui-font to
      // the cleanEdge-upscaled variant; the two have identical metrics
      fontFamily: 'var(--ui-font, "HeadOverHeels"), monospace',
      fontSize: "var(--block, 8px)",
      lineHeight: "calc(10px * var(--scale, 1))",
    };

    const spriteStyles = (type: "background" | "mask") => ({
      [`${type}Image`]: `var(--spritesheetUrl)`,
      [`${type}Position`]: `calc(-1 * var(--x) * var(--totalScale) * 1px) calc(-1 * var(--y) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
      [`${type}Size`]: `calc(var(--spritesheetW) * var(--totalScale) * 1px) calc(var(--spritesheetH) * var(--totalScale) * var(--doubleHeight, 1) * 1px)`,
    });

    const utilities: CSSRuleObject = {
      // the crop vars (--x/--y/--w/--h) come from the runtime-generated
      // sprite stylesheet (spriteCssText), adopted per selected spritesheet
      ".sprite": {
        "--totalScale": `calc(var(--scale, 1) * var(--sprite-scale, 1))`,
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
      // the smooth-spritesheet vars are set on :root (see useSmoothUiAssets)
      // to a runtime cleanEdge-upscaled blob of the same sheet; sprite
      // geometry is in logical sheet units, so the higher-resolution image is
      // a drop-in
      ".blockstack-spritesheet": {
        "--spritesheetUrl": `var(--smooth-spritesheet-blockstack, url('gfx/sprites.webp'))`,
      },
      ".toppy-spritesheet": {
        "--spritesheetUrl": `var(--smooth-spritesheet-toppy, url('gfx/spritesToppy.webp'))`,
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
