import type { Renderer as PixiRenderer } from "pixi.js";
import { useState, useEffect } from "react";
import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import type { GeneralRenderContext } from "../../game/render/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/roomRenderer";
import { store } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import type {
  EditorRoomId,
  EditorRoomJson,
  EditorRoomRenderer,
} from "../EditorRoomId.1";

const editorGeneralRenderContext = (
  pixiRenderer: PixiRenderer,
): GeneralRenderContext<EditorRoomId> => ({
  displaySettings: {
    emulatedResolution: "amigaLowResPal",
  },
  soundSettings: {},
  pixiRenderer,
  // what does the room renderer need to do with the game state? Could it take a Pick< from it instead?
  gameState: undefined,
  paused: false,
  colourised: true,
  upscale: store.getState().gameMenus.upscale,
});
const createRoomRenderer = (
  roomJson: EditorRoomJson,
  pixiRenderer: PixiRenderer,
) => {
  const roomState = loadRoom({
    roomJson,
    roomPickupsCollected: emptyObject,
    // display heads and heels in their starting rooms:
    isNewGame: true,
  });
  return new RoomRenderer({
    room: roomState,
    general: editorGeneralRenderContext(pixiRenderer),
  });
};

export const useRoomRenderer = (
  roomJson: EditorRoomJson,
  pixiRenderer: PixiRenderer,
) => {
  const [roomRenderer, setRoomRenderer] = useState<EditorRoomRenderer>(() =>
    createRoomRenderer(roomJson, pixiRenderer),
  );

  useEffect(() => {
    if (roomRenderer.renderContext.room.roomJson !== roomJson) {
      roomRenderer.destroy();
      setRoomRenderer(createRoomRenderer(roomJson, pixiRenderer));
    }
  }, [roomJson, roomRenderer, pixiRenderer]);

  useEffect(() => {
    //console.log("destroying room renderer");
    //return roomRenderer.destroy();
  });

  return roomRenderer;
};
