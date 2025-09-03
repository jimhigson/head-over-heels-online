import type { Node } from "jsonc-parser";

import type { JsonItemType } from "../../../model/json/JsonItem";
import type { EditorRoomId, EditorRoomJson } from "../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { emptyArray, emptySet } from "../../../utils/empty";
import { iterate } from "../../../utils/iterate";
import {
  type DirectionXy4,
  oppositeDirection,
} from "../../../utils/vectors/vectors";
import { getNodePropertyValue } from "./getNodePropertyValue";

export type SuggestionGenerator = (
  storeState: RootStateWithLevelEditorSlice,
  currentRoomJson: EditorRoomJson,
  ...nodeAncestors: Node[]
) => string[];

export type SuggestionPatterns = Record<string, SuggestionGenerator>;

/**
 * Get all room IDs except the currently editing one
 */

const getOtherRoomIds = (storeState: RootStateWithLevelEditorSlice): string[] =>
  Object.keys(storeState.levelEditor.campaignInProgress.rooms).filter(
    (roomId) => roomId !== storeState.levelEditor.currentlyEditingRoomId,
  );

const getJoystickControllableItemIds = (
  storeState: RootStateWithLevelEditorSlice,
  currentRoomJson: EditorRoomJson,
  _stringNode: Node,
  targetsArray: Node,
) => {
  const existingTargets =
    (targetsArray.children &&
      new Set(
        iterate(targetsArray.children)
          ?.map((c) => c.value)
          .filter((s) => typeof s === "string"),
      )) ??
    (emptySet as Set<string>);

  return (
    iterateRoomJsonItemsWithIds(currentRoomJson.items, "charles")
      .map(([id]) => id)
      // only suggest the ids that aren't already in the array (in existingTargets)
      .filter((id) => !existingTargets.has(id))
      .toArray()
  );
};

/**
 * Patterns for property paths and their corresponding suggestion generators
 */

export const suggestionPatterns: SuggestionPatterns = {
  toRoom: getOtherRoomIds,
  roomAbove: getOtherRoomIds,
  roomBelow: getOtherRoomIds,
  "meta.nonContiguousRelationship.with.room": getOtherRoomIds,
  // joysticks:
  ["config.controls.*"]: getJoystickControllableItemIds,
  // switches changing what joysticks control:
  ["config.modifies.*.*.controls.*"]: getJoystickControllableItemIds,
  // switches:
  ["modifies.*.targets.*"](
    storeState,
    currentRoomJson,
    _targetsStringNode,
    targetsArrayNode,
    configObjectNode,
  ) {
    const expectType = getNodePropertyValue(configObjectNode, "expectType");

    if (typeof expectType !== "string") {
      return emptyArray;
    }

    const existingTargets =
      (targetsArrayNode.children &&
        new Set(
          iterate(targetsArrayNode.children)
            ?.map((c) => c.value)
            .filter((s) => typeof s === "string"),
        )) ??
      (emptySet as Set<string>);

    return (
      iterateRoomJsonItemsWithIds(
        currentRoomJson.items,
        expectType as JsonItemType,
      )
        .map(([id]) => id)
        // only suggest the ids that aren't already in the array (in existingTargets)
        .filter((id) => !existingTargets.has(id))
        .toArray()
    );
  },
  ["[type=door].config.toDoor"](
    storeState,
    _currentRoomJson,
    _toDoorStringNode,
    config,
  ) {
    const direction = getNodePropertyValue(config, "direction") as
      | DirectionXy4
      | undefined;
    const otherRoomId = getNodePropertyValue(config, "toRoom") as
      | EditorRoomId
      | undefined;

    if (otherRoomId === undefined || direction === undefined) {
      return emptyArray;
    }

    const otherRoom =
      storeState.levelEditor.campaignInProgress.rooms[otherRoomId];

    const requiredDirection = oppositeDirection(direction);

    return iterateRoomJsonItemsWithIds(otherRoom.items, "door")
      .filter(
        ([, doorInOtherRoom]) =>
          doorInOtherRoom.config.direction === requiredDirection,
      )
      .map(([id]) => id)
      .toArray();
  },
  ["[type=door].config.meta.toSubRoom"](
    storeState,
    _currentRoomJson,
    _toSubRoom,
    _meta,
    config,
  ) {
    const otherRoomId = getNodePropertyValue(config, "toRoom") as
      | EditorRoomId
      | undefined;

    if (otherRoomId === undefined) {
      return emptyArray;
    }

    const otherRoom =
      storeState.levelEditor.campaignInProgress.rooms[otherRoomId];

    const subRooms = otherRoom.meta?.subRooms;

    console.log(otherRoom, subRooms);

    return subRooms ? Object.keys(subRooms) : emptyArray;
  },
};
