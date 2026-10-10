import { nextItemId } from "../../../model/inPlaceMutators/nextItemId";
import { doorLinkNeedsToDoor } from "../../../model/json/candidatePartnerDoors";
import { typePrefix } from "../../../model/json/typePrefix";
import { findSubRoomForItem } from "../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../model/map/roomGridPositions";
import { keys } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  oppositeDirection,
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
import { roomWallBounds } from "../roomWallBounds";
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

export const addReturnDoorInPlace = ({
  state,
  fromRoomJson,
  toRoomJson,
  outgoingDoorEntry: [outgoingDoorId, outgoingDoor],
}: {
  state: LevelEditorState;
  fromRoomJson: EditorRoomJson;
  toRoomJson: EditorRoomJson;
  outgoingDoorEntry: [EditorRoomItemId, EditorJsonItem<"door">];
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

  const fromWalls = roomWallBounds(fromRoomJson, fromDoorSubroom);
  const toWalls = roomWallBounds(
    toRoomJson,
    outgoingDoor.config.meta?.toSubRoom ?? "*",
  );

  // same offset along the wall as the outgoing door has along its own wall:
  const returnDoorPosition: Xyz = {
    x:
      outgoingDirection === "left" ? toWalls.from.x
      : outgoingDirection === "right" ? toWalls.to.x
      : outgoingPosition.x - fromWalls.from.x + toWalls.from.x,
    y:
      outgoingDirection === "away" ? toWalls.from.y
      : outgoingDirection === "towards" ? toWalls.to.y
      : outgoingPosition.y - fromWalls.from.y + toWalls.from.y,
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

  // only name a partner with `toDoor` where the link would otherwise be
  // ambiguous (more than one door comes back)
  const { rooms } = state.campaignInProgress;
  if (
    doorLinkNeedsToDoor(
      rooms,
      toRoomJson.id,
      fromRoomJson.id,
      returnDoorDirection,
    )
  ) {
    returnDoorItemJson.config.toDoor = outgoingDoorId;
  } else {
    delete returnDoorItemJson.config.toDoor;
  }
  if (
    doorLinkNeedsToDoor(
      rooms,
      fromRoomJson.id,
      toRoomJson.id,
      outgoingDirection,
    )
  ) {
    outgoingDoor.config.toDoor = returnDoorId;
  } else {
    delete outgoingDoor.config.toDoor;
  }

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
      state,
      fromRoomJson,
      toRoomJson,
      outgoingDoorEntry: [doorId, doorJsonItem],
    });
  }

  return [doorId, doorJsonItem] as const;
};
