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
import type { Xy } from "@/utils/vectors/vectors";
import {
  axesXy,
  originXy,
  perpendicularAxisXy,
  type Direction4Xy,
} from "@/utils/vectors/vectors";
import type { ItemAppearance } from "./appearanceUtils";
import { renderOnce } from "./appearanceUtils";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import type { UnknownRoomState } from "@/model/modelTypes";
import { iterateToContainer } from "@/game/iterateToContainer";

export type SidesWithDoors = Partial<Record<Direction4Xy, true>>;

function* generateFloorCutOffs(
  room: UnknownRoomState,
  blockMin: Xy,
  sidesWithDoors: SidesWithDoors,
): Generator<Container> {
  for (const axis of axesXy) {
    const crossAxis = perpendicularAxisXy(axis);

    const nearSide = axis === "x" ? "towards" : "right";
    const farSide = axis === "x" ? "away" : "left";

    // render the right-angle cutting off of the floor tiles along the back
    // walls. In the original game this was rendered by the walls
    // themselves, but it breaks our z-ordering if the walls over-render
    // their bounding boxes by so much
    for (let ia = 0; ia <= room.size[axis]; ia++) {
      let overdrawType: "corner-on-floor" | "behind-door" | "none";

      if (room.walls[farSide][ia] === "none") {
        const doorJsonAtLocation = iterate(
          objectValues(room.roomJson.items),
        ).find(
          (item) =>
            item.type === "door" &&
            item.config.direction === farSide &&
            (item.position[axis] === ia || item.position[axis] + 1 === ia) &&
            item.position[crossAxis] === room.size[crossAxis],
        );

        if (doorJsonAtLocation === undefined) {
          overdrawType = "none";
        } else if (doorJsonAtLocation.position.z === 0) {
          overdrawType = "behind-door";
        } else {
          overdrawType = "corner-on-floor";
        }
      } else {
        // normal wall
        overdrawType = "corner-on-floor";
      }

      if (overdrawType !== "none") {
        yield moveContainerToBlockXyz(
          {
            [axis]: ia - blockMin[axis],
            [crossAxis]:
              room.size[crossAxis] +
              (sidesWithDoors[nearSide] ? 0.5 : 0) +
              (overdrawType === "behind-door" ? 0.5 : 0),
          } as Xy,
          createSprite(
            overdrawType === "behind-door" ?
              {
                anchor: { x: 0, y: 1 },
                texture: "generic.wall.overdraw",
                flipX: axis === "x",
              }
            : {
                anchor: { x: 0, y: 1 },
                texture: "generic.floor.overdraw",
                flipX: axis === "x",
              },
          ),
        );
      }
    }
  }
}

export const floorAppearance: ItemAppearance<"floor"> = renderOnce(
  ({ item, room }) => {
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
      iterateToContainer(
        generateFloorCutOffs(
          room,
          { x: blockXMin, y: blockYMin },
          sidesWithDoors,
        ),
        tilesContainer,
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

    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMask = new Graphics()
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

    mainContainer.addChild(floorMask);
    mainContainer.addChild(towardsEdge);
    mainContainer.addChild(rightEdge);
    mainContainer.mask = floorMask;
    // render on the top surface of the floor:
    mainContainer.y = -item.aabb.z;

    // the floor never changes rendering so can cache to optimise:
    mainContainer.cacheAsTexture(true);

    return mainContainer;
  },
);
