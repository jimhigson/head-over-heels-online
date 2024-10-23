import { Container } from "pixi.js";
import {
  AnyRoom,
  Door,
  Direction,
  Xy,
  RoomJson,
  PlanetName,
} from "../../modelTypes";
import { doorTexturePivot } from "../../sprites/pixiSpriteSheet";
import { makeClickPortals } from "./makeClickPortal";
import { RenderOptions } from "../gameMain";
import { doorTexture } from "./doorTexture";
import { createSprite } from "./createSprite";
import { moveSpriteToBlock } from "./moveSpriteToBlock";

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

  if (isBack) {
    if (door.z === 0) {
      yield moveSpriteToBlock(
        {
          [axis]: door.ordinal + 1,
          // the overdraw sprite is like a wall, but set back half a block
          // from where a wall would normally be
          [crossAxis]: room.size[crossAxis] + 0.5,
        } as Xy,
        createSprite({
          anchor: { x: 0, y: 1 },
          flipX: side === "away",
          texture: "generic.wall.overdraw",
        }),
      );
    } else {
      const pivotX = side === "left" ? 0 : 16;
      for (const p of [backPos, frontPos]) {
        yield moveSpriteToBlock(
          p,
          createSprite({
            pivot: { x: pivotX, y: 9 },
            texture: "generic.door.legs.base",
          }),
        );
        for (let z = 1; z <= door.z; z++) {
          yield moveSpriteToBlock(
            { ...p, z },
            createSprite({
              pivot: { x: pivotX, y: 9 },
              texture: "generic.door.legs.pillar",
            }),
          );
        }
        yield moveSpriteToBlock(
          { ...p, z: door.z },
          createSprite({
            pivot: { x: pivotX, y: 15 },
            texture: `generic.door.legs.threshold.${axis}`,
          }),
        );
      }
    }
  } else {
    if (door.z !== 0) {
      for (const p of [backPos, frontPos]) {
        const pivotX = side === "towards" ? 18 : 8;
        yield moveSpriteToBlock(
          { ...p, z: door.z },
          createSprite({
            pivot: { x: pivotX, y: 12 },
            texture: `generic.door.threshold.${axis}`,
          }),
        );
      }
    }
  }

  const { backTexture, frontTexture } = doorTexture(room, axis);

  yield moveSpriteToBlock(
    { ...backPos, z: door.z },
    createSprite({
      pivot: doorTexturePivot[axis],
      texture: backTexture,
    }),
  );
  yield moveSpriteToBlock(
    { ...frontPos, z: door.z },
    createSprite({
      pivot: doorTexturePivot[axis],
      texture: frontTexture,
    }),
  );
}

/**
 * renders the doors on the right and towards edges - ie, those not embedded in wall sprites
 */
export function* renderFrontDoors<RoomId extends string>(
  room: RoomJson<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  // TODO: backs and fronts need to be rendered with content in-between
  if (room.doors.right) {
    yield* makeClickPortals(
      room.doors.right.toRoom,
      options,
      renderDoor(room, room.doors.right, "right"),
    );
  }
  if (room.doors.towards) {
    yield* makeClickPortals(
      room.doors.towards.toRoom,
      options,
      renderDoor(room, room.doors.towards, "towards"),
    );
  }
}
