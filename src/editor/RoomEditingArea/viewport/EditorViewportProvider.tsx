import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { EditorViewport } from "./EditorViewport";

const EditorViewportContext = createContext<EditorViewport | null>(null);

/**
 * creates the {@link EditorViewport} and mounts its container on the pixi
 * stage. Must be rendered inside a {@link PixiApplicationProvider}.
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
