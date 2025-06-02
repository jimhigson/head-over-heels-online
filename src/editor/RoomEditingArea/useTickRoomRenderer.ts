import { objectValues } from "iter-tools";
import { Ticker } from "pixi.js";
import { useEffect } from "react";
import type { MovedItems } from "../../game/mainLoop/progressGameState";
import { epsilon } from "../../utils/veryClose";
import type {
  EditorRoomRenderer,
  EditorRoomId,
  EditorRoomItemId,
  EditorUnionOfAllItemInPlayTypes,
} from "../EditorRoomId";
import { useEditorRoomState } from "../EditorRoomStateProvider";

export const useTickRoomRenderer = (roomRenderer: EditorRoomRenderer) => {
  const currentEditingRoomState = useEditorRoomState();

  useEffect(
    () => {
      const tick = () => {
        if (roomRenderer.destroyed) {
          return;
        }

        if (roomRenderer.renderContext.room !== currentEditingRoomState) {
          console.warn("room renderer does not have the current room");
        }

        const considerAllItemsHaveMoved: MovedItems<
          EditorRoomId,
          EditorRoomItemId
        > = new Set(
          objectValues(
            currentEditingRoomState.items,
          ) as Iterable<EditorUnionOfAllItemInPlayTypes>,
        );

        roomRenderer.tick({
          deltaMS: epsilon,
          // TODO: probably needs this to be the real set of moved items, like a 'proper' main loop,
          // or this might be fast enough given the level editor doesn't need to run as smoothly
          // as the actual game
          movedItems: considerAllItemsHaveMoved,
          progression: 0,
        });
      };

      Ticker.shared.add(tick);
      return () => {
        Ticker.shared.remove(tick);
      };
    },
    // here are the things that, if they change, a tick happens. This is the
    // 'main loop' of the editor
    [roomRenderer, currentEditingRoomState],
  );
};
