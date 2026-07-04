import { autoDetectRenderer, Rectangle, type Renderer } from "pixi.js";

import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import { type MovedOrResizedItems } from "../../game/mainLoop/progressGameState";
import { floorsRenderExtent } from "../../game/render/room/floorsExtent";
import { type GeneralRenderContext } from "../../game/render/room/RoomRenderContexts";
import { RoomRenderer } from "../../game/render/room/RoomRenderer";
import { paletteBlockstack } from "../../sprites/palette/spritesheetPalette";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { SpritesheetVariants } from "../../sprites/spritesheet/variants/SpritesheetVariants";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { emptyUserSettings } from "../../store/slices/userSettings/emptyUserSettings";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { cameraAngleBase } from "../../utils/vectors/rotateXy";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";

export const previewWidthPx = 320;
export const previewHeightPx = 240;

const blockStackSpriteOption = {
  name: "BlockStack",
  uncolourised: false,
} as const satisfies SpriteOption;

let rendererPromise: Promise<Renderer> | undefined;
let spritesheetVariants: SpritesheetVariants | undefined;

/**
 * lazily create the single off-screen renderer + its own SpritesheetVariants
 * used for all room previews. Kept alive for the editor session - one extra
 * webgl context. Built with useBackBuffer so the shadow filter works during
 * extraction.
 */
const getRenderer = (): Promise<Renderer> => {
  if (rendererPromise === undefined) {
    rendererPromise = (async () => {
      const renderer = await autoDetectRenderer({
        preference: "webgl",
        width: previewWidthPx,
        height: previewHeightPx,
        background: paletteBlockstack.pureBlack,
        useBackBuffer: true,
        antialias: false,
      });
      const ssv = new SpritesheetVariants();
      await ssv.loadImage(blockStackSpriteOption.name);
      spritesheetVariants = ssv;
      return renderer;
    })();
  }
  return rendererPromise;
};

/**
 * render a single, non-interactive frame of a room to a 320×240 webp data url,
 * with the room centred. The caller is responsible for serialising calls -
 * the single renderer and its SpritesheetVariants can only hold one room's
 * (planet, colour) at a time.
 */
export const renderRoomPreviewImage = async (
  roomJson: EditorRoomJson,
): Promise<string> => {
  const renderer = await getRenderer();
  const ssv = spritesheetVariants!;

  const room = loadRoom({
    roomJson,
    roomPickupsCollected: emptyObject,
    scrollsRead: emptyObject,
    // display heads and heels in their starting rooms:
    isNewGame: true,
    userSettings: emptyUserSettings,
  });

  ssv.rebuild(renderer, room.planet, room.color, blockStackSpriteOption);

  const general: GeneralRenderContext<EditorRoomId> = {
    displaySettings: { emulatedResolution: "amigaLowResPal" },
    soundSettings: { mute: true },
    pixiRenderer: renderer,
    gameState: undefined,
    paused: false,
    spriteOption: blockStackSpriteOption,
    spritesheetMeta: spritesheetMetas.BlockStack,
    upscale: selectUpscale(store.getState()),
    cameraAngle: cameraAngleBase,
    onScreenControls: false,
    speedCoefficient: 1,
    spritesheetVariants: ssv,
  };

  const roomRenderer = new RoomRenderer<EditorRoomId, EditorRoomItemId>({
    room,
    general,
  });

  try {
    // the first tick treats every item as moved regardless of what is passed,
    // so a static render can pass an empty moved set
    roomRenderer.tick({
      deltaMS: 0,
      movedOrResizedItems: new Set() as MovedOrResizedItems<
        EditorRoomId,
        EditorRoomItemId
      >,
    });

    const {
      floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
      allItems: { topEdgeY: t },
    } = floorsRenderExtent(room);

    const centreX = (l + r) / 2;
    const centreY = (t + b) / 2;
    const frame = new Rectangle(
      centreX - previewWidthPx / 2,
      centreY - previewHeightPx / 2,
      previewWidthPx,
      previewHeightPx,
    );

    const canvas = renderer.extract.canvas({
      target: roomRenderer.output.graphics,
      frame,
      clearColor: paletteBlockstack.pureBlack,
    });

    return (canvas as HTMLCanvasElement).toDataURL("image/webp", 0.5);
  } finally {
    roomRenderer.destroy();
  }
};
