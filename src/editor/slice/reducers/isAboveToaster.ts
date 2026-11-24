import { getJsonItemTimes } from "../../../model/times";
import { valuesIter } from "../../../utils/entries";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomJsonItems } from "../../editorTypes";
import type { PreviewedRoomItemEdits } from "../levelEditorSlice";

/**
 * whether a toaster, of any size, is directly beneath this position
 */
export const isAboveToaster = (
  /**
   * in blocks
   */
  position: Xyz,
  items: EditorRoomJsonItems | PreviewedRoomItemEdits,
): boolean =>
  valuesIter(items).some((item) => {
    if (
      item === null ||
      item.type !== "deadlyBlock" ||
      item.config.style !== "toaster"
    ) {
      return false;
    }

    const times = getJsonItemTimes(item);
    return (
      item.position.z + times.z === position.z &&
      position.x >= item.position.x &&
      position.x < item.position.x + times.x &&
      position.y >= item.position.y &&
      position.y < item.position.y + times.y
    );
  });
