import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import { type Xyz, oppositeDirection } from "../../../utils/vectors/vectors";
import type { EditorRoomId, EditorJsonItem } from "../../editorTypes";
import type { ItemTool } from "../../Tool";
import { addNewRoomInPlace } from "../inPlaceMutators.ts/addNewRoomInPlace";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { addItemInPlace, nextItemId } from "./addItemInPlace";
import { cutHoleInWallsForDoorsInPlace } from "./cutHoleInWallsForDoor";

export const addDoorInPlace = (
  state: LevelEditorState,
  blockPosition: Xyz,
  wallDirection: DirectionXy4,
  toolItem: ItemTool<"door">,
  isPreview: boolean,
) => {
  const fromRoomJson = selectCurrentRoomFromLevelEditorState(state);

  const doorDirection = wallDirection;
  // for doors, trim walls around where the door was placed:
  cutHoleInWallsForDoorsInPlace(
    state,
    fromRoomJson.id,
    doorDirection,
    blockPosition,
    isPreview,
  );

  const toRoomJson =
    isPreview ?
      // previews don't create any other rooms when doors are added:
      undefined
    : addNewRoomInPlace(state, fromRoomJson.planet, fromRoomJson.color);

  addItemInPlace(
    state,
    {
      type: toolItem.type,
      config: {
        ...toolItem.config,
        toRoom:
          toRoomJson ?
            toRoomJson.id
            // preview rooms go to nowhere:
          : ("nowhere" as EditorRoomId),
        direction: doorDirection,
      },
    },
    blockPosition,
    isPreview,
  );

  if (toRoomJson) {
    const returnDoorId = nextItemId(toRoomJson, toolItem, isPreview);

    const returnDoorPosition: Xyz = {
      x:
        doorDirection === "left" ? 0
        : doorDirection === "right" ? toRoomJson.size.x
        : Math.floor(toRoomJson.size.x / 2),
      y:
        doorDirection === "away" ? 0
        : doorDirection === "towards" ? toRoomJson.size.x
        : Math.floor(toRoomJson.size.x / 2),
      z: blockPosition.z,
    };

    const returnDoorDirection = oppositeDirection(doorDirection);

    const returnDoorItemJson: EditorJsonItem<"door"> = {
      type: "door",
      config: {
        toRoom: fromRoomJson.id,
        direction: returnDoorDirection,
      },
      position: returnDoorPosition,
    };

    toRoomJson.items[returnDoorId] = returnDoorItemJson;

    cutHoleInWallsForDoorsInPlace(
      state,
      toRoomJson.id,
      returnDoorDirection,
      returnDoorPosition,
      false,
    );
  }
};
