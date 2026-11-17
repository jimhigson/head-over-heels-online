import { createSelector, lruMemoize } from "@reduxjs/toolkit";
import nanoEqual from "nano-equal";
import { capitalize } from "string-transform";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import { lowestRoomIdOfArea } from "../../game/components/dialogs/menuDialog/dialogs/map/lowestRoomIdOfArea";
import {
  type MapArea,
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import {
  roomGridPositions,
  type RoomNode,
} from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { type CharacterName } from "../../model/modelTypes";
import { type RoomHues } from "../../model/roomHues";
import { type RoomJson } from "../../model/RoomJson";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { type EditorRootState } from "../../store/store";
import { emptyArray, emptyObject } from "../../utils/empty";
import { fromAllEntries, keys, valuesIter } from "../../utils/entries";
import { naturalCompare } from "../../utils/naturalCompare";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { selectCursorRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import { selectRoomHues } from "../slice/selectRoomHues";

/** the parts of the map that depend only on the campaign, not the cursor */
export type EditorMapAreas = Pick<MapData<EditorRoomId>, "areas"> & {
  isError: false;
};

/**
 * every room in the campaign, split into areas of rooms positioned relative to
 * each other, ordered by each area's first room id
 */
/**
 * the room the map is built out from: head's starting room, else heels' if
 * there is no head, else the lowest room id
 */
const mapSeedRoomId = (
  campaign: Pick<EditorCampaign, "rooms">,
): EditorRoomId => {
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

export const editorMapAreas = (
  campaign: Pick<EditorCampaign, "rooms">,
): EditorMapAreas | MapDataError => {
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
      ({ subgraph }: RoomNode<EditorRoomId>) => subgraph,
    );
    const areas = nodesBySubgraph
      .values()
      .map((roomNodes): MapArea<EditorRoomId> => {
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

const selectCampaignInProgress = (state: EditorRootState) =>
  state.levelEditor.campaignInProgress;

/**
 * the items of a room its place on the map depends on: doors (linking rooms)
 * and players (choosing the room the map is built out from)
 */
const layoutItemsOfRoom = (room: RoomJson<EditorRoomId, string>) =>
  iterateRoomJsonItemsWithIds(room.items, "door", "player").toArray();

/**
 * every room is laid out alike in both: unchanged, or with the same sub-rooms
 * (and other `meta`), doors and players
 */
const areRoomsLaidOutAlike = (
  roomsA: EditorCampaign["rooms"],
  roomsB: EditorCampaign["rooms"],
): boolean => {
  const roomIds = keys(roomsA);
  return (
    roomIds.length === keys(roomsB).length &&
    roomIds.every((roomId) => {
      const roomA = roomsA[roomId];
      const roomB = roomsB[roomId];
      return (
        roomA === roomB ||
        // the same number of rooms, but not necessarily the same ones:
        (roomId in roomsB &&
          nanoEqual(roomA.meta, roomB.meta) &&
          nanoEqual(layoutItemsOfRoom(roomA), layoutItemsOfRoom(roomB)))
      );
    })
  );
};

/**
 * the whole map laid out. Recomputed only when rooms' places on it may have
 * changed: an edit that leaves every room laid out alike keeps the last
 * layout. Read through the narrower selectors below, which each keep their
 * result while what they give is unchanged
 */
const selectEditorMapLayout = createSelector(
  [(state: EditorRootState) => state.levelEditor.campaignInProgress.rooms],
  (rooms) => editorMapAreas({ rooms }),
  {
    memoize: lruMemoize,
    memoizeOptions: { equalityCheck: areRoomsLaidOutAlike },
  },
);

/**
 * why the map couldn't be laid out, if it couldn't
 */
export const selectEditorMapErrors = createSelector(
  [selectEditorMapLayout],
  (mapLayout) => (mapLayout.isError ? mapLayout.errors : undefined),
);

/**
 * which of the map's areas each room is in
 */
const selectEditorMapAreaIndexByRoomId = createSelector(
  [selectEditorMapLayout],
  (mapLayout): Map<EditorRoomId, number> =>
    mapLayout.isError ?
      new Map()
    : new Map(
        mapLayout.areas.flatMap(({ gridPositions }, areaIndex) =>
          valuesIter<RoomNode<EditorRoomId>>(gridPositions)
            .map(({ roomId }) => [roomId, areaIndex] as const)
            .toArray(),
        ),
      ),
);

/**
 * which of the map's areas is shown: the one with the cursor room
 */
export const selectEditorShownMapAreaIndex = (state: EditorRootState) =>
  selectEditorMapAreaIndexByRoomId(state).get(
    selectCursorRoomFromLevelEditorState(state.levelEditor).roomId,
  ) ?? 0;

/**
 * the one of the map's areas shown, unless the map couldn't be laid out -
 * unchanged by edits that only move rooms in other areas
 */
export const selectEditorShownMapArea = createSelector(
  [selectEditorMapLayout, selectEditorShownMapAreaIndex],
  (mapLayout, shownAreaIndex) =>
    mapLayout.isError ? undefined : mapLayout.areas[shownAreaIndex],
  { memoizeOptions: { resultEqualityCheck: nanoEqual } },
);

/**
 * the first room of each of the map's areas, which stands for it
 */
export const selectEditorMapAreaFirstRoomIds = createShallowStableSelector(
  [selectEditorMapLayout],
  (mapLayout): EditorRoomId[] =>
    mapLayout.isError ? emptyArray : (
      mapLayout.areas.map(({ firstRoomId }) => firstRoomId)
    ),
);

/**
 * the first room of each of the map's areas, with its hue - unchanged by
 * edits that don't add, remove or recolour an area's first room
 */
export const selectEditorMapAreaFirstRoomHues = createShallowStableSelector(
  [selectEditorMapAreaFirstRoomIds, selectRoomHues],
  (firstRoomIds, campaignRoomHues): RoomHues<EditorRoomId> =>
    fromAllEntries(
      firstRoomIds.map(
        (firstRoomId) => [firstRoomId, campaignRoomHues[firstRoomId]] as const,
      ),
    ),
);

/**
 * what to call each of the map's areas, by its first room: its scenery, if it
 * is all one scenery and has every room of that scenery, otherwise its first
 * room
 */
const editorMapAreaLabels = (
  campaign: EditorCampaign,
  mapAreas: EditorMapAreas | MapDataError,
): Partial<Record<EditorRoomId, string>> => {
  if (mapAreas.isError) {
    return emptyObject;
  }
  const roomsByScenery = Map.groupBy(
    valuesIter(campaign.rooms),
    ({ planet }) => planet,
  );
  return fromAllEntries(
    mapAreas.areas.map(({ firstRoomId, gridPositions }) => {
      const roomIds = new Set(
        valuesIter<RoomNode<EditorRoomId>>(gridPositions).map(
          ({ roomId }) => roomId,
        ),
      );
      const sceneries = new Set(
        roomIds.values().map((roomId) => campaign.rooms[roomId].planet),
      );
      const [onlyScenery] = sceneries;
      const hasAllOfItsScenery =
        sceneries.size === 1 &&
        roomsByScenery.get(onlyScenery)?.length === roomIds.size;
      return [
        firstRoomId,
        hasAllOfItsScenery ? capitalize(onlyScenery) : firstRoomId,
      ] as const;
    }),
  );
};

export const selectEditorMapAreaLabels = createShallowStableSelector(
  [selectCampaignInProgress, selectEditorMapLayout],
  editorMapAreaLabels,
);

/**
 * how many rooms (not sub-rooms) each of the map's areas has, by its first
 * room
 */
export const selectEditorMapAreaRoomCounts = createShallowStableSelector(
  [selectEditorMapLayout],
  (mapAreas): Partial<Record<EditorRoomId, number>> =>
    mapAreas.isError ? emptyObject : (
      fromAllEntries(
        mapAreas.areas.map(({ firstRoomId, gridPositions }) => [
          firstRoomId,
          new Set(
            valuesIter<RoomNode<EditorRoomId>>(gridPositions).map(
              ({ roomId }) => roomId,
            ),
          ).size,
        ]),
      )
    ),
);
