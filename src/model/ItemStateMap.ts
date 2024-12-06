import type { PlanetName } from "@/sprites/planets";
import type { Xyz, Xy } from "@/utils/vectors/vectors";
import type {
  EitherPlayableState,
  ItemInPlay,
  EmptyObject,
  SwitchSetting,
  UnknownItemInPlay,
} from "./ItemInPlay";
import type { JsonItemConfig } from "./json/JsonItem";
import type { PortableItemType } from "@/game/physics/itemPredicates";

export type FreeItemState<RoomId extends string> = {
  /* array of items ids for what we are standing on, in order of most overlap. Empty array if not standing on anything */
  standingOn: UnknownItemInPlay<RoomId> | null;
  /*
    the conveyor currently stood on, if any - taken from the standingOn list. This ix used so the conveyor knows
    to render itself an animating
  */
  activeConveyor: ItemInPlay<"conveyor", PlanetName, RoomId> | null;

  /** movement that is queued up to happen soon - this is because it was stood on an item that moved */
  latentMovement: Array<{ moveAtGameTime: number; positionDelta: Xyz }>;

  vels: {
    /** vertical velocity - needed for parabolic jumping and falling */
    gravity: Xyz;
    movingFloor: Xyz;
  };
};

type SlidingItemState<RoomId extends string> = FreeItemState<RoomId> & {
  vels: {
    sliding: Xyz;
  };
};

type PortableItemState<RoomId extends string> = FreeItemState<RoomId> & {
  wouldPickUpNext: boolean;
};

type SingleTouch = {
  /**
   * the frame this switch was last touched on. Some touches (switched, scrolls) only count if they are touched and weren't
   * already touched on the previous frame
   */
  touchedOnProgression: number;
};

export type CarriedItem<
  RoomId extends string,
  Types extends PortableItemType = PortableItemType,
> = {
  [T in Types]: {
    type: T;
    config: JsonItemConfig<T, PlanetName, RoomId>;
  };
}[Types];

export type ItemStateMap<RoomId extends string> = {
  head: EitherPlayableState<RoomId> & {
    hasHooter: boolean;
    /** how many big jumps we can do */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    donuts: number;
    fastSteps: number;
  };
  heels: EitherPlayableState<RoomId> & {
    hasBag: boolean;
    /** how many big jumps we can do (from picking up a bunny) */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    bigJumps: number;
    carrying: CarriedItem<RoomId> | null;
  };
  spring: PortableItemState<RoomId>;
  portableBlock: PortableItemState<RoomId>;
  movableBlock: FreeItemState<RoomId>;
  moveableDeadly: FreeItemState<RoomId>;
  slidingDeadly: SlidingItemState<RoomId>;
  slidingBlock: SlidingItemState<RoomId>;

  baddie: FreeItemState<RoomId> & {
    activated: boolean;
    vels: {
      walking: Xyz;
    };
  };
  pickup: FreeItemState<RoomId>;
  aliveFish: FreeItemState<RoomId>;
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
  switch: SingleTouch & {
    setting: SwitchSetting;
  };
  charles: FreeItemState<RoomId> & {
    // others will follow this soon - facing is changing to a vector
    facing: Xy;
  };
  ball: SlidingItemState<RoomId>;
  scroll: SingleTouch & FreeItemState<RoomId>;
};
