import { findSubRoomForItem } from "../../../game/components/dialogs/menuDialog/dialogs/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { nextItemId } from "../../../model/inPlaceMutators/nextItemId";
import { typePrefix } from "../../../model/json/typePrefix";
import { keys } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  oppositeDirection,
  originXy,
  type Xy,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { type ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  roomFloorMaxX,
  roomFloorMaxY,
  roomFloorMinX,
  roomFloorMinY,
} from "../roomJsonSelectors";
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
  });

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

export const addReturnDoorInPlace = ({
  state,
  fromRoomJson,
  toRoomJson,
  outgoingDoorEntry: [outgoingDoorId, outgoingDoor],
  outgoingDoorRelativeTo = originXy,
}: {
  state: LevelEditorState;
  fromRoomJson: EditorRoomJson;
  toRoomJson: EditorRoomJson;
  outgoingDoorEntry: [EditorRoomItemId, EditorJsonItem<"door">];
  /** origin to subtract from the outgoing door's position for the return door's non-directional axis */
  outgoingDoorRelativeTo?: Xy;
}) => {
  const outgoingDirection = outgoingDoor.config.direction;
  const outgoingPosition = outgoingDoor.position;
  const fromDoorSubroom = findSubRoomForItem(
    outgoingDoor.position,
    "block",
    fromRoomJson,
  );

  // don't consider previews item ids, since these only cover the current room,
  // and this will be added to the other room:
  const returnDoorId = nextItemId(keys(toRoomJson.items), typePrefix.door);

  const returnDoorPosition: Xyz = {
    x:
      outgoingDirection === "left" ? roomFloorMinX(toRoomJson)
      : outgoingDirection === "right" ? roomFloorMaxX(toRoomJson)
      : outgoingPosition.x - outgoingDoorRelativeTo.x,
    y:
      outgoingDirection === "away" ? roomFloorMinY(toRoomJson)
      : outgoingDirection === "towards" ? roomFloorMaxY(toRoomJson)
      : outgoingPosition.y - outgoingDoorRelativeTo.y,
    z: outgoingPosition.z,
  };

  const returnDoorDirection = oppositeDirection(outgoingDirection);

  const returnDoorItemJson: EditorJsonItem<"door"> = {
    type: "door",
    config: {
      toRoom: fromRoomJson.id,
      direction: returnDoorDirection,
      meta:
        fromDoorSubroom === "*" ? undefined : (
          {
            toSubRoom: fromDoorSubroom,
          }
        ),
    },
    position: returnDoorPosition,
  };

  toRoomJson.items[returnDoorId] = returnDoorItemJson;

  returnDoorItemJson.config.toDoor = outgoingDoorId;
  outgoingDoor.config.toDoor = returnDoorId;

  cutHoleInWallsForDoorsInPlace(
    state,
    toRoomJson.id,
    returnDoorDirection,
    returnDoorPosition,
    false,
  );
};

export const addDoorInPlace = (
  state: LevelEditorState,
  blockPosition: Xyz,
  wallDirection: DirectionXy4,
  toolItem: ItemTool<"door">,
  isPreview: boolean,
): [EditorRoomItemId, EditorJsonItem<"door">] => {
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
      state,
      fromRoomJson,
      toRoomJson,
      outgoingDoorEntry: [doorId, doorJsonItem],
    });
  }

  return [doorId, doorJsonItem] as const;
};
