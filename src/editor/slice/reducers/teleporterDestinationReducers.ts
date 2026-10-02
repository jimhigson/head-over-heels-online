import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type TeleporterLandingConfig } from "../../../model/json/resolveTeleporterLanding";
import { type EditorRoomId } from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";

export const teleporterDestinationReducers = {
  /**
   * point every selected teleporter at a room. Where in the old destination
   * to land no longer applies, so it is dropped
   */
  setSelectedTeleportersDestination(
    state,
    {
      payload: { toRoom, timestamp },
    }: PayloadAction<{ toRoom: EditorRoomId; timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(
      state,
      { verb: "Destination", timestamp },
      (item) => {
        if (item.type === "teleporter") {
          item.config.toRoom = toRoom;
          // viewed with both landing fields optional, so either can be deleted:
          const landingConfig: TeleporterLandingConfig = item.config;
          delete landingConfig.toPosition;
          delete landingConfig.toItemId;
        }
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
