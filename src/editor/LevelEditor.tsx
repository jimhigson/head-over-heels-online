import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";
import { PixiApplicationProvider } from "./RoomEditingArea/PixiApplicationProvider";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { useUpdateUpscaleWhenWindowResizes } from "../store/storeFlow/useUpateUpscaleWhenWIndowResizes";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./levelEditor.css";
import { JsonRoomEditor } from "./JsonRoomEditor/JsonRoomEditor";

const LevelEditor = () => {
  usePageAsAnApp();
  useUpdateUpscaleWhenWindowResizes();

  return (
    // <ErrorBoundary>
    <>
      <title>Hoh Editor</title>

      <PanelGroup direction="horizontal" className="w-full h-full">
        <Panel id="jsonEditor" defaultSize={18} minSize={12} collapsible>
          <JsonRoomEditor />
        </Panel>
        <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-r-[calc(1px*var(--scale))] border-metallicBlue" />
        <Panel id="editingArea">
          <PixiApplicationProvider>
            <EditorRoomStateProvider>
              <RoomEditingArea />
            </EditorRoomStateProvider>
          </PixiApplicationProvider>
        </Panel>
        <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-l-[calc(1px*var(--scale))] border-metallicBlue" />
        <Panel id="toolbar" defaultSize={20} maxSize={33} minSize={10}>
          <LevelEditorToolbar />
        </Panel>
      </PanelGroup>
    </>
    // </ErrorBoundary>
  );
};

export default LevelEditor;
