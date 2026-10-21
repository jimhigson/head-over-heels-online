import { createSelector } from "@reduxjs/toolkit";
import { capitalize } from "string-transform";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import { lowestRoomIdOfArea } from "../../game/components/dialogs/menuDialog/dialogs/map/lowestRoomIdOfArea";
import {
  type MapArea,
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import {
  computeNotableItemsByCell,
  type NotableItemsByCell,
} from "../../game/components/dialogs/menuDialog/dialogs/map/notableItemsByCell";
import { type PickupsCollected } from "../../game/gameState/GameState";
import {
  roomGridPositions,
  type RoomNode,
} from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../model/map/teleporterLinks";
import { type CharacterName } from "../../model/modelTypes";
import { type RoomHues } from "../../model/roomHues";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { type SceneryName } from "../../sprites/planets";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { fromAllEntries, keys, valuesIter } from "../../utils/entries";
import { naturalCompare } from "../../utils/naturalCompare";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import { createStructurallySharedSelector } from "../../utils/redux/createStructurallySharedSelector";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomFromLevelEditorState,
} from "../slice/levelEditorSelectors";
import { selectRoomHues } from "../slice/selectRoomHues";

/** the parts of the map that depend only on the campaign, not the cursor */
export type EditorMapAreas = Pick<
  MapData<EditorRoomId>,
  "areas" | "teleporterLinks"
> & { isError: false };

const noPickupsCollected = emptyObject as PickupsCollected<EditorRoomId>;

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

    const teleporterLinks: TeleporterLink<EditorRoomId>[] = graph
      .iterateAnnotatedEdges()
      .filter(({ annotation }) => annotation.kind === "teleporter")
      .map(({ from, to, annotation }) => ({
        from: {
          roomId: from.roomId,
          subRoomId: from.subRoomId,
          itemId: annotation.viaItemId,
        },
        to: {
          roomId: to.roomId,
          subRoomId: to.subRoomId,
          itemId: annotation.toItemId,
        },
      }))
      .toArray();

    return { areas, teleporterLinks, isError: false };
  } catch (e) {
    console.error(Error("error getting map data", { cause: e }));
    const errors = createSerialisableErrors(e)
      .map((err) => err.message)
      .reverse();
    return { isError: true, errors };
  }
};

/**
 * every placed cell's notable items, across all of the map's areas
 */
export const editorNotableItemsByCell = (
  campaign: EditorCampaign,
  mapAreas: EditorMapAreas | MapDataError,
): NotableItemsByCell<EditorRoomId> =>
  mapAreas.isError ? emptyObject : (
    Object.assign(
      {},
      ...mapAreas.areas.map(({ gridPositions }) =>
        computeNotableItemsByCell(gridPositions, campaign, noPickupsCollected),
      ),
    )
  );

/** the editor's map, with the given room as the current one */
export const editorMapData = (
  mapAreas: EditorMapAreas | MapDataError,
  roomId: EditorRoomId,
  subRoomId: string,
  /**
   * the scenery of the current room
   */
  curRoomScenery: SceneryName,
): MapData<EditorRoomId> | MapDataError =>
  mapAreas.isError ? mapAreas : (
    {
      ...mapAreas,
      curRoomId: roomId,
      curSubRoomId: subRoomId,
      curRoomScenery,
    }
  );

const selectCampaignInProgress = (state: EditorRootState) =>
  state.levelEditor.campaignInProgress;

// rebuilt for any change to the campaign, so shares what is unchanged - an
// edit inside a room then leaves the rest of the map's parts as they were:
const selectEditorMapAreas = createStructurallySharedSelector(
  [selectCampaignInProgress],
  editorMapAreas,
);

// depends on the campaign only through its parts that edits inside rooms
// leave alone, so is unchanged by them:
export const selectEditorMapData = createSelector(
  [
    selectEditorMapAreas,
    (state: EditorRootState) =>
      selectCursorRoomFromLevelEditorState(state.levelEditor),
    (state: EditorRootState) =>
      selectCurrentCommittedRoomJsonFromLevelEditorState(state.levelEditor)
        .planet,
  ],
  (mapAreas, { roomId, subRoomId }, curRoomScenery) =>
    editorMapData(mapAreas, roomId, subRoomId, curRoomScenery),
);

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
export const editorMapAreaLabels = (
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

/**
 * shares what is unchanged, so that an edit to the notable items of one cell
 * leaves every other cell's as they were
 */
export const selectEditorNotableItemsByCell = createStructurallySharedSelector(
  [selectCampaignInProgress, selectEditorMapAreas],
  editorNotableItemsByCell,
);

export const useEditorMapData = (): MapData<EditorRoomId> | MapDataError =>
  useEditorAppSelector(selectEditorMapData);
