import { useRef } from "preact/hooks";
import { createContext, type PropsWithChildren, useContext } from "react";
import { type EmptyObject } from "type-fest";

import { type EditorRoomJson, type EditorRoomState } from "../editorTypes";

type EditorRoomStateRefs = {
  roomStateRef: { current: EditorRoomState | undefined };
  prevRoomJsonRef: { current: EditorRoomJson | undefined };
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
    <EditorRoomStateContext.Provider value={{ roomStateRef, prevRoomJsonRef }}>
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
