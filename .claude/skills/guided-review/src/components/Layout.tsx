import { type ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { type ReadingState } from "../readingState.ts";
import { Sidebar } from "./Sidebar.tsx";

/** narrow enough that the contents overlays the reading rather than sitting
    beside it - so it starts closed, and closes again once it has been used */
export const contentsWouldOverlay = (): boolean =>
  window.matchMedia("(max-width: 60rem)").matches;

/** the same threshold as a value the render can follow, so the markup and the
    stylesheet change over together */
export const useContentsOverlays = (): boolean => {
  const [overlays, setOverlays] = useState(contentsWouldOverlay);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 60rem)");
    const follow = () => setOverlays(query.matches);
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);
  return overlays;
};

/* the split leaves the page's own scrolling alone: the group is as tall as its
   content rather than as the viewport, and neither pane clips, so the contents
   goes on sticking to the document and the reading order goes on scrolling the
   window */
const panelGroupStyle = { height: "auto", overflow: "visible", alignItems: "stretch" };
const paneStyle = { overflow: "visible", minWidth: 0 };

export type LayoutProps = {
  state: ReadingState;
  overlays: boolean;
  children: ComponentChildren;
};

/**
 * contents and reading order, divided by a handle the reader can drag.
 *
 * The width persists under `autoSaveId`, per reader rather than per review -
 * how wide you like the contents is not worth re-deciding every time. Panel,
 * PanelGroup and PanelResizeHandle take `className`, not `class`: they are
 * react components reached through preact/compat, and only `className` is
 * applied to the dom.
 */
export const Layout = ({ state, overlays, children }: LayoutProps) => {
  // overlaid, the contents is out of the flow altogether and there is nothing
  // to divide; closed, there is only one pane
  if (overlays || !state.showContents) {
    return (
      <div class="layout">
        {state.showContents && <Sidebar state={state} />}
        {children}
      </div>
    );
  }

  return (
    <PanelGroup
      className="layout"
      direction="horizontal"
      autoSaveId="guidedReviewContents"
      style={panelGroupStyle}
    >
      <Panel order={1} defaultSize={21} minSize={11} maxSize={45} style={paneStyle}>
        <Sidebar state={state} />
      </Panel>
      <PanelResizeHandle className="split" aria-label="Resize the contents" />
      <Panel order={2} style={paneStyle}>
        {children}
      </Panel>
    </PanelGroup>
  );
};
