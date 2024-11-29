import type { PlanetName } from "../sprites/planets";
import type {
  Aabb,
  DirectionXy4,
  Direction4Xyz,
  Xyz,
  Xy,
} from "../utils/vectors/vectors";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { Container } from "pixi.js";
import type { SetRequired } from "type-fest";
import type { CharacterName } from "./modelTypes";

export type ItemInPlayType =
  | Exclude<JsonItemType, "player" | "door">
  | "head"
  | "heels"
  | "doorFrame"
  | "stopAutowalk"
  | "portal"
  | "floor";

type FreeItemState = {
  /* array of items ids for what we are standing on, in order of most overlap. Empty array if not standing on anything */
  standingOn: UnknownItemInPlay[];
  /* 
    the conveyor currently stood on, if any - taken from the standingOn list. This ix used so the conveyor knows
    to render itself an animating
  */
  activeConveyor: ItemInPlay<"conveyor"> | null;

  vels: {
    /** vertical velocity - needed for parabolic jumping and falling */
    gravity: Xyz;
    movingFloor: Xyz;
  };
};

export type CharacterState = FreeItemState & {
  facing: DirectionXy4;
  action:
    | "moving"
    | "idle"
    | "falling"
    /** death animation is playing - character will have had expired set  */
    | "death";

  lives: number;
  shield: number;

  // Number of pixels the player will walk forward regardless of input. This
  // puts players properly inside a room when they enter via a door
  autoWalk: boolean;

  vels: {
    gravity: Xyz;
    /** allows the walking mechanic to keep track of its own velocities */
    walking: Xyz;
    movingFloor: Xyz;
  };

  /**
   * used to distinguish (for heels) when in the air: did we jump (mandatory forward motion) or did
   * we fall (vertical falling, no forward motion)
   */
  jumped: boolean;

  teleporting:
    | {
        phase: "out";
        timeRemaining: number;
        toRoom: string; // TODO: RoomId, although maybe not since this propagates generics all over for something quite safe anyway
      }
    | {
        phase: "in";
        timeRemaining: number;
      }
    | null;
};

export type ItemStateMap = {
  head: CharacterState & {
    hasHooter: boolean;
    /** how many big jumps we can do */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    donuts: number;
    fastSteps: number;
  };
  heels: CharacterState & {
    hasBag: boolean;
    /** how many big jumps we can do (from picking up a bunny) */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    bigJumps: number;
    carrying: ItemInPlay<"portableBlock" | "spring"> | null;
  };
  //teleporter: { stoodOn: boolean };
  spring: FreeItemState;
  portableBlock: FreeItemState;
  movableBlock: FreeItemState;
  baddie: FreeItemState & {
    activated: boolean;
    vels: {
      walking: Xyz;
    };
  };
  pickup: FreeItemState;
  fish: FreeItemState;
  lift: {
    direction: "up" | "down";
    vels: {
      lift: Xyz;
    };
  };
  stopAutowalk: EmptyObject;
  conveyor: {
    moving: boolean;
  };
  block: Pick<JsonItemConfig<"block", PlanetName, string>, "disappearing">;
  switch: {
    setting: "left" | "right";
    /**
     * the frame this switch was last touched on. Frames only switch if they are touched and weren't
     * already touched on the previous frame
     */
    touchedOnProgression: number;
  };
  charles: FreeItemState & {
    // others will follow this soon - facing is changing to a vector
    facing: Xy;
  };
};

type ItemInPlayConfigMap<RoomId extends string> = {
  floor: { deadly: boolean };
  portal: {
    toRoom: RoomId;
    /* 
      when moving through portals, the position of the character relative to this point is
      taken, and preserved to be relative to the relativePoint of the portal in the new room
    */
    relativePoint: Xyz;
    // the direction this portal has to be hit in to be walked through
    direction: Direction4Xyz;
  };
  conveyor: {
    direction: DirectionXy4;
    count: number; // how many conveyors blocks in this run of conveyors?
  };
  stopAutowalk: EmptyObject;
  // disappearing can be turned off (blacktooth 6 for donuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", PlanetName, RoomId>, "disappearing">;
};

