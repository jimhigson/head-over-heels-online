import { memo } from "preact/compat";
import { useEffect } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomBehaviour";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import { MapContextProvider } from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import { type RoomBehaviourComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { type Key } from "../../game/input/keys";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../model/map/sortRoomGridPositions";
import { startAppListening } from "../../store/listenerMiddleware";
import { editorStore, store, useEditorAppSelector } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { useElementSize } from "../../utils/preact/useElementSize";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  type DirectionXyz4,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { EditorErrorBoundary } from "../EditorErrorBoundary";
import { type EditorRoomId } from "../editorTypes";
import { EditorMapRoomTooltipBehaviour } from "../roomPreview/EditorMapRoomTooltipBehaviour";
import { insertRoomInDirectionThunk } from "../slice/insertRoomInDirectionThunk";
import { selectCursorRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  addRoomToSelection,
  changeToRoom,
  pinRoomTab,
  selectAllRooms,
  toggleRoomInSelection,
} from "../slice/levelEditorSlice";
import { confirmDeleteRoomThunk } from "../toolbar/confirmThunk";
import { CoalesceButton } from "./CoalesceButton";
import { EditorMapItemDropTargetBehaviour } from "./EditorMapItemDropTargetBehaviour";
import { LazyEditorMapInsertButtonDecorator } from "./LazyEditorMapInsertButtonDecorator";
import { LazyEditorMapNonContiguousRelationshipDecorator } from "./LazyEditorMapNonContiguousRelationshipDecorator";
import { LazyEditorMapTeleporterLinkDecorator } from "./LazyEditorMapTeleporterLinkDecorator";
import { mapAreaIndexOfRoom } from "./mapAreaIndexOfRoom";
import { MapAreaSwitcher } from "./MapAreaSwitcher";
import { useEditorMapContextValue } from "./useEditorMapContextValue";
import { useEditorMapData } from "./useEditorMapData";

const editorClickableRoomBehaviour = createClickableRoomBehaviour<EditorRoomId>(
  (roomId, subRoomId, { metaKey, ctrlKey, detail: clickCount }) => {
    if (metaKey || ctrlKey) {
      store.dispatch(toggleRoomInSelection({ roomId, subRoomId }));
    } else {
      store.dispatch(changeToRoom({ roomId, subRoomId }));
      if (clickCount === 2) {
        // double-clicked: keep its tab open, rather than a preview tab
        store.dispatch(pinRoomTab(roomId));
      }
    }
  },
);

const editorBehaviours: RoomBehaviourComponent<EditorRoomId>[] = [
  EditorMapRoomTooltipBehaviour,
  editorClickableRoomBehaviour,
  EditorMapItemDropTargetBehaviour,
];

// memoised so each room's decorations redraw only when their own props change:
const editorPrefixDecorators = [
  memo(LazyEditorMapNonContiguousRelationshipDecorator),
];

const editorPostfixDecorators = [
  memo(LazyEditorMapTeleporterLinkDecorator),
  memo(LazyEditorMapInsertButtonDecorator),
];

const editorMapContextOptions = {
  behaviours: editorBehaviours,
  prefixDecorators: editorPrefixDecorators,
  postfixDecorators: editorPostfixDecorators,
};

const keyToDirectionXyz4 = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "away",
  ArrowDown: "towards",
  PageUp: "up",
  PageDown: "down",
} as const satisfies { [K in Key]?: DirectionXyz4 };

type NavigationKey = keyof typeof keyToDirectionXyz4;

const isNavigationKey = (key: string): key is NavigationKey =>
  key in keyToDirectionXyz4;

const navigateToAdjacentRoom = (
  key: NavigationKey,
  gridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
) => {
  const { roomId, subRoomId } = selectCursorRoomFromLevelEditorState(
    store.getState().levelEditor,
  );
  const direction = keyToDirectionXyz4[key];
  if (!direction) {
    return;
  }

  const currentRoomPosition = valuesIter(gridPositions).find(
    (spec) => spec.roomId === roomId && spec.subRoomId === subRoomId,
  )?.gridPosition;

  if (!currentRoomPosition) {
    return;
  }

  const targetPosition = addXyz(currentRoomPosition, unitVectors[direction]);

  const targetSpec = valuesIter(gridPositions).find((spec) =>
    xyzEqual(spec.gridPosition, targetPosition),
  );
  if (!targetSpec) {
    return;
  }

  store.dispatch(
    changeToRoom({
      roomId: targetSpec.roomId,
      subRoomId: targetSpec.subRoomId,
    }),
  );

  requestAnimationFrame(() => {
    document
      .querySelector<SVGPathElement>(
        `[data-room-click="${targetSpec.roomId}/${targetSpec.subRoomId}"]`,
      )
      ?.focus();
  });
};

