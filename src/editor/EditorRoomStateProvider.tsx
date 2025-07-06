import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { EditorRoomState } from "./editorTypes";
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

const useLoadRoomStateForCurrentRoomJson = () => {
  const [roomState, setRoomState] = useState<EditorRoomState>(() => {
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
    const newRoomState = loadRoom({
      roomJson: currentRoomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
    });

    // (roomState as any).i = loadCount++;
    // console.log("currentRoomJson updated. Reloading room state", i);
    setRoomState(newRoomState);
  }, [currentRoomJson]);

  return roomState;
};

export const EditorRoomStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const providerStateRoomState = useLoadRoomStateForCurrentRoomJson();

  return (
    <EditorRoomStateContext value={providerStateRoomState}>
      {children}
    </EditorRoomStateContext>
  );
};

export const useEditorRoomState = (): EditorRoomState => {
  const value = useContext(EditorRoomStateContext);
  if (value === null) {
    throw new Error("no room state in context, or no context");
  }
  return value;
};
