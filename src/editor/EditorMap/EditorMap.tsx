import type { KeyboardEvent } from "react";

import type { WrapClickableRoomDecoratorComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import type { SortedObjectOfRoomGridPositionSpecs } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";
import type { EditorRoomId } from "../editorTypes";

import { createClickableRoomDecorator } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomDecorator";
import { LazyMapRoomTooltipDecorator } from "../../game/components/dialogs/menuDialog/dialogs/map/LazyMapRoomTooltipDecorator";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { type Key } from "../../game/input/keys";
import { store, useEditorAppSelector } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { useElementSize } from "../../utils/react/useElementSize";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { addXyz, xyzEqual } from "../../utils/vectors/vectors";
import { selectCursorRoom } from "../slice/levelEditorSelectors";
import {
  addRoomToSelection,
  changeToRoom,
  insertRoom,
  setRoomAboveOrBelow,
  toggleRoomInSelection,
} from "../slice/levelEditorSlice";
import { confirmDeleteRoomThunk } from "../toolbar/confirmThunk";
import { LazyEditorMapInsertButtonDecorator } from "./LazyEditorMapInsertButtonDecorator";
import { useEditorMapData } from "./useEditorMapData";

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

const editorClickableRoomDecorator = createClickableRoomDecorator<EditorRoomId>(
  (roomId, subRoomId, { metaKey, ctrlKey }) => {
    if (metaKey || ctrlKey) {
      store.dispatch(toggleRoomInSelection({ roomId, subRoomId }));
    } else {
      store.dispatch(changeToRoom({ roomId, subRoomId }));
    }
  },
);

const editorClickableAreaDecorators: WrapClickableRoomDecoratorComponent<EditorRoomId>[] =
  [
    LazyMapRoomTooltipDecorator as WrapClickableRoomDecoratorComponent<EditorRoomId>,
    editorClickableRoomDecorator,
  ];

const editorPostfixDecorators = [LazyEditorMapInsertButtonDecorator];

export const EditorMap = () => {
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useElementSize<HTMLDivElement>();
  const mapData = useEditorMapData();
  const selectedRooms = useEditorAppSelector(
    (state) => state.levelEditor.selectedRooms,
  );
  if (mapData.isError) {
    return (
      <div className="p-1 h-full flex flex-col gap-y-1 w-full scale-editor bg-shadow text-white overflow-scroll">
        <BitmapText className="text-midRed sprites-double-height">
          Could not solve map geometry - will show again on valid map data
        </BitmapText>
        {mapData.errors.map((msg, i) => (
          <div key={i}>
            <BitmapText>{msg}</BitmapText>
          </div>
        ))}
      </div>
    );
  }

  if (mapContainerHeight === 0) {
    return null;
  }

  return (
    <div
      className={`h-full overflow-y-auto scale-editor bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue outline-none`}
      ref={mapContainerRef}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        if (isNavigationKey(e.key)) {
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
          store.dispatch(confirmDeleteRoomThunk);
        }
      }}
    >
      <MapSvg<EditorRoomId>
        containerWidth={mapContainerWidth}
        clickableAreaDecorators={editorClickableAreaDecorators}
        postfixDecorators={editorPostfixDecorators}
        selectedRoomIds={selectedRooms.map((r) => r.roomId)}
        {...mapData}
      />
    </div>
  );
};
