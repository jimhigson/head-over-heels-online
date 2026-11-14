import { useMemo } from "preact/hooks";

import {
  type MapCellKey,
  type MapContextValue,
  noCellPlayables,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import {
  type PostfixRoomDecoratorComponent,
  type PrefixRoomDecoratorComponent,
  type RoomBehaviourComponent,
} from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { originalUserId } from "../../gameInfo";
import { useEditorAppSelector } from "../../store/store";
import { type EditorRoomId } from "../editorTypes";
import { selectEditorNotableItemsByCell } from "./useEditorMapData";

// each follows just the one room (or cell) it is asked about, so an edit to a
// room redraws only that room on the map:

const useEditorRoomJson = (roomId: EditorRoomId) =>
  useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.rooms[roomId],
  );

const useEditorNotableItemsInCell = (cellKey: MapCellKey<EditorRoomId>) =>
  useEditorAppSelector(
    (state) => selectEditorNotableItemsByCell(state)[cellKey],
  );

const useEditorNotableItemsByCell = () =>
  useEditorAppSelector(selectEditorNotableItemsByCell);

const useEditorRoomIsSelected = (roomId: EditorRoomId) =>
  useEditorAppSelector((state) =>
    state.levelEditor.selectedRoomIds.includes(roomId),
  );

export type EditorMapContextOptions = {
  behaviours: RoomBehaviourComponent<EditorRoomId>[];
  prefixDecorators: PrefixRoomDecoratorComponent<EditorRoomId>[];
  postfixDecorators: PostfixRoomDecoratorComponent<EditorRoomId>[];
};

/**
 * the context for a map of the campaign being edited, following the store
 */
export const useEditorMapContextValue = ({
  behaviours,
  prefixDecorators,
  postfixDecorators,
}: EditorMapContextOptions): MapContextValue<EditorRoomId> => {
  const isOriginalCampaign = useEditorAppSelector(
    (state) =>
      state.levelEditor.campaignInProgress.locator.userId === originalUserId,
  );

  return useMemo(
    () => ({
      isOriginalCampaign,
      // the editor has no character being played:
      currentCharacterName: "head",
      onPlayableClick: undefined,
      behaviours,
      prefixDecorators,
      postfixDecorators,
      useRoomJson: useEditorRoomJson,
      useNotableItemsInCell: useEditorNotableItemsInCell,
      useNotableItemsByCell: useEditorNotableItemsByCell,
      useCellPlayables: () => noCellPlayables,
      useRoomVisited: () => false,
      useIsRoomSelected: useEditorRoomIsSelected,
    }),
    [isOriginalCampaign, behaviours, prefixDecorators, postfixDecorators],
  );
};
