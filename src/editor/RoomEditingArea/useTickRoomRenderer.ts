import { objectValues } from "iter-tools-es";
import { Ticker } from "pixi.js";
import { useEffect } from "react";

import type { MovedItems } from "../../game/mainLoop/progressGameState";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomRenderer,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";

import { useEditorRoomStateWithPreviews } from "../slice/levelEditorSelectors";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const useTickRoomRenderer = (roomRenderer: EditorRoomRenderer) => {
  const currentEditingRoomState = useEditorRoomStateWithPreviews();
  const pixiApp = useProvidedPixiApplication();

  useEffect(
    () => {
      const tick = ({ deltaMS }: Ticker) => {
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

        // some animations (ie, cyberman bob) depend on the roomTime
        // incrementing between frames
        currentEditingRoomState.roomTime += deltaMS;

        roomRenderer.tick({
          deltaMS,
          // TODO: probably needs this to be the real set of moved items, like a 'proper' main loop,
          // or this might be fast enough given the level editor doesn't need to run as smoothly
          // as the actual game
          movedItems: considerAllItemsHaveMoved,
        });
        pixiApp.render();
      };

      Ticker.shared.add(tick);
      return () => {
        Ticker.shared.remove(tick);
      };
    },
    // here are the things that, if they change, a tick happens. This is the
    // 'main loop' of the editor
    [roomRenderer, currentEditingRoomState, pixiApp],
  );
};
