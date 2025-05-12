import { useEffect, useState } from "react";
import { emptySet } from "../../utils/empty";
import { useCurrentEditingLevelJson } from "../../store/slices/levelEditor/levelEditorSelectors";
import { epsilon } from "../../utils/veryClose";
import { useRoomRenderer } from "./useRoomRenderer";
import { usePixiApplication } from "./usePixiApplication";

export const RoomEditingArea = () => {
  const roomJson = useCurrentEditingLevelJson();
  const application = usePixiApplication();
  const roomRenderer = useRoomRenderer(roomJson, application.renderer);
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    application.stage.addChild(roomRenderer.output.graphics);
    console.log("room renderer added to stage");

    roomRenderer.tick({
      deltaMS: epsilon,
      movedItems: emptySet,
      progression: 0,
    });

    return () => {
      application.stage.removeChild(roomRenderer.output.graphics);
      roomRenderer.output.graphics.x = 400;
      roomRenderer.output.graphics.y = 500;
      console.log("room renderer removed from stage");
    };
  }, [roomRenderer, application]);

  useEffect(() => {
    if (renderArea) renderArea.appendChild(application.canvas);
  }, [renderArea, application]);

  return <div ref={(div) => setRenderArea(div)} />;
};
