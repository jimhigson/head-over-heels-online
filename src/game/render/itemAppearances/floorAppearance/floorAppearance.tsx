import { Container, Graphics, TilingSprite } from "pixi.js";
import { type TextureId } from "../../../../sprites/spriteSheetData";
import {
  edgePaletteSwapFilters,
  floorPaletteSwapFilter,
} from "../../filters/standardFilters";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../../projections";

import type { ItemAppearance } from "../ItemAppearance";
import { itemAppearanceRenderOnce } from "../ItemAppearance";
import type { Xy, Xyz } from "../../../../utils/vectors/vectors";
import {
  addXy,
  subXy,
  type DirectionXy4,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../../sprites/spritePivots";
import { frac } from "../../../../utils/maths/maths";
import { loadedSpriteSheet } from "../../../../sprites/spriteSheet";
import { renderFloorOverdraws } from "./renderfloorOverdraw";
import { assertIsTextureId } from "../../../../sprites/assertIsTextureId";
import type { Subset } from "../../../../utils/subset";
import type { RoomState } from "../../../../model/RoomState";
import { createSprite } from "../../createSprite";

export type SidesWithDoors = Partial<Record<DirectionXy4, true>>;

const edgeSide = ({
  colourised,
  direction,
  room,
  times,
  position,
}: {
  colourised: boolean;
  direction: Subset<DirectionXy4, "right" | "towards">;
  room: RoomState<string, string>;
  times: Partial<Xy> | undefined;
  position: Partial<Xyz>;
}) => {
  return createSprite({
    label: `floorEdge(${direction})`,
    textureId: `floorEdge.${direction}`,
    ...projectWorldXyzToScreenXy(position),
    times,
    filter: edgePaletteSwapFilters(room, direction, colourised),
  });
};

export const floorAppearance: ItemAppearance<"floor"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        room,
        item: floorItem,
        general: { colourised },
        uncolourisedLayer,
      },
    }) => {
      const {
        color: { shade },
      } = room;

      const {
        config: floorConfig,
        state: { position },
        aabb,
      } = floorItem;

      const { floorType, naturalFootprint } = floorConfig;

      const container = new Container({ label: "floorAppearance" });

      const tilesLeft = projectWorldXyzToScreenXy({ ...aabb, y: 0 });
      const tilesBottom = projectWorldXyzToScreenXy({ ...aabb, x: 0, y: 0 });
      const tilesRight = projectWorldXyzToScreenXy({ ...aabb, x: 0 });
      const tilesTop = projectWorldXyzToScreenXy(aabb);

      if (floorType !== "none") {
        const tilesContainer = new Container({
          label: "tiles",
        });

        const floorTileTextureId: TextureId =
          floorType === "deadly" ?
            `generic${shade === "dimmed" ? ".dark" : ""}.floor.deadly`
          : `${floorConfig.scenery}${shade === "dimmed" ? ".dark" : ""}.floor`;
        const texture = loadedSpriteSheet().textures[floorTileTextureId];

        try {
          assertIsTextureId(floorTileTextureId);
        } catch (e) {
          throw new Error(
            `no floor textureId for floorType: ${floorType}, shade: ${shade}`,
            {
              cause: e,
            },
          );
        }

        // aligning floor tiles, we have three goals:
        //   1: matching the original game, and
        //   2: so that the floor tiles and wall tiles are aligned
        //   3: so that rooms with multiple floors have the tiles lining up

        /* for deciding the offset of the floor tiles, only the towards/left (near side)
           doors count. Find how much we were offset by from the natural position when 
           the floor was loaded*/
        const tileOffsetVector = subXy(naturalFootprint.position, position);

        const tileOffsetBlocks = {
          x: frac(tileOffsetVector.x / blockSizePx.w),
          y: frac(tileOffsetVector.y / blockSizePx.w),
        };

        // it is safe to add extra since the mask will cut off any excess.
        // safer to draw a bit more than not enough.
        const tilesVerticalExtra = 8;

        const tilingSpriteRect = {
          x: tilesLeft.x,
          y: tilesTop.y - tilesVerticalExtra,
          width: tilesRight.x - tilesLeft.x,
          height: tilesBottom.y - tilesTop.y + 2 * tilesVerticalExtra,
        };

        const tilePosition = subXy(
          projectBlockXyzToScreenXy(
            addXy(tileOffsetBlocks, { x: 0.5, y: 0.5 }),
          ),
          // origin of the floor is at the bottom of its thickness,
          // so adjust in y to bring to the top
          { y: aabb.z },
          // tilePosition in pixijs is relative to the top-left corner
          // of the tiling sprite, so we need to adjust it to be relative
          // to the left/towards/top corner of the floor
          tilingSpriteRect,
        );

        const floorTilesTilingSprite = new TilingSprite({
          texture,
          tilePosition,
          ...tilingSpriteRect,
        });
        tilesContainer.addChild(floorTilesTilingSprite);
        tilesContainer.addChild(renderFloorOverdraws(floorItem, room));

        const tilesMask = new Graphics()
          .moveTo(tilesTop.x - 1, tilesTop.y)
          .lineTo(tilesTop.x, tilesTop.y)
          .lineTo(tilesTop.x + 1, tilesTop.y)
          // right
          .lineTo(tilesRight.x + 1, tilesRight.y)
          .lineTo(tilesRight.x + 1, tilesRight.y + 2)
          // bottom
          .lineTo(tilesBottom.x + 1, tilesBottom.y + 2)
          .lineTo(tilesBottom.x - 1, tilesBottom.y + 2)
          .lineTo(tilesLeft.x - 1, tilesLeft.y + 2)
          // left
          .lineTo(tilesLeft.x - 1, tilesLeft.y)
          .lineTo(tilesLeft.x - 1, tilesLeft.y)
          .fill({ color: 0xff0000, alpha: 0.5 });

        tilesContainer.addChild(tilesMask);
        tilesContainer.mask = tilesMask;

        tilesContainer.filters = floorPaletteSwapFilter(room);

        tilesContainer.cacheAsTexture(true);

        container.addChild(tilesContainer);
      }

      {
        const floorEdgeContainer = new Container({
          label: `edges`,
        });

        if (floorType === "none") {
          // cover up anything that falls below the floor (ie, monsters, blocks that get pushed or walk out)
          floorEdgeContainer.addChild(
            new Graphics()
              // right
              .moveTo(tilesRight.x, tilesRight.y + 8)
              // right below:
              .lineTo(tilesRight.x, tilesRight.y + 100)

              // left below
              .lineTo(tilesLeft.x, tilesLeft.y + 100)

              // left
              .lineTo(tilesLeft.x, tilesLeft.y + 8)

              // bottom
              .lineTo(tilesBottom.x, tilesBottom.y + 8)
              .fill(0x000000),
          );
        }

        if (!floorConfig.skipRightEdge) {
          floorEdgeContainer.addChild(
            edgeSide({
              colourised,
              direction: "right",
              room,
              times: { y: Math.ceil(aabb.y / blockSizePx.w) },
              position: { z: aabb.z },
            }),
          );
        }
        if (!floorConfig.skipTowardsEdge) {
          floorEdgeContainer.addChild(
            edgeSide({
              colourised,
              direction: "towards",
              room,
              times: { x: Math.ceil(aabb.x / blockSizePx.w) },
              position: { z: aabb.z },
            }),
          );
        }

        floorEdgeContainer.cacheAsTexture(true);

        uncolourisedLayer.attach(floorEdgeContainer);

        container.addChild(floorEdgeContainer);
      }

      return container;
    },
  );
