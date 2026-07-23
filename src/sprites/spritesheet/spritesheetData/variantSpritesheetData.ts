import { type ZxSpectrumRoomHue } from "../../../originalGame";
import { objectEntriesIter } from "../../../utils/entries";
import { type AppSpriteFrame } from "./AppSpriteFrame";
import {
  type BaseAnimationId,
  type BaseTextureId,
  type FramesWithSpeed,
} from "./makeSpritesheetData";

/**
 * The id patterns of monsters' own sprites: the only textures that can render
 * doughnutted (stunned by a doughnut hit), and the bulk of what can render
 * deactivated. The `bubbles.*` sub-patterns are the monster-composed bubble
 * sprites (jetpack flames, bubble bodies), not the standalone bubbles item.
 */
type MonsterIdPattern =
  | `bubbles.blueGreen${string}`
  | `bubbles.cold${string}`
  | `bubbles.jetpack${string}`
  | `computerBot.${string}`
  | `cyberman.${string}`
  | `dalek${"" | `.${string}`}`
  | `elephant.${string}`
  | `headlessBase${"" | `.${string}`}`
  | `helicopterBug${"" | `.${string}`}`
  | `monkey.${string}`
  | `skiHead.${string}`
  | `turtle.${string}`;

/**
 * id patterns that can render from the deactivated palette: monsters plus
 * charles, conveyors, the greyable HUD pickup icons, and the head/heels
 * frames used by the HUD's inactive-character icons
 */
type DeactivatedIdPattern =
  | "bag"
  | "doughnuts"
  | "hooter"
  | `charles.${string}`
  | `conveyor.${string}`
  | `emperorsGuardian${"" | `.${string}`}`
  | `head.standing.${string}`
  | `head.walking.${string}`
  | `heels.standing.${string}`
  | `heels.walking.${string}`
  | MonsterIdPattern;

/**
 * id patterns the sceneryPlayer (citizen of Freedom) appearance samples: the
 * idle and walking animations, including the blinking/looking frames the idle
 * animations play through
 */
type SceneryPlayerIdPattern =
  | `head.blinking.${string}`
  | `head.idle.${string}`
  | `head.looking1.${string}`
  | `head.looking2.${string}`
  | `head.standing.${string}`
  | `head.walking.${string}`
  | `heels.blinking.${string}`
  | `heels.idle.${string}`
  | `heels.looking1.${string}`
  | `heels.looking2.${string}`
  | `heels.standing.${string}`
  | `heels.walking.${string}`;

/**
 * id patterns that can never render in a mirror's reflection: room structure
 * (floors, walls, doors, per-planet scenery), effects, shadows, hud and
 * editor art - the unreflected item types never reach the reflection render
 * path. Everything NOT matching these is reflection-eligible.
 */
type NeverReflectedIdPattern =
  | "floorOverdraw"
  | "thisIsABug"
  | `blacktooth.${string}`
  | `bookworld.${string}`
  | `door.${string}`
  | `editor.${string}`
  | `egyptus.${string}`
  | `floorEdge.${string}`
  | `generic.${string}`
  | `hud.${string}`
  | `jail.${string}`
  | `lightBeam.${string}`
  | `market.${string}`
  | `mirror${"" | `.${string}`}`
  | `moonbase.${string}`
  | `particle.${string}`
  | `penitentiary.${string}`
  | `quad.${string}`
  | `safari.${string}`
  | `shadow.${string}`
  | `shadowMask.${string}`
  | `triple.${string}`;

/**
 * a door frame takes the colour of the room its door leads to, so every frame
 * gets one re-bake per possible destination hue (dim/illumination trends are
 * current-room constants, folded into each room's bake)
 */
type DoorFrameIdPattern = `door.frame.${string}`;

/** the arcade button body art, colour-baked per action */
type ButtonShellIdPattern = "button.pressed" | "button";

export const doorHueSuffixes = {
  "hue=cyan": "cyan",
  "hue=green": "green",
  "hue=magenta": "magenta",
  "hue=white": "white",
  "hue=yellow": "yellow",
} as const satisfies Record<string, ZxSpectrumRoomHue>;
export type DoorHueSuffix = keyof typeof doorHueSuffixes;

