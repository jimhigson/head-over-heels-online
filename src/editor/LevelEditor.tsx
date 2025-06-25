import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";
import { PixiApplicationProvider } from "./RoomEditingArea/PixiApplicationProvider";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CssVariables } from "../game/components/CssVariables";
import { LazyJsonRoomEditor } from "./JsonRoomEditor/JsonRoomEditor.lazy";
import { Suspense } from "react";

const LevelEditor = () => {
  usePageAsAnApp();

  const loadingFallback = (
    <div className="flex h-full items-center justify-center bg-pureBlack">
      <span className="sprite texture-animated-head.walking.right" />
    </div>
  );
  return (
    // <ErrorBoundary>
    <>
      <CssVariables>
        <PanelGroup direction="horizontal" className="w-full h-full">
          <Panel id="jsonEditor" defaultSize={18} minSize={12} collapsible>
            <Suspense fallback={loadingFallback}>
              <LazyJsonRoomEditor />
            </Suspense>
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
      </CssVariables>
    </>
    // </ErrorBoundary>
  );
};

export default LevelEditor;
