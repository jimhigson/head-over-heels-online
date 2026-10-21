import { createSelector } from "@reduxjs/toolkit";

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
import { type SceneryName } from "../../sprites/planets";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { keys } from "../../utils/entries";
import { naturalCompare } from "../../utils/naturalCompare";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { createStructurallySharedSelector } from "../../utils/redux/createStructurallySharedSelector";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomFromLevelEditorState,
} from "../slice/levelEditorSelectors";

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
export const editorMapAreas = (
  campaign: EditorCampaign,
): EditorMapAreas | MapDataError => {
  const [seedRoomId] = keys(campaign.rooms).sort(naturalCompare);
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
        return {
          mapBounds: findMapBounds(roomNodes),
          gridPositions: sortRoomGridPositions(roomNodes),
        };
      })
      .toArray()
      .sort((areaA, areaB) =>
        naturalCompare(
          lowestRoomIdOfArea(areaA.gridPositions),
          lowestRoomIdOfArea(areaB.gridPositions),
        ),
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
 * shares what is unchanged, so that an edit to the notable items of one cell
 * leaves every other cell's as they were
 */
export const selectEditorNotableItemsByCell = createStructurallySharedSelector(
  [selectCampaignInProgress, selectEditorMapAreas],
  editorNotableItemsByCell,
);

export const useEditorMapData = (): MapData<EditorRoomId> | MapDataError =>
  useEditorAppSelector(selectEditorMapData);
