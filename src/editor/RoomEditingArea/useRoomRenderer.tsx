import type { Renderer as PixiRenderer } from "pixi.js";
import { useEffect, useState } from "react";
import type { GeneralRenderContext } from "../../game/render/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/roomRenderer";
import { store } from "../../store/store";
import type {
  EditorRoomId,
  EditorRoomRenderer,
  EditorRoomState,
} from "../editorTypes";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type { ShowBoundingBoxes } from "../../store/slices/gameMenusSlice";
import { useShowBoundingBoxes } from "../../store/selectors";

const editorGeneralRenderContext = (
  pixiRenderer: PixiRenderer,
  showBoundingBoxes: ShowBoundingBoxes,
): GeneralRenderContext<EditorRoomId> => ({
  displaySettings: {
    emulatedResolution: "amigaLowResPal",
    showBoundingBoxes,
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
  editor: true,
});

const createRoomRenderer = (
  roomState: EditorRoomState,
  pixiRenderer: PixiRenderer,
  showBoundingBoxes: ShowBoundingBoxes,
) => {
  return new RoomRenderer({
    room: roomState,
    general: editorGeneralRenderContext(pixiRenderer, showBoundingBoxes),
  });
};

export const useRoomRenderer = () => {
  const { renderer: pixiRenderer } = useProvidedPixiApplication();
  const showBoundingBoxes = useShowBoundingBoxes();

  if (!pixiRenderer) {
    throw new Error("this should never be falsey (typescript violation)");
  }

  const currentEditingRoomState = useEditorRoomState();
  const [roomRenderer, setRoomRenderer] = useState<EditorRoomRenderer>(() =>
    createRoomRenderer(
      currentEditingRoomState,
      pixiRenderer,
      showBoundingBoxes,
    ),
  );

  useEffect(() => {
    const createdThisEffectRoomRenderer = createRoomRenderer(
      currentEditingRoomState,
      pixiRenderer,
      showBoundingBoxes,
    );
    setRoomRenderer(createdThisEffectRoomRenderer);

    return () => {
      createdThisEffectRoomRenderer.destroy();
    };
  }, [currentEditingRoomState, pixiRenderer, showBoundingBoxes]);

  return roomRenderer;
};
