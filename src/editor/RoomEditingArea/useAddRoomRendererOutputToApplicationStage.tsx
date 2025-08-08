import { Container } from "pixi.js";
import { useState, useEffect } from "react";
import type { EditorRoomRenderer } from "../editorTypes";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { useEditorRoomRenderDimensions } from "../slice/levelEditorSelectors";
import { roomEditingAreaMarginPx } from "./roomEditingAreaMarginPx";

export const useAddRoomRendererOutputToApplicationStage = (
  roomRenderer: EditorRoomRenderer,
) => {
  const application = useProvidedPixiApplication();

  const [positioner] = useState(
    () => new Container({ label: "editorPositioner" }),
  );
  const roomRenderSize = useEditorRoomRenderDimensions();

  useEffect(() => {
    if (roomRenderer.destroyed) {
      // if you add to the stage after the room renderer is destroyed
      // pixi will blow up (maybe understandably) - do not do this!
      console.log(
        "useAddRoomRendererOutputToApplicationStage: room renderer was destroyed, will not add its output to app",
      );
      return;
    }

    positioner.addChild(roomRenderer.output.graphics);
    application.stage.addChild(positioner);

    return () => {
      application.stage.removeChild(positioner);
      positioner.removeChild(roomRenderer.output.graphics);
    };
  }, [roomRenderer, application, positioner]);

  // keep the room renderer's output centred on the canvas:
  useEffect(() => {
    positioner.x = -roomRenderSize.l + roomEditingAreaMarginPx;
    positioner.y = -roomRenderSize.t + roomEditingAreaMarginPx;
  }, [positioner, roomRenderSize]);
};
