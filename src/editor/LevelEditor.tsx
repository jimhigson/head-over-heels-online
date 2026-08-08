import { Suspense } from "preact/compat";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { CssVariables } from "../game/components/CssVariables";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { SpinnerHead, SpinnerHeels } from "../ui/Spinner";
import { SaveAndLoadDialogs } from "./editorDialogs/SaveAndLoadDialogs";
import { EditorErrorBoundary } from "./EditorErrorBoundary";
import { EditorMapWithErrorBoundary } from "./EditorMap/EditorMap";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { LazyJsonRoomEditor } from "./JsonRoomEditor/JsonRoomEditor.lazy";
import { LazyRoomEditingArea } from "./RoomEditingArea/RoomEditingArea.lazy";
import { LevelEditorToolbar } from "./toolbar/LevelEditorToolbar";

const LevelEditor = () => {
  usePageAsAnApp();

  return (
    <EditorErrorBoundary asDialog>
      <CssVariables>
        <SaveAndLoadDialogs />
        {/* the editing area and the toolbar both work on the loaded room, and
            must work on the same one, so it is owned above both of them: */}
        <EditorRoomStateProvider>
          <PanelGroup direction="horizontal" className="w-full h-full">
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
            <Panel id="toolbar" defaultSize={20} maxSize={33} minSize={10}>
              <LevelEditorToolbar />
            </Panel>
          </PanelGroup>
        </EditorRoomStateProvider>
      </CssVariables>
    </EditorErrorBoundary>
  );
};

export default LevelEditor;
