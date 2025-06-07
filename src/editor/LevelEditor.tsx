import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";
import { PixiApplicationProvider } from "./RoomEditingArea/PixiApplicationProvider";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { CssVariables } from "../game/components/CssVariables";
import { useUpdateUpscaleWhenWindowResizes } from "../store/storeFlow/useUpateUpscaleWhenWIndowResizes";

const LevelEditor = () => {
  usePageAsAnApp();
  useUpdateUpscaleWhenWindowResizes();

  return (
    // <ErrorBoundary>
    <>
      <title>Hoh Editor</title>
      <PixiApplicationProvider>
        <EditorRoomStateProvider>
          <RoomEditingArea />
        </EditorRoomStateProvider>
      </PixiApplicationProvider>
      <CssVariables scaleFactor={2}>
        <LevelEditorToolbar />
      </CssVariables>
    </>
    // </ErrorBoundary>
  );
};

export default LevelEditor;
