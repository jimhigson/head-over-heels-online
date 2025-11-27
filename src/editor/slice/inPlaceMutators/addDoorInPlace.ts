import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import type { ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import type { LevelEditorState } from "../levelEditorSlice";

import { findSubRoomForItem } from "../../../game/components/dialogs/menuDialog/dialogs/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { iterate } from "../../../utils/iterate";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  oppositeDirection,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { addItemInPlace, nextItemId } from "./addItemInPlace";
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

  const existingRoomGridPositionSpec = iterate(gridPositions).find(
    ({ gridPosition }) => xyzEqual(gridPosition, unitVectors[direction]),
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

const roomFloorMinY = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (min, [, item]) => {
      const itemTop = item.position.y;
      return Math.min(min, itemTop);
    },
    Number.POSITIVE_INFINITY,
  );
const roomFloorMaxY = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (max, [, item]) => {
      const itemBottom = item.position.y + item.config.times.y;
      return Math.max(max, itemBottom);
    },
    Number.NEGATIVE_INFINITY,
  );
const roomFloorMinX = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (min, [, item]) => {
      const itemTop = item.position.x;
      return Math.min(min, itemTop);
    },
    Number.POSITIVE_INFINITY,
  );
const roomFloorMaxX = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (max, [, item]) => {
      const itemBottom = item.position.x + item.config.times.x;
      return Math.max(max, itemBottom);
    },
    Number.NEGATIVE_INFINITY,
  );

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

  const returnDoorId = nextItemId(toRoomJson, "door");

  const returnDoorPosition: Xyz = {
    x:
      outgoingDirection === "left" ? roomFloorMinX(toRoomJson)
      : outgoingDirection === "right" ? roomFloorMaxX(toRoomJson)
        // line up to match the door we just added (this assumes the room going to is big enough)
      : outgoingPosition.x,
    y:
      outgoingDirection === "away" ? roomFloorMinY(toRoomJson)
      : outgoingDirection === "towards" ? roomFloorMaxY(toRoomJson)
        // line up to match the door we just added (this assumes the room going to is big enough)
      : outgoingPosition.y,
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
};
