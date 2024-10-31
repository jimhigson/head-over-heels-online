import { Container, Graphics } from "pixi.js";
import { floorThickness, RoomState } from "../../model/modelTypes";
import type { TextureId } from "../../sprites/pixiSpriteSheet";
import { edgePaletteSwapFilters } from "./paletteSwapFilters";
import { createSprite } from "./createSprite";
import { moveContainerToBlockXyz } from "./projectToScreen";
import { renderExtent } from "./renderExtent";
import { roomSidesWithDoors } from "./roomSidesWithDoors";
import { projectBlockXyzToScreenXy } from "./projectToScreen";
import { PlanetName } from "@/sprites/planets";
import { Direction } from "@/utils/vectors";
import { EmptyObject } from "type-fest";
import { ItemAppearance } from "./ItemAppearances";

export type SidesWithDoors = Partial<Record<Direction, true>>;

export const renderFloor: ItemAppearance<"floor"> = <RoomId extends string>(
  _config: EmptyObject,
  room: RoomState<PlanetName, RoomId>,
): Container => {
  const { towards: hasDoorTowards, right: hasDoorRight } =
    roomSidesWithDoors(room);

  const { blockXMin, blockYMin, rightSide, leftSide, frontSide, backSide } =
    renderExtent(room);

  const { floor: floorType } = room;

  const mainContainer = new Container();

  const floorSkipMap = Object.fromEntries(
    room.floorSkip.map(({ x, y }) => [`${x},${y}`, true] as [string, true]),
  );

  if (floorType !== "none") {
    const floorTileTexture: TextureId =
      floorType === "deadly" ? "generic.floor.deadly" : `${floorType}.floor`;

    const tilesContainer = new Container();

    // each sprite covers enough graphics for 2 blocks. we only need to
    // render a sprite for the 'white' squares on the chessboard (render or
    // not according to a checkerboard pattern)
    for (let ix = -1; ix <= room.size.x; ix++) {
      for (let iy = (ix % 2) - 1; iy <= room.size.y; iy += 2) {
        if (floorSkipMap[`${ix},${iy}`]) {
          continue;
        }

        tilesContainer.addChild(
          moveContainerToBlockXyz(
            { x: ix, y: iy },
            createSprite({
              anchor: { x: 0.5, y: 1 },
              texture: floorTileTexture,
            }),
          ),
        );
      }
    }

    const tilesMask = new Graphics()
      // Add the rectangular area to show
      .poly([frontSide, rightSide, backSide, leftSide], true)
      .fill(0xff0000)
      // use a stroke to draw more than is strictly on the floor for the purpose of extending
      // under the pixelated edges of other sprites that are otherdrawn - otherwise the edge
      // would be a very smooth diagonal on modern screens
      .stroke({ width: 8 });

    tilesContainer.addChild(tilesMask);
    tilesContainer.mask = tilesMask;

    mainContainer.addChild(tilesContainer);
  }

  const towardsEdge = new Container();
  for (let ix = blockXMin; ix <= room.size.x; ix += 0.5) {
    towardsEdge.addChild(
      moveContainerToBlockXyz(
        { x: ix, y: hasDoorTowards ? -0.5 : 0 },
        createSprite({
          pivot: { x: 7, y: 1 },
          texture: "generic.edge.towards",
        }),
      ),
    );
  }
  towardsEdge.filters = edgePaletteSwapFilters(room, "towards");
  const rightEdge = new Container();
  for (let iy = blockYMin; iy <= room.size.y; iy += 0.5) {
    rightEdge.addChild(
      moveContainerToBlockXyz(
        { x: hasDoorRight ? -0.5 : 0, y: iy },
        createSprite({ pivot: { x: 0, y: 1 }, texture: "generic.edge.right" }),
      ),
    );
  }
  rightEdge.filters = edgePaletteSwapFilters(room, "right");

  const edgeRightPoint = projectBlockXyzToScreenXy({ x: 0, y: room.size.y });
  const edgeLeftPoint = projectBlockXyzToScreenXy({ x: room.size.x, y: 0 });

  // rendering strategy differs slightly from original here - we don't render floors added in for near-side
  // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
  const floorMask = new Graphics()
    // Add the rectangular area to show
    .poly(
      [
        { x: frontSide.x, y: frontSide.y + 16 },
        { x: edgeRightPoint.x, y: edgeRightPoint.y + 16 },
        { x: edgeRightPoint.x, y: -999 },
        { x: edgeLeftPoint.x, y: -999 },
        { x: edgeLeftPoint.x, y: edgeLeftPoint.y + 16 },
      ],
      true,
    )
    .fill(0xffff00);

  mainContainer.addChild(floorMask);
  mainContainer.addChild(towardsEdge);
  mainContainer.addChild(rightEdge);
  mainContainer.mask = floorMask;

  // raise the floor by its thickness - the z of the floor is negative so that it can have a positive
  // bounding box to give it some volume for collision detection. But, the floor should be rendered on
  // its top edge, not its .position value.
  mainContainer.y = -floorThickness;

  return mainContainer;
};
