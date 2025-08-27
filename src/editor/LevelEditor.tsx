import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { Suspense } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { CssVariables } from "../game/components/CssVariables";
import { usePageAsAnApp } from "../pages/gamePage/usePageAsAnApp";
import { SpinnerHead, SpinnerHeels } from "../ui/Spinner";
import { EditorMap } from "./EditorMap/EditorMap";
import { LazyJsonRoomEditor } from "./JsonRoomEditor/JsonRoomEditor.lazy";
import { LazyRoomEditingArea } from "./RoomEditingArea/RoomEditingArea.lazy";
import { LevelEditorToolbar } from "./tools/LevelEditorToolbar";

const LevelEditor = () => {
  usePageAsAnApp();

  return (
    // <ErrorBoundary>
    <>
      <CssVariables>
        <TooltipProvider>
          <PanelGroup direction="horizontal" className="w-full h-full">
            <Panel id="jsonEditor" defaultSize={18} minSize={12} collapsible>
              <Suspense fallback={<SpinnerHead />}>
                <LazyJsonRoomEditor />
              </Suspense>
            </Panel>
            <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-r-[calc(1px*var(--scale))] border-metallicBlue" />
            <Panel id="centre">
              <PanelGroup direction="vertical">
                <Panel id="map" collapsible minSize={10} defaultSize={25}>
                  <EditorMap />
                </Panel>
                <PanelResizeHandle className="scale-editor h-1 bg-metallicBlueHalfbrite  hover:border-moss hover:bg-moss border-b-[calc(1px*var(--scale))] border-metallicBlue" />
                <Panel id="editingArea">
                  <Suspense fallback={<SpinnerHeels />}>
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
        </TooltipProvider>
      </CssVariables>
    </>
    // </ErrorBoundary>
  );
};

export default LevelEditor;