/** the four on-screen action buttons, keyed suffix → action (which drives buttonColours) */
export const arcadeButtonSuffixes = {
  "action=carry": "carry",
  "action=carryAndJump": "carryAndJump",
  "action=fire": "fire",
  "action=jump": "jump",
} as const;
export type ArcadeButtonSuffix = keyof typeof arcadeButtonSuffixes;
export type ArcadeButtonAction =
  (typeof arcadeButtonSuffixes)[ArcadeButtonSuffix];

/**
 * every suffixed variant texture id: ordinary frames in the sheet data whose
 * pixels are the variant-palette re-bake of their base frame (or, on
 * sheets/modes without that swop, an alias of the base frame's rect)
 */
export type VariantTextureId =
  | `${Exclude<BaseTextureId, NeverReflectedIdPattern>}.mirrorReflection`
  | `${Extract<BaseTextureId, ButtonShellIdPattern>}.${ArcadeButtonSuffix}`
  | `${Extract<BaseTextureId, DeactivatedIdPattern>}.deactivated`
  | `${Extract<BaseTextureId, DoorFrameIdPattern>}.${DoorHueSuffix}`
  | `${Extract<BaseTextureId, MonsterIdPattern>}.doughnutted`
  | `${Extract<BaseTextureId, SceneryPlayerIdPattern>}.sceneryPlayer`;

export type VariantAnimationId =
  | `${Exclude<BaseAnimationId, NeverReflectedIdPattern>}.mirrorReflection`
  | `${Extract<BaseAnimationId, DeactivatedIdPattern>}.deactivated`
  | `${Extract<BaseAnimationId, MonsterIdPattern>}.doughnutted`
  | `${Extract<BaseAnimationId, SceneryPlayerIdPattern>}.sceneryPlayer`;

/**
 * the ids (texture or animation) eligible for each variant state - what
 * {@link variantTextureId}'s overloads constrain their inputs to
 */
export type DoughnuttableId = Extract<
  BaseAnimationId | BaseTextureId,
  MonsterIdPattern
>;
export type DeactivatableId = Extract<
  BaseAnimationId | BaseTextureId,
  DeactivatedIdPattern
>;
export type ReflectableId = Exclude<
  BaseAnimationId | BaseTextureId,
  NeverReflectedIdPattern
>;
export type SceneryPlayerableId = Extract<
  BaseAnimationId | BaseTextureId,
  SceneryPlayerIdPattern
>;
export type DoorFrameId = Extract<BaseTextureId, DoorFrameIdPattern>;

const variantSuffixes = [
  "action=carry",
  "action=carryAndJump",
  "action=fire",
  "action=jump",
  "deactivated",
  "doughnutted",
  "mirrorReflection",
  "sceneryPlayer",
  "hue=cyan",
  "hue=green",
  "hue=magenta",
  "hue=white",
  "hue=yellow",
] as const;
export type VariantSuffix = (typeof variantSuffixes)[number];

const monsterPrefixes = [
  "bubbles.blueGreen",
  "bubbles.cold",
  "bubbles.jetpack",
  "computerBot.",
  "cyberman.",
  "dalek",
  "elephant.",
  "headlessBase",
  "helicopterBug",
  "monkey.",
  "skiHead.",
  "turtle.",
];

const neverReflectedPrefixes = [
  "floorOverdraw",
  "thisIsABug",
  "blacktooth.",
  "bookworld.",
  "door.",
  "editor.",
  "egyptus.",
  "floorEdge.",
  "generic.",
  "hud.",
  "jail.",
  "lightBeam.",
  "market.",
  "mirror",
  "moonbase.",
  "particle.",
  "penitentiary.",
  "quad.",
  "safari.",
  "shadow.",
  "shadowMask.",
  "triple.",
];

/**
 * whether the id matches any pattern in the list: entries ending "." are
 * prefixes; other entries match the exact id or the id followed by a further
 * dotted part (mirroring the `x${"" | `.${string}`}` type patterns)
 */
const matchesAny = (id: string, prefixPatterns: string[]): boolean => {
  for (let i = 0; i < prefixPatterns.length; i++) {
    const pattern = prefixPatterns[i];
    if (
      pattern.endsWith(".") ?
        id.startsWith(pattern)
      : id === pattern || id.startsWith(`${pattern}.`)
    ) {
      return true;
    }
  }
  return false;
};

