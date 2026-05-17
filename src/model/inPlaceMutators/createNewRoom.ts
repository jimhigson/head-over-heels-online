import { consolidateItemsMap } from "../../consolidateItems/consolidateItems";
import { buildRoomJsonDirectionalIndex } from "../../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { type ZxSpectrumRoomColour } from "../../originalGame";
import { type SceneryName } from "../../sprites/planets";
import { originXyz, type Xy, type Xyz } from "../../utils/vectors/vectors";
import { type JsonItemUnion } from "../json/JsonItem";
import { typePrefix } from "../json/typePrefix";
import { type RoomJson, roomJsonItemsIterable } from "../RoomJson";
import { changeRoomSceneryInPlace } from "./changeRoomSceneryInPlace";
import { nextItemIdSet } from "./nextItemId";
import { starterRoom } from "./starterRoom";

export const createNewRoom = <RoomId extends string, RoomItemId extends string>(
  roomId: RoomId,
  roomSize: Xy,
  colour: ZxSpectrumRoomColour,
  scenery: SceneryName,
  gridPositions: Xy[],
  roomOrigin: Xyz = originXyz,
): RoomJson<RoomId, RoomItemId> => {
  const allItems = new Set<JsonItemUnion<RoomId, RoomItemId>>();

  for (const gridPos of gridPositions) {
    const chunkOrigin = {
      x: roomOrigin.x + gridPos.x * roomSize.x,
      y: roomOrigin.y + gridPos.y * roomSize.y,
      z: roomOrigin.z,
    };

    const baseChunk = starterRoom<RoomId, RoomItemId>(roomSize, chunkOrigin);

    for (const item of roomJsonItemsIterable(baseChunk)) {
      allItems.add(item as JsonItemUnion<RoomId, RoomItemId>);
    }
  }

  // Remove internal walls between adjacent chunks using a positional index
  const { walls: wallsIndex } = buildRoomJsonDirectionalIndex(allItems);

  for (const gridPos of gridPositions) {
    const hasRightNeighbor = gridPositions.some(
      (gp) => gp.x === gridPos.x + 1 && gp.y === gridPos.y,
    );
    const hasBehindNeighbor = gridPositions.some(
      (gp) => gp.x === gridPos.x && gp.y === gridPos.y + 1,
    );

    if (hasRightNeighbor) {
      const boundaryX = roomOrigin.x + (gridPos.x + 1) * roomSize.x;
      const coordStr = `${boundaryX},${roomOrigin.y + gridPos.y * roomSize.y}`;
      const leftWall = wallsIndex[coordStr]?.left;
      const rightWall = wallsIndex[coordStr]?.right;
      if (leftWall) allItems.delete(leftWall);
      if (rightWall) allItems.delete(rightWall);
    }

    if (hasBehindNeighbor) {
      const boundaryY = roomOrigin.y + (gridPos.y + 1) * roomSize.y;
      const coordStr = `${roomOrigin.x + gridPos.x * roomSize.x},${boundaryY}`;
      const awayWall = wallsIndex[coordStr]?.away;
      const towardsWall = wallsIndex[coordStr]?.towards;
      if (awayWall) allItems.delete(awayWall);
      if (towardsWall) allItems.delete(towardsWall);
    }
  }

  // Assign IDs after wall removal
  const allIds = new Set<RoomItemId>();
  const itemsRecord: Record<string, JsonItemUnion<RoomId, RoomItemId>> = {};
  for (const item of allItems) {
    const itemId = nextItemIdSet(allIds, typePrefix[item.type]) as RoomItemId;
    itemsRecord[itemId] = item;
    allIds.add(itemId);
  }

  const consolidatedItems = consolidateItemsMap(itemsRecord);

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

  return newRoom as RoomJson<RoomId, RoomItemId>;
};
