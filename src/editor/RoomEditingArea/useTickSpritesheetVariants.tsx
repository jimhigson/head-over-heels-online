import { useEffect } from "react";

import { tickSpritesheetVariants } from "../../game/mainLoop/tickSpritesheetVariants";
import { initOriginalSpritesheet } from "../../sprites/spritesheet/loadedSpriteSheet";
import { useEditorRoomStateWithPreviews } from "../slice/levelEditorSelectors";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const useTickSpritesheetVariants = () => {
  const { renderer: pixiRenderer } = useProvidedPixiApplication();

  if (!pixiRenderer) {
    throw new Error("this should never be falsey (typescript violation)");
  }

  const { planet, color } = useEditorRoomStateWithPreviews();

  useEffect(() => {
    initOriginalSpritesheet(pixiRenderer);
  }, [pixiRenderer]);

  useEffect(() => {
    tickSpritesheetVariants(pixiRenderer, true, planet, color);
  }, [color, pixiRenderer, planet]);
};
