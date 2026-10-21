import { current } from "@reduxjs/toolkit";
import { castDraft } from "immer";
import nanoEqual from "nano-equal";

import { keys, keysIter } from "../../../utils/entries";
import {
  addXyz,
  originXyz,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomJsonItems,
} from "../../editorTypes";
import { itemsWithEdits } from "../itemsWithEdits";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import {
  type LevelEditorState,
  type NudgeKind,
  type PreviewedRoomItemEdits,
} from "../levelEditorSlice";
import { moveVerb, type UndoItemEntry } from "../reducers/undoDescription";
import { commitPendingNudgeInPlace } from "./commitPendingNudgeInPlace";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "./setSelectedJsonItemIdsOnCursorRoomInPlace";

/**
 * what one nudge does to the room as previewed - or undefined if it can't be
 * done there
 */
export type NudgeStep =
  | {
      edits: PreviewedRoomItemEdits;
      /**
       * the selection after the nudge, if it changes it
       */
      selectedJsonItemIds?: EditorRoomItemId[];
    }
  | undefined;

/**
 * the edits that turn `from` into `to`
 */
const editsBetween = (
  from: EditorRoomJsonItems,
  to: EditorRoomJsonItems,
): PreviewedRoomItemEdits => {
  const edits: PreviewedRoomItemEdits = {};
  for (const id of new Set([...keysIter(from), ...keysIter(to)])) {
    const toItem = to[id];
    if (!nanoEqual(from[id], toItem)) {
      edits[id] = toItem ?? null;
    }
  }
  return edits;
};

const nudgeVerb = (kind: NudgeKind, positionDelta: Xyz): string =>
  kind === "multiply" ? "Multiply"
  : kind === "shrink" ? "Shrink"
  : xyzEqual(positionDelta, originXyz) ? "Move"
  : moveVerb(positionDelta);

/**
 * add one nudge to the nudges being previewed, so a held key builds a single
 * edit rather than one per repeat. The nudge is made to the room as it is
 * previewed - just as if each nudge before it had been committed - and the
 * preview holds everything since the room was committed. Nudges of any other
 * kind still being previewed are committed first
 */
export const addNudgeStepToPreviewInPlace = (
  state: LevelEditorState,
  kind: NudgeKind,
  {
    positionDelta: stepPositionDelta,
    timestamp,
  }: {
    /**
     * how far this nudge moves the selection, for the edit's description
     */
    positionDelta: Xyz;
    timestamp: number;
  },
  /**
   * the nudge, made to the state with the room as previewed
   */
  nudgeStep: (previewState: LevelEditorState) => NudgeStep,
) => {
  commitPendingNudgeInPlace(state, kind);

  const stateNow = current(castDraft(state));
  const committedRoom =
    selectCurrentCommittedRoomJsonFromLevelEditorState(stateNow);
  const pendingNudge =
    stateNow.pendingEdits?.origin.type === "nudge" ?
      stateNow.pendingEdits
    : undefined;
  const previewRoom =
    pendingNudge === undefined ? committedRoom : (
      {
        ...committedRoom,
        items: itemsWithEdits(committedRoom.items, pendingNudge.edits),
      }
    );
  const previewState: LevelEditorState = {
    ...stateNow,
    campaignInProgress: {
      ...stateNow.campaignInProgress,
      rooms: {
        ...stateNow.campaignInProgress.rooms,
        [selectCursorRoomIdFromLevelEditorState(stateNow)]: previewRoom,
      },
    },
    pendingEdits: undefined,
  };

  const step = nudgeStep(previewState);
  if (step === undefined) {
    return;
  }

  if (step.selectedJsonItemIds !== undefined) {
    setSelectedJsonItemIdsOnCursorRoomInPlace(state, step.selectedJsonItemIds);
  }

  const edits = editsBetween(
    committedRoom.items,
    itemsWithEdits(previewRoom.items, step.edits),
  );
  if (keys(edits).length === 0) {
    // nudged back to where the room was committed:
    state.pendingEdits = undefined;
    return;
  }

  const previousPositionDelta =
    pendingNudge?.origin.type === "nudge" ?
      pendingNudge.origin.positionDelta
    : originXyz;
  const positionDelta = addXyz(previousPositionDelta, stepPositionDelta);
  const items: UndoItemEntry[] =
    pendingNudge?.description.kind === "itemAction" ?
      pendingNudge.description.items
    : selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(stateNow).flatMap(
        (id): UndoItemEntry[] => {
          const item = committedRoom.items[id];
          return item === undefined ? [] : [[id, item]];
        },
      );

  state.pendingEdits = {
    edits,
    description: {
      kind: "itemAction",
      verb: nudgeVerb(kind, positionDelta),
      items,
    },
    timestamp: pendingNudge?.timestamp ?? timestamp,
    origin: { type: "nudge", kind, positionDelta },
  };
};
