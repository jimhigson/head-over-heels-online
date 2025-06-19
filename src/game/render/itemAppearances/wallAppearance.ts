import { Container } from "pixi.js";
import { wallTileSize } from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  perpendicularAxisXy,
  directionAxis,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { projectBlockXyzToScreenXy } from "../projections";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { mainPaletteSwapFilter } from "../filters/standardFilters";

export const farWallAppearance = itemAppearanceRenderOnce<"wall">(
  ({
    renderContext: {
      item: { id, config },
      room,
    },
  }) => {
    if (config.direction === "right" || config.direction === "towards") {
      throw new Error(`wall is near: ${id}`);
    }

    const { direction, tiles } = config;

    const alongAxis = perpendicularAxisXy(directionAxis(direction));

    const container = new Container({ label: "wallTiles" });
    for (let i = 0; i < config.tiles.length; i++) {
      // TODO: use callback version of createSprite to create the wall with different textures
      let tileSprite: Container = createSprite({
        textureId: wallTextureId(
          room.planet,
          tiles[i],
          direction,
          room.color.shade === "dimmed",
        ),
        // to match the original, the walls need to be rendered 2px lower than we'd expect. Unfortunately, this
        // means they're outside their bounding box, so it sometimes doesn't work with z-index rendering
        y: 1,
        pivot:
          direction === "away" ?
            {
              x: wallTileSize.w,
              // walls need to be rendered 1px high to match original game (original puts them 1px low, but
              // we already position them (in world space) 2px low to match original rendering while keeping
              // bounding boxes correct
              y: wallTileSize.h + 1,
            }
          : { x: 0, y: wallTileSize.h + 1 },
      });

      const tileRenderPosition: Xy = projectBlockXyzToScreenXy({
        [alongAxis]: i,
      });

      if (room.planet === "moonbase") {
        const animationId = `moonbase.wall.screen.${tiles[i]}.away`;
        // only moonbase has animated walls
        if (isAnimationId(animationId)) {
          tileSprite = new Container({
            children: [tileSprite],
          });
          tileSprite.addChild(
            createSprite({
              animationId,
              randomiseStartFrame: true,
              flipX: direction === "left",
              x: direction === "away" ? -8 : 8,
              y: -23,
            }),
          );
        }
      }

      tileSprite.x += tileRenderPosition.x;
      tileSprite.y += tileRenderPosition.y;

      container.addChild(tileSprite);
      container.filters = mainPaletteSwapFilter(room);
    }

    return container;
  },
);
