import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { entries, objectEntriesIter } from "../../utils/entries";
import { type AppSpritesheetData } from "../spritesheet/AppSpritesheet";
import { keyframesToCss } from "./keyframesToCss";
import {
  animatedSpriteSpecificCssVars,
  animationIsUniformlyFlipped,
  defaultSpriteDims,
  defaultTextureId,
  keyframesForAnimatedSprite,
  spriteSpecificCssVars,
} from "./spriteCss";

/**
 * every selector shape a `texture-*` utility is used in. `prefix` is what the
 * class name itself carries at the callsite (see `TextureTailwindClass`), and
 * each template is a selector with `&` standing for that escaped class.
 *
 * These mirror the variants the tailwind plugin declares - a sprite's crop is
 * no longer compiled into the stylesheet, so the variant forms have to be
 * written out here instead of being derived by tailwind from the utility.
 */
const selectorForms = [
  { prefix: "", templates: ["&"] },
  { prefix: "hover:", templates: ["&:hover"] },
  { prefix: "zx:", templates: [".zx &"] },
  {
    prefix: "activated:",
    templates: ["button:hover &", "[data-selected='true'] &"],
  },
  { prefix: "[button:hover_&]:", templates: ["button:hover &"] },
  {
    prefix: "selectedMenuItem:",
    templates: [
      "& .selectedMenuItem",
      "&.selectedMenuItem",
      ".selectedMenuItem &",
    ],
  },
] as const satisfies readonly {
  prefix: string;
  templates: readonly string[];
}[];

/** backslash-escapes every character a css identifier can't carry literally */
const escapeClassName = (className: string) =>
  className.replaceAll(/[^\w-]/g, (c) => `\\${c}`);

const selectorsForUtility = (utilityClass: string) =>
  selectorForms.flatMap(({ prefix, templates }) => {
    const escaped = `.${escapeClassName(`${prefix}${utilityClass}`)}`;
    return templates.map((template) => template.replaceAll("&", () => escaped));
  });

const camelToKebab = (property: string) =>
  property.startsWith("--") ? property : (
    property.replaceAll(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
  );

const declarationsToCss = (declarations: Record<string, string | undefined>) =>
  entries(declarations)
    .filter(([, value]) => value !== undefined)
    .map(([property, value]) => `${camelToKebab(property)}:${value}`)
    .join(";");

const rule = (
  selectors: readonly string[],
  declarations: Record<string, string | undefined>,
) => `${selectors.join(",")}{${declarationsToCss(declarations)}}`;

/**
 * The whole stylesheet giving every sprite of one spritesheet its crop out of
 * that sheet - the `--x`/`--y`/`--w`/`--h` custom properties the `.sprite`
 * utility reads, plus the `@keyframes` that step them for animated sprites.
 *
 * It is built in the browser from the spritesheet data the app already carries
 * (the same data the pixi atlas is baked from), rather than compiled into the
 * css: writing it at build time sends every coordinate twice, once as js and
 * once as css, and once per spritesheet rather than only for the sheet in use.
 */
export const spriteCssText = (spritesheetData: AppSpritesheetData): string => {
  const { w, h } = defaultSpriteDims(spritesheetData);
  const { x, y } = spritesheetData.frames[defaultTextureId].frame;

  // a bare `.sprite` with no `.texture-*` shows the bug sprite as a visible
  // "something is broken" indicator, and is the default every per-texture rule
  // elides its matching values against - so it must come first
  const chunks = [
    rule([".sprite"], {
      "--w": `${w}`,
      "--h": `${h}`,
      "--x": `${x}`,
      "--y": `${y}`,
    }),
  ];

  for (const [textureId, { frame }] of objectEntriesIter(
    spritesheetData.frames,
  )) {
    chunks.push(
      rule(
        selectorsForUtility(`texture-${sanitiseForClassName(textureId)}`),
        spriteSpecificCssVars(
          frame.w,
          frame.h,
          frame.x,
          frame.y,
          frame.flipX === true,
          spritesheetData,
        ),
      ),
    );
  }

  for (const [animationName, frames] of objectEntriesIter(
    spritesheetData.animations,
  )) {
    chunks.push(
      keyframesToCss(
        keyframesForAnimatedSprite(
          animationName,
          sanitiseForClassName,
          frames,
          spritesheetData,
        ),
      ),
    );

    // a uniformly mirrored animation mirrors the whole element; mixed ones
    // carry their --flip per keyframe instead
    const flip =
      animationIsUniformlyFlipped(frames, spritesheetData) ?
        { "--flip": "-1" }
      : {};

    for (const reversed of [false, true]) {
      chunks.push(
        rule(
          selectorsForUtility(
            `texture-animated-${reversed ? "reversed-" : ""}${sanitiseForClassName(animationName)}`,
          ),
          {
            ...animatedSpriteSpecificCssVars(
              animationName,
              sanitiseForClassName,
              frames,
              spritesheetData,
              reversed,
            ),
            ...flip,
          },
        ),
      );
    }
  }

  return chunks.join("");
};
