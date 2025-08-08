import type {
  HoveredItem,
  RootStateWithLevelEditorSlice,
} from "../../slice/levelEditorSlice";
import type { MaybePointingAtSomething } from "../cursor/PointingAt";
import {
  setHoveredItemInRoom,
  selectHoveredItem,
} from "../../slice/levelEditorSlice";
import { store } from "../../../store/store";

import nanoEqual from "nano-equal";

import type { EditorRoomState } from "../../editorTypes";
import { itemsAreLocked } from "./itemsAreLocked";

export const dispatchHoveredOnChangedIfNeeded = (
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
) => {
  const storeState = store.getState() as RootStateWithLevelEditorSlice;

  let newHoveredItem: HoveredItem | undefined;

  if (pointingAt.world) {
    const pointingAtItemId = pointingAt.world.itemId;

    // convert from id of item in world to id of item in json:
    const hoveredInPlayItem =
      pointingAtItemId && roomState.items[pointingAtItemId];

    const newHoveredItemJsonId =
      itemsAreLocked(storeState, hoveredInPlayItem) ? undefined : (
        hoveredInPlayItem.jsonItemId
      );

    newHoveredItem =
      newHoveredItemJsonId === undefined ? undefined : (
        {
          jsonItemId: newHoveredItemJsonId,
          pointingAtOnItem: pointingAt.world!.onItem,
        }
      );
  } else {
    newHoveredItem = undefined;
  }

  if (
    // only dispatch if something is different, to stop the redux dev tools being flooded:
    !nanoEqual(selectHoveredItem(storeState), newHoveredItem)
  ) {
    store.dispatch(setHoveredItemInRoom(newHoveredItem));
  }
};
