import { valuesIter } from "../../utils/entries";
import type { EditorJsonItemUnion } from "../editorTypes";
import type { PendingEdits } from "./levelEditorSlice";

/**
 * every item previewed by pending edits, in whichever room - but not those
 * whose 'preview' is removing them (ie, not nulls)
 */
export const previewedItemsIter = (
  pendingEdits: PendingEdits,
): IteratorObject<EditorJsonItemUnion> =>
  valuesIter(pendingEdits.edits)
    .flatMap((roomEdits) =>
      roomEdits === undefined ? [] : valuesIter(roomEdits),
    )
    .filter((item): item is EditorJsonItemUnion => item !== null);
