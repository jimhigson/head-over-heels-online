import { createSelector } from "@reduxjs/toolkit";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import {
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { computeNotableItemsByCell } from "../../game/components/dialogs/menuDialog/dialogs/map/notableItemsByCell";
import { roomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { sortRoomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../game/components/dialogs/menuDialog/dialogs/map/teleporterLinks";
import {
  type CharacterRooms,
  type PickupsCollected,
} from "../../game/gameState/GameState";
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
      const teleporterLinks: TeleporterLink<EditorRoomId>[] = [];
      const positions = [
        ...roomGridPositions({
          campaign,
          roomId,
          subRoomId,
          teleporterLinksOut: teleporterLinks,
        }),
      ];
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
