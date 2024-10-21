import { Container } from "pixi.js";
import { AnyRoom, Door, Direction, Xy, RoomId } from "../../modelTypes";
import { doorTexturePivot } from "../../sprites/pixiSpriteSheet";
import { makeClickPortals } from "./makeClickPortal";
import { doorTexture, RenderWorldOptions } from "./renderWorld";
import { spriteAtBlock } from "./spriteAtBlock";

export function* renderDoor(
  room: AnyRoom,
  door: Door<string>,
  side: Direction,
) {
  const isBack = side === "left" || side === "away";
  const axis = side === "away" || side === "towards" ? "x" : "y";
  const crossAxis = axis === "x" ? "y" : "x";

  // doors occupy two positions
  const frontPos = {
    [axis]: door.ordinal,
    [crossAxis]: isBack ? room.size[crossAxis] : -0.5,
  } as Xy;
  const backPos = {
    [axis]: door.ordinal + 1,
    [crossAxis]: isBack ? room.size[crossAxis] : -0.5,
  } as Xy;

  console.log("rendering door on side", side, "at", backPos, frontPos);

  if (isBack) {
    if (door.z === 0) {
      yield spriteAtBlock(
        {
          [axis]: door.ordinal + 1,
          // the overdraw sprite is like a wall, but set back half a block
          // from where a wall would normally be
          [crossAxis]: room.size[crossAxis] + 0.5,
        } as Xy,
        {
          anchor: { x: 0, y: 1 },
          flipX: side === "away",
          texture: "generic.wall.overdraw",
        },
      );
    } else {
      const pivotX = side === "left" ? 0 : 16;
      for (const p of [backPos, frontPos]) {
        yield spriteAtBlock(p, {
          pivot: { x: pivotX, y: 9 },
          texture: "generic.door.legs.base",
        });
        for (let z = 1; z <= door.z; z++) {
          yield spriteAtBlock(
            { ...p, z },
            {
              pivot: { x: pivotX, y: 9 },
              texture: "generic.door.legs.pillar",
            },
          );
        }
        yield spriteAtBlock(
          { ...p, z: door.z },
          {
            pivot: { x: pivotX, y: 15 },
            texture: `generic.door.legs.threshold.${axis}`,
          },
        );
      }
    }
  } else {
    if (door.z !== 0) {
      for (const p of [backPos, frontPos]) {
        const pivotX = side === "towards" ? 18 : 8;
        yield spriteAtBlock(
          { ...p, z: door.z },

          {
            pivot: { x: pivotX, y: 12 },
            texture: `generic.door.threshold.${axis}`,
          },
        );
      }
    }
  }

  const { backTexture, frontTexture } = doorTexture(room, axis);

  yield spriteAtBlock(
    { ...backPos, z: door.z },
    {
      pivot: doorTexturePivot[axis],
      texture: backTexture,
    },
  );
  yield spriteAtBlock(
    { ...frontPos, z: door.z },
    {
      pivot: doorTexturePivot[axis],
      texture: frontTexture,
    },
  );
}

/**
 * renders the doors on the right and towards edges - ie, those not embedded in wall sprites
 */
export function* renderFrontDoors(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  // TODO: backs and fronts need to be rendered with content in-between
  if (room.doors.right) {
    yield* makeClickPortals(
      room.doors.right.toRoom as RoomId,
      options,
      renderDoor(room, room.doors.right, "right"),
    );
  }
  if (room.doors.towards) {
    yield* makeClickPortals(
      room.doors.towards.toRoom as RoomId,
      options,
      renderDoor(room, room.doors.towards, "towards"),
    );
  }
}
