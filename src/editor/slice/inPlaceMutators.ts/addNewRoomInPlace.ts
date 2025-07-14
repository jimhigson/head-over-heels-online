import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import type { EditorRoomId, EditorRoomJson } from "../../editorTypes";
import { starterRoom } from "../createStarterRoom";
import type { LevelEditorState } from "../levelEditorSlice";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";

export const addNewRoomInPlace = (
  state: LevelEditorState,
  scenery: SceneryName,
  colour: ZxSpectrumRoomColour,
): EditorRoomJson => {
  // TODO: option to do this conditionally, only if there isn't already a room
  // in this grid position
  const toRoomId = `room_${state.nextRoomId++}` as EditorRoomId;

  const toRoomJson = {
    id: toRoomId,
    ...structuredClone(starterRoom({ x: 8, y: 8 })),
    // give the same scenery and colour as the current room:
    color: colour,
  };

  changeRoomSceneryInPlace(toRoomJson, scenery);

  state.campaignInProgress.rooms[toRoomId] = toRoomJson;

  return toRoomJson;
};
