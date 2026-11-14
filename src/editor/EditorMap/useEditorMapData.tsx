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
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { type EditorRootState } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { fromAllEntries, keys, valuesIter } from "../../utils/entries";
import { naturalCompare } from "../../utils/naturalCompare";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import { createStructurallySharedSelector } from "../../utils/redux/createStructurallySharedSelector";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { selectCursorRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import { selectRoomHues } from "../slice/selectRoomHues";
import { mapAreaIndexOfRoom } from "./mapAreaIndexOfRoom";

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
const mapSeedRoomId = (campaign: EditorCampaign): EditorRoomId => {
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
  campaign: EditorCampaign,
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

// rebuilt for any change to the campaign, so shares what is unchanged - an
// edit inside a room then leaves the rest of the map's parts as they were:
export const selectEditorMapAreas = createStructurallySharedSelector(
  [selectCampaignInProgress],
  editorMapAreas,
);

/**
 * which of the map's areas is shown: the one with the cursor room
 */
export const selectEditorShownMapAreaIndex = (state: EditorRootState) => {
  const mapAreas = selectEditorMapAreas(state);
  return mapAreas.isError ? 0 : (
      mapAreaIndexOfRoom(
        mapAreas.areas,
        selectCursorRoomFromLevelEditorState(state.levelEditor).roomId,
      )
    );
};

/**
 * the one of the map's areas shown, unless the map's geometry couldn't be
 * solved
 */
export const selectEditorShownMapArea = (state: EditorRootState) => {
  const mapAreas = selectEditorMapAreas(state);
  return mapAreas.isError ? undefined : (
      mapAreas.areas[selectEditorShownMapAreaIndex(state)]
    );
};

/**
 * the first room of each of the map's areas, with its hue - unchanged by
 * edits that don't add, remove or recolour an area's first room
 */
export const selectEditorMapAreaFirstRoomHues = createShallowStableSelector(
  [selectEditorMapAreas, selectRoomHues],
  (mapAreas, campaignRoomHues): RoomHues<EditorRoomId> =>
    mapAreas.isError ? emptyObject : (
      fromAllEntries(
        mapAreas.areas.map(
          ({ firstRoomId }) =>
            [firstRoomId, campaignRoomHues[firstRoomId]] as const,
        ),
      )
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
  [selectCampaignInProgress, selectEditorMapAreas],
  editorMapAreaLabels,
);

/**
 * how many rooms (not sub-rooms) each of the map's areas has, by its first
 * room
 */
export const selectEditorMapAreaRoomCounts = createShallowStableSelector(
  [selectEditorMapAreas],
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
