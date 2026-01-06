import { AnimatedSprite } from "pixi.js";
import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import { Texture } from "pixi.js";
import { beforeAll, describe, expect, expectTypeOf, test, vi } from "vitest";

const mockTextures = await vi.hoisted(async () => {
  const { Texture } = await import("pixi.js");
  return {
    bag: new Texture(),
    "block.artificial": new Texture({ label: "block.artificial" }),
    "block.organic": new Texture({ label: "block.organic" }),
    "dalek.1": new Texture({ label: "dalek.1" }),
    "dalek.2": new Texture({ label: "dalek.2" }),
    "conveyor.x.1": new Texture({ label: "conveyor.x.1" }),
    "conveyor.x.2": new Texture({ label: "conveyor.x.2" }),
  } satisfies Partial<Record<TextureId, Texture>>;
});

const mockSpriteSheet = await vi.hoisted(async () => {
  const mockFrame = { frame: { x: 0, y: 0, w: 24, h: 24 } };
  return {
    textures: {
      bag: mockTextures.bag,
      "block.artificial": mockTextures["block.artificial"],
      "block.organic": mockTextures["block.organic"],
    },
    animations: {
      dalek: [mockTextures["dalek.1"], mockTextures["dalek.2"]],
      "conveyor.x": [
        mockTextures["conveyor.x.1"],
        mockTextures["conveyor.x.2"],
      ],
    },
    data: {
      frames: {
        bag: mockFrame,
        "block.artificial": mockFrame,
        "block.organic": mockFrame,
      },
    },
  };
});

vi.mock("../../sprites/spritesheet/loadedSpriteSheet", () => ({
  loadSpritesheetAssets: vi.fn(),
  originalSpriteSheet: () => mockSpriteSheet,
}));

vi.mock("../../sprites/spritesheet/variants/getSpriteSheetVariant", () => ({
  getSpriteSheetVariant: vi.fn(() => mockSpriteSheet),
}));

import type { TextureId } from "../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { Xyz } from "../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "./createSprite";

import { originalSpriteSheet } from "../../sprites/spritesheet/loadedSpriteSheet";
import { createSprite } from "./createSprite";

beforeAll(() => {
  globalThis.requestAnimationFrame = (
    _callback: (time: DOMHighResTimeStamp) => void,
  ): number => {
    return 0;
  };
});

test("creating sprite with {textureId}", () => {
  const sprite = createSprite({
    textureId: "bag",
    spritesheetVariant: "original",
  });
  // run-time type:
  expect(sprite).toBeInstanceOf(Sprite);
  // check-time type:
  expectTypeOf(sprite).toExtend<Sprite>();
});

test("creating sprite with {textureId: undefined}", () => {
  const sprite = createSprite({
    textureId: undefined,
    spritesheetVariant: "original",
  });
  // run-time type:
  expect(sprite).toBeInstanceOf(Sprite);
  expect(sprite.texture).toBe(Texture.EMPTY);
  expectTypeOf(sprite).toExtend<Sprite>();
});

