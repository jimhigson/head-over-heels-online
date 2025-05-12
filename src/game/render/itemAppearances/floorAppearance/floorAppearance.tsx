import { Container, Graphics } from "pixi.js";
import { type TextureId } from "../../../../sprites/spriteSheetData";
import { mainPaletteSwapFilter } from "../../filters/standardFilters";
import { createSprite } from "../../createSprite";
import { moveContainerToBlockXyz } from "../../projectToScreen";
import { floorRenderExtent } from "../../renderExtent";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";

import type { ItemAppearance } from "../ItemAppearance";
import { itemAppearanceRenderOnce } from "../ItemAppearance";
import type { DirectionXy4 } from "../../../../utils/vectors/vectors";
import { originXy } from "../../../../utils/vectors/vectors";
import { renderFloorOverdraws } from "./renderfloorOverdraw";
import { findNonPerimeterWalls } from "./findNonPerimeterWalls";
import { findExtraWallRanges } from "./findExtraWallRanges";
import { createFloorOverdrawForExtraWalls } from "./createFloorOverdrawForExtraWalls";

export type SidesWithDoors = Partial<Record<DirectionXy4, true>>;

export const floorAppearance: ItemAppearance<"floor"> =
  itemAppearanceRenderOnce(({ renderContext: { room, item: subject } }) => {
    const {
      blockXMin,
      blockYMin,
      blockXMax,
      blockYMax,
      sidesWithDoors,
      edgeLeftX,
      edgeRightX,
    } = floorRenderExtent(room.roomJson);
    const blockXExtent = blockXMax - blockXMin;
    const blockYExtent = blockYMax - blockYMin;

    const {
      floor: floorType,
      color: { shade },
      roomJson,
    } = room;

    const container = new Container({ label: `floor(${room.id})` });

    if (floorType !== "none") {
      const floorTileTexture: TextureId =
        floorType === "deadly" ?
          `generic${shade === "dimmed" ? ".dark" : ""}.floor.deadly`
        : `${floorType}${shade === "dimmed" ? ".dark" : ""}.floor`;

      const tilesContainer = new Container();

      // each sprite covers enough graphics for 2 blocks. we only need to
      // render a sprite for the 'white' squares on the chessboard (render or
      // not according to a checkerboard pattern)
      for (let ix = -1; ix <= blockXMax + 2; ix++) {
        for (let iy = (ix % 2) - 1; iy <= blockYMax + 2; iy += 2) {
          tilesContainer.addChild(
            moveContainerToBlockXyz(
              {
                x: ix + (sidesWithDoors.right ? -0.5 : 0),
                y: iy + (sidesWithDoors.towards ? -0.5 : 0),
              },
              createSprite({
                textureId: floorTileTexture,
              }),
            ),
          );
        }
      }

      tilesContainer.addChild(
        renderFloorOverdraws(roomJson, { x: blockXMin, y: blockYMin }),
      );

      const tilesMask = new Graphics()
        // Add the rectangular area to show
        .poly(
          [
            originXy,
            projectBlockXyzToScreenXy({ x: blockXExtent, y: 0 }),
            projectBlockXyzToScreenXy({ x: blockXExtent, y: blockYExtent }),
            projectBlockXyzToScreenXy({ x: 0, y: blockYExtent }),
          ],
          true,
        )
        .fill({ color: 0xff0000, alpha: 0.5 })
        // use a stroke to draw more than is strictly on the floor for the purpose of extending
        // under the pixelated edges of other sprites that are otherdrawn - otherwise the edge
        // would be a very smooth diagonal on modern screens
        .stroke({ width: 8 });

      tilesContainer.addChild(tilesMask);
      tilesContainer.filters = mainPaletteSwapFilter(room);
      tilesContainer.mask = tilesMask;

      container.addChild(tilesContainer);
    }

    const nonPerimeterWalls = findNonPerimeterWalls(roomJson);

    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMaskCutOffLeftAndRight = new Graphics()
      // Add the rectangular area to show
      .poly(
        [
          { x: edgeLeftX, y: 16 },
          { x: edgeLeftX, y: -999 },
          { x: edgeRightX, y: -999 },
          { x: edgeRightX, y: 16 },
        ],
        true,
      )
      .fill(0xffff00);

    container.addChild(floorMaskCutOffLeftAndRight);

    const extraWallRanges = findExtraWallRanges(nonPerimeterWalls);

    if (extraWallRanges !== undefined) {
      try {
        const floorOverdrawForExtraWalls = createFloorOverdrawForExtraWalls({
          extraWallRanges,
          blockXMin,
          blockYMin,
        });
        container.addChild(floorOverdrawForExtraWalls);
      } catch (e) {
        throw new Error(
          `could not create floor overdraw for extra walls ${JSON.stringify(extraWallRanges, null, 2)}`,
          {
            cause: e,
          },
        );
      }
    }

    container.mask = floorMaskCutOffLeftAndRight;

    // render on the top surface of the floor:
    container.y = -subject.aabb.z;

    // the floor never changes rendering so can cache to optimise:
    container.cacheAsTexture(true);

    return container;
  });
