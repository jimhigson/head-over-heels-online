import { type ZxSpectrumRoomHue } from "../../originalGame";
import {
  type BaseAnimationId,
  type BaseTextureId,
} from "./spritesheetData/makeSpritesheetData";
import {
  type ArcadeButtonAction,
  type DeactivatableId,
  type DoorFrameId,
  type DoorHueSuffix,
  type DoughnuttableId,
  type ReflectableId,
  type SceneryPlayerableId,
  type VariantTextureId,
} from "./spritesheetData/variantSpritesheetData";

const hueToDoorSuffix = {
  cyan: "hue=cyan",
  green: "hue=green",
  magenta: "hue=magenta",
  white: "hue=white",
  yellow: "hue=yellow",
} as const satisfies Record<ZxSpectrumRoomHue, DoorHueSuffix>;

/**
 * the ids a call can return: the base id itself (when every state it was
 * given is off) plus the suffix for each state it could be rendering in - so
 * a caller keeps the sprite it asked for rather than widening to every id in
 * the sheet
 */
type MaybeSuffixed<Id extends string, Suffix extends string> =
  `${Id}.${Suffix}` | Id;

/**
 * each overload admits only the ids eligible for the states its flags allow,
 * and pins ineligible flags to literal false (or undefined for the hue) - so
 * an ineligible (id, states) combination is a compile error rather than a
 * missing frame at runtime. Every call site passes every state explicitly.
 */
type VariantIdFn = {
  /** a door frame recoloured to its destination room's hue - no other state applies to doors */
  <Id extends DoorFrameId>(
    id: Id,
    reflection: false,
    doughnutted: false,
    deactivated: false,
    sceneryPlayer: false,
    toHue: ZxSpectrumRoomHue,
  ): `${Id}.${DoorHueSuffix}`;
  /** a sceneryPlayer (citizen of Freedom) recolour; rendering in a mirror wins over it */
  <Id extends ReflectableId & SceneryPlayerableId>(
    id: Id,
    reflection: boolean,
    doughnutted: false,
    deactivated: false,
    sceneryPlayer: true,
    toHue: undefined,
  ): `${Id}.${"mirrorReflection" | "sceneryPlayer"}`;
  /** the full monster states: reflection wins over doughnutted wins over deactivated */
  <Id extends DoughnuttableId>(
    id: Id,
    reflection: boolean,
    doughnutted: boolean,
    deactivated: boolean,
    sceneryPlayer: false,
    toHue: undefined,
  ): MaybeSuffixed<Id, "deactivated" | "doughnutted" | "mirrorReflection">;
  /** deactivatable art that can never be doughnutted (charles, conveyors, the HUD's greyable icons) */
  <Id extends DeactivatableId & ReflectableId>(
    id: Id,
    reflection: boolean,
    doughnutted: false,
    deactivated: boolean,
    sceneryPlayer: false,
    toHue: undefined,
  ): MaybeSuffixed<Id, "deactivated" | "mirrorReflection">;
  /** art with no variant state beyond rendering in a mirror's reflection */
  <Id extends ReflectableId>(
    id: Id,
    reflection: boolean,
    doughnutted: false,
    deactivated: false,
    sceneryPlayer: false,
    toHue: undefined,
  ): MaybeSuffixed<Id, "mirrorReflection">;
};

/**
 * the id to sample for rendering a base texture/animation in the given
 * variant states, with the render precedence reflection > doughnutted >
 * deactivated > sceneryPlayer > toHue (the later states never legitimately
 * co-occur with the earlier). Returns the base id when no state applies.
 *
 * The suffixed id is an ordinary frame in the sheet data; the overloads
 * restrict each state to the ids the eligibility tables
 * (variantSpritesheetData) emit variant frames for.
 */
export const variantTextureId: VariantIdFn = (<
  Id extends BaseAnimationId | BaseTextureId,
>(
  id: Id,
  reflection: boolean,
  doughnutted: boolean,
  deactivated: boolean,
  sceneryPlayer: boolean,
  toHue: undefined | ZxSpectrumRoomHue,
) =>
  reflection ? `${id}.mirrorReflection`
  : doughnutted ? `${id}.doughnutted`
  : deactivated ? `${id}.deactivated`
  : sceneryPlayer ? `${id}.sceneryPlayer`
  : toHue !== undefined ? `${id}.${hueToDoorSuffix[toHue]}`
  : id) as VariantIdFn;

/** the pre-baked colour-variant id for an on-screen action button */
export const buttonVariantTextureId = (
  base: "button.pressed" | "button",
  action: ArcadeButtonAction,
): VariantTextureId => `${base}.action=${action}`;
