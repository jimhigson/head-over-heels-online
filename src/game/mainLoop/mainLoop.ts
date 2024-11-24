import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItem";
import type { PlanetName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";
import { renderCurrentRoom } from "../render/renderCurrentRoom";
import type { RenderOptions } from "../RenderOptions";
import { objectValues } from "iter-tools";
import { amigaLowResPal } from "@/originalGame";
import { upscale } from "../render/upscale";
import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { itemNeedsRerender } from "../render/itemNeedsRerender";
import { xyzEqual } from "@/utils/vectors/vectors";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { spritesheetPalette } from "@/sprites/samplePalette";
import { colorScheme } from "@/hintColours";
import { sortByZPairs, zPairs } from "../render/sortZ/sortItemsByDrawOrder";

const updateWorldRenderingToMatchState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  lastRenderedRoom: RoomState<PlanetName, RoomId> | undefined,
  worldContainer: Container,
  renderOptions: RenderOptions<RoomId>,
) => {
  const room = currentRoom(gameState);

  if (room !== lastRenderedRoom) {
    // this fails if the room was already rendered - we don't remove renderings if the other player is still in the other room!
    console.log(
      "will render from scratch",
      room.id,
      "since we currently have",
      lastRenderedRoom?.id,
    );
    // the room is not currently rendered - render from scratch
    worldContainer.removeChildren();
    worldContainer.label = "world";
    const roomContainer = renderCurrentRoom(gameState, renderOptions);
    worldContainer.addChild(roomContainer);
  } else {
    // the room is already rendered but needs updating
    let itemsHaveMoved = false;
    for (const item of objectValues(room.items)) {
      if (!item.renders) {
        continue;
      }

      if (itemNeedsRerender(item)) {
        //console.log("rerendering item", item.id);
        renderItem(item, gameState);
      }
      if (
        item.lastRenderedState === undefined ||
        !xyzEqual(item.lastRenderedState.position, item.state.position)
      ) {
        /*console.log(
          "repositioning item",
          item.id,
          item.lastRenderedState?.position,
          "->",
          item.state.position,
        );*/
        moveSpriteToItemProjection(item);
        itemsHaveMoved = true;
      }
    }
    if (itemsHaveMoved) {
      // re-sort the room's items:
      sortByZPairs(zPairs(objectValues(room.items)), room.items);
    }
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

  const hudContainer = new Container();
  app.stage.addChild(hudContainer);

  const pauseFilter = new RevertColouriseFilter(spritesheetPalette().shadow);

  const updateHud = renderHud(hudContainer);

  const upscaler = upscale(app);
  const handleTick = ({ deltaMS }: Ticker) => {
    //console.time("tick");

    upscaler.rescale();
    worldContainer.x = app.renderer.width / upscaler.curUpscale / 2;

    const { renderOptions } = gameState;

    if (lastRenderOptions !== renderOptions) {
      console.log(
        `render options changed!          
          renderOptions: ${lastRenderOptions} -> ${renderOptions}`,
      );

      // removing the lastRenderedRoom will force a re-render after the physics are done
      lastRenderedRoom = undefined;
      lastRenderOptions = renderOptions;
    }

    if (gameState.inputState.windowFocus) {
      app.stage.filters = [];
      progressGameState(gameState, deltaMS);

      updateWorldRenderingToMatchState(
        gameState,
        lastRenderedRoom,
        worldContainer,
        renderOptions,
      );
      updateHud(gameState);
    } else {
      app.stage.filters = pauseFilter;
      pauseFilter.targetColor =
        colorScheme[currentRoom(gameState).color].main.basic;
    }

    lastRenderedRoom = currentRoom(gameState);
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
