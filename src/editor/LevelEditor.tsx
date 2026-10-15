import { Suspense } from "preact/compat";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { CssVariables } from "../game/components/CssVariables";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { SpinnerHead, SpinnerHeels } from "../ui/Spinner";
import { useCommandShortcuts } from "./commands/useCommandShortcuts";
import { SaveAndLoadDialogs } from "./editorDialogs/SaveAndLoadDialogs";
import { EditorErrorBoundary } from "./EditorErrorBoundary";
import { EditorMapWithErrorBoundary } from "./EditorMap/EditorMap";
import { LazyJsonRoomEditor } from "./JsonRoomEditor/JsonRoomEditor.lazy";
import { EditorMenuBar } from "./menuBar/EditorMenuBar";
import { LazyRoomEditingArea } from "./RoomEditingArea/RoomEditingArea.lazy";
import { LevelEditorToolbar } from "./toolbar/LevelEditorToolbar";

const LevelEditor = () => {
  usePageAsAnApp();
  useCommandShortcuts();

  return (
    <EditorErrorBoundary asDialog>
      <CssVariables>
        <SaveAndLoadDialogs />
        <div class="flex flex-col w-full h-full">
          <EditorMenuBar />
          <PanelGroup direction="horizontal" className="w-full flex-1 min-h-0">
            <Panel id="jsonEditor" defaultSize={18} minSize={12} collapsible>
              <Suspense fallback={<SpinnerHead loadingBorder />}>
                <LazyJsonRoomEditor />
              </Suspense>
            </Panel>
            <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-r-[calc(1px*var(--scale))] border-metallicBlue" />
            <Panel id="centre">
              <PanelGroup direction="vertical">
                <Panel id="map" collapsible minSize={10} defaultSize={25}>
                  <EditorMapWithErrorBoundary />
                </Panel>
                <PanelResizeHandle className="scale-editor h-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-b-[calc(1px*var(--scale))] border-metallicBlue" />
                <Panel id="editingArea">
                  <Suspense fallback={<SpinnerHeels loadingBorder />}>
                    <LazyRoomEditingArea />
                  </Suspense>
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-l-[calc(1px*var(--scale))] border-metallicBlue" />
            <Panel
              id="toolbar"
              defaultSize={20}
              maxSize={33}
              minSize={10}
              collapsible
            >
              <LevelEditorToolbar />
            </Panel>
          </PanelGroup>
        </div>
      </CssVariables>
    </EditorErrorBoundary>
  );
};

export default LevelEditor;
