import { range } from "iter-tools";

import type { SceneryName } from "../../../sprites/planets";
import type { EditorRoomId, EditorRoomJson } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import {
  type ZxSpectrumRoomColour,
  zxSpectrumRoomHue,
} from "../../../originalGame";
import { iterate } from "../../../utils/iterate";
import { randomFromArray } from "../../../utils/random/randomFromArray";
import { starterRoom } from "../createStarterRoom";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";

export const addNewRoomInPlace = (
  state: LevelEditorState,
  scenery: SceneryName,
  /** if not given, will be chosen randomly */
  maybeColour?: ZxSpectrumRoomColour,
): EditorRoomJson => {
  const firstUntakenRoomNumber = iterate(range({ start: 0 })).find(
    (n) =>
      state.campaignInProgress.rooms[`room_${n}` as EditorRoomId] === undefined,
  );

  const toRoomId = `room_${firstUntakenRoomNumber}` as EditorRoomId;

  const colour: ZxSpectrumRoomColour = maybeColour ?? {
    hue: randomFromArray(zxSpectrumRoomHue),
    shade: Math.random() < 0.66 ? "basic" : "dimmed",
  };

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
