import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type TeleporterLandingConfig } from "../../../model/json/resolveTeleporterLanding";
import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const teleporterDestinationReducers = {
  /**
   * point every selected teleporter at a room, landing on an item in it, or
   * where it lands by default. Any landing position is dropped
   */
  setSelectedTeleportersDestination(
    state,
    {
      payload: { toRoom, toItemId, timestamp },
    }: PayloadAction<{
      toRoom: EditorRoomId;
      /**
       * the item to land on - undefined to land by default
       */
      toItemId: EditorRoomItemId | undefined;
      timestamp: number;
    }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Destination", timestamp },
      (item) => {
        if (item.type === "teleporter") {
          item.config.toRoom = toRoom;
          // viewed with both landing fields optional, so either can be deleted:
          const landingConfig: TeleporterLandingConfig = item.config;
          if (toItemId === undefined) {
            delete landingConfig.toItemId;
          } else {
            landingConfig.toItemId = toItemId;
          }
        }
      },
    );
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
