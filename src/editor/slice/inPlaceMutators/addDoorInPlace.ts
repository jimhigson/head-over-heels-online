import { addReturnDoorInPlace } from "../../../model/inPlaceMutators/addReturnDoorInPlace";
import { findSubRoomForItem } from "../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../model/map/roomGridPositions";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { type ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { addItemInPlace } from "./addItemInPlace";
import { addNewRoomInPlace } from "./addNewRoomInPlace";
import { cutHoleInWallsForDoorsInPlace } from "./cutHoleInWallsForDoorsInPlace";

const getDestinationRoom = ({
  state,
  fromRoomJson,
  subRoomId,
  direction,
  isPreview,
  autoAddRooms,
}: {
  state: LevelEditorState;
  fromRoomJson: EditorRoomJson;
  // the subroom the door is being added into - to start the search from
  subRoomId: string;
  direction: DirectionXy4;
  isPreview: boolean;
  autoAddRooms: boolean;
}): EditorRoomJson | undefined => {
  const campaign = state.campaignInProgress;
  const gridPositions = roomGridPositions({
    campaign,
    roomId: fromRoomJson.id,
    subRoomId,
    skipMissingRooms: true,
  }).nodes;

  const existingRoomGridPositionSpec = gridPositions.find(({ gridPosition }) =>
    xyzEqual(gridPosition, unitVectors[direction]),
  );

  if (existingRoomGridPositionSpec) {
    // found an existing room for this door to go to
    return campaign.rooms[
      existingRoomGridPositionSpec.roomId
    ] as EditorRoomJson;
  }

  // no existing room
  if (isPreview) {
    return undefined;
  }

  return autoAddRooms ?
      addNewRoomInPlace({ state, scenery: fromRoomJson.planet })
      // auto add doors is turned off, we can make a door to nowhere
    : undefined;
};

export const addDoorInPlace = (
  state: LevelEditorState,
  blockPosition: Xyz,
  wallDirection: DirectionXy4,
  toolItem: ItemTool<"door">,
  isPreview: boolean,
): [EditorRoomItemId, EditorJsonItem<"door">] => {
  const fromRoomJson =
    selectCurrentCommittedRoomJsonFromLevelEditorState(state);

  const doorDirection = wallDirection;
  // for doors, trim walls around where the door was placed:
  cutHoleInWallsForDoorsInPlace(
    state,
    fromRoomJson.id,
    doorDirection,
    blockPosition,
    isPreview,
  );

  const autoAddRooms = toolItem.config.toRoom === "+";

  const fromDoorSubroom = findSubRoomForItem(
    blockPosition,
    "block",
    fromRoomJson,
  );

  const toRoomJson = getDestinationRoom({
    state,
    fromRoomJson,
    subRoomId: fromDoorSubroom,
    direction: doorDirection,
    isPreview,
    autoAddRooms,
  });

  const [doorId, doorJsonItem] = addItemInPlace(
    state,
    {
      type: "door",
      config: {
        ...toolItem.config,
        toRoom:
          toRoomJson ?
            toRoomJson.id
            // preview rooms go to nowhere:
          : toolItem.config.toRoom,
        direction: doorDirection,
      },
    },
    blockPosition,
    isPreview,
  );

  if (!isPreview && toRoomJson) {
    addReturnDoorInPlace({
      rooms: state.campaignInProgress.rooms,
      fromRoomJson,
      toRoomJson,
      outgoingDoorEntry: [doorId, doorJsonItem],
    });
  }

  return [doorId, doorJsonItem] as const;
};
