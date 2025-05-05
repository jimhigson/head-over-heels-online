import { Container } from "pixi.js";
import { wallTileSize } from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  perpendicularAxisXy,
  directionAxis,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { mainPaletteSwapFilter } from "../filters/standardFilters";
import { projectBlockXyzToScreenXy } from "../projectToScreen";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";

export const wallAppearance = itemAppearanceRenderOnce<"wall">(
  ({
    renderContext: {
      item: {
        id,
        config: { direction, tiles },
      },
      room,
    },
  }) => {
    // TODO: since we no longer have the .renders property on items, we need to return a nothing output if this is invisible
    // - maybe expand output type to be Container | null to allow explicit non-rendering

    if (direction === "right" || direction === "towards") {
      throw new Error(`this wall should be non-rendering ${id}`);
    }

    const alongAxis = perpendicularAxisXy(directionAxis(direction));

    const container = new Container({ label: "wallTiles" });
    for (let i = 0; i < tiles.length; i++) {
      const tileSprite = createSprite({
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
        filter: mainPaletteSwapFilter(room),
      });

      const tileRenderPosition: Xy = projectBlockXyzToScreenXy({
        [alongAxis]: i,
      });

      tileSprite.x += tileRenderPosition.x;
      tileSprite.y += tileRenderPosition.y;

      container.addChild(tileSprite);
    }

    return container;
  },
);
