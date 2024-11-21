import type { Container } from "pixi.js";
import { createSprite } from "./game/render/createSprite";
import { doorTexture } from "./game/render/itemAppearances/doorAppearance";
import { projectBlockXyzToScreenXy } from "./game/render/projectToScreen";
import type { UnknownRoomState } from "./model/modelTypes";
import { doorTexturePivot } from "./sprites/spritePivots";
import { blockSizePx } from "./sprites/spritePivots";
import { edgePaletteSwapFilters } from "./game/render/filters/paletteSwapFilters";
import type { Xy } from "./utils/vectors";
import {
  perpendicularAxisXy,
  doorAlongAxis,
  originXy,
  addXy,
} from "./utils/vectors";
import type { ItemInPlay } from "./model/ItemInPlay";
import { iterateToContainer } from "./game/iterateToContainer";
import type { GameState } from "./game/gameState/GameState";
import { currentRoom } from "./game/gameState/GameState";
import type { PlanetName } from "./sprites/planets";

function* doorLegsGenerator(
  { config: { direction, inHiddenWall, height } }: ItemInPlay<"doorLegs">,
  room: UnknownRoomState,
): Generator<Container> {
  const axis = doorAlongAxis(direction);

  // drag legs etc
  const pivotX = axis === "y" ? 0 : 16;

  function* legGenerator(offset: Xy): Generator<Container> {
    if (inHiddenWall) {
      if (height !== 0) {
        //draw the 'floating' (no legs) threshold:
        const pivotX = axis === "x" ? 18 : 8;

        const sprite = createSprite({
          pivot: { x: pivotX, y: 12 },
          texture: `generic.door.threshold.${axis}`,
          ...addXy(offset, {
            y: -blockSizePx.h * height,
          }),
        });
        sprite.filters = edgePaletteSwapFilters(
          room,
          axis === "x" ? "towards" : "right",
        );
        yield sprite;
      }
    } else {
      yield createSprite({
        pivot: { x: pivotX, y: 12 },
        texture: "generic.door.legs.base",
        ...addXy(offset, {
          y: height,
        }),
      });

      for (let h = 1; h < height; h++) {
        yield createSprite({
          pivot: { x: pivotX, y: 9 },
          texture: "generic.door.legs.pillar",
          ...addXy(offset, {
            y: -h * blockSizePx.h,
          }),
        });
      }

      yield createSprite({
        pivot: { x: pivotX, y: blockSizePx.h * height + 15 },
        texture: `generic.door.legs.threshold.${axis}`,
        ...offset,
      });
    }
  }

  yield* legGenerator(projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }));
  yield* legGenerator(originXy);
}
export const doorLegsAppearance = <RoomId extends string>(
  doorLegsItem: ItemInPlay<"doorLegs", PlanetName, RoomId>,
  gameState: GameState<RoomId>,
) => {
  return iterateToContainer(
    doorLegsGenerator(doorLegsItem, currentRoom(gameState)),
  );
};

function* doorFrameGenerator(
  {
    config: { direction, inHiddenWall, nearness },
    state: { position },
  }: ItemInPlay<"doorFrame">,
  room: UnknownRoomState,
): Generator<Container> {
  const axis = doorAlongAxis(direction);
  const { z } = position;

  if (!inHiddenWall) {
    // in a drawn wall:
    if (z === 0) {
      const offset = projectBlockXyzToScreenXy({
        [perpendicularAxisXy(axis)]: 0.5,
      });

      if (nearness === "far") {
        // hide the floor behind the door
        yield createSprite({
          anchor: { x: 0, y: 1 },
          flipX: axis === "x",
          texture: "generic.wall.overdraw",
          ...offset,
        });
      }
    }
  }

  // draw the actual door frame
  yield createSprite({
    texture: doorTexture(room, axis, nearness),
    pivot: doorTexturePivot[nearness][axis],
  });
}
export const doorFrameAppearance = <RoomId extends string>(
  doorLegsItem: ItemInPlay<"doorFrame", PlanetName, RoomId>,
  gameState: GameState<RoomId>,
) => {
  return iterateToContainer(
    doorFrameGenerator(doorLegsItem, currentRoom(gameState)),
  );
};
