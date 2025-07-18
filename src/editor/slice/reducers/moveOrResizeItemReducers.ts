import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import { type LevelEditorState } from "../levelEditorSlice";

import type {
  EditorJsonItem,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import {
  addXyz,
  originXyz,
  xyEqual,
  type Xyz,
} from "../../../utils/vectors/vectors";
import {
  selectCurrentRoomFromLevelEditorState,
  selectItemInLevelEditorState,
} from "../levelEditorSliceSelectors";
import { pushUndoInPlace } from "./undoReducers";
import { iterateRoomJsonItems } from "../../../model/RoomJson";
import { rotatingSceneryTiles } from "../createStarterRoom";
import type { SceneryName, Wall } from "../../../sprites/planets";
import { wallTimes } from "../../../game/collision/boundingBoxTimes";

const addOrRemoveWallTilesInPlace = <S extends SceneryName>(
  tiles: Array<Wall<S>>,
  scenery: S,
  newSize: number,
) => {
  const sizeDelta = newSize - tiles.length;
  if (sizeDelta > 0) {
    tiles.push(...rotatingSceneryTiles(scenery, sizeDelta, tiles.length));
  } else if (sizeDelta < 0) {
    tiles.splice(newSize);
  }
};

const changeWallsForFloorChangeInPlace = (
  room: EditorRoomJson,
  floor: EditorJsonItem<"floor">,
  newPosition: Xyz,
  newTimes?: Xyz,
) => {
  iterateRoomJsonItems(room)
    .filter((i) => i.type === "wall")
    .forEach((wall) => {
      if (wall.position.z !== floor.position.z) {
        return;
      }

      const wt = wallTimes(wall.config);

      switch (wall.config.direction) {
        case "towards":
          if (
            xyEqual(wall.position, floor.position) &&
            wt.x === floor.config.times.x
          ) {
            wall.position = newPosition;
            if (newTimes) {
              wall.config.times = { x: newTimes.x };
            }
          }
          break;

        case "right":
          if (
            xyEqual(wall.position, floor.position) &&
            wt.y === floor.config.times.y
          ) {
            wall.position = newPosition;
            if (newTimes) {
              wall.config.times = { y: newTimes.y };
            }
          }
          break;

        case "away":
          if (
            wall.position.x === floor.position.x &&
            wall.position.y === floor.position.y + floor.config.times.y &&
            wt.x === floor.config.times.x
          ) {
            wall.position = addXyz(
              newPosition,
              newTimes ? { y: newTimes.y } : originXyz,
            );
            if (newTimes) {
              addOrRemoveWallTilesInPlace(
                wall.config.tiles,
                room.planet,
                newTimes.x,
              );
            }
          }
          break;

        case "left":
          if (
            wall.position.x === floor.position.x + floor.config.times.x &&
            wall.position.y === floor.position.y &&
            wt.y === floor.config.times.y
          ) {
            wall.position = addXyz(
              newPosition,
              newTimes ? { x: newTimes.x } : originXyz,
            );
            if (newTimes) {
              addOrRemoveWallTilesInPlace(
                wall.config.tiles,
                room.planet,
                newTimes.y,
              );
            }
          }
          break;
        default:
          wall.config satisfies never;
          break;
      }
    });
};

export const moveOrResizeItemReducers = {
  /** add or remove the room above the current room */
  moveOrResizeItem(
    _state,
    {
      payload: { jsonItemId, newTimes, newPosition, startOfGesture },
    }: PayloadAction<{
      jsonItemId: EditorRoomItemId;
      newTimes?: Xyz;
      newPosition: Xyz;
      startOfGesture: boolean;
    }>,
  ) {
    const state = _state as LevelEditorState;

    // we don't want to push an undo for every incremental change
    // that happens while the user is dragging with the mouse,
    // only at the start
    if (startOfGesture) pushUndoInPlace(state);

    const jsonItem = selectItemInLevelEditorState(state, jsonItemId);

    if (jsonItem === undefined) {
      console.warn("no json item found for resize", jsonItemId);
      return;
    }

    if (jsonItem.type === "floor") {
      changeWallsForFloorChangeInPlace(
        selectCurrentRoomFromLevelEditorState(state),
        jsonItem,
        newPosition,
        newTimes,
      );
    }

    if (newTimes !== undefined) {
      const { config } = jsonItem as EditorJsonItemWithTimes;
      // minimally update, to not add properties that aren't needed. Not all
      // configs can accept all of x,y,z - so, need to be careful not to over-add
      // and break the json schema. This also keeps the json a tiny bit smaller.
      config.times = {
        ...(newTimes.x === 1 ? {} : { x: newTimes.x }),
        ...(newTimes.y === 1 ? {} : { y: newTimes.y }),
        ...(newTimes.z === 1 ? {} : { z: newTimes.z }),
      };
    }
    if (newPosition !== undefined) {
      jsonItem.position = newPosition;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
