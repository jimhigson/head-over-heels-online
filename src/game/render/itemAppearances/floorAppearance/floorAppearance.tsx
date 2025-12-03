import { Container, Graphics, type Sprite, TilingSprite } from "pixi.js";

import type { ItemInPlay } from "../../../../model/ItemInPlay";
import type { TextureId } from "../../../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { Subset } from "../../../../utils/subset";
import type { Xy, Xyz } from "../../../../utils/vectors/vectors";
import type { ItemAppearance } from "../ItemAppearance";

import { iterateRoomItems, type RoomState } from "../../../../model/RoomState";
import { zxSpectrumColors } from "../../../../originalGame";
import { assertIsTextureId } from "../../../../sprites/assertIsTextureId";
import { getAmbientSwoppedColour } from "../../../../sprites/spritesheet/variants/currentRoomSpritesheetVariant";
import { getSpriteSheetVariant } from "../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { frac } from "../../../../utils/maths/maths";
import { rangesOverlap } from "../../../../utils/maths/numberPairs";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import {
  addXy,
  addXyz,
  type DirectionXy4,
  originXyz,
  perpendicularAxisXy,
  subXy,
  tangentAxis,
} from "../../../../utils/vectors/vectors";
import { isWallOrDoorFrame } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { ColourClashFilter } from "../../filters/ColourClashFilter";
import { OutlineFilter } from "../../filters/outlineFilter";
import { edgeOriginalGameColour } from "../../gameColours/colourScheme";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { nonRenderingItemFixedZIndex } from "../../sortZ/fixedZIndexes";
import { itemAppearanceRenderOnce } from "../ItemAppearance";
import { renderFloorOverdraws } from "./renderfloorOverdraw";

/**
 * create a rectangle mask for the floor that cuts off anything past the last
 * wall or door frame on the left/right of the room
 * this only really renders on the floor - it could move onto the floor sprite itself
 * - the right way is to render on the floor but only if wall/doorframe ends at the floor's
 * natural edge
 */
const floorLeftRightCutOffMask = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  floorItem: ItemInPlay<"floor", RoomId, RoomItemId>,
): Graphics | undefined => {
  const {
    config: {
      naturalFootprint: {
        aabb: floorNaturalAabb,
        position: floorNaturalPosition,
      },
    },
    state: { position: floorPosition },
  } = floorItem;

  // if (floorItem.id !== "floorCrossR") {
  //   return undefined;
  // }

  const offsetX = projectWorldXyzToScreenX(subXy(originXyz, floorPosition));

  const { left, right } = iterateRoomItems(room.items)
    .filter(isWallOrDoorFrame)
    .filter((item) => {
      const {
        state: { position },
        aabb,
      } = item;

      const itemDirection = item.config.direction;
      // axis going into or out of the room (if a door) or bouncing off the wall
      const intoRoomAxis = tangentAxis(itemDirection);
      // axis along the item:
      const alongItemAxis = perpendicularAxisXy(intoRoomAxis);
      // will this item have to be on the positive or negative side of the axis?
      // 1 for far, 0 for near
      const farSide =
        itemDirection === "away" || itemDirection === "left" ? true : false;

      const floorOrdOnIntoRoomAxis =
        floorNaturalPosition[intoRoomAxis] +
        (farSide ? 1 : 0) * floorNaturalAabb[intoRoomAxis];

      const itemOrdOnIntoRoomAxis =
        position[intoRoomAxis] + (farSide ? 0 : 1) * aabb[intoRoomAxis];

      if (floorOrdOnIntoRoomAxis !== itemOrdOnIntoRoomAxis) {
        return false;
      }

      // they are aligned with an edge - now check if they overlap:
      const overlaps = rangesOverlap(
        position[alongItemAxis],
        position[alongItemAxis] + aabb[alongItemAxis],
        floorNaturalPosition[alongItemAxis],
        floorNaturalPosition[alongItemAxis] + floorNaturalAabb[alongItemAxis],
      );

      return overlaps;
    })
    .reduce(
      (
        acc,
        {
          aabb,
          renderAabb,
          renderAabbOffset,
          state: { position },
          fixedZIndex,
        },
      ) => {
        const nonRendering = fixedZIndex === nonRenderingItemFixedZIndex;
        const visAabb = nonRendering ? aabb : (renderAabb ?? aabb);
        const visPosition = addXyz(position, renderAabbOffset ?? originXyz);

        const itemLeft =
          projectWorldXyzToScreenX(
            addXyz(visPosition, {
              x: visAabb.x,
              // non-rendering items are a tricky case, and usually they have no impact
              // since every floor will normally be visually bookended in x direction by visible
              // items. What we really want is the point where it touches the edge of the floor
              // in this case, and this usually gets it right: - see moonbase_home_central in
              // sequel
              y: nonRendering ? visAabb.y : 0,
            }),
          ) + offsetX;
        const itemRight =
          projectWorldXyzToScreenX(
            addXyz(visPosition, {
              x: nonRendering ? visAabb.x : 0,
              y: visAabb.y,
            }),
          ) + offsetX;

        return {
          left: Math.min(acc.left, itemLeft),
          right: Math.max(acc.right, itemRight),
        };
      },
      {
        // left: projectWorldXyzToScreenX({ x: floorAabb.x }),
        // right: projectWorldXyzToScreenX({ y: floorAabb.y }),
        left: 9999,
        right: -9999,
      },
    );

  if (right > left) {
    return new Graphics()
      .rect(left, -500, right - left, 500)
      .fill("rgba(255, 0, 0)");
  }
};