const isMonsterId = (id: string): boolean => matchesAny(id, monsterPrefixes);

/**
 * runtime membership per variant - these predicates mirror the type-level
 * pattern unions above, so the emitted ids are exactly the
 * {@link VariantTextureId} set
 */
const isDoorFrameId = (id: string): boolean => id.startsWith("door.frame.");

const isButtonShellId = (id: string): boolean =>
  id === "button" || id === "button.pressed";

const variantEligible: Record<VariantSuffix, (id: string) => boolean> = {
  "action=carry": isButtonShellId,
  "action=carryAndJump": isButtonShellId,
  "action=fire": isButtonShellId,
  "action=jump": isButtonShellId,
  deactivated: (id) =>
    isMonsterId(id) ||
    id === "bag" ||
    id === "doughnuts" ||
    id === "hooter" ||
    id.startsWith("charles.") ||
    id.startsWith("conveyor.") ||
    id === "emperorsGuardian" ||
    id.startsWith("emperorsGuardian.") ||
    /^(head|heels)\.(standing|walking)\./.test(id),
  doughnutted: isMonsterId,
  mirrorReflection: (id) => !matchesAny(id, neverReflectedPrefixes),
  sceneryPlayer: (id) =>
    /^(head|heels)\.(blinking|idle|looking1|looking2|standing|walking)\./.test(
      id,
    ),
  "hue=cyan": isDoorFrameId,
  "hue=green": isDoorFrameId,
  "hue=magenta": isDoorFrameId,
  "hue=white": isDoorFrameId,
  "hue=yellow": isDoorFrameId,
};

type FrameEntry = { frame: AppSpriteFrame };

/**
 * whether the id carries a variant suffix. Such ids are never eligible for
 * further suffixing (so deriving variant data is idempotent even if handed
 * already-merged sheet data), and bakes use this to find the strip frames in
 * merged data
 */
export const isVariantId = (id: string): id is VariantTextureId =>
  /\.(action=carry|action=carryAndJump|action=fire|action=jump|deactivated|doughnutted|mirrorReflection|sceneryPlayer|hue=cyan|hue=green|hue=magenta|hue=white|hue=yellow)$/.test(
    id,
  );

export const variantIdSuffix = (id: VariantTextureId): VariantSuffix => {
  for (const suffix of variantSuffixes) {
    if (id.endsWith(`.${suffix}`)) {
      return suffix;
    }
  }
  throw new Error(`not a variant id: "${id}"`);
};

/**
 * the suffixed variant frames and animations for a sheet, derived from its
 * (post-override, post-missedTextures) base frames and animations. Frame
 * entries are shared by reference with their base frame - an alias of the
 * base rect - until a bake re-points them at re-processed pixels.
 */
export const variantSpritesheetData = (
  baseFrames: Partial<Record<BaseTextureId, FrameEntry>>,
  baseAnimations: Partial<Record<BaseAnimationId, FramesWithSpeed>>,
): {
  frames: Record<VariantTextureId, FrameEntry>;
  animations: Record<VariantAnimationId, FramesWithSpeed>;
} => {
  const frames = {} as Record<VariantTextureId, FrameEntry>;
  const animations = {} as Record<VariantAnimationId, FramesWithSpeed>;

  for (const [baseId, frameEntry] of objectEntriesIter(baseFrames)) {
    if (frameEntry === undefined || isVariantId(baseId)) {
      continue;
    }
    for (const suffix of variantSuffixes) {
      if (variantEligible[suffix](baseId)) {
        frames[`${baseId}.${suffix}` as VariantTextureId] = frameEntry;
      }
    }
  }

  for (const [baseId, animationFrames] of objectEntriesIter(baseAnimations)) {
    if (animationFrames === undefined || isVariantId(baseId)) {
      continue;
    }
    for (const suffix of variantSuffixes) {
      if (variantEligible[suffix](baseId)) {
        const suffixedFrames = animationFrames.map(
          (frameId) => `${frameId}.${suffix}`,
        ) as unknown as FramesWithSpeed;
        suffixedFrames.animationSpeed = animationFrames.animationSpeed;
        animations[`${baseId}.${suffix}` as VariantAnimationId] =
          suffixedFrames;
      }
    }
  }

  return { frames, animations };
};