const extendSelectionInDirection = (
  key: NavigationKey,
  gridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
) => {
  const { roomId, subRoomId } = selectCursorRoomFromLevelEditorState(
    store.getState().levelEditor,
  );
  const direction = keyToDirectionXyz4[key];

  const currentRoomPosition = valuesIter(gridPositions).find(
    (spec) => spec.roomId === roomId && spec.subRoomId === subRoomId,
  )?.gridPosition;

  if (!currentRoomPosition) {
    return;
  }

  const targetPosition = addXyz(currentRoomPosition, unitVectors[direction]);

  const targetSpec = valuesIter(gridPositions).find((spec) =>
    xyzEqual(spec.gridPosition, targetPosition),
  );
  if (!targetSpec) {
    return;
  }

  store.dispatch(
    addRoomToSelection({
      roomId: targetSpec.roomId,
      subRoomId: targetSpec.subRoomId,
    }),
  );
};

const roomsChanged = (
  _action: unknown,
  currentState: unknown,
  previousState: unknown,
) =>
  (currentState as { levelEditor: { campaignInProgress: { rooms: unknown } } })
    .levelEditor.campaignInProgress.rooms !==
  (previousState as { levelEditor: { campaignInProgress: { rooms: unknown } } })
    .levelEditor.campaignInProgress.rooms;

const switchToRoom = (roomId: EditorRoomId) =>
  store.dispatch(changeToRoom({ roomId }));

export const EditorMapWithErrorBoundary = () => (
  <EditorErrorBoundary
    resetPredicate={roomsChanged}
    startListening={startAppListening}
    componentName="Map"
  >
    <EditorMap />
  </EditorErrorBoundary>
);

const EditorMap = () => {
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useElementSize<HTMLDivElement>();
  const mapData = useEditorMapData();
  const mapContext = useEditorMapContextValue(editorMapContextOptions);
  const { roomId: cursorRoomId } = useEditorAppSelector((state) =>
    selectCursorRoomFromLevelEditorState(state.levelEditor),
  );

  const mapRendering = mapContainerHeight !== 0 && !mapData.isError;
  useEffect(() => {
    if (mapRendering) {
      // readiness signal for network-cost measurement (true-site-size)
      performance.mark("editor-map-ready");
    }
  }, [mapRendering]);

  if (mapData.isError) {
    throw new Error(
      `Could not solve map geometry:\n${mapData.errors.join("\n")}`,
    );
  }

  const shownAreaIndex = mapAreaIndexOfRoom(mapData.areas, cursorRoomId);
  const shownArea = mapData.areas[shownAreaIndex];

  if (mapContainerHeight === 0) {
    return null;
  }

  return (
    // faster tooltips on the editor map: its tooltips carry a useful room
    // preview, not just help text
    <div class="relative h-full scale-editor" style={{ "--tipDelay": "50ms" }}>
      <div
        class={`h-full flex flex-col overflow-y-auto bg-shadowHalfbrite scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue outline-none`}
        ref={mapContainerRef}
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            store.dispatch(selectAllRooms());
          } else if (isNavigationKey(e.key)) {
            e.preventDefault();
            if (e.altKey) {
              editorStore.dispatch(
                insertRoomInDirectionThunk(keyToDirectionXyz4[e.key]),
              );
            } else if (e.shiftKey) {
              extendSelectionInDirection(e.key, shownArea.gridPositions);
            } else {
              navigateToAdjacentRoom(e.key, shownArea.gridPositions);
            }
          } else if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();
            store.dispatch(confirmDeleteRoomThunk());
          }
        }}
      >
        <div class="shrink-0">
          <MapContextProvider value={mapContext}>
            <MapSvg<EditorRoomId>
              containerWidth={mapContainerWidth}
              {...mapData}
              areaIndex={shownAreaIndex}
            />
          </MapContextProvider>
        </div>
        {/* stuck to the bottom-right of the visible map, inside any scrollbar,
            and at the bottom even when the map is shorter than its pane: */}
        <div
          class="sticky bottom-0 left-0 mt-auto flex h-0 shrink-0 items-end justify-end pointer-events-none"
          // keys typed into the switcher aren't for navigating the map:
          onKeyDown={(e: KeyboardEvent) => e.stopPropagation()}
        >
          <MapAreaSwitcher
            areas={mapData.areas}
            shownAreaIndex={shownAreaIndex}
            onSwitchToRoom={switchToRoom}
          />
        </div>
      </div>
      <CoalesceButton />
    </div>
  );
};
