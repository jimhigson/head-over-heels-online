import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { EditorRoomState } from "./EditorRoomId";
import type { RootStateWithLevelEditorSlice } from "./slice/levelEditorSlice";
import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "./slice/levelEditorSlice";
import { emptyObject } from "../utils/empty";
import { loadRoom } from "../game/gameState/loadRoom/loadRoom";
import type { EmptyObject } from "type-fest";
import { store } from "../store/store";

const EditorRoomStateContext = createContext<EditorRoomState | null>(null);

export const EditorProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const [providerStateRoomState, setProviderStateRoomState] =
    useState<EditorRoomState | null>(() => {
      return loadRoom({
        roomJson: selectCurrentEditingRoomJson(
          store.getState() as RootStateWithLevelEditorSlice,
        ),
        roomPickupsCollected: emptyObject,
        scrollsRead: emptyObject,
        // display heads and heels in their starting rooms:
        isNewGame: true,
      });
    });

  const currentRoomJson = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomJson,
  );

  useEffect(() => {
    const roomState = loadRoom({
      roomJson: currentRoomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
    });

    // (roomState as any).i = loadCount++;
    // console.log("currentRoomJson updated. Reloading room state", i);
    setProviderStateRoomState(roomState);
  }, [currentRoomJson]);

  return (
    <EditorRoomStateContext value={providerStateRoomState}>
      {children}
    </EditorRoomStateContext>
  );
};

export const useEditorRoomState = () => {
  const value = useContext(EditorRoomStateContext);
  if (value === null) {
    throw new Error("no room state in context, or no context");
  }
  return value;
};
