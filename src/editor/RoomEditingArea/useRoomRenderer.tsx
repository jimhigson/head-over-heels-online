import type { Renderer as PixiRenderer } from "pixi.js";
import { useEffect, useState } from "react";
import type { GeneralRenderContext } from "../../game/render/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/roomRenderer";
import { store } from "../../store/store";
import type {
  EditorRoomId,
  EditorRoomRenderer,
  EditorRoomState,
} from "../EditorRoomId";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

const editorGeneralRenderContext = (
  pixiRenderer: PixiRenderer,
): GeneralRenderContext<EditorRoomId> => ({
  displaySettings: {
    emulatedResolution: "amigaLowResPal",
  },
  soundSettings: {
    // don't load/play sounds during room editing
    mute: true,
  },
  pixiRenderer,
  // what does the room renderer need to do with the game state? Could it take a Pick< from it instead?
  gameState: undefined,
  paused: false,
  colourised: true,
  upscale: selectUpscale(store.getState()),
});

const createRoomRenderer = (
  roomState: EditorRoomState,
  pixiRenderer: PixiRenderer,
) => {
  return new RoomRenderer({
    room: roomState,
    general: editorGeneralRenderContext(pixiRenderer),
  });
};

export const useRoomRenderer = () => {
  const { renderer: pixiRenderer } = useProvidedPixiApplication();

  if (!pixiRenderer) {
    throw new Error("this should never be falsey (typescript violation)");
  }

  const currentEditingRoomState = useEditorRoomState();
  const [roomRenderer, setRoomRenderer] = useState<EditorRoomRenderer>(() =>
    createRoomRenderer(currentEditingRoomState, pixiRenderer),
  );

  useEffect(() => {
    const createdThisEffectRoomRenderer = createRoomRenderer(
      currentEditingRoomState,
      pixiRenderer,
    );
    setRoomRenderer(createdThisEffectRoomRenderer);

    return () => {
      createdThisEffectRoomRenderer.destroy();
    };
  }, [currentEditingRoomState, pixiRenderer]);

  return roomRenderer;
};
