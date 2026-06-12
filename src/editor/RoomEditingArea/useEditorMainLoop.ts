import { Container, type Renderer, Ticker } from "pixi.js";
import { useEffect } from "preact/hooks";

import { type MovedOrResizedItems } from "../../game/mainLoop/progressGameState";
import { isSpatial } from "../../game/physics/itemPredicates";
import { type GeneralRenderContext } from "../../game/render/room/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/room/RoomRenderer";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type SpritesheetVariants } from "../../sprites/spritesheet/variants/SpritesheetVariants";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { store } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomRenderer,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import {
  useEditorRoomRenderDimensions,
  useEditorRoomStateWithPreviews,
} from "../slice/levelEditorSelectorHooks";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { roomEditingAreaMarginPx } from "./roomEditingAreaMarginPx";

const editorGeneralRenderContext = (
  pixiRenderer: Renderer,
  spritesheetVariants: SpritesheetVariants,
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
  spritesheetVariants,
});

export const useEditorMainLoop = (
  spritesheetVariants: SpritesheetVariants,
): void => {
  const pixiApp = useProvidedPixiApplication();
  const { renderer: pixiRenderer } = pixiApp;

  if (!pixiRenderer) {
    throw new Error("this should never be falsey (typescript violation)");
  }

  const currentEditingRoomState = useEditorRoomStateWithPreviews();
  const roomRenderSize = useEditorRoomRenderDimensions();

  useEffect(() => {
    const positioner = new Container({ label: "editorPositioner" });
    let roomRenderer: EditorRoomRenderer | undefined;
    let lastPlanet = currentEditingRoomState.planet;
    let lastColor = currentEditingRoomState.color;
    let lastRoomState: EditorRoomState = currentEditingRoomState;

    const tick = ({ deltaMS }: Ticker) => {
      if (!spritesheetVariants.isTextureLoaded("BlockStack")) {
        return;
      }

      const roomState = currentEditingRoomState;
      const { planet, color } = roomState;

      if (roomRenderer === undefined || lastRoomState !== roomState) {
        roomRenderer?.destroy();
        positioner.removeChildren();

        spritesheetVariants.rebuild(pixiRenderer, planet, color, {
          name: "BlockStack",
          uncolourised: false as const,
        });

        roomRenderer = new RoomRenderer({
          room: roomState,
          general: editorGeneralRenderContext(
            pixiRenderer,
            spritesheetVariants,
          ),
        });

        positioner.addChild(roomRenderer.output.graphics);
        pixiApp.stage.addChild(positioner);

        lastPlanet = planet;
        lastColor = color;
        lastRoomState = roomState;
      } else if (planet !== lastPlanet || color !== lastColor) {
        spritesheetVariants.rebuild(pixiRenderer, planet, color, {
          name: "BlockStack",
          uncolourised: false as const,
        });
        lastPlanet = planet;
        lastColor = color;
      }

      positioner.x = -roomRenderSize.l + roomEditingAreaMarginPx;
      positioner.y = -roomRenderSize.t + roomEditingAreaMarginPx;

      if (roomRenderer.destroyed) {
        return;
      }

      if (roomRenderer.renderContext.room !== roomState) {
        console.warn("room renderer does not have the current room");
      }

      const considerAllItemsHaveMoved: MovedOrResizedItems<
        EditorRoomId,
        EditorRoomItemId
      > = new Set(
        (
          valuesIter(
            roomState.items,
          ) as IterableIterator<EditorUnionOfAllItemInPlayTypes>
        ).filter(isSpatial),
      );

      // some animations (ie, cyberman bob) depend on the roomTime
      // incrementing between frames
      roomState.roomTime += deltaMS;

      roomRenderer.tick({
        deltaMS,
        // TODO: probably needs this to be the real set of moved items, like a 'proper' main loop,
        // or this might be fast enough given the level editor doesn't need to run as smoothly
        // as the actual game
        movedOrResizedItems: considerAllItemsHaveMoved,
      });
      pixiApp.render();
    };

    Ticker.shared.add(tick);

    return () => {
      Ticker.shared.remove(tick);
      roomRenderer?.destroy();
      pixiApp.stage.removeChild(positioner);
      positioner.destroy();
    };
  }, [
    currentEditingRoomState,
    pixiRenderer,
    pixiApp,
    spritesheetVariants,
    roomRenderSize,
  ]);
};
