import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { iterate } from "../../../utils/iterate";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import {
  type Xyz,
  oppositeDirection,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import type { EditorJsonItem, EditorRoomJson } from "../../editorTypes";
import type { ItemTool } from "../../Tool";
import { addNewRoomInPlace } from "./addNewRoomInPlace";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { addItemInPlace, nextItemId } from "./addItemInPlace";
import { cutHoleInWallsForDoorsInPlace } from "./cutHoleInWallsForDoorsInPlace";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { findSubRoomForItem } from "../../../game/components/dialogs/menuDialog/dialogs/map/itemIsInSubRoom";

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
      addNewRoomInPlace(state, fromRoomJson.planet)
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
    const returnDoorId = nextItemId(toRoomJson, toolItem, isPreview);

    const returnDoorPosition: Xyz = {
      x:
        doorDirection === "left" ? roomFloorMinX(toRoomJson)
        : doorDirection === "right" ? roomFloorMaxX(toRoomJson)
          // line up to match the door we just added (this assumes the room going to is big enough)
        : blockPosition.x,
      y:
        doorDirection === "away" ? roomFloorMinY(toRoomJson)
        : doorDirection === "towards" ? roomFloorMaxY(toRoomJson)
          // line up to match the door we just added (this assumes the room going to is big enough)
        : blockPosition.y,
      z: blockPosition.z,
    };

    const returnDoorDirection = oppositeDirection(doorDirection);

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

    returnDoorItemJson.config.toDoor = doorId;
    doorJsonItem.config.toDoor = returnDoorId;

    cutHoleInWallsForDoorsInPlace(
      state,
      toRoomJson.id,
      returnDoorDirection,
      returnDoorPosition,
      false,
    );
  }
};
