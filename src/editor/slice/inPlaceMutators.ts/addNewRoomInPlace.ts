import { range } from "iter-tools";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import type { EditorRoomId, EditorRoomJson } from "../../editorTypes";
import { starterRoom } from "../createStarterRoom";
import type { LevelEditorState } from "../levelEditorSlice";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";
import { iterate } from "../../../utils/iterate";

export const addNewRoomInPlace = (
  state: LevelEditorState,
  scenery: SceneryName,
  colour: ZxSpectrumRoomColour,
): EditorRoomJson => {
  const firstUntakenRoomNumber = iterate(range({ start: 0 })).find(
    (n) =>
      state.campaignInProgress.rooms[`room_${n}` as EditorRoomId] === undefined,
  );

  const toRoomId = `room_${firstUntakenRoomNumber}` as EditorRoomId;

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
