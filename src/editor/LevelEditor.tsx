import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";
import { PixiApplicationProvider } from "./RoomEditingArea/PixiApplicationProvider";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { useUpdateUpscaleWhenWindowResizes } from "../store/storeFlow/useUpateUpscaleWhenWIndowResizes";

const LevelEditor = () => {
  usePageAsAnApp();
  useUpdateUpscaleWhenWindowResizes();

  return (
    // <ErrorBoundary>
    <div>
      <title>Hoh Editor</title>
      <PixiApplicationProvider>
        <EditorRoomStateProvider>
          <RoomEditingArea />
        </EditorRoomStateProvider>
      </PixiApplicationProvider>
      <LevelEditorToolbar />
    </div>
    // </ErrorBoundary>
  );
};

export default LevelEditor;
