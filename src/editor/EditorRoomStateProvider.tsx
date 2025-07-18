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
import { selectCurrentEditingRoomJsonWithPreviews } from "./slice/levelEditorSelectors";

type EditorRoomStateContextValue = {
  roomState: EditorRoomState;
  roomStateWithPreviews: EditorRoomState;
};

const EditorRoomStateContext =
  createContext<EditorRoomStateContextValue | null>(null);

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
  const [roomStateWithPreviews, setRoomStateWithPreviews] =
    useState<EditorRoomState>(roomState);

  const currentRoomJson = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomJson,
  );
  const currentRoomJsonWithPreviews = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomJsonWithPreviews,
  );

  useEffect(() => {
    const newRoomState = loadRoom({
      roomJson: currentRoomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
    });

    setRoomState(newRoomState);

    if (currentRoomJson === currentRoomJsonWithPreviews) {
      // no previews currently
      setRoomStateWithPreviews(newRoomState);
    } else {
      const withPreviews = loadRoom({
        roomJson: currentRoomJsonWithPreviews,
        roomPickupsCollected: emptyObject,
        scrollsRead: emptyObject,
        // display heads and heels in their starting rooms:
        isNewGame: true,
      });

      // have previews - load a second room state for rendering in the editor pane:
      setRoomStateWithPreviews(withPreviews);
    }
  }, [currentRoomJson, currentRoomJsonWithPreviews]);

  return { roomState, roomStateWithPreviews };
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
  return value.roomState;
};

export const useEditorRoomStateWithPreviews = (): EditorRoomState => {
  const value = useContext(EditorRoomStateContext);
  if (value === null) {
    throw new Error("no room state in context, or no context");
  }
  return value.roomStateWithPreviews;
};
