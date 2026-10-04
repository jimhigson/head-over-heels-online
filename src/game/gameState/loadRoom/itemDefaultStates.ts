import { type BaseItemState, type ItemState } from "../../../model/ItemState";
import { type FreeItemState } from "../../../model/ItemStateMap";
import {
  type JsonItem,
  type JsonItemType,
  type JsonItemUnion,
} from "../../../model/json/JsonItem";
import { type Progression } from "../../../model/RoomState";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { omit } from "../../../utils/pick";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type Aabb,
  boxWithSize,
  originXyz,
  scaleXyz,
} from "../../../utils/vectors/vectors";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { positionCentredInBlock } from "./positionCentredInBlock";

export const defaultBaseState = <RoomItemId extends string>() =>
  ({
    movedOrResizedOnProgression: 0 as Progression,
    expires: null,
    stoodOnBy: {} as StoodOnBy<RoomItemId>,
    disappearing: null,
    switchedAtRoomTime: neverTime,
    stoodOnUntilRoomTime: neverTime,
    actedOnAt: {
      roomTime: neverTime,
      by: emptyObject as Record<RoomItemId, true>,
      actedInXY: false,
      actedInZ: false,
    },
  }) satisfies Partial<BaseItemState>;

const defaultFreeItemStateVels = () => ({
  gravity: originXyz,
  movingFloor: originXyz,
});

export const defaultFreeItemState = <RoomItemId extends string>() =>
  ({
    vels: defaultFreeItemStateVels(),
    latentMovement: [],
    collidedWith: {
      roomTime: neverTime,
      by: emptyObject as Record<RoomItemId, true>,
    },
    controlledWithJoystickAtRoomTime: neverTime,
    standingOnItemId: null,
    standingOnUntilRoomTime: neverTime,
    previousStandingOnItemId: null,
  }) as const satisfies Partial<FreeItemState<RoomItemId>>;

/** json item types whose in-play state is built here (the rest have their own loaders) */
type StateBuiltJsonItemType = Exclude<
  JsonItemType,
  "door" | "floor" | "player" | "wall"
>;

/** builds the initial in-play state of one type of json item */
type StateBuilder<T extends StateBuiltJsonItemType> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItem<T, RoomId, RoomItemId>,
  /** the item's collision dimensions, for its state box */
  aabb: Aabb,
) => ItemState<T, RoomId, RoomItemId>;

// ---- state shared by several types of item ----

const baseState = <RoomItemId extends string>(
  jsonItem: JsonItemUnion,
  aabb: Aabb,
) => ({
  ...defaultBaseState<RoomItemId>(),
  box: boxWithSize(positionCentredInBlock(jsonItem), aabb),
});

/** for items that can slide when pushed */
const slidingItemState = <RoomItemId extends string>() => ({
  ...defaultFreeItemState<RoomItemId>(),
  vels: { ...defaultFreeItemStateVels(), sliding: originXyz },
});

/** for items that walk under their own power */
const walkingItemState = <RoomItemId extends string>() => ({
  ...defaultFreeItemState<RoomItemId>(),
  vels: { ...defaultFreeItemStateVels(), walking: originXyz },
});

// monsters that start facing the direction given in their config:
const monstersWithStartDirection = new Set([
  "skiHead",
  "turtle",
  "elephantHead",
  "computerBot",
  "monkey",
  "cyberman",
]);

