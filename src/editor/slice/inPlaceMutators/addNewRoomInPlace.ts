import { firstUntakenRoomId } from "../../../model/firstUntakenRoomId";
import { createNewRoom } from "../../../model/inPlaceMutators/createNewRoom";
import {
  type ZxSpectrumRoomColour,
  zxSpectrumRoomHue,
} from "../../../originalGame";
import { type SceneryName } from "../../../sprites/planets";
import { randomFromArray } from "../../../utils/random/randomFromArray";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";

const defaultRoomSize: Xy = { x: 8, y: 8 };

/**
 * a room just added to the campaign, and the id it was added under
 */
export type AddedRoom = {
  roomId: EditorRoomId;
  room: EditorRoomJson;
};

type AddNewRoomInPlaceOptions = {
  state: LevelEditorState;
  scenery: SceneryName;
  /** if not given, will be chosen randomly */
  maybeColour?: ZxSpectrumRoomColour;
  roomSize?: Xy;
  /**
   * how many contiguous copies of this room should be made?
   * ie, if a roomSize of (8,8) is given but gridPositions of
   * [(0,0), (0,1)] then a room of size 8x16 is made (two positions
   * on the grid, both occupied by 8x8 rooms which combine into a bigger
   * room)
   */
  gridPositions?: Xy[];
};

export const addNewRoomInPlace = ({
  state,
  scenery,
  maybeColour,
  roomSize = defaultRoomSize,
  gridPositions = [{ x: 0, y: 0 }],
}: AddNewRoomInPlaceOptions): AddedRoom => {
  const newRoomId = firstUntakenRoomId(state.campaignInProgress.rooms);

  const colour: ZxSpectrumRoomColour = maybeColour ?? {
    hue: randomFromArray(zxSpectrumRoomHue),
    shade: Math.random() < 0.66 ? "basic" : "dimmed",
  };

  const newRoom = createNewRoom<EditorRoomId, EditorRoomItemId>(
    roomSize,
    colour,
    scenery,
    gridPositions,
  );

  state.campaignInProgress.rooms[newRoomId] = newRoom;

  return { roomId: newRoomId, room: newRoom };
};
