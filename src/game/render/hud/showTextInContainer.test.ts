import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { makeTextContainer, showTextInContainer } from "./showTextInContainer";

// Mock createSprite - will be implemented in beforeEach to access mockTextures
vi.mock("../createSprite", () => ({
  createSprite: vi.fn(),
}));

// Mock the sprite sheet module
vi.mock("../../../sprites/spriteSheet", () => ({
  loadedSpriteSheet: vi.fn(),
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

// Mock the hud filters to avoid canvas creation
vi.mock("./hudFilters", () => ({
  hudOutlinedTextFilters: [],
  hudTextFilter: [],
}));

import type { TextureId } from "../../../sprites/spriteSheetData";

import { loadedSpriteSheet } from "../../../sprites/spriteSheet";
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
  vi.mocked(loadedSpriteSheet).mockReturnValue({
    textures: mockTextures,
  } as ReturnType<typeof loadedSpriteSheet>);

  // Set up createSprite mock to use the mockTextures
  vi.mocked(createSprite).mockImplementation((textureId) => {
    const sprite = new Sprite();
    sprite.texture = mockTextures[textureId as TextureId];
    return sprite;
  });
});

afterEach(() => {
  // Clean up the global window mock
  delete (global as { window?: Window & typeof globalThis }).window;
});

test("creates a container and puts text in it", () => {
  const container = makeTextContainer();
  showTextInContainer(container, "hi");

  expect(container.children.length).toBe(2);

  // Check that each child is a Sprite
  for (const child of container.children) {
    expect(child).toBeInstanceOf(Sprite);
  }

  const [firstSprite, secondSprite] = container.children as Sprite[];

  // Check that sprites are centre-aligned for "hi" (2 chars)
  // First char at x = -4, second at x = 4
  expect(firstSprite.x).toBe(-4);
  expect(secondSprite.x).toBe(4);

  // Check that the correct textures are assigned using the label property
  expect(firstSprite.texture.label).toBe("hud.char.h");
  expect(secondSprite.texture.label).toBe("hud.char.i");
});

test("changes from a longer string to a shorter one", () => {
  const container = makeTextContainer();

  // First set a longer string
  showTextInContainer(container, "test");
  expect(container.children.length).toBe(4);

  // Then change to a shorter string
  showTextInContainer(container, "hi");
  expect(container.children.length).toBe(2);

  const [firstSprite, secondSprite] = container.children as Sprite[];

  // Check that sprites are re-centred for "hi"
  expect(firstSprite.x).toBe(-4);
  expect(secondSprite.x).toBe(4);

  // Check that the correct textures are assigned
  expect(firstSprite.texture.label).toBe("hud.char.h");
  expect(secondSprite.texture.label).toBe("hud.char.i");
});

test("changes from a shorter string to a longer one", () => {
  const container = makeTextContainer();

  // First set a shorter string
  showTextInContainer(container, "hi");
  expect(container.children.length).toBe(2);

  // Then change to a longer string
  showTextInContainer(container, "test");
  expect(container.children.length).toBe(4);

  const sprites = container.children as Sprite[];

  // Check that sprites are re-centred for "test" (4 chars)
  // Positions: -12, -4, 4, 12
  expect(sprites[0].x).toBe(-12);
  expect(sprites[1].x).toBe(-4);
  expect(sprites[2].x).toBe(4);
  expect(sprites[3].x).toBe(12);

  // Check that the correct textures are assigned
  expect(sprites[0].texture.label).toBe("hud.char.t");
  expect(sprites[1].texture.label).toBe("hud.char.e");
  expect(sprites[2].texture.label).toBe("hud.char.s");
  expect(sprites[3].texture.label).toBe("hud.char.t");
});

test("changes text but keeps the same length", () => {
  const container = makeTextContainer();

  // First set initial string
  showTextInContainer(container, "test");
  expect(container.children.length).toBe(4);

  // Change to different string of same length
  showTextInContainer(container, "pass");
  expect(container.children.length).toBe(4);

  const sprites = container.children as Sprite[];

  // X positions should remain the same (no re-centering needed)
  expect(sprites[0].x).toBe(-12);
  expect(sprites[1].x).toBe(-4);
  expect(sprites[2].x).toBe(4);
  expect(sprites[3].x).toBe(12);

  // Check that the textures were updated to the new characters
  expect(sprites[0].texture.label).toBe("hud.char.p");
  expect(sprites[1].texture.label).toBe("hud.char.a");
  expect(sprites[2].texture.label).toBe("hud.char.s");
  expect(sprites[3].texture.label).toBe("hud.char.s");
});

test("displays numbers correctly", () => {
  const container = makeTextContainer();

  // Test integer
  showTextInContainer(container, 42);
  expect(container.children.length).toBe(2);

  // Test larger number
  showTextInContainer(container, 9876);
  expect(container.children.length).toBe(4);

  // Test zero
  showTextInContainer(container, 0);
  expect(container.children.length).toBe(1);
});

test("handles special 'infinite' string by showing nothing", () => {
  const container = makeTextContainer();

  showTextInContainer(container, "infinite");
  expect(container.children.length).toBe(0);
});

test("throws error for non-existing texture", () => {
  const container = makeTextContainer();

  // Use a string with an emoji character that won't have a texture
  expect(() => {
    showTextInContainer(container, "💀");
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: could not show text "💀" in container because: "no texture id for char "💀": Texture ID 'hud.char.💀' is not a valid texture ID"]`,
  );
});

test("makeTextContainer creates container with correct options", () => {
  // Test default options
  const defaultContainer = makeTextContainer();
  expect(defaultContainer).toBeInstanceOf(Container);
  expect(defaultContainer.scale.x).toBe(1);
  expect(defaultContainer.scale.y).toBe(1);
  expect(defaultContainer.label).toBe("text");

  // Test double height option
  const doubleHeightContainer = makeTextContainer({ doubleHeight: true });
  expect(doubleHeightContainer.scale.y).toBe(2);

  // Test custom label
  const customLabelContainer = makeTextContainer({ label: "score" });
  expect(customLabelContainer.label).toBe("score");
});

test("reuses existing sprites when updating text", () => {
  const container = makeTextContainer();

  // Set initial text
  showTextInContainer(container, "abc");
  const [firstSprite, secondSprite, thirdSprite] =
    container.children as Sprite[];

  // Verify initial textures
  expect(firstSprite.texture.label).toBe("hud.char.a");
  expect(secondSprite.texture.label).toBe("hud.char.b");
  expect(thirdSprite.texture.label).toBe("hud.char.c");

  // Update to text of same length
  showTextInContainer(container, "def");

  // Should reuse the same sprite instances
  expect(container.getChildAt<Sprite>(0)).toBe(firstSprite);
  expect(container.getChildAt<Sprite>(1)).toBe(secondSprite);
  expect(container.getChildAt<Sprite>(2)).toBe(thirdSprite);

  // Verify textures were updated
  expect(firstSprite.texture.label).toBe("hud.char.d");
  expect(secondSprite.texture.label).toBe("hud.char.e");
  expect(thirdSprite.texture.label).toBe("hud.char.f");
});

test("single-height text container has correct scale", () => {
  const container = makeTextContainer();

  expect(container.scale.x).toBe(1);
  expect(container.scale.y).toBe(1);
});

test("double-height text container has correct scale", () => {
  const container = makeTextContainer({ doubleHeight: true });

  expect(container.scale.x).toBe(1);
  expect(container.scale.y).toBe(2);
});