test("creating sprite with {textureId, times:{x:2}} gives a container of sprites", () => {
  const containerSprite = createSprite({
    textureId: "block.artificial",
    times: { x: 2 },
    spritesheetVariant: "original",
  });
  expect(containerSprite).toBeInstanceOf(Container);
  expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
  expect((containerSprite.children.at(0) as Sprite).texture).toBe(
    originalSpriteSheet().textures["block.artificial"],
  );
  expect((containerSprite.children.at(1) as Sprite).texture).toBe(
    originalSpriteSheet().textures["block.artificial"],
  );
  expect(containerSprite.children.length).toBe(2);
  expectTypeOf(containerSprite).toExtend<Container<Sprite> | Sprite>();
});
describe("subSpriteVariations", () => {
  test("creating sprite with {subSpriteVariations, times:{x:2}} gives a container of sprites with different textures", () => {
    const containerSprite = createSprite({
      subSpriteVariations(x) {
        return { textureId: x === 0 ? "block.artificial" : "block.organic" };
      },
      times: { x: 2 },
      spritesheetVariant: "original",
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.at(0)).toBeInstanceOf(Sprite);
    expect(containerSprite.children.at(1)).toBeInstanceOf(Sprite);
    // note order is reversed because renders back-to-front for painter's algorithm
    expect((containerSprite.children.at(0) as Sprite).texture).toBe(
      originalSpriteSheet().textures["block.organic"],
    );
    expect((containerSprite.children.at(1) as Sprite).texture).toBe(
      originalSpriteSheet().textures["block.artificial"],
    );
    expectTypeOf(containerSprite).toExtend<Container<Sprite> | Sprite>();
  });

  test("creating sprite with {subSpriteVariations, times:{x:1}} gives a container of sprites", () => {
    const containerSprite = createSprite({
      subSpriteVariations() {
        return { textureId: "block.artificial" };
      },
      times: { x: 1 },
      spritesheetVariant: "original",
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite).toBeInstanceOf(Sprite);
    expect((containerSprite as Sprite).texture).toEqual(
      originalSpriteSheet().textures["block.artificial"],
    );
    expectTypeOf(containerSprite).toExtend<Container<Sprite> | Sprite>();
  });

  test("creating a mix of animated and non-animated textures", () => {
    const containerSprite = createSprite({
      subSpriteVariations(x) {
        return x === 0 ?
            { animationId: "dalek" }
          : { textureId: "block.artificial" };
      },
      times: { x: 2 },
      spritesheetVariant: "original",
    });
    expect(containerSprite).toBeInstanceOf(Container);
    expect(containerSprite.children.length).toBe(2);

    const [sprite, animatedSprite] = containerSprite.children;

    expect((animatedSprite as AnimatedSprite).textures[0].label).toEqual(
      "dalek.1",
    );
    expect((animatedSprite as AnimatedSprite).textures[1].label).toEqual(
      "dalek.2",
    );

    expect((sprite as Sprite).texture.label).toEqual("block.artificial");

    expectTypeOf(containerSprite).toExtend<
      AnimatedSprite | Container<Sprite> | Sprite
    >();
  });

  test("creating animated with {subSpriteVariations, times: undefined} gives a Sprite with the first texture", () => {
    const containerSprite = createSprite({
      subSpriteVariations() {
        return { animationId: "dalek" };
      },
      spritesheetVariant: "original",
    });
    expect(containerSprite).toBeInstanceOf(AnimatedSprite);
    expect((containerSprite as AnimatedSprite).textures[0].label).toEqual(
      "dalek.1",
    );
    expect((containerSprite as AnimatedSprite).textures[1].label).toEqual(
      "dalek.2",
    );
    expectTypeOf(containerSprite).toExtend<
      AnimatedSprite | Container<Sprite> | Sprite
    >();
  });
  test("creating animated with {subSpriteVariations, times: {x:1, y:1, z:1}} gives a Sprite with the first texture", () => {
    const containerSprite = createSprite({
      subSpriteVariations() {
        return { animationId: "dalek" };
      },
      times: { x: 1, y: 1, z: 1 },
      spritesheetVariant: "original",
    });
    expect(containerSprite).toBeInstanceOf(AnimatedSprite);
    expect((containerSprite as AnimatedSprite).textures[0].label).toEqual(
      "dalek.1",
    );
    expect((containerSprite as AnimatedSprite).textures[1].label).toEqual(
      "dalek.2",
    );
    expectTypeOf(containerSprite).toExtend<
      AnimatedSprite | Container<Sprite> | Sprite
    >();
  });
});
test("creating sprite with {textureId, times:{x:1,y:1,z:1}} gives a single Sprite", () => {
  const containerSprite = createSprite({
    textureId: "block.artificial",
    times: { x: 1, y: 1, z: 1 },
    spritesheetVariant: "original",
  });
  expect(containerSprite).toBeInstanceOf(Sprite);
  expectTypeOf(containerSprite).toExtend<Container<Sprite> | Sprite>();
});
test("creating sprite with {textureId, times: undefined} gives a Sprite", () => {
  const containerSprite = createSprite({
    textureId: "block.artificial",
    times: undefined,
    spritesheetVariant: "original",
  });
  expect(containerSprite).toBeInstanceOf(Sprite);
  expectTypeOf(containerSprite).toExtend<Container<Sprite> | Sprite>();
});

test("creating sprite with {animationId}", () => {
  const animatedSprite = createSprite({
    animationId: "dalek",
    spritesheetVariant: "original",
  });
  expect(animatedSprite).toBeInstanceOf(AnimatedSprite);
  expectTypeOf(animatedSprite).toExtend<AnimatedSprite>();
});
test("creating sprite with {animationId, times: {x:2}}", () => {
  const containerAnimatedSprite = createSprite({
    animationId: "conveyor.x",
    times: { x: 2 },
    spritesheetVariant: "original",
  });

  expect(containerAnimatedSprite).toBeInstanceOf(Container);
  expect(containerAnimatedSprite.children.at(0)).toBeInstanceOf(AnimatedSprite);
  expectTypeOf(containerAnimatedSprite).toExtend<
    AnimatedSprite | Container<AnimatedSprite>
  >();
});
test("creating sprite with {animationId, times: {x:1, y:1, z:1}}", () => {
  const containerAnimatedSprite = createSprite({
    animationId: "conveyor.x",
    times: { x: 1, y: 1, z: 1 },
    spritesheetVariant: "original",
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
    spritesheetVariant: "original",
  });

  expect(containerAnimatedSprite).toBeInstanceOf(AnimatedSprite);
  expectTypeOf(containerAnimatedSprite).toExtend<
    AnimatedSprite | Container<AnimatedSprite>
  >();
});

test("spreading CreateSpriteOptions union and adding times: Partial<Xyz> | undefined", () => {
  type SpecifiedTextureCreateSpriteOptions = Exclude<
    CreateSpriteOptions,
    {
      textureId?: undefined;
      textureIdCallback?: undefined;
    }
  >;

  // use `as` to prevent TypeScript narrowing the type - simulates a function parameter
  const baseOptions = {
    textureId: "bag",
    spritesheetVariant: "original",
  } satisfies SpecifiedTextureCreateSpriteOptions as SpecifiedTextureCreateSpriteOptions;

  const times: Partial<Xyz> | undefined = { x: 2 };
  const sprite = createSprite({
    ...baseOptions,
    times,
  });
  expect(sprite).toBeInstanceOf(Container);
  expectTypeOf(sprite).toExtend<Container<Sprite> | Sprite>();
});
