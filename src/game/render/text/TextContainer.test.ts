import type { Renderer } from "pixi.js";

import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { TextContainer } from "./TextContainer";

const mockPixiRenderer = {} as Renderer;

// Mock createSprite - will be implemented in beforeEach to access mockTextures
vi.mock("../createSprite", () => ({
  createSprite: vi.fn(),
}));

// Mock the sprite sheet module
vi.mock("../../../sprites/spritesheet/loadedSpriteSheet", () => ({
  originalSpriteSheet: vi.fn(),
}));

// Mock assertIsTextureId to allow our test texture IDs
vi.mock("../../../sprites/assertIsTextureId", () => ({
  assertIsTextureId: vi.fn((textureId: string) => {
    // Only throw for the emoji character (which won't have a texture)
    if (textureId === "hud.char.💀") {
      throw new Error(`Texture ID '${textureId}' is not a valid texture ID`);
    }
    // For all other texture IDs, don't throw (they're valid)
  }),
}));

// Mock the OutlineFilter to avoid shader import issues in tests
vi.mock("../filters/outlineFilter", () => ({
  OutlineFilter: class MockOutlineFilter {},
}));

// Mock renderContainerToTexture to avoid needing a real PixiRenderer
vi.mock("../../../utils/pixi/renderContainerToSprite", () => ({
  renderContainerToTexture: vi.fn(() => Texture.EMPTY),
}));

import type { TextureId } from "../../../sprites/spritesheet/spritesheetData/spriteSheetData";

import { originalSpriteSheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
// Import the mocked functions
import { createSprite } from "../createSprite";

// Mock window object for test environment
beforeEach(() => {
  // Create a mock window object for tests
  global.window = {} as Window & typeof globalThis;

  // Create a proxy that returns mock textures for any texture ID
  const mockTextures = new Proxy(
    {},
    {
      get(_target, prop) {
        // Return a mock texture object with all required properties
        const mockTexture = {
          width: 8,
          height: 8,
          orig: new Rectangle(0, 0, 8, 8),
          rotate: 0,
          defaultAnchor: { x: 0, y: 0 },
          label: String(prop), // Use label property which Pixi preserves
          isTexture: true,
        } satisfies Partial<Texture>;

        // Make it pass instanceof check (done by Sprite when setting the texture) by setting the prototype
        Object.setPrototypeOf(mockTexture, Texture.prototype);

        return mockTexture;
      },
    },
  ) as Record<TextureId, Texture>;

  // Set up the mocked spriteSheet to return our proxy
  vi.mocked(originalSpriteSheet).mockReturnValue({
    textures: mockTextures,
  } as ReturnType<typeof originalSpriteSheet>);

  // Set up createSprite mock to use the mockTextures
  vi.mocked(createSprite).mockImplementation((options) => {
    const sprite = new Sprite();
    sprite.texture = mockTextures[options.textureId!];
    return sprite;
  });
});

afterEach(() => {
  // Clean up the global window mock
  delete (global as { window?: Window & typeof globalThis }).window;
});

test("creates sprites for text", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });
  container.text = "hi";

  expect(container.characterSpriteContainer.children.length).toBe(2);

  // Check that each child is a Sprite
  for (const child of container.characterSpriteContainer.children) {
    expect(child).toBeInstanceOf(Sprite);
  }

  const [firstSprite, secondSprite] =
    container.characterSpriteContainer.children;

  expect(firstSprite.x).toBe(0);
  expect(secondSprite.x).toBe(8);

  // Check that the correct textures are assigned using the label property
  expect(firstSprite.texture.label).toBe("hud.char.h");
  expect(secondSprite.texture.label).toBe("hud.char.i");
});

test("changes from a longer string to a shorter one", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // First set a longer string
  container.text = "test";
  expect(container.characterSpriteContainer.children.length).toBe(4);

  // Then change to a shorter string
  container.text = "hi";
  expect(container.characterSpriteContainer.children.length).toBe(2);

  const [firstSprite, secondSprite] =
    container.characterSpriteContainer.children;

  // Check that sprites are positioned in x
  expect(firstSprite.x).toBe(0);
  expect(secondSprite.x).toBe(8);

  // Check that the correct textures are assigned
  expect(firstSprite.texture.label).toBe("hud.char.h");
  expect(secondSprite.texture.label).toBe("hud.char.i");
});

