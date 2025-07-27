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

const getDestinationRoom = ({
  state,
  fromRoomJson,
  direction,
  isPreview,
  autoAddRooms,
}: {
  state: LevelEditorState;
  fromRoomJson: EditorRoomJson;
  direction: DirectionXy4;
  isPreview: boolean;
  autoAddRooms: boolean;
}): EditorRoomJson | undefined => {
  const campaign = state.campaignInProgress;
  const existingRoomGridPositionSpec = iterate(
    roomGridPositions({
      campaign,
      roomId: fromRoomJson.id,
    }),
  ).find(({ gridPosition }) => xyzEqual(gridPosition, unitVectors[direction]));

  if (existingRoomGridPositionSpec) {
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
  console.log("autoAddRooms:", autoAddRooms);

  const toRoomJson = getDestinationRoom({
    state,
    fromRoomJson,
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
        doorDirection === "left" ? 0
        : doorDirection === "right" ? toRoomJson.size.x
          // line up to match the door we just added (this assumes the room going to is big enough)
        : blockPosition.x,
      y:
        doorDirection === "away" ? 0
        : doorDirection === "towards" ? toRoomJson.size.x
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
