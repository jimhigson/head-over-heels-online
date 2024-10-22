import { Container, Graphics } from "pixi.js";
import { hintColours } from "../../hintColours";
import { AnyRoom, RoomId } from "../../modelTypes";
import type { TextureId } from "../../sprites/pixiSpriteSheet";
import { makeClickPortal } from "./makeClickPortal";
import {
  RenderWorldOptions,
  xyzBlockPosition,
  paletteSwapFilters,
} from "./renderWorld";
import { createSprite, moveToBlock } from "./spriteAtBlock";
import { renderExtent } from "./renderExtent";

export function* renderFloor(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  const hasDoorTowards = !!room.doors.towards;
  const hasDoorRight = !!room.doors.right;

  const { blockXMin, blockYMin, rightSide, leftSide, frontSide, backSide } =
    renderExtent(room);

  const { floor: floorType } = room;

  const floorContainer = new Container();

  if (floorType !== "none") {
    const floorTileTexture: TextureId =
      floorType === "deadly" ? "generic.floor.deadly" : `${floorType}.floor`;

    const tilesContainer = new Container();

    // each sprite covers enough graphics for 2 blocks. we only need to
    // render a sprite for the 'white' squares on the chessboard (render or
    // not according to a checkerboard pattern)
    for (let ix = -1; ix <= room.size.x; ix++) {
      for (let iy = (ix % 2) - 1; iy <= room.size.y; iy += 2) {
        tilesContainer.addChild(
          moveToBlock(
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

    floorContainer.addChild(tilesContainer);
  }

  const rightEdge = new Container();
  for (let ix = blockXMin; ix <= room.size.x; ix += 0.5) {
    rightEdge.addChild(
      moveToBlock(
        { x: ix, y: hasDoorTowards ? -0.5 : 0 },
        createSprite({
          pivot: { x: 7, y: 1 },
          texture: "generic.edge.towards",
        }),
      ),
    );
  }
  rightEdge.filters = paletteSwapFilters(hintColours[room.color].edges.right);
  const towardsEdge = new Container();
  for (let iy = blockYMin; iy <= room.size.y; iy += 0.5) {
    towardsEdge.addChild(
      moveToBlock(
        { x: hasDoorRight ? -0.5 : 0, y: iy },
        createSprite({ pivot: { x: 0, y: 1 }, texture: "generic.edge.right" }),
      ),
    );
  }
  towardsEdge.filters = paletteSwapFilters(
    hintColours[room.color].edges.towards,
  );
  if (room.roomBelow) {
    makeClickPortal(
      room.roomBelow as RoomId,
      options,
      ...[...towardsEdge.children, ...rightEdge.children],
    );
  }

  const edgeRightPoint = xyzBlockPosition(0, room.size.y);
  const edgeLeftPoint = xyzBlockPosition(room.size.x, 0);

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

  floorContainer.addChild(floorMask);
  floorContainer.addChild(rightEdge);
  floorContainer.addChild(towardsEdge);
  floorContainer.mask = floorMask;

  yield floorContainer;
}