const edgeSprites = ({
  direction,
  times,
  position,
  colourised,
}: {
  direction: Subset<DirectionXy4, "right" | "towards">;
  times: Partial<Xy> | undefined;
  position: Partial<Xyz>;
  colourised?: boolean;
}): Container<Sprite> => {
  return createSprite({
    label: `floorEdge(${direction})`,
    textureId: `floorEdge.${direction}`,
    times,
    ...projectWorldXyzToScreenXy(position),
    spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
  }) as Container<Sprite>;
};

const createColourClash = ({
  room,
  xSize,
  ySize,
  y,
}: {
  room: RoomState<string, string>;
  xSize: number;
  ySize: number;
  y: number;
}) => {
  const container = new Container({
    label: "floorColourClash",
  });

  const rightColour = edgeOriginalGameColour(room, "right");
  const rightContainer = new Container({
    label: "floorColourClash.right",
    filters: [new ColourClashFilter(rightColour)],
  });
  for (let i = 0; i <= ySize; i++) {
    const screenXy = projectBlockXyzToScreenXy({ x: 0, y: i, z: 0 });
    const g = new Graphics()
      .rect(screenXy.x - (i === 0 ? 0 : 8), screenXy.y, 8 * 3, 8)
      .fill(rightColour);
    rightContainer.addChild(g);
  }
  container.addChild(rightContainer);

  const towardsColour = edgeOriginalGameColour(room, "towards");
  const towardsContainer = new Container({
    label: "floorColourClash.towards",
    filters: [new ColourClashFilter(towardsColour)],
  });
  for (let i = 0; i <= xSize; i++) {
    const screenXy = projectBlockXyzToScreenXy({ x: i, y: 0, z: 0 });
    const g = new Graphics()
      .rect(screenXy.x - 16, screenXy.y, 8 * (i === 0 ? 2 : 3), 8)
      .fill(towardsColour);
    towardsContainer.addChild(g);
  }
  container.addChild(towardsContainer);

  container.y = y;
  return container;
};

