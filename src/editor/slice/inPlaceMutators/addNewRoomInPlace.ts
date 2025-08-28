import { range } from "iter-tools";

import type { SceneryName } from "../../../sprites/planets";
import type { Xy } from "../../../utils/vectors/vectors";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import {
  type ZxSpectrumRoomColour,
  zxSpectrumRoomHue,
} from "../../../originalGame";
import { iterate } from "../../../utils/iterate";
import { randomFromArray } from "../../../utils/random/randomFromArray";
import { starterRoom } from "../createStarterRoom";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";

const defaultRoomSize: Xy = { x: 8, y: 8 };

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

export const createNewRoom = (
  roomId: EditorRoomId,
  roomSize: Xy,
  colour: ZxSpectrumRoomColour,
  scenery: SceneryName,
  gridPositions: Xy[],
): EditorRoomJson => {
  // Create all the room chunks with their offsets
  const allItems: Record<string, EditorRoomJson["items"][EditorRoomItemId]> =
    {};

  for (const gridPos of gridPositions) {
    const chunkOffset = {
      x: gridPos.x * roomSize.x,
      y: gridPos.y * roomSize.y,
    };

    // Create a basic room chunk
    const baseChunk = starterRoom(roomSize);

    // Add each item from the chunk with an offset position
    for (const [originalKey, item] of Object.entries(baseChunk.items)) {
      const itemId =
        `${originalKey}_${gridPos.x}_${gridPos.y}` as EditorRoomItemId;
      allItems[itemId] = {
        ...item,
        position: {
          x: item.position.x + chunkOffset.x,
          y: item.position.y + chunkOffset.y,
          z: item.position.z,
        },
      };
    }
  }

  // Find walls that should be removed (internal walls between adjacent chunks)
  const wallsToRemove = new Set<string>();

  // Check each grid position against its neighbors
  for (const gridPos of gridPositions) {
    // Check if there's a chunk to the right (x+1)
    const hasRightNeighbor = gridPositions.some(
      (gp) => gp.x === gridPos.x + 1 && gp.y === gridPos.y,
    );
    // Check if there's a chunk behind (y+1)
    const hasBehindNeighbor = gridPositions.some(
      (gp) => gp.x === gridPos.x && gp.y === gridPos.y + 1,
    );

    // If there's a neighbor to the right, remove the left wall of this chunk
    // and the right wall of the neighbor
    if (hasRightNeighbor) {
      wallsToRemove.add(`leftWall_${gridPos.x}_${gridPos.y}`);
      wallsToRemove.add(`rightWall_${gridPos.x + 1}_${gridPos.y}`);
    }

    // If there's a neighbor behind, remove the away wall of this chunk
    // and the towards wall of the neighbor
    if (hasBehindNeighbor) {
      wallsToRemove.add(`awayWall_${gridPos.x}_${gridPos.y}`);
      wallsToRemove.add(`towardsWall_${gridPos.x}_${gridPos.y + 1}`);
    }
  }

  // Remove the identified internal walls
  for (const wallId of wallsToRemove) {
    delete allItems[wallId];
  }

  // Run consolidation to join adjacent walls and floors
  const consolidatedItems = consolidateItemsMap(allItems);

  // Create subRooms metadata if we have multiple grid positions
  const subRooms =
    gridPositions.length > 1 ?
      Object.fromEntries(
        gridPositions.map((gridPos, index) => [
          index.toString(),
          {
            gridPosition: gridPos,
            physicalPosition: {
              from: {
                x: gridPos.x * roomSize.x,
                y: gridPos.y * roomSize.y,
              },
              to: {
                x: (gridPos.x + 1) * roomSize.x - 1,
                y: (gridPos.y + 1) * roomSize.y - 1,
              },
            },
          },
        ]),
      )
    : undefined;

  const newRoom = {
    id: roomId,
    planet: "blacktooth" as const,
    color: colour,
    items: consolidatedItems,
    ...(subRooms && { meta: { subRooms } }),
  };

  changeRoomSceneryInPlace(newRoom, scenery);

  return newRoom;
};

export const addNewRoomInPlace = ({
  state,
  scenery,
  maybeColour,
  roomSize = defaultRoomSize,
  gridPositions = [{ x: 0, y: 0 }],
}: AddNewRoomInPlaceOptions): EditorRoomJson => {
  const firstUntakenRoomNumber = iterate(range({ start: 0 })).find(
    (n) =>
      state.campaignInProgress.rooms[`room_${n}` as EditorRoomId] === undefined,
  );

  const newRoomId = `room_${firstUntakenRoomNumber}` as EditorRoomId;

  const colour: ZxSpectrumRoomColour = maybeColour ?? {
    hue: randomFromArray(zxSpectrumRoomHue),
    shade: Math.random() < 0.66 ? "basic" : "dimmed",
  };

  const newRoom = createNewRoom(
    newRoomId,
    roomSize,
    colour,
    scenery,
    gridPositions,
  );

  state.campaignInProgress.rooms[newRoomId] = newRoom;

  return newRoom;
};
