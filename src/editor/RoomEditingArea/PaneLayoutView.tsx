import nanoEqual from "nano-equal";
import { Fragment } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import {
  type ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import { store, useEditorAppSelector } from "../../store/store";
import {
  paneSplitResized,
  selectPaneLayoutRootId,
} from "../slice/levelEditorSlice";
import {
  findLayoutNode,
  layoutNodesIter,
  type PaneLayoutNode,
  type PaneLayoutNodeId,
  type PaneSplit,
  type SplitDirection,
} from "../slice/PaneLayout";
import { TabGroupArea } from "./TabGroupArea";

/**
 * smallest share of a split a pane can be resized to, in percent
 */
const minPaneSize = 10;

/**
 * the panels library's direction for each split: the way its panels run,
 * across its divider
 */
const panelGroupDirections = {
  "|": "horizontal",
  "-": "vertical",
} as const satisfies Record<SplitDirection, "horizontal" | "vertical">;

const resizeHandleClassNames = {
  "|": "scale-editor w-1 bg-metallicBlueHalfbrite hover:bg-moss",
  "-": "scale-editor h-1 bg-metallicBlueHalfbrite hover:bg-moss",
} as const;

/**
 * a key per child of a split, kept across renders: a child keeps the key of
 * the previous child it is, or contains - so a pane split in two, now inside
 * a new split in its place, keeps its panel (and size), and its siblings
 * aren't laid out again
 */
const useStablePanelKeys = (childIds: PaneLayoutNodeId[]): string[] => {
  // each child's own id, then the ids of the splits and panes inside it:
  const childrenNodeIds = useEditorAppSelector(
    ({ levelEditor: { layout } }) =>
      childIds.map((childId) =>
        layoutNodesIter(layout, childId)
          .filter(
            (node): node is PaneLayoutNode =>
              node.type === "split" || node.type === "tabGroup",
          )
          .map(({ id }) => id)
          .toArray(),
      ),
    nanoEqual,
  );
  const keysByChildIdRef = useRef(new Map<PaneLayoutNodeId, string>());
  const { current: previousKeysByChildId } = keysByChildIdRef;
  const panelKeys = childrenNodeIds.map(
    (childNodeIds) =>
      childNodeIds
        .values()
        .map((id) => previousKeysByChildId.get(id))
        .find((panelKey) => panelKey !== undefined) ?? childNodeIds[0],
  );
  keysByChildIdRef.current = new Map(
    childIds.map((childId, childIndex) => [childId, panelKeys[childIndex]]),
  );
  return panelKeys;
};

export type PaneSplitViewProps = {
  paneSplit: PaneSplit;
};

/**
 * a split's children, resizable. Sizes come from the store: a child added or
 * removed takes its stored size here, rather than the panels re-laying
 * themselves out; dragging a handle is the one way sizes change here
 */
const PaneSplitView = ({
  paneSplit: { id: paneSplitId, direction, children, sizes },
}: PaneSplitViewProps) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const panelKeys = useStablePanelKeys(children);

  useLayoutEffect(() => {
    const { current: panelGroup } = panelGroupRef;
    if (panelGroup !== null && !nanoEqual(panelGroup.getLayout(), sizes)) {
      panelGroup.setLayout(sizes);
    }
  }, [sizes]);

  return (
    <PanelGroup
      // its props extend html attributes that (as preact types them) carry an
      // element ref too, so no ref can be typed as both - this one is its
      // handle's:
      ref={panelGroupRef as never}
      direction={panelGroupDirections[direction]}
      onLayout={(newSizes) => {
        // laying out reports the sizes it was given, which needn't be stored again:
        if (!nanoEqual(newSizes, sizes)) {
          store.dispatch(paneSplitResized({ paneSplitId, sizes: newSizes }));
        }
      }}
    >
      {children.map((child, childIndex) => (
        <Fragment key={panelKeys[childIndex]}>
          {childIndex > 0 && (
            <PanelResizeHandle className={resizeHandleClassNames[direction]} />
          )}
          <Panel
            id={panelKeys[childIndex]}
            order={childIndex}
            defaultSize={sizes[childIndex]}
            minSize={minPaneSize}
          >
            <PaneLayoutNodeView paneLayoutNodeId={child} />
          </Panel>
        </Fragment>
      ))}
    </PanelGroup>
  );
};

export type PaneLayoutNodeViewProps = {
  paneLayoutNodeId: PaneLayoutNodeId;
};

const PaneLayoutNodeView = ({ paneLayoutNodeId }: PaneLayoutNodeViewProps) => {
  // check it hasn't left the layout (in case we have a stale id reference)
  const paneLayoutNode = useEditorAppSelector(({ levelEditor: { layout } }) =>
    findLayoutNode(layout, paneLayoutNodeId),
  );
  if (paneLayoutNode === undefined) {
    return null;
  }
  return paneLayoutNode.type === "tabGroup" ?
      <TabGroupArea key={paneLayoutNode.id} tabGroupId={paneLayoutNode.id} />
    : <PaneSplitView key={paneLayoutNode.id} paneSplit={paneLayoutNode} />;
};

/**
 * the room editing area's panes, split and resizable as the layout has them
 */
const PaneLayoutView = () => {
  const rootId = useEditorAppSelector(selectPaneLayoutRootId);
  return <PaneLayoutNodeView paneLayoutNodeId={rootId} />;
};

// default export for lazy loading
export default PaneLayoutView;
