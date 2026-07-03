import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useRef } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type EditorRoomJson, type EditorRoomState } from "../editorTypes";

type EditorRoomStateRefs = {
  /** the current room state, in the same in-play format used during gameplay */
  loadedRoomStateRef: { current: EditorRoomState | undefined };
  /** the last json room state that @see {loadedRoomStateRef} matches */
  prevRoomJsonWithPreviewsRef: { current: EditorRoomJson | undefined };
};

const EditorRoomStateContext = createContext<EditorRoomStateRefs>(
  null as unknown as EditorRoomStateRefs,
);

export const EditorRoomStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const roomStateRef = useRef<EditorRoomState | undefined>(undefined);
  const prevRoomJsonRef = useRef<EditorRoomJson | undefined>(undefined);

  return (
    <EditorRoomStateContext.Provider
      value={{
        loadedRoomStateRef: roomStateRef,
        prevRoomJsonWithPreviewsRef: prevRoomJsonRef,
      }}
    >
      {children}
    </EditorRoomStateContext.Provider>
  );
};

export const useEditorRoomStateRefs = () => {
  const refs = useContext(EditorRoomStateContext);
  if (refs === null) {
    throw new Error(
      "useEditorRoomStateRefs must be used inside EditorRoomStateProvider",
    );
  }
  return refs;
};