export const floorAppearance: ItemAppearance<"floor"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        room,
        item: floorItem,
        general: { colourised, pixiRenderer },
        colourClashLayer,
        frontLayer,
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
      const spritesRenderContainer = new Container({ label: "sprites" });

      const tilesLeft = projectWorldXyzToScreenXy({ ...aabb, y: 0 });
      const tilesBottom = projectWorldXyzToScreenXy({ ...aabb, x: 0, y: 0 });
      const tilesRight = projectWorldXyzToScreenXy({ ...aabb, x: 0 });
      const tilesTop = projectWorldXyzToScreenXy(aabb);

      const outlineFilter = new OutlineFilter({
        color:
          colourised ?
            getAmbientSwoppedColour("pureBlack")
          : zxSpectrumColors.black,
        width: 1,
      });

      if (floorType !== "none") {
        const tilesContainer = new Container({
          label: "tiles",
        });

        const floorTileTextureId: TextureId =
          floorType === "deadly" ?
            `generic${shade === "dimmed" ? ".dark" : ""}.floor.deadly`
          : `${floorConfig.scenery}${shade === "dimmed" ? ".dark" : ""}.floor`;
        const tileTexture = getSpriteSheetVariant(
          colourised ? "for-current-room" : "uncolourised",
        ).textures[floorTileTextureId];

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
          x: frac(tileOffsetVector.x / blockSizePx.x),
          y: frac(tileOffsetVector.y / blockSizePx.x),
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
          texture: tileTexture,
          tilePosition,
          ...tilingSpriteRect,
        });
        tilesContainer.addChild(floorTilesTilingSprite);
        tilesContainer.addChild(
          renderFloorOverdraws(floorItem, room, colourised),
        );

        const tilesMask = new Graphics()
          // top
          .moveTo(tilesTop.x, tilesTop.y)
          // right
          .lineTo(tilesRight.x, tilesRight.y)
          .lineTo(tilesRight.x, tilesRight.y + 3) // adding takes tiles closer to the floor edge, to match original game
          // bottom
          .lineTo(tilesBottom.x, tilesBottom.y + 3)
          // left
          .lineTo(tilesLeft.x, tilesLeft.y + 3)
          .lineTo(tilesLeft.x, tilesLeft.y)
          .fill({ color: 0xff0000, alpha: 1 });

        // firefox is fussy about using graphics as sprites, so pre-render to a sprite+texture
        // first:
        const tilesMaskSprite = renderContainerToSprite(
          pixiRenderer,
          tilesMask,
        );
        tilesMask.destroy();

        tilesContainer.addChild(tilesMaskSprite);
        tilesContainer.mask = tilesMaskSprite;

        // outline the tiles. This helps where floors are floating in the room (in remake only) - otherwise they are
        // the only item without a black outline. Also fills the gap between the tiles and the floor edge in with some
        // extra black pixels
        // the output from a mask doesn't get the filter applied, so to put an outline around the floor tiles, wrap them in an
        // extra container.
        const tilesOutline = new Container({ children: [tilesContainer] });
        tilesOutline.filters = outlineFilter;

        spritesRenderContainer.addChild(tilesOutline);
      }

      {
        const floorEdgeContainer = new Container({
          label: `edges`,
        });

        if (floorType === "none") {
          const overDrawFallenItemsGraphic = new Graphics()
            // right
            .moveTo(tilesRight.x, tilesRight.y + 10)
            // right below:
            .lineTo(tilesRight.x, tilesRight.y + 100)

            // left below
            .lineTo(tilesLeft.x, tilesLeft.y + 100)

            // left
            .lineTo(tilesLeft.x, tilesLeft.y + 10)

            // bottom
            .lineTo(tilesBottom.x, tilesBottom.y + 10)
            .fill(0x000000);
          const overDrawFallenItemsGraphicSprite = renderContainerToSprite(
            pixiRenderer,
            overDrawFallenItemsGraphic,
          );
          // cover up anything that falls below the floor (ie, monsters, blocks that get pushed or walk out)
          // but put this on the front layer so it doesn't get the room palette swap filter, which would change
          // it from pure black, whereas it needs to appear as if it were in the black background
          container.addChild(overDrawFallenItemsGraphicSprite);
          frontLayer.attach(overDrawFallenItemsGraphicSprite);
          overDrawFallenItemsGraphic.destroy();
        }

        const edgeTilesY = Math.ceil(aabb.y / blockSizePx.x);
        floorEdgeContainer.addChild(
          edgeSprites({
            direction: "right",
            times: { y: edgeTilesY },
            position: { z: aabb.z },
            colourised,
          }),
        );
        const edgeTilesX = Math.ceil(aabb.x / blockSizePx.x);
        floorEdgeContainer.addChild(
          edgeSprites({
            direction: "towards",
            times: { x: edgeTilesX },
            position: { z: aabb.z },
            colourised,
          }),
        );

        spritesRenderContainer.addChild(floorEdgeContainer);

        const cutoffMask = floorLeftRightCutOffMask(room, floorItem);
        if (cutoffMask !== undefined) {
          // rendering to a sprite first works around an issue in
          // Firefox where floors are rendered blank. Otherwise, there's no need to do this,
          // but this is only done once per floor (not every frame) so it isn't too worrysome to
          // make a texture we immediately throw away
          const cutoffSprite = renderContainerToSprite(
            pixiRenderer,
            cutoffMask,
          );
          spritesRenderContainer.addChild(cutoffSprite);
          spritesRenderContainer.mask = cutoffSprite;
          cutoffMask.destroy();
        }

        container.addChild(
          renderContainerToSprite(pixiRenderer, spritesRenderContainer),
        );

        spritesRenderContainer.destroy({
          // destroying children is needed to free mem used for intermediate textures
          children: true,
        });
        outlineFilter.destroy(false /* do not destroy programs */);

        if (!colourised) {
          const colourClashContainer = createColourClash({
            xSize: edgeTilesX,
            ySize: edgeTilesY,
            y: -aabb.z + 1,
            room,
          });

          container.addChild(colourClashContainer);
          colourClashLayer!.attach(colourClashContainer);
        }
      }

      return container;
    },
  );
