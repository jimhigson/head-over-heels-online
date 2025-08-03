import { Container } from "pixi.js";
import { wallTileSize } from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  perpendicularAxisXy,
  tangentAxis,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { projectBlockXyzToScreenXy } from "../projections";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { mainPaletteSwapFilter } from "../filters/standardFilters";
import { renderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";

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
          // to match the original, the walls need to be rendered 2px lower than we'd expect. Unfortunately, this
          // means they're outside their bounding box, so it sometimes doesn't work with z-index rendering
          //y: 1,
          ...tileRenderPosition,
          pivot:
            direction === "away" ?
              {
                x: wallTileSize.w,
                // walls need to be rendered 1px high to match original game - original puts them 1px low, but
                // we already position them (in world space) 2px low to match original rendering while keeping
                // bounding boxes correct
                y: wallTileSize.h + 1,
              }
            : { x: 0, y: wallTileSize.h + 1 },
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
              y: tileRenderPosition.y - 24,
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
