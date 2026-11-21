import { createSelector, lruMemoize } from "@reduxjs/toolkit";
import nanoEqual from "nano-equal";
import { capitalize } from "string-transform";

import {
  campaignMapAreas,
  type CampaignMapAreas,
} from "../../map/campaignMapAreas";
import type { MapDataError } from "../../map/MapData";
import type { RoomNode } from "../../model/map/roomGridPositions";
import type { RoomHues } from "../../model/roomHues";
import type { RoomJson } from "../../model/RoomJson";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import type { EditorRootState } from "../../store/store";
import { emptyArray, emptyObject } from "../../utils/empty";
import { fromAllEntries, keys, valuesIter } from "../../utils/entries";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import type { EditorCampaign, EditorRoomId } from "../editorTypes";
import { selectCursorRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import { selectRoomHues } from "../slice/selectRoomHues";

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
  (rooms) => campaignMapAreas<EditorRoomId>({ rooms }),
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
  mapAreas: CampaignMapAreas<EditorRoomId> | MapDataError,
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
