import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";
import { createSprite } from "./createSprite";
import { AnimatedSprite } from "pixi.js";
import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import { load } from "../../sprites/spriteSheet";

beforeAll(async () => {
  await load();
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

  test("creating sprite with {textureId, times}", () => {
    const containerSprite = createSprite({
      textureId: "block.artificial",
      times: { x: 2 },
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
    expectTypeOf(containerSprite).toExtend<Container<Sprite>>();
  });
  test("creating sprite with {textureId, times: undefined}", () => {
    const containerSprite = createSprite({
      textureId: "block.artificial",
      times: undefined,
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
    expectTypeOf(containerSprite).toExtend<Container<Sprite>>();
  });

  test("creating sprite with {animationId}", () => {
    const animatedSprite = createSprite({ animationId: "dalek" });
    expect(animatedSprite).toBeInstanceOf(AnimatedSprite);
    expectTypeOf(animatedSprite).toExtend<AnimatedSprite>();
  });
  test("creating sprite with {animationId, times}", () => {
    const containerAnimatedSprite = createSprite({
      animationId: "conveyor.x",
      times: { x: 2 },
    });

    expect(containerAnimatedSprite).toBeInstanceOf(Container);
    expect(containerAnimatedSprite.children.at(0)).toBeInstanceOf(
      AnimatedSprite,
    );
    expectTypeOf(containerAnimatedSprite).toExtend<Container<AnimatedSprite>>();
  });
  test("creating sprite with {animationId, times: undefined}", () => {
    const containerAnimatedSprite = createSprite({
      animationId: "conveyor.x",
      times: undefined,
    });

    expect(containerAnimatedSprite).toBeInstanceOf(Container);
    expect(containerAnimatedSprite.children.at(0)).toBeInstanceOf(
      AnimatedSprite,
    );
    expectTypeOf(containerAnimatedSprite).toExtend<Container<AnimatedSprite>>();
  });
});