const stateBuilders: {
  [T in StateBuiltJsonItemType]: StateBuilder<T>;
} = {
  ball: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...slidingItemState(),
  }),
  barrier: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    disappearing: jsonItem.config.disappearing ?? null,
  }),
  block: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    disappearing: jsonItem.config.disappearing ?? null,
  }),
  bubbles: (jsonItem, aabb) => baseState(jsonItem, aabb),
  button: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    pressed: false,
  }),
  charles: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
    facing: unitVectors.towards,
    activated: jsonItem.config.activated ?? true,
  }),
  conveyor: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    // conveyors copy their config into state (mutable by switches), with the
    // json direction name becoming a unit vector in-play:
    ...structuredClone(jsonItem.config),
    direction: unitVectors[jsonItem.config.direction],
    disappearing: jsonItem.config.disappearing ?? null,
  }),
  deadlyBlock: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    disabled: jsonItem.config.disabled ?? false,
  }),
  emitter: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...omit(jsonItem.config, "offset", "sound", "times", "whenPlayerInside"),
    lastEmittedAtRoomTime:
      (jsonItem.config.delay ?? jsonItem.config.period) -
      jsonItem.config.period,
    quantityEmitted: 0,
  }),
  firedDoughnut: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    disappearing: { on: "touch" },
    vels: {
      fired:
        jsonItem.config.direction ?
          scaleXyz(
            unitVectors[jsonItem.config.direction],
            moveSpeedPixPerMs.firedDoughnut,
          )
        : originXyz,
    },
  }),
  floatingText: (jsonItem, aabb) => baseState(jsonItem, aabb),
  hushPuppy: (jsonItem, aabb) => baseState(jsonItem, aabb),
  joystick: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    // config copied into state, so switches can change it at run-time:
    ...structuredClone(jsonItem.config),
    lastPushDirection: undefined,
  }),
  lamp: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    activated: jsonItem.config.activated ?? true,
  }),
  lift: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    // config copied into state, so switches can change it at run-time:
    ...structuredClone(jsonItem.config),
    direction: "up",
    vels: { lift: originXyz },
  }),
  mirror: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    orientation: jsonItem.config.orientation,
    lastFlippedAtRoomTime: neverTime,
  }),
  monster: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...walkingItemState(),
    activated: jsonItem.config.activated === "on",
    everActivated: jsonItem.config.activated === "on",
    timeOfLastDirectionChange: Number.NEGATIVE_INFINITY,
    durationOfTouch: 0,
    busyLickingDoughnutsOffFace: false,
    facing:
      (
        monstersWithStartDirection.has(jsonItem.config.which) &&
        "startDirection" in jsonItem.config
      ) ?
        unitVectors[jsonItem.config.startDirection]
      : unitVectors.towards,
  }),
  moveableDeadly: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
  }),
  movingPlatform: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...walkingItemState(),
    activated: jsonItem.config.activated === "on",
    everActivated: jsonItem.config.activated === "on",
    timeOfLastDirectionChange: Number.NEGATIVE_INFINITY,
    durationOfTouch: 0,
    facing: unitVectors[jsonItem.config.startDirection],
  }),
  pickup: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
    // Heels can pick up Head's pickups (ie, doughnuts) - different from the
    // original but compatible since Heels never got to touch them
    disappearing: {
      on: "touch",
      byType:
        jsonItem.config.gives === "bag" || jsonItem.config.gives === "jumps" ?
          // only heels (or hoh) can pick up these pickups:
          ["heels", "headOverHeels"]
        : (
          jsonItem.config.gives === "doughnuts" ||
          jsonItem.config.gives === "hooter" ||
          jsonItem.config.gives === "fast"
        ) ?
          // only head (or hoh) can pick up these pickups:
          ["head", "headOverHeels"]
          // all others can be picked up by any playable character
        : ["head", "heels", "headOverHeels"],
    },
  }),
  portableBlock: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
  }),
  portableTeleporter: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
    // config copied into state, so switches can change it at run-time:
    ...structuredClone(jsonItem.config),
  }),
  pushableBlock: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
  }),
  sceneryCrown: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
  }),
  sceneryPlayer: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
    // just for fun/an easter egg - let pick up the characters in the final room :-)
  }),
  slidingBlock: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...slidingItemState(),
  }),
  slidingDeadly: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...slidingItemState(),
  }),
  spikes: (jsonItem, aabb) => baseState(jsonItem, aabb),
  spring: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    ...defaultFreeItemState(),
  }),
  switch: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    setting: jsonItem.config.initialSetting,
    lastToggledAtRoomTime: neverTime,
  }),
  teleporter: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    // config copied into state, so switches can change it at run-time:
    ...structuredClone(jsonItem.config),
  }),
  timer: (jsonItem, aabb) => ({
    ...baseState(jsonItem, aabb),
    // config copied into state, so switches can change it at run-time:
    ...structuredClone(jsonItem.config),
    lastFiredAtRoomTime:
      (jsonItem.config.delay ?? jsonItem.config.period) -
      jsonItem.config.period,
    setting: jsonItem.config.initialSetting,
    activated: true,
  }),
};

/** the initial in-play state for a json item */
export const initialState = <
  T extends StateBuiltJsonItemType,
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItem<T, RoomId, RoomItemId>,
  /** the item's collision dimensions, for its state box */
  aabb: Aabb,
): ItemState<T, RoomId, RoomItemId> =>
  stateBuilders[jsonItem.type](jsonItem, aabb);
