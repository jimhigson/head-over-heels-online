import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";
import { PixiApplicationProvider } from "./RoomEditingArea/PixiApplicationProvider";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { useUpdateUpscaleWhenWindowResizes } from "../store/storeFlow/useUpateUpscaleWhenWIndowResizes";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./levelEditor.css";

const LevelEditor = () => {
  usePageAsAnApp();
  useUpdateUpscaleWhenWindowResizes();

  return (
    // <ErrorBoundary>
    <>
      <title>Hoh Editor</title>

      <PanelGroup direction="horizontal" className="w-full h-full">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel id="editingArea">
              <PixiApplicationProvider>
                <EditorRoomStateProvider>
                  <RoomEditingArea />
                </EditorRoomStateProvider>
              </PixiApplicationProvider>
            </Panel>
            <PanelResizeHandle className="scale-editor h-1 bg-metallicBlueHalfbrite hover:border-moss hover:bg-moss border-t-[calc(1px*var(--scale))] border-metallicBlue" />
            <Panel
              defaultSize={25}
              minSize={10}
              id="jsonEditor"
              className="text-white"
              collapsible
            >
              json editor here
            </Panel>
          </PanelGroup>
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
