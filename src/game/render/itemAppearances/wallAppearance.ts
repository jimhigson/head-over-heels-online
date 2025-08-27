import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";

import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { wallTileSize } from "../../../sprites/textureSizes";
import { renderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import {
  perpendicularAxisXy,
  tangentAxis,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { mainPaletteSwapFilter } from "../filters/standardFilters";
import { projectBlockXyzToScreenXy } from "../projections";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";

export const farWallAppearance = itemAppearanceRenderOnce<"wall">(
  ({
    renderContext: {
      general: { pixiRenderer },
      item: { id, config },
      room,
    },
  }) => {
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

      // TODO: use callback version of createSprite to create the wall with different textures
      wallTilesContainer.addChild(
        createSprite({
          textureId: wallTextureId(
            room.planet,
            tiles[i],
            direction,
            room.color.shade === "dimmed",
          ),
          ...tileRenderPosition,
          pivot:
            direction === "away" ?
              {
                x: wallTileSize.w,
                y: wallTileSize.h,
              }
            : { x: 0, y: wallTileSize.h },
        }),
      );

      if (room.planet === "moonbase") {
        const animationId = `moonbase.wall.screen.${tiles[i]}.away`;
        // only moonbase has animated walls
        if (isAnimationId(animationId)) {
          wallAnimationsContainer.addChild(
            createSprite({
              animationId,
              randomiseStartFrame: true,
              flipX: direction === "left",
              x: tileRenderPosition.x + (direction === "away" ? -8 : 8),
              y: tileRenderPosition.y - 23,
            }),
          );
        }
      }
    }

    const mainContainer = new Container({ label: "wallAppearance" });
    // since .cacheAsTexture() is buggy, much safer to replace the container
    // entirely with a single sprite:
    mainContainer.addChild(
      renderContainerToSprite(pixiRenderer, wallTilesContainer),
    );
    if (wallAnimationsContainer.children.length > 0) {
      // only add animations if there are any:
      mainContainer.addChild(wallAnimationsContainer);
    }

    mainContainer.filters = mainPaletteSwapFilter(room);
    return mainContainer;
  },
);
