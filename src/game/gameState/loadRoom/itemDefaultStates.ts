import type { BaseItemState } from "../../../model/ItemInPlay";
import type { FreeItemState } from "../../../model/ItemStateMap";
import type {
  UnknownJsonItem,
  JsonItemType,
} from "../../../model/json/JsonItem";
import type { SceneryName } from "../../../sprites/planets";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz } from "../../../utils/vectors/vectors";
import {
  type FreeItem,
  freeItemTypes,
  slidingItemTypes,
} from "../../physics/itemPredicates";
import { positionCentredInBlock } from "./positionCentredInBlock";

export const defaultBaseState = <RoomId extends string>() =>
  ({
    expires: null,
    stoodOnBy: new Set<FreeItem<SceneryName, RoomId>>(),
    disappear: null,
  }) satisfies Partial<BaseItemState>;

export const defaultFreeItemState = () =>
  ({
    standingOn: null,
    vels: {
      gravity: originXyz,
      movingFloor: originXyz,
    },
    latentMovement: [],
  }) satisfies Partial<FreeItemState>;
export const initialState = (jsonItem: UnknownJsonItem) => {
  const free = (freeItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    ...defaultBaseState(),
    position: positionCentredInBlock(jsonItem as UnknownJsonItem),
    ...(free ?
      {
        standingOn: null,
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          ...((slidingItemTypes as string[]).includes(jsonItem.type) ?
            { sliding: originXyz }
          : {}),
        },
        latentMovement: [],
      }
    : {}),
    ...(jsonItem.type === "monster" ?
      {
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          walking: originXyz,
        },
        activated: jsonItem.config.activated,
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
    ...((
      jsonItem.type === "movableBlock" && jsonItem.config.movement !== "free"
    ) ?
      {
        activated: jsonItem.config.activated === true,
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