test("changes from a shorter string to a longer one", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // First set a shorter string
  container.text = "hi";
  expect(container.characterSpriteContainer.children.length).toBe(2);

  // Then change to a longer string
  container.text = "test";
  expect(container.characterSpriteContainer.children.length).toBe(4);

  const sprites = container.characterSpriteContainer.children;

  // Check that sprites are positioned "test" (4 chars)
  expect(sprites[0].x).toBe(0);
  expect(sprites[1].x).toBe(8);
  expect(sprites[2].x).toBe(16);
  expect(sprites[3].x).toBe(24);

  // Check that the correct textures are assigned
  expect(sprites[0].texture.label).toBe("hud.char.t");
  expect(sprites[1].texture.label).toBe("hud.char.e");
  expect(sprites[2].texture.label).toBe("hud.char.s");
  expect(sprites[3].texture.label).toBe("hud.char.t");
});

test("changes text but keeps the same length", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // First set initial string
  container.text = "test";
  expect(container.characterSpriteContainer.children.length).toBe(4);

  // Change to different string of same length
  container.text = "pass";
  expect(container.characterSpriteContainer.children.length).toBe(4);

  const sprites = container.characterSpriteContainer.children;

  // X positions should remain the same
  expect(sprites[0].x).toBe(0);
  expect(sprites[1].x).toBe(8);
  expect(sprites[2].x).toBe(16);
  expect(sprites[3].x).toBe(24);

  // Check that the textures were updated to the new characters
  expect(sprites[0].texture.label).toBe("hud.char.p");
  expect(sprites[1].texture.label).toBe("hud.char.a");
  expect(sprites[2].texture.label).toBe("hud.char.s");
  expect(sprites[3].texture.label).toBe("hud.char.s");
});

test("displays numbers correctly", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // Test integer
  container.text = 42;
  expect(container.characterSpriteContainer.children.length).toBe(2);

  // Test larger number
  container.text = 9876;
  expect(container.characterSpriteContainer.children.length).toBe(4);

  // Test zero
  container.text = 0;
  expect(container.characterSpriteContainer.children.length).toBe(1);
});

test("handles special 'infinite' string by showing nothing", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  container.text = "infinite";
  expect(container.characterSpriteContainer.children.length).toBe(0);
});

test("throws error for non-existing texture", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // Use a string with an emoji character that won't have a texture
  expect(() => {
    container.text = "💀";
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: could not show text "💀" in container because: "no texture id for char "💀": Texture ID 'hud.char.💀' is not a valid texture ID"]`,
  );
});

test("TextContainer creates container with correct options", () => {
  // Test default options
  const defaultContainer = new TextContainer({
    pixiRenderer: mockPixiRenderer,
  });
  expect(defaultContainer).toBeInstanceOf(Container);
  expect(defaultContainer.label).toBe("text");

  // Test custom label
  const customLabelContainer = new TextContainer({
    pixiRenderer: mockPixiRenderer,
    label: "score",
  });
  expect(customLabelContainer.label).toBe("score");
});

test("reuses existing sprites when updating text", () => {
  const container = new TextContainer({ pixiRenderer: mockPixiRenderer });

  // Set initial text
  container.text = "abc";
  const [firstSprite, secondSprite, thirdSprite] =
    container.characterSpriteContainer.children;

  // Verify initial textures
  expect(firstSprite.texture.label).toBe("hud.char.a");
  expect(secondSprite.texture.label).toBe("hud.char.b");
  expect(thirdSprite.texture.label).toBe("hud.char.c");

  // Update to text of same length
  container.text = "def";

  // Should reuse the same sprite instances
  expect(container.characterSpriteContainer.getChildAt<Sprite>(0)).toBe(
    firstSprite,
  );
  expect(container.characterSpriteContainer.getChildAt<Sprite>(1)).toBe(
    secondSprite,
  );
  expect(container.characterSpriteContainer.getChildAt<Sprite>(2)).toBe(
    thirdSprite,
  );

  // Verify textures were updated
  expect(firstSprite.texture.label).toBe("hud.char.d");
  expect(secondSprite.texture.label).toBe("hud.char.e");
  expect(thirdSprite.texture.label).toBe("hud.char.f");
});

test("double-height text container scales character sprites", () => {
  const container = new TextContainer({
    pixiRenderer: mockPixiRenderer,
    doubleHeight: true,
  });

  expect(container.characterSpriteContainer.scale.y).toBe(2);
});

test("can set text in constructor", () => {
  const container = new TextContainer({
    pixiRenderer: mockPixiRenderer,
    text: "hello",
  });

  expect(container.text).toBe("hello");
  expect(container.characterSpriteContainer.children.length).toBe(5);
});
