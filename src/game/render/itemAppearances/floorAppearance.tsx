import { Container, Graphics } from "pixi.js";
import { type TextureId } from "../../../sprites/spriteSheet";
import {
  edgePaletteSwapFilters,
  mainPaletteSwapFilter,
} from "../filters/paletteSwapFilters";
import { createSprite } from "../createSprite";
import { moveContainerToBlockXyz } from "../projectToScreen";
import { floorRenderExtent } from "../renderExtent";
import { projectBlockXyzToScreenXy } from "../projectToScreen";
import { originXy, type Direction4Xy } from "@/utils/vectors/vectors";
import type { ItemAppearance } from "./appearanceUtils";
import { renderOnce } from "./appearanceUtils";

export type SidesWithDoors = Partial<Record<Direction4Xy, true>>;

export const floorAppearance: ItemAppearance<"floor"> = renderOnce(
  ({ room }) => {
    const { blockXMin, blockYMin, blockXMax, blockYMax, sidesWithDoors } =
      floorRenderExtent(room.roomJson);
    const blockXExtent = blockXMax - blockXMin;
    const blockYExtent = blockYMax - blockYMin;

    const {
      floor: floorType,
      color: { shade },
    } = room;

    const mainContainer = new Container({ label: `floor(${room.id})` });

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
                texture: floorTileTexture,
              }),
            ),
          );
        }
      }
      // render the right-angle cutting off of the floor tiles along the back
      // walls. In the original game this was rendered by the walls
      // themselves, but it breaks our z-ordering if the walls over-render
      // their bounding boxes by so much
      for (let ix = 0; ix <= room.size.x; ix++) {
        if (room.walls.away[ix] === "none") {
          continue;
        }
        tilesContainer.addChild(
          moveContainerToBlockXyz(
            {
              x: ix - blockXMin,
              y: room.size.y + (sidesWithDoors.towards ? 0.5 : 0),
            },
            createSprite({
              anchor: { x: 0, y: 1 },
              texture: "generic.floor.overdraw",
              flipX: true,
            }),
          ),
        );
      }
      for (let iy = 0; iy <= room.size.y; iy++) {
        if (room.walls.left[iy] === "none") {
          continue;
        }
        tilesContainer.addChild(
          moveContainerToBlockXyz(
            {
              x: room.size.x + (sidesWithDoors.right ? 0.5 : 0),
              y: iy - blockYMin,
            },
            createSprite({
              anchor: { x: 0, y: 1 },
              texture: "generic.floor.overdraw",
            }),
          ),
        );
      }

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

      mainContainer.addChild(tilesContainer);
    }

    const towardsEdge = new Container();
    for (let ix = 0; ix <= blockXExtent; ix += 0.5) {
      towardsEdge.addChild(
        moveContainerToBlockXyz(
          { x: ix, y: 0 },
          createSprite({
            pivot: { x: 7, y: 0 },
            texture: "generic.edge.towards",
          }),
        ),
      );
    }
    towardsEdge.filters = edgePaletteSwapFilters(room, "towards");
    const rightEdge = new Container();
    for (let iy = 0; iy <= blockYExtent; iy += 0.5) {
      rightEdge.addChild(
        moveContainerToBlockXyz(
          { x: 0, y: iy },
          createSprite({
            pivot: { x: 0, y: 0 },
            texture: "generic.edge.right",
          }),
        ),
      );
    }
    rightEdge.filters = edgePaletteSwapFilters(room, "right");

    // track the points where the left-most and right-most visible walls will be rendered:
    const edgeLeft = projectBlockXyzToScreenXy({
      x: room.size.x + (sidesWithDoors.right ? 0.5 : 0),
      y: -blockYMin,
    }).x;
    const edgeRight = projectBlockXyzToScreenXy({
      x: -blockXMin,
      y: room.size.y + (sidesWithDoors.towards ? 0.5 : 0),
    }).x;

    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMask = new Graphics()
      // Add the rectangular area to show
      .poly(
        [
          { x: edgeLeft, y: 16 },
          { x: edgeLeft, y: -999 },
          { x: edgeRight, y: -999 },
          { x: edgeRight, y: 16 },
        ],
        true,
      )
      .fill(0xffff00);

    mainContainer.addChild(floorMask);
    mainContainer.addChild(towardsEdge);
    mainContainer.addChild(rightEdge);
    mainContainer.mask = floorMask;

    return mainContainer;
  },
);
