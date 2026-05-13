import type { Renderer } from "pixi.js";

import { useEffect, useState } from "preact/hooks";

import type { GeneralRenderContext } from "../../game/render/room/RoomRenderContexts";
import type {
  EditorRoomId,
  EditorRoomRenderer,
  EditorRoomState,
} from "../editorTypes";

import { RoomRenderer } from "../../game/render/room/RoomRenderer";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { store } from "../../store/store";
import { useEditorRoomStateWithPreviews } from "../slice/levelEditorSelectors";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

const editorGeneralRenderContext = (
  pixiRenderer: Renderer,
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
  spriteOption: { name: "BlockStack", uncolourised: false as const },
  spritesheetMeta: spritesheetMetas.BlockStack,
  upscale: selectUpscale(store.getState()),
  onScreenControls: false,
  speedCoefficient: 1,
});

const createRoomRenderer = (
  roomState: EditorRoomState,
  pixiRenderer: Renderer,
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

  const currentEditingRoomState = useEditorRoomStateWithPreviews();
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
