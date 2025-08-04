import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";
import { createSprite } from "./createSprite";
import { AnimatedSprite } from "pixi.js";
import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import { loadedSpriteSheet, loadSpritesheet } from "../../sprites/spriteSheet";

beforeAll(async () => {
  await loadSpritesheet();
  globalThis.requestAnimationFrame = (
    _callback: (time: DOMHighResTimeStamp) => void,
  ): number => {
    return 0;
  };
});

describe("createSprite return type", () => {
  test('creating sprite with "textureId"', () => {
    const sprite = createSprite("bag");
    // run-time type:
    expect(sprite).toBeInstanceOf(Sprite);
    // check-time type:
    expectTypeOf(sprite).toExtend<Sprite>();
  });

  test("creating sprite with {textureId}", () => {
    const sprite = createSprite({ textureId: "bag" });
    // run-time type:
    expect(sprite).toBeInstanceOf(Sprite);
    // check-time type:
    expectTypeOf(sprite).toExtend<Sprite>();
  });

  test("creating sprite with {textureId, times:{x:2}} gives a container of sprites", () => {
    const containerSprite = createSprite({
      textureId: "block.artificial",
      times: { x: 2 },
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
    expect((containerSprite.children.at(0) as Sprite).texture).toBe(
      loadedSpriteSheet().textures["block.artificial"],
    );
    expect((containerSprite.children.at(1) as Sprite).texture).toBe(
      loadedSpriteSheet().textures["block.artificial"],
    );
    expect(containerSprite.children.length).toBe(2);
    expectTypeOf(containerSprite).toExtend<Sprite | Container<Sprite>>();
  });
  test("creating sprite with {textureIdCallback, times:{x:2}} gives a container of sprites", () => {
    const containerSprite = createSprite({
      textureIdCallback(x) {
        return x === 0 ? "block.artificial" : "block.organic";
      },
      times: { x: 2 },
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
    expect(containerSprite.children.at(1)).toBeInstanceOf(Sprite);
    // note order is reversed because renders back-to-front for painter's algorithm
    expect((containerSprite.children.at(0) as Sprite).texture).toBe(
      loadedSpriteSheet().textures["block.organic"],
    );
    expect((containerSprite.children.at(1) as Sprite).texture).toBe(
      loadedSpriteSheet().textures["block.artificial"],
    );
    expectTypeOf(containerSprite).toExtend<Sprite | Container<Sprite>>();
  });
  test("creating sprite with {textureIdCallback, times:{x:1}} gives a container of sprites", () => {
    const containerSprite = createSprite({
      textureIdCallback() {
        return "block.artificial";
      },
      times: { x: 1 },
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite).toBeInstanceOf(Sprite);
    expect((containerSprite as Sprite).texture).toEqual(
      loadedSpriteSheet().textures["block.artificial"],
    );
    expectTypeOf(containerSprite).toExtend<Sprite | Container<Sprite>>();
  });
  test("creating sprite with {textureId, times:{x:1,y:1,z:1}} gives a single Sprite", () => {
    const containerSprite = createSprite({
      textureId: "block.artificial",
      times: { x: 1, y: 1, z: 1 },
    });
    expect(containerSprite).toBeInstanceOf(Sprite);
    expectTypeOf(containerSprite).toExtend<Sprite | Container<Sprite>>();
  });
  test("creating sprite with {textureId, times: undefined} gives a Sprite", () => {
    const containerSprite = createSprite({
      textureId: "block.artificial",
      times: undefined,
    });
    expect(containerSprite).toBeInstanceOf(Sprite);
    expectTypeOf(containerSprite).toExtend<Sprite | Container<Sprite>>();
  });

  test("creating sprite with {animationId}", () => {
    const animatedSprite = createSprite({ animationId: "dalek" });
    expect(animatedSprite).toBeInstanceOf(AnimatedSprite);
    expectTypeOf(animatedSprite).toExtend<AnimatedSprite>();
  });
  test("creating sprite with {animationId, times: {x:2}}", () => {
    const containerAnimatedSprite = createSprite({
      animationId: "conveyor.x",
      times: { x: 2 },
    });

    expect(containerAnimatedSprite).toBeInstanceOf(Container);
    expect(containerAnimatedSprite.children.at(0)).toBeInstanceOf(
      AnimatedSprite,
    );
    expectTypeOf(containerAnimatedSprite).toExtend<
      AnimatedSprite | Container<AnimatedSprite>
    >();
  });
  test("creating sprite with {animationId, times: {x:1, y:1, z:1}}", () => {
    const containerAnimatedSprite = createSprite({
      animationId: "conveyor.x",
      times: { x: 1, y: 1, z: 1 },
    });

    expect(containerAnimatedSprite).toBeInstanceOf(AnimatedSprite);
    expectTypeOf(containerAnimatedSprite).toExtend<
      AnimatedSprite | Container<AnimatedSprite>
    >();
  });
  test("creating sprite with {animationId, times: undefined}", () => {
    const containerAnimatedSprite = createSprite({
      animationId: "conveyor.x",
      times: undefined,
    });

    expect(containerAnimatedSprite).toBeInstanceOf(AnimatedSprite);
    expectTypeOf(containerAnimatedSprite).toExtend<
      AnimatedSprite | Container<AnimatedSprite>
    >();
  });
});
