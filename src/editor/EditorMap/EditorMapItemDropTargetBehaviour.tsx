import { useEffect } from "preact/hooks";

import { type RoomBehaviourProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { twClass } from "../../utils/twClass" with { type: "macro" };
import { type EditorRoomId } from "../editorTypes";

/** tints a room while items dragged over it can (or can't) be dropped there */
const dropHighlightClasses = twClass([
  "data-[item-drop=allowed]:fill-zxGreen",
  "data-[item-drop=blocked]:fill-midRed",
  "data-[item-drop]:[fill-opacity:0.5]",
]);

/**
 * marks a room's area on the map as somewhere items dragged out of the room
 * editing pane can be dropped, for {@link useDropItemsOnMap} to find
 */
export const EditorMapItemDropTargetBehaviour = ({
  roomId,
  subRoomId,
  interactiveAreaRef,
}: RoomBehaviourProps<EditorRoomId>) => {
  useEffect(() => {
    const el = interactiveAreaRef.current;
    if (!el) {
      return;
    }
    el.dataset.itemDropRoomId = roomId;
    el.dataset.itemDropSubRoomId = subRoomId;
    el.classList.add(...dropHighlightClasses);
    return () => {
      delete el.dataset.itemDropRoomId;
      delete el.dataset.itemDropSubRoomId;
      delete el.dataset.itemDrop;
      el.classList.remove(...dropHighlightClasses);
    };
  }, [interactiveAreaRef, roomId, subRoomId]);

  return null;
};
