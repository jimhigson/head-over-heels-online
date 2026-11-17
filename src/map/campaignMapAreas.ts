import {
  roomGridPositions,
  type RoomNode,
} from "../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../model/map/sortRoomGridPositions";
import { type Campaign, type CharacterName } from "../model/modelTypes";
import { iterateRoomJsonItemsWithIds } from "../model/RoomJsonItemIterators";
import { keys } from "../utils/entries";
import { naturalCompare } from "../utils/naturalCompare";
import { createSerialisableErrors } from "../utils/redux/createSerialisableErrors";
import { findMapBounds } from "./findMapBounds";
import { lowestRoomIdOfArea } from "./lowestRoomIdOfArea";
import { type MapArea, type MapData, type MapDataError } from "./MapData";

/**
 * the parts of the map that depend only on the campaign, not on which room is
 * current
 */
export type CampaignMapAreas<RoomId extends string> = Pick<
  MapData<RoomId>,
  "areas"
> & {
  isError: false;
};

/**
 * the room the map is built out from: head's starting room, else heels' if
 * there is no head, else the lowest room id
 */
const mapSeedRoomId = <RoomId extends string>(
  campaign: Pick<Campaign<RoomId>, "rooms">,
): RoomId => {
  const roomIds = keys(campaign.rooms).sort(naturalCompare);
  const startingRoomOf = (characterNames: CharacterName[]) =>
    roomIds.find((roomId) =>
      iterateRoomJsonItemsWithIds(campaign.rooms[roomId].items, "player").some(
        ([, { config }]) => characterNames.includes(config.which),
      ),
    );
  const [lowestRoomId] = roomIds;
  return (
    startingRoomOf(["head", "headOverHeels"]) ??
    startingRoomOf(["heels"]) ??
    lowestRoomId
  );
};

/**
 * every room in the campaign, split into areas of rooms positioned relative to
 * each other - the area holding the map's seed room first, then the others
 * ordered by each area's first room id
 */
export const campaignMapAreas = <RoomId extends string>(
  campaign: Pick<Campaign<RoomId>, "rooms">,
): CampaignMapAreas<RoomId> | MapDataError => {
  const seedRoomId = mapSeedRoomId(campaign);
  try {
    const graph = roomGridPositions({
      campaign,
      roomId: seedRoomId,
      totalGraph: true,
      skipMissingRooms: true,
    });

    const nodesBySubgraph = Map.groupBy(
      graph.nodes,
      ({ subgraph }: RoomNode<RoomId>) => subgraph,
    );
    const areas = nodesBySubgraph
      .values()
      .map((roomNodes): MapArea<RoomId> => {
        const gridPositions = sortRoomGridPositions(roomNodes);
        return {
          // the area laid out from the seed is first, by the seed; the others
          // by their lowest room id:
          firstRoomId:
            roomNodes.some(({ roomId }) => roomId === seedRoomId) ? seedRoomId
            : lowestRoomIdOfArea(gridPositions),
          mapBounds: findMapBounds(roomNodes),
          gridPositions,
        };
      })
      .toArray()
      .sort((areaA, areaB) =>
        areaA.firstRoomId === seedRoomId ? -1
        : areaB.firstRoomId === seedRoomId ? 1
        : naturalCompare(areaA.firstRoomId, areaB.firstRoomId),
      );

    return { areas, isError: false };
  } catch (e) {
    console.error(Error("error getting map data", { cause: e }));
    const errors = createSerialisableErrors(e)
      .map((err) => err.message)
      .reverse();
    return { isError: true, errors };
  }
};