// type-fest's EmptyObject was creating issues
type EmptyObject = {
  [n in never]: unknown;
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  P extends PlanetName,
  RoomId extends string,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap<RoomId> ? ItemInPlayConfigMap<RoomId>[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, P, RoomId>
  : EmptyObject;

type BaseItemState = {
  position: Readonly<Xyz>;
  /**
   * The item will be removed from the room after this gameTime. To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the duration of an animation that needs to play
   *
   * If undefined, the item is not scheduled for removal (the normal case)
   */
  expires: number | null;
  /**
   * If not null, the item will not be considered solid after this frame. Can be set to:
   *  * the current frame to make non-solid right away
   *  * the next frame to give one more frame's chance to jump
   *  * -1 to be unsolid forever
   *  * null to be solid (most items will have this value forever)
   */
  unsolidAfterProgression: number | null;

  /** what is standing on this item? */
  stoodOnBy: UnknownItemInPlay[];
};

export type ItemState<T extends ItemInPlayType> = BaseItemState &
  (T extends keyof ItemStateMap ? ItemStateMap[T] : BaseItemState);

export type ItemInPlay<
  T extends ItemInPlayType,
  //S extends ItemState<T> = ItemState<T>,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
  ID extends string = string,
> = {
  type: T;

  // borrow the config from the json typings:
  config: ItemInPlayConfig<T, P, RoomId>;

  readonly id: ID;
  state: ItemState<T>;
  // shallow copy of the last rendered state of this item, or undefined if never rendered before
  stateLastFrame?: ItemState<T>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;

  positionContainer?: Container;
  renderContainer?: Container;

  renders: boolean;
};

export type PlayableItem<
  C extends CharacterName = CharacterName,
  RoomId extends string = string,
> =
  C extends "head" ? ItemInPlay<"head", PlanetName, RoomId, "head">
  : never | C extends "heels" ? ItemInPlay<"heels", PlanetName, RoomId, "heels">
  : never;

export const isPlayableItem = <RoomId extends string = string>(
  item: AnyItemInPlay<RoomId>,
): item is PlayableItem<CharacterName, RoomId> => {
  return item.type === "head" || item.type === "heels";
};

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string>(
    item: AnyItemInPlay<RoomId>,
  ): item is ItemInPlay<T, PlanetName, RoomId> => {
    return (types as Array<string>).includes(item.type);
  };

export const fallingItemTypes = [
  "head",
  "heels",
  "pickup",
  "portableBlock",
  "movableBlock",
  "baddie",
  "charles",
  "spring",
  "fish",
] as const satisfies ItemInPlayType[];

export type FreeItemTypes = (typeof fallingItemTypes)[number];

export function isFreeItem<
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
>(
  item: ItemInPlay<ItemInPlayType, P, RoomId>,
): item is ItemInPlay<FreeItemTypes, P, RoomId> {
  return (fallingItemTypes as ItemInPlayType[]).includes(item.type);
}

export function assertItemHasRenderContainer<T extends ItemInPlayType>(
  item: ItemInPlay<T>,
): asserts item is SetRequired<ItemInPlay<T>, "renderContainer"> {
  if (item.renderContainer === undefined) {
    throw new Error("Item does not have a render container");
  }
}

export function assertItemHasPositionContainer<T extends ItemInPlayType>(
  item: ItemInPlay<T>,
): asserts item is SetRequired<ItemInPlay<T>, "positionContainer"> {
  if (item.positionContainer === undefined) {
    throw new Error("Item does not have a position container");
  }
}

/**
 * Force ItemInPlay into a union so that discrimination over
 * unions works
 */
export type UnknownItemInPlay<RoomId extends string = string> = {
  [IT in ItemInPlayType]: ItemInPlay<IT, PlanetName, RoomId>;
}[ItemInPlayType];

/** Non-union version of any item type */
export type AnyItemInPlay<RoomId extends string = string> = ItemInPlay<
  ItemInPlayType,
  PlanetName,
  RoomId
>;
