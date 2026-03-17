import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { CollideableItem } from "../../collision/aabbCollision";

import { roomSpatialIndexKey } from "../../../model/RoomState";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { isEmpty } from "../../../utils/iterators/isEmpty";
import { renderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import {
  perpendicularAxisXy,
  tangentAxis,
} from "../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { isDoorframeOrLegs } from "../../physics/itemPredicates";
import { veryHighZ } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { projectBlockXyzToScreenXy } from "../projections";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";

const sampleBuffer: CollideableItem = {
  aabb: { x: 1, y: 1, z: veryHighZ },
  id: "farWallAppearanceSampleBuffer",
  state: { position: { x: 0, y: 0, z: 0 } },
};

export const farWallAppearance = itemAppearanceRenderOnce<"wall">(
  ({
    renderContext: {
      general: { pixiRenderer, spriteOption },
      item,
      room,
    },
  }) => {
    const { id, config } = item;

    if (config.direction === "right" || config.direction === "towards") {
      throw new Error(`wall is near: ${id}`);
    }

    const { direction, tiles } = config;

    const alongAxis = perpendicularAxisXy(tangentAxis(direction));

    const wallTilesContainer = new Container({ label: "wallTiles" });
    const wallAnimationsContainer = new Container({ label: "wallAnimations" });
    for (let i = 0; i < config.tiles.length; i++) {
      const tileRenderPosition: Xy = projectBlockXyzToScreenXy({
        [alongAxis]: i,
      });

      const tileRenderPivot =
        direction === "away" ?
          {
            x: wallTileSize.w,
            y: wallTileSize.h,
          }
        : { x: 0, y: wallTileSize.h };

      const spritesheetVariant =
        spriteOption.uncolourised ? "uncolourised" : "for-current-room";
      const spritesheet = getSpriteSheetVariant(spritesheetVariant);

      const wallTileSprite = createSprite({
        textureId: wallTextureId(
          room.planet,
          tiles[i],
          direction,
          room.color.shade === "dimmed",
          spritesheet.data,
        ),
        ...tileRenderPosition,
        pivot: tileRenderPivot,
        spritesheet,
      });
      // TODO: use callback version of createSprite to create the wall with different textures
      wallTilesContainer.addChild(wallTileSprite);

      if (room.planet === "moonbase") {
        const animationId = `moonbase.wall.screen.${tiles[i]}.away`;
        // only moonbase has animated walls
        if (isAnimationId(animationId, spritesheet.data)) {
          wallAnimationsContainer.addChild(
            createSprite({
              animationId,
              randomiseStartFrame: `${id}${i}`,
              flipX: direction === "left",
              x: tileRenderPosition.x + (direction === "away" ? -8 : 8),
              y: tileRenderPosition.y - 23,
              spritesheet,
            }),
          );
        }

        if (i === config.tiles.length - 1 && config.tiles.at(-1) !== "coil") {
          const spatialIndex = room[roomSpatialIndexKey];

          sampleBuffer.state.position.x = item.state.position.x + item.aabb.x;
          sampleBuffer.state.position.y = item.state.position.y + item.aabb.y;

          const doorAtEndOfWall = !isEmpty(
            collisionItemWithIndex(
              sampleBuffer,
              spatialIndex,
              isDoorframeOrLegs,
            ),
          );

          if (doorAtEndOfWall) {
            const isDarkStr = room.color.shade === "dimmed" ? ".dark" : "";

            wallTilesContainer.addChild(
              createSprite({
                textureId: `moonbase.wallDoorTransition.${direction}${isDarkStr}`,
                ...tileRenderPosition,
                pivot: tileRenderPivot,
                spritesheetVariant:
                  spriteOption.uncolourised ? "uncolourised" : (
                    "for-current-room"
                  ),
              }),
            );
            const maskSprite = createSprite({
              textureId: `moonbase.wallDoorTransition.${direction}.mask`,
              ...tileRenderPosition,
              pivot: tileRenderPivot,
              spritesheetVariant: "original",
            });
            wallTilesContainer.addChild(maskSprite);
            wallTileSprite.setMask({ mask: maskSprite, inverse: true });
          }
        }
      }
    }

    const mainContainer = new Container({ label: "wallAppearance" });
    //since .cacheAsTexture() is buggy, much safer to replace the container
    //entirely with a single sprite:
    mainContainer.addChild(
      renderContainerToSprite(pixiRenderer, wallTilesContainer),
    );
    wallTilesContainer.destroy({ children: true });
    if (wallAnimationsContainer.children.length > 0) {
      // only add animations if there are any:
      mainContainer.addChild(wallAnimationsContainer);
    }

    return mainContainer;
  },
);
