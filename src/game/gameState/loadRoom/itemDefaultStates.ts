import type { ItemInPlayType } from "../../../model/ItemInPlay";
import type { BaseItemState, ItemState } from "../../../model/ItemState";
import type { FreeItemState } from "../../../model/ItemStateMap";
import type { JsonItemType, JsonItemUnion } from "../../../model/json/JsonItem";
import type { StoodOnBy } from "../../../model/StoodOnBy";

import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz, scaleXyz } from "../../../utils/vectors/vectors";
import { freeItemTypes, slidingItemTypes } from "../../physics/itemPredicates";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { positionCentredInBlock } from "./positionCentredInBlock";

export const defaultBaseState = <RoomItemId extends string>() =>
  ({
    expires: null,
    stoodOnBy: {} as StoodOnBy<RoomItemId>,
    disappearing: null,
    switchedAtRoomTime: neverTime,
    stoodOnUntilRoomTime: neverTime,
    actedOnAt: {
      roomTime: neverTime,
      by: emptyObject as Record<RoomItemId, true>,
    },
  }) satisfies Partial<BaseItemState>;

/* for giving a little type-safety when constructing the item state out of several state object fragments */
type StateFragment<T extends ItemInPlayType> = Partial<
  ItemState<T, string, string>
>;

export const defaultFreeItemStateVels = () => ({
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
  }) satisfies Partial<FreeItemState<RoomItemId>>;

export const initialState = (jsonItem: JsonItemUnion) => {
  const isFree = (freeItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    ...defaultBaseState(),
    position: positionCentredInBlock(jsonItem as JsonItemUnion),
    ...(isFree ?
      ({
        ...defaultFreeItemState(),
        vels: {
          ...defaultFreeItemStateVels(),
          ...((slidingItemTypes as string[]).includes(jsonItem.type) ?
            { sliding: originXyz }
          : {}),
          ...((
            jsonItem.type === "monster" || jsonItem.type === "movingPlatform"
          ) ?
            {
              walking: originXyz,
            }
          : {}),
        },
      } satisfies Partial<FreeItemState<string>>)
    : {}),
    ...((
      jsonItem.type === "joystick" ||
      jsonItem.type === "emitter" ||
      jsonItem.type === "lift" ||
      jsonItem.type === "conveyor" ||
      jsonItem.type === "teleporter"
    ) ?
      // these items have their config copied into their state. This allows them to
      // be changed at run-time by other items such as switches
      ({
        ...structuredClone(jsonItem.config),
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "monster" ?
      ({
        activated: jsonItem.config.activated === "on",
        everActivated: jsonItem.config.activated === "on",
        timeOfLastDirectionChange: Number.NEGATIVE_INFINITY,
        ...((
          jsonItem.config.which === "skiHead" ||
          jsonItem.config.which === "turtle" ||
          jsonItem.config.which === "elephantHead" ||
          jsonItem.config.which === "cyberman"
        ) ?
          {
            facing: unitVectors[jsonItem.config.startDirection],
          }
        : { facing: unitVectors.towards }),
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "pickup" ?
      ({
        disappearing: {
          on: "touch",
          byType:
            (
              jsonItem.config.gives === "bag" ||
              jsonItem.config.gives === "jumps"
            ) ?
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
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "movingPlatform" ?
      ({
        activated: jsonItem.config.activated === "on",
        everActivated: jsonItem.config.activated === "on",
        facing: unitVectors[jsonItem.config.startDirection],
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "switch" ?
      ({
        setting: jsonItem.config.initialSetting,
        lastToggledAtRoomTime: neverTime,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "button" ?
      ({
        pressed: false,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "block" ?
      ({
        disappearing: jsonItem.config.disappearing ?? null,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "conveyor" ?
      ({
        disappearing: jsonItem.config.disappearing ?? null,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "barrier" ?
      ({
        disappearing: jsonItem.config.disappearing ?? null,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "lift" ?
      ({ direction: "up", vels: { lift: originXyz } } satisfies StateFragment<
        typeof jsonItem.type
      >)
    : {}),
    ...(jsonItem.type === "charles" ?
      ({ facing: unitVectors.towards } satisfies StateFragment<
        typeof jsonItem.type
      >)
    : {}),
    ...(jsonItem.type === "emitter" ?
      ({
        lastEmittedAtRoomTime: neverTime,
        quantityEmitted: 0,
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
    ...(jsonItem.type === "firedDoughnut" ?
      ({
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
      } satisfies StateFragment<typeof jsonItem.type>)
    : {}),
  };
};
