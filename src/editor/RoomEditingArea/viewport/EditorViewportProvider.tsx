import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { editorStore } from "../../../store/store";
import { type EditorRoomView } from "../../slice/EditorRoomView";
import { selectCursorRoomView } from "../../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { EditorViewport } from "./EditorViewport";

const EditorViewportContext = createContext<EditorViewport | null>(null);

/**
 * creates the {@link EditorViewport}, mounts its container on the pixi stage,
 * and keeps it showing the cursor room's view. Must be rendered inside a
 * {@link PixiApplicationProvider}.
 */
export const EditorViewportProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const application = useProvidedPixiApplication();
  const [viewport] = useState(() => new EditorViewport());

  useEffect(() => {
    application.stage.addChild(viewport.container);
    return () => {
      application.stage.removeChild(viewport.container);
    };
  }, [application, viewport]);

  useEffect(() => {
    let shownView: EditorRoomView | undefined;
    const showCursorRoomView = () => {
      const cursorRoomView = selectCursorRoomView(editorStore.getState());
      // a tab with no view yet keeps showing the last until it is fitted:
      if (cursorRoomView !== undefined && cursorRoomView !== shownView) {
        shownView = cursorRoomView;
        viewport.show(cursorRoomView);
      }
    };
    showCursorRoomView();
    return editorStore.subscribe(showCursorRoomView);
  }, [viewport]);

  return (
    <EditorViewportContext value={viewport}>{children}</EditorViewportContext>
  );
};

export const useEditorViewport = (): EditorViewport => {
  const viewport = useContext(EditorViewportContext);
  if (viewport === null) {
    throw new Error(
      "useEditorViewport must be used inside an EditorViewportProvider",
    );
  }
  return viewport;
};
