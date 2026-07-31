import { Container, Graphics, type Renderer, Ticker } from "pixi.js";
import { type RefObject } from "preact";
import { useEffect } from "preact/hooks";

import { type GeneralRenderContext } from "../../game/render/room/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/room/RoomRenderer";
import { paletteBlockstack } from "../../sprites/palette/spritesheetPalette";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type Spritesheets } from "../../sprites/spritesheet/Spritesheets";
import { type Upscale } from "../../store/slices/upscale/Upscale";
import { store } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import {
  type EditorRoomId,
  type EditorRoomRenderer,
  type EditorRoomState,
} from "../editorTypes";
import {
  useEditorRoomRenderDimensions,
  useEditorRoomStateWithPreviews,
} from "../slice/levelEditorSelectorHooks";
import { selectEditorCameraAngle } from "../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { roomEditingAreaMarginPx } from "./roomEditingAreaMarginPx";
import { useEditorViewport } from "./viewport/EditorViewportProvider";

/**
 * the editor engine always renders at 1:1 - all zooming happens on the
 * {@link EditorViewport} transform above the room renderer's output, so the
 * render context (and with it, the item renderers) never changes with zoom
 */
const editorEngineUpscale: Upscale = {
  gameEngineUpscale: 1,
  cssUpscale: 1,
  // only used by the game's scroll/hud renderers, which the editor doesn't
  // create - a nominal value:
  gameEngineScreenSize: { x: 320, y: 256 },
  canvasSize: { x: 320, y: 256 },
  rotate90: false,
};

const editorGeneralRenderContext = (
  pixiRenderer: Renderer,
  spritesheets: Spritesheets,
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
  upscale: editorEngineUpscale,
  // the editor has no rotation transitions - the render angle is always the
  // settled quarter angle:
  cameraAngle: selectEditorCameraAngle(store.getState()),
  onScreenControls: false,
  speedCoefficient: 1,
  spritesheets,
});

export const useEditorMainLoop = (
  spritesheets: Spritesheets,
  /**
   * kept pointing at the current room renderer, so consumers of the rendering
   * (eg pointer picking) can read its render boxes
   */
  roomRendererRef: RefObject<EditorRoomRenderer | undefined>,
): void => {
  const pixiApp = useProvidedPixiApplication();
  const viewport = useEditorViewport();
  const { renderer: pixiRenderer } = pixiApp;

  if (!pixiRenderer) {
    throw new Error("this should never be falsey (typescript violation)");
  }

  const currentEditingRoomState = useEditorRoomStateWithPreviews();
  const roomRenderSize = useEditorRoomRenderDimensions();

  useEffect(() => {
    // a solid backdrop bounding the room's projected rect - the room reads as
    // sitting on this, with the pane's checkerboard void around it:
    const backdrop = new Graphics({ label: "editorRoomBackdrop" });
    backdrop
      .rect(
        roomRenderSize.l - roomEditingAreaMarginPx,
        roomRenderSize.t - roomEditingAreaMarginPx,
        roomRenderSize.w + 2 * roomEditingAreaMarginPx,
        roomRenderSize.h + 2 * roomEditingAreaMarginPx,
      )
      .fill(paletteBlockstack.pureBlack);

    // the room renders at its natural projected coordinates - panning/zooming
    // is entirely the viewport's transform:
    const roomContainer = new Container({ label: "editorRoom" });
    viewport.container.addChild(backdrop, roomContainer);

    let roomRenderer: EditorRoomRenderer | undefined;
    let lastPlanet = currentEditingRoomState.planet;
    let lastColor = currentEditingRoomState.color;
    let lastRoomState: EditorRoomState = currentEditingRoomState;

    let spritesheetLoadStarted = false;

    const tick = ({ deltaMS }: Ticker) => {
      if (!spritesheets.isTextureLoaded("BlockStack")) {
        if (!spritesheetLoadStarted) {
          spritesheetLoadStarted = true;
          spritesheets.loadImage(pixiRenderer, "BlockStack");
        }
        return;
      }

      const roomState = currentEditingRoomState;
      const { planet, color } = roomState;

      if (roomRenderer === undefined || lastRoomState !== roomState) {
        roomRenderer?.destroy();
        roomContainer.removeChildren();

        spritesheets.rebuild(pixiRenderer, planet, color, {
          name: "BlockStack",
          uncolourised: false as const,
        });

        roomRenderer = new RoomRenderer({
          room: roomState,
          general: editorGeneralRenderContext(pixiRenderer, spritesheets),
        });

        roomContainer.addChild(roomRenderer.output.graphics);
        roomRendererRef.current = roomRenderer;

        lastPlanet = planet;
        lastColor = color;
        lastRoomState = roomState;
      } else if (planet !== lastPlanet || color !== lastColor) {
        spritesheets.rebuild(pixiRenderer, planet, color, {
          name: "BlockStack",
          uncolourised: false as const,
        });
        lastPlanet = planet;
        lastColor = color;
      }

      if (roomRenderer.destroyed) {
        return;
      }

      if (roomRenderer.renderContext.room !== roomState) {
        console.warn("room renderer does not have the current room");
      }

      // stamp everything as moved every frame - the editor doesn't track
      // real movement.
      // TODO: probably should stamp only what actually changed, like a
      // 'proper' main loop - or this might be fast enough given the level
      // editor doesn't need to run as smoothly as the actual game
      roomState.progression++;
      for (const item of valuesIter(roomState.items)) {
        item.state.movedOrResizedOnProgression = roomState.progression;
      }

      // some animations (ie, cyberman bob) depend on the roomTime
      // incrementing between frames
      roomState.roomTime += deltaMS;

      roomRenderer.tick({
        deltaMS,
        // no fps display in the editor - nothing records frame timings:
        timingRecord: undefined,
      });
      pixiApp.render();
    };

    Ticker.shared.add(tick);

    return () => {
      Ticker.shared.remove(tick);
      roomRenderer?.destroy();
      roomRendererRef.current = undefined;
      viewport.container.removeChild(backdrop, roomContainer);
      backdrop.destroy();
      roomContainer.destroy();
    };
  }, [
    currentEditingRoomState,
    pixiRenderer,
    pixiApp,
    spritesheets,
    roomRenderSize,
    viewport,
    roomRendererRef,
  ]);
};
