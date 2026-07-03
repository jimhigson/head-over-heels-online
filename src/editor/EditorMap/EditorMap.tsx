import { useEffect } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomBehaviour";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import { type RoomBehaviourComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { type Key } from "../../game/input/keys";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../model/map/sortRoomGridPositions";
import { startAppListening } from "../../store/listenerMiddleware";
import { store, useEditorAppSelector } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { useElementSize } from "../../utils/preact/useElementSize";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { addXyz, xyzEqual } from "../../utils/vectors/vectors";
import { EditorErrorBoundary } from "../EditorErrorBoundary";
import { type EditorRoomId } from "../editorTypes";
import { LazyEditorMapRoomTooltipBehaviour } from "../roomPreview/LazyEditorMapRoomTooltipBehaviour";
import { selectCursorRoom } from "../slice/levelEditorSelectors";
import {
  addRoomToSelection,
  changeToRoom,
  insertRoom,
  selectAllRooms,
  setRoomAboveOrBelow,
  toggleRoomInSelection,
} from "../slice/levelEditorSlice";
import { confirmDeleteRoomThunk } from "../toolbar/confirmThunk";
import { CoalesceButton } from "./CoalesceButton";
import { LazyEditorMapInsertButtonDecorator } from "./LazyEditorMapInsertButtonDecorator";
import { LazyEditorMapNonContiguousRelationshipDecorator } from "./LazyEditorMapNonContiguousRelationshipDecorator";
import { LazyEditorMapTeleporterLinkDecorator } from "./LazyEditorMapTeleporterLinkDecorator";
import { useEditorMapData } from "./useEditorMapData";

const editorClickableRoomBehaviour = createClickableRoomBehaviour<EditorRoomId>(
  (roomId, subRoomId, { metaKey, ctrlKey }) => {
    if (metaKey || ctrlKey) {
      store.dispatch(toggleRoomInSelection({ roomId, subRoomId }));
    } else {
      store.dispatch(changeToRoom({ roomId, subRoomId }));
    }
  },
);

const editorBehaviours: RoomBehaviourComponent<EditorRoomId>[] = [
  LazyEditorMapRoomTooltipBehaviour,
  editorClickableRoomBehaviour,
];

const editorPrefixDecorators = [
  LazyEditorMapNonContiguousRelationshipDecorator,
];

const editorPostfixDecorators = [
  LazyEditorMapTeleporterLinkDecorator,
  LazyEditorMapInsertButtonDecorator,
];

const keyToUnitVector = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "away",
  ArrowDown: "towards",
  PageUp: "up",
  PageDown: "down",
} as const satisfies { [K in Key]?: keyof typeof unitVectors };

type NavigationKey = keyof typeof keyToUnitVector;

const isNavigationKey = (key: string): key is NavigationKey =>
  key in keyToUnitVector;

const navigateToAdjacentRoom = (
  key: NavigationKey,
  gridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
) => {
  const { roomId, subRoomId } = selectCursorRoom(store.getState().levelEditor);
  const direction = keyToUnitVector[key];
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
  const { roomId, subRoomId } = selectCursorRoom(store.getState().levelEditor);
  const direction = keyToUnitVector[key];

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

const insertInDirection = (key: NavigationKey) => {
  const direction = keyToUnitVector[key];
  switch (direction) {
    case "left":
    case "right":
    case "away":
    case "towards":
      store.dispatch(insertRoom({ direction }));
      break;
    case "up":
    case "down":
      store.dispatch(
        setRoomAboveOrBelow({
          direction: direction === "up" ? "above" : "below",
          createNew: true,
        }),
      );
      break;
  }
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
  const selectedRoomIds = useEditorAppSelector(
    (state) => state.levelEditor.selectedRoomIds,
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

  if (mapContainerHeight === 0) {
    return null;
  }

  return (
    <div class="relative h-full">
      <div
        class={`h-full overflow-y-auto scale-editor bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue outline-none`}
        ref={mapContainerRef}
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            store.dispatch(selectAllRooms());
          } else if (isNavigationKey(e.key)) {
            e.preventDefault();
            if (e.altKey) {
              insertInDirection(e.key);
            } else if (e.shiftKey) {
              extendSelectionInDirection(e.key, mapData.gridPositions);
            } else {
              navigateToAdjacentRoom(e.key, mapData.gridPositions);
            }
          } else if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();
            store.dispatch(confirmDeleteRoomThunk());
          }
        }}
      >
        <MapSvg<EditorRoomId>
          containerWidth={mapContainerWidth}
          behaviours={editorBehaviours}
          prefixDecorators={editorPrefixDecorators}
          postfixDecorators={editorPostfixDecorators}
          selectedRoomIds={selectedRoomIds}
          {...mapData}
        />
      </div>
      <CoalesceButton />
    </div>
  );
};
