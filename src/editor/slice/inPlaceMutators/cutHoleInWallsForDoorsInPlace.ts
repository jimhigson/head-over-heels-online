import { generateHoleInWallsForDoor } from "../../../model/inPlaceMutators/generateHoleInWallsForDoor";
import { type DirectionXy4, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomId } from "../../editorTypes";
import { selectRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { roomEditTarget } from "./addItemInPlace";

export const cutHoleInWallsForDoorsInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  doorDirection: DirectionXy4,
  blockPosition: Xyz,
  preview: boolean,
) => {
  const room = selectRoomFromLevelEditorState(state, roomId);

  if (room === undefined) {
    throw new Error("can't cut hole in walls for a room that does not exist");
  }

  const target = roomEditTarget(state, preview, roomId);

  for (const [itemId, modifiedWall] of generateHoleInWallsForDoor(
    room.items,
    doorDirection,
    blockPosition,
  )) {
    if (preview) {
      target[itemId] = modifiedWall;
    } else {
      if (modifiedWall === null) {
        delete target[itemId];
      } else {
        target[itemId] = modifiedWall;
      }
    }
  }
};
