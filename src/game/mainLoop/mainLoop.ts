import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import {
  moveSpriteToItemProjection,
  renderItemIfNeeded,
} from "../render/renderItem";
import { destroyItemRendering } from "../render/destroyItemRendering";
import type { PlanetName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";
import { roomInitialRender } from "../render/renderCurrentRoom";
import type { RenderOptions } from "../RenderOptions";
import { objectValues } from "iter-tools";
import { amigaLowResPal } from "@/originalGame";
import { upscale } from "../render/upscale";
import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { xyzEqual } from "@/utils/vectors/vectors";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { spritesheetPalette } from "@/sprites/samplePalette";
import { getColorScheme } from "@/hintColours";
import { sortByZPairs, zPairs } from "../render/sortZ/sortItemsByDrawOrder";
import { positionContainerPosition } from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";

const hudBottomMargin = 4;

/** @returns the room container it rendered into */
const updateWorldRenderingToMatchGameState = <RoomId extends string>({
  gameState,
  lastRenderedRoom,
  worldContainer,
  renderOptions,
  lastRenderOptions,
  currentRoomContainer,
}: {
  gameState: GameState<RoomId>;
  lastRenderedRoom: RoomState<PlanetName, RoomId> | undefined;
  worldContainer: Container;
  renderOptions: RenderOptions<RoomId>;
  lastRenderOptions: RenderOptions<RoomId> | undefined;
  currentRoomContainer: Container;
}): Container => {
  const room = currentRoom(gameState);

  if (room !== lastRenderedRoom || renderOptions !== lastRenderOptions) {
    // unrender all items in the last room, if there was one:
    if (lastRenderedRoom !== undefined) {
      iterate(objectValues(lastRenderedRoom.items)).forEach(
        destroyItemRendering,
      );
    }

    // this fails if the room was already rendered - we don't remove renderings if the other player is still in the other room!
    console.log(
      "will render from scratch",
      room.id,
      "since we currently have",
      lastRenderedRoom?.id,
    );
    // the room is not currently rendered - render from scratch
    currentRoomContainer?.destroy();
    worldContainer.label = "world";

    const newRoomContainer = roomInitialRender(gameState, renderOptions);
    worldContainer.addChild(newRoomContainer);
    return newRoomContainer;
  } else {
    // the room is already rendered but needs updating
    let itemsHaveMoved = false;
    for (const item of objectValues(room.items)) {
      if (!item.renders) {
        if (item.positionContainer !== undefined) {
          destroyItemRendering(item);
        }
        if (renderOptions.showBoundingBoxes !== "none") {
          // even though this item doesn't render, we still need to render something to show the bounding box:
          moveSpriteToItemProjection(item, currentRoomContainer, renderOptions);
        }
        continue;
      }

      // it is up the the item to decide if it will rerender
      renderItemIfNeeded(item, gameState, renderOptions);

      const { positionContainer } = item;
      if (
        positionContainer === undefined ||
        !xyzEqual(
          positionContainer[positionContainerPosition],
          item.state.position,
        )
      ) {
        moveSpriteToItemProjection(item, currentRoomContainer, renderOptions);
        itemsHaveMoved = true;
      }
    }
    if (itemsHaveMoved) {
      // re-sort the room's items:
      sortByZPairs(zPairs(objectValues(room.items)), room.items);
    }
    return currentRoomContainer;
  }
};

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  // the last room we rendered - this allows us to track when the room has changed
  // since the last tick so we can set up the change
  let lastRenderedRoom: RoomState<PlanetName, RoomId> | undefined = undefined;
  let lastRenderOptions: RenderOptions<RoomId> | undefined = undefined;

  const worldContainer = new Container();
  worldContainer.label = "world";
  worldContainer.y = amigaLowResPal.height * 0.7;
  app.stage.addChild(worldContainer);

  let roomContainer: Container;

  const hudContainer = new Container();
  // pull the hud up from the bottom of the screen; after this, anything else can render right up to the container's bottom edge
  hudContainer.y = -hudBottomMargin;
  app.stage.addChild(hudContainer);

  const pauseFilter = new RevertColouriseFilter(spritesheetPalette().shadow);

  const updateHud = renderHud(hudContainer);

  const upscaler = upscale(app);
  const handleTick = ({ deltaMS }: Ticker) => {
    //console.time("tick");

    const screenEffectiveSize = upscaler.rescale();
    worldContainer.x = app.renderer.width / upscaler.curUpscale / 2;

    const { renderOptions } = gameState;

    if (gameState.inputState.windowFocus) {
      app.stage.filters = [];
      progressGameState(gameState, deltaMS);

      //console.log("--- 🎨 rendering ---");
      roomContainer = updateWorldRenderingToMatchGameState({
        gameState,
        lastRenderedRoom,
        worldContainer,
        renderOptions,
        lastRenderOptions,
        currentRoomContainer: roomContainer,
      });
    } else {
      app.stage.filters = pauseFilter;
      const roomColor = currentRoom(gameState).color;
      pauseFilter.targetColor = getColorScheme(roomColor).main.original;
    }

    updateHud(gameState, screenEffectiveSize, renderOptions);

    lastRenderedRoom = currentRoom(gameState);
    lastRenderOptions = renderOptions;
    //console.timeEnd("tick");
  };

  return {
    start() {
      app.ticker.add(handleTick);
      return this;
    },
    stop() {
      app.stage.removeChild(worldContainer);
      app.ticker.remove(handleTick);
    },
  };
};
