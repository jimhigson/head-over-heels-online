import nanoEqual from "nano-equal";

import { editorStore, store } from "../../../store/store";
import { type EditorRoomState } from "../../editorTypes";
import { type EditorPaneId } from "../../slice/EditorPane";
import {
  type HoveredItem,
  selectPaneHoveredItem,
  setHoveredItemInRoom,
} from "../../slice/levelEditorSlice";
import { type MaybePointingAtSomething } from "../cursor/PointingAt";
import { itemsAreLocked } from "./itemsAreLocked";

export const dispatchHoveredOnChangedIfNeeded = (
  paneId: EditorPaneId,
  /**
   * whether the pane edits its room - only an editing pane locks items
   */
  editable: boolean,
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
) => {
  const storeState = editorStore.getState();

  let newHoveredItem: HoveredItem | undefined;

  if (pointingAt.world) {
    const pointingAtItemId = pointingAt.world.itemId;

    // convert from id of item in world to id of item in json:
    const hoveredInPlayItem =
      pointingAtItemId && roomState.items[pointingAtItemId];

    const newHoveredItemJsonId =
      editable && itemsAreLocked(storeState, hoveredInPlayItem) ? undefined : (
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
    !nanoEqual(selectPaneHoveredItem(storeState, paneId), newHoveredItem)
  ) {
    store.dispatch(
      setHoveredItemInRoom({ paneId, hoveredItem: newHoveredItem }),
    );
  }
};
