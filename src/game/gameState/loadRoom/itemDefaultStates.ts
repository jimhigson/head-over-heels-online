import type { BaseItemState } from "../../../model/ItemInPlay";
import type { StoodOnBy } from "src/model/StoodOnBy";
import type { FreeItemState } from "../../../model/ItemStateMap";
import type { JsonItemUnion, JsonItemType } from "../../../model/json/JsonItem";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz } from "../../../utils/vectors/vectors";
import { freeItemTypes, slidingItemTypes } from "../../physics/itemPredicates";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { emptyArray, emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/veryClose";

export const defaultBaseState = <RoomItemId extends string>() =>
  ({
    expires: null,
    stoodOnBy: {} as StoodOnBy<RoomItemId>,
    disappear: null,
  }) satisfies Partial<BaseItemState>;

export const defaultFreeItemState = <RoomItemId extends string>() =>
  ({
    standingOnItemId: null,
    vels: {
      gravity: originXyz,
      movingFloor: originXyz,
    },
    latentMovement: [],
    actedOnAt: {
      roomTime: neverTime,
      by: emptyObject as Record<RoomItemId, true>,
    },
    collidedWith: {
      roomTime: neverTime,
      by: emptyObject as Record<RoomItemId, true>,
    },
  }) satisfies Partial<FreeItemState<RoomItemId>>;

export const initialState = (jsonItem: JsonItemUnion) => {
  const isFree = (freeItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    ...defaultBaseState(),
    position: positionCentredInBlock(jsonItem as JsonItemUnion),
    ...(isFree ?
      {
        standingOnItemId: null,
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
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
        latentMovement: [],
        actedOnAt: {
          roomTime: neverTime,
          by: emptyArray,
        },
        collidedWith: {
          roomTime: neverTime,
          by: emptyArray,
        },
      }
    : {}),
    ...(jsonItem.type === "monster" ?
      {
        activated: jsonItem.config.activated === "on",
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
      }
    : {}),
    ...(jsonItem.type === "pickup" ?
      { collected: false, disappear: "onTouchByPlayer" }
    : {}),
    ...(jsonItem.type === "movingPlatform" ?
      {
        activated: jsonItem.config.activated === "on",
        facing: unitVectors[jsonItem.config.startDirection],
      }
    : {}),
    ...(jsonItem.type === "switch" ?
      { setting: "left", touchedOnProgression: -1 }
    : {}),
    ...(jsonItem.type === "block" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "conveyor" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "barrier" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "lift" ?
      { direction: "up", vels: { lift: originXyz } }
    : {}),
    ...(jsonItem.type === "charles" ? { facing: unitVectors.towards } : {}),
  };
};
