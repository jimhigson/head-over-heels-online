import { createSelector } from "@reduxjs/toolkit";
import nanoEqual from "nano-equal";
import { useMemo } from "preact/hooks";

import {
  type MapContextValue,
  noCellPlayables,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import {
  type PostfixRoomDecoratorComponent,
  type PrefixRoomDecoratorComponent,
  type RoomBehaviourComponent,
} from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { selectNotableItems } from "../../game/components/dialogs/menuDialog/dialogs/map/selectNotableItems";
import { originalUserId } from "../../gameInfo";
import { teleporterLinksFromCell } from "../../model/map/teleporterLinksFromCell";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { type EditorRoomId } from "../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomFromLevelEditorState,
} from "../slice/levelEditorSelectors";
import { selectEditorShownMapArea } from "./useEditorMapData";

// the map is only drawn when its geometry could be solved, so the error case
// has nothing to draw:

const useEditorShownMapArea = () => {
  const maybeShownArea = useEditorAppSelector(selectEditorShownMapArea);
  if (import.meta.env.DEV && maybeShownArea === undefined) {
    throw new Error("the map was drawn without its geometry solved");
  }
  return maybeShownArea!;
};

const selectEditorTeleporterLinksFrom = createSelector(
  [
    (state: EditorRootState) => state.levelEditor.campaignInProgress,
    (_state: EditorRootState, roomId: EditorRoomId) => roomId,
    (_state: EditorRootState, _roomId: EditorRoomId, subRoomId: string) =>
      subRoomId,
  ],
  teleporterLinksFromCell,
);

const useEditorTeleporterLinksFrom = (
  roomId: EditorRoomId,
  subRoomId: string,
) =>
  useEditorAppSelector(
    (state) => selectEditorTeleporterLinksFrom(state, roomId, subRoomId),
    // recomputed for any edit to the campaign, but only a change to the links
    // redraws the cell:
    nanoEqual,
  );

const useEditorCursorRoomId = () =>
  useEditorAppSelector(
    (state) => selectCursorRoomFromLevelEditorState(state.levelEditor).roomId,
  );

const useEditorCursorSubRoomId = () =>
  useEditorAppSelector(
    (state) =>
      selectCursorRoomFromLevelEditorState(state.levelEditor).subRoomId,
  );

const useEditorCursorRoomScenery = () =>
  useEditorAppSelector(
    (state) =>
      selectCurrentCommittedRoomJsonFromLevelEditorState(state.levelEditor)
        .planet,
  );

// each follows just the one room (or cell) it is asked about, so an edit to a
// room redraws only that room on the map:

const useEditorRoomJson = (roomId: EditorRoomId) =>
  useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.rooms[roomId],
  );

const useEditorNotableItems = (roomId: EditorRoomId, subRoomId: string) => {
  const editorRoomJson = useEditorRoomJson(roomId);
  // the editor collects no pickups:
  return useMemo(
    () => selectNotableItems(editorRoomJson, emptyObject, subRoomId),
    [editorRoomJson, subRoomId],
  );
};

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
      useShownArea: useEditorShownMapArea,
      useCurRoomId: useEditorCursorRoomId,
      useCurSubRoomId: useEditorCursorSubRoomId,
      useCurRoomScenery: useEditorCursorRoomScenery,
      useTeleporterLinksFrom: useEditorTeleporterLinksFrom,
      useRoomJson: useEditorRoomJson,
      useNotableItems: useEditorNotableItems,
      useCellPlayables: () => noCellPlayables,
      useRoomVisited: () => false,
      useIsRoomSelected: useEditorRoomIsSelected,
    }),
    [isOriginalCampaign, behaviours, prefixDecorators, postfixDecorators],
  );
};
