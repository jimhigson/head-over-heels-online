import { createSelector } from "@reduxjs/toolkit";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import { lowestRoomIdOfArea } from "../../game/components/dialogs/menuDialog/dialogs/map/lowestRoomIdOfArea";
import {
  type MapArea,
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { computeNotableItemsByCell } from "../../game/components/dialogs/menuDialog/dialogs/map/notableItemsByCell";
import {
  type CharacterRooms,
  type PickupsCollected,
} from "../../game/gameState/GameState";
import {
  roomGridPositions,
  type RoomNode,
} from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../model/map/teleporterLinks";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { keys } from "../../utils/entries";
import { naturalCompare } from "../../utils/naturalCompare";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { selectCursorRoom } from "../slice/levelEditorSelectors";

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
          mapBounds: findMapBounds(roomNodes),
          gridPositions,
          notableItemsByCell: computeNotableItemsByCell(
            gridPositions,
            campaign,
            noPickupsCollected,
          ),
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

/** the editor's map, with the given room as the current one */
export const editorMapData = (
  campaign: EditorCampaign,
  mapAreas: EditorMapAreas | MapDataError,
  roomId: EditorRoomId,
  subRoomId: string,
): MapData<EditorRoomId> | MapDataError =>
  mapAreas.isError ? mapAreas : (
    {
      ...mapAreas,
      curRoomId: roomId,
      curSubRoomId: subRoomId,
      // TODO: not sure if this applies for the editor, maybe should be optional
      currentCharacterName: "head",
      pickupsCollected: noPickupsCollected,
      characterRooms: emptyObject as CharacterRooms<EditorRoomId>,
      campaign,
      roomsExplored: emptyObject as Record<EditorRoomId, true>,
      curRoomScenery: campaign.rooms[roomId].planet,
    }
  );

const selectCampaignInProgress = (state: EditorRootState) =>
  state.levelEditor.campaignInProgress;

const selectEditorMapAreas = createSelector(
  [selectCampaignInProgress],
  editorMapAreas,
);

export const selectEditorMapData = createSelector(
  [
    selectCampaignInProgress,
    selectEditorMapAreas,
    (state: EditorRootState) => selectCursorRoom(state.levelEditor),
  ],
  (campaign, mapAreas, { roomId, subRoomId }) =>
    editorMapData(campaign, mapAreas, roomId, subRoomId),
);

export const useEditorMapData = (): MapData<EditorRoomId> | MapDataError =>
  useEditorAppSelector(selectEditorMapData);
