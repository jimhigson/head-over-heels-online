import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { iterate } from "../../../utils/iterate";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import {
  type Xyz,
  oppositeDirection,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import type {
  EditorRoomId,
  EditorJsonItem,
  EditorRoomJson,
} from "../../editorTypes";
import type { ItemTool } from "../../Tool";
import { addNewRoomInPlace } from "../inPlaceMutators.ts/addNewRoomInPlace";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { addItemInPlace, nextItemId } from "./addItemInPlace";
import { cutHoleInWallsForDoorsInPlace } from "./cutHoleInWallsForDoor";

const getDestinationRoom = (
  state: LevelEditorState,
  fromRoomJson: EditorRoomJson,
  direction: DirectionXy4,
  isPreview: boolean,
): EditorRoomJson | undefined => {
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

  return addNewRoomInPlace(state, fromRoomJson.planet, fromRoomJson.color);
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

  const toRoomJson = getDestinationRoom(
    state,
    fromRoomJson,
    doorDirection,
    isPreview,
  );

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
          : ("(new)" as EditorRoomId),
        direction: doorDirection,
      },
    },
    blockPosition,
    isPreview,
  );

  if (!isPreview) {
    if (toRoomJson === undefined) {
      throw new Error(
        "if not a preview, should have guaranteed a room to go to",
      );
    }

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
