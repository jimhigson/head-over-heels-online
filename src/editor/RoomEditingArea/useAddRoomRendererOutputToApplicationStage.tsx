import { Container } from "pixi.js";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectGameEngineScreenSize } from "../../store/slices/upscale/upscaleSlice";
import type { EditorRoomRenderer } from "../EditorRoomId";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const useAddRoomRendererOutputToApplicationStage = (
  roomRenderer: EditorRoomRenderer,
) => {
  const application = useProvidedPixiApplication();

  const [positioner] = useState(() => new Container());
  const gameEngineScreenSize = useAppSelector(selectGameEngineScreenSize);

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
    positioner.x = gameEngineScreenSize.x / 2;
    positioner.y = gameEngineScreenSize.y - 16;
  }, [positioner, gameEngineScreenSize]);
};
