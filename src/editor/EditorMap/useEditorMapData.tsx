import { createSelector } from "@reduxjs/toolkit";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import {
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { computeNotableItemsByCell } from "../../game/components/dialogs/menuDialog/dialogs/map/notableItemsByCell";
import {
  type CharacterRooms,
  type PickupsCollected,
} from "../../game/gameState/GameState";
import { roomGridPositions } from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../model/map/teleporterLinks";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type EditorRoomId } from "../editorTypes";
import { selectCursorRoom } from "../slice/levelEditorSelectors";
import { selectCurrentEditingRoomJson } from "../slice/levelEditorSlice";

export const selectEditorMapData = createSelector(
  [
    (state: EditorRootState) => state.levelEditor.campaignInProgress,
    (state: EditorRootState) => selectCursorRoom(state.levelEditor),
    (state: EditorRootState) => selectCurrentEditingRoomJson(state).planet,
  ],
  (
    campaign,
    { roomId, subRoomId },
    curRoomScenery,
  ): MapData<EditorRoomId> | MapDataError => {
    try {
      const graph = roomGridPositions({ campaign, roomId, subRoomId });
      const positions = graph.nodes;

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

      const sortedObjectOfPositions = sortRoomGridPositions(positions);

      return {
        mapBounds: findMapBounds(positions),
        curRoomId: roomId,
        curSubRoomId: subRoomId,
        gridPositions: sortedObjectOfPositions,
        teleporterLinks,
        notableItemsByCell: computeNotableItemsByCell(
          sortedObjectOfPositions,
          campaign,
          emptyObject as PickupsCollected<EditorRoomId>,
        ),
        // TODO: not sure if this applies for the editor, maybe should be optional
        currentCharacterName: "head",
        pickupsCollected: emptyObject as PickupsCollected<EditorRoomId>,
        characterRooms: emptyObject as CharacterRooms<EditorRoomId>,
        campaign,
        roomsExplored: emptyObject as Record<EditorRoomId, true>,
        curRoomScenery,
        isError: false,
      };
    } catch (e) {
      console.error(Error("error getting map data", { cause: e }));
      const errors = createSerialisableErrors(e)
        .map((err) => err.message)
        .reverse();
      return { isError: true, errors };
    }
  },
);

export const useEditorMapData = (): MapData<EditorRoomId> | MapDataError =>
  useEditorAppSelector(selectEditorMapData);
