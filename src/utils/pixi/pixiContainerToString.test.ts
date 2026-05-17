import { Container, Graphics, Sprite, Text, type Texture } from "pixi.js";
import { describe, expect, test } from "vitest";

import { pixiContainerToString } from "./pixiContainerToString";

const fakeTexture = (label: string) =>
  ({
    label,
  }) as unknown as Texture;

describe("pixiContainerToString", () => {
  test("renders a simple container", () => {
    const container = new Container();
    container.label = "SimpleContainer";

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "SimpleContainer"
      "
    `);
  });

  test("renders a container with children", () => {
    const parent = new Container();
    parent.label = "Parent";

    const child1 = new Container();
    child1.label = "Child1";

    const child2 = new Container();
    child2.label = "Child2";

    parent.addChild(child1, child2);

    const result = pixiContainerToString(parent);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "Parent"
      │  → children: 2
      ├── 📦 Container "Child1"
      └── 📦 Container "Child2"
      "
    `);
  });

  test("renders a complex scene graph", () => {
    // Create a complex scene graph simulating a game scene
    const root = new Container();
    root.label = "GameScene";

    // Game world container
    const world = new Container();
    world.label = "World";

    // Player with equipment
    const player = new Container();
    player.label = "Player";
    player.alpha = 0.9;

    const playerSprite = new Sprite();
    playerSprite.label = "PlayerSprite";

    const weapon = new Graphics();
    weapon.label = "Sword";

    player.addChild(playerSprite, weapon);

    // Enemy with health bar
    const enemy = new Container();
    enemy.label = "Enemy";

    const enemySprite = new Sprite();
    const healthBar = new Graphics();
    healthBar.label = "HealthBar";
    healthBar.alpha = 0.75;

    enemy.addChild(enemySprite, healthBar);

    // Hidden treasure
    const treasure = new Container();
    treasure.label = "TreasureChest";
    treasure.visible = false;

    const treasureSprite = new Sprite();
    const sparkles = new Graphics();
    sparkles.label = "Sparkles";

    treasure.addChild(treasureSprite, sparkles);

    // Masked container (like in ItemPositionRenderer)
    const maskedItem = new Container();
    maskedItem.label = "MaskedItem";

    const itemContent = new Container();
    itemContent.label = "ItemContent";

    const maskSprite = new Sprite();
    maskSprite.label = "MaskSprite";

    maskedItem.addChild(itemContent, maskSprite);
    maskedItem.mask = maskSprite;

    world.addChild(player, enemy, treasure, maskedItem);

    // UI Layer
    const ui = new Container();
    ui.label = "UI";

    const scoreText = new Text({ text: "Score: 1000" });
    scoreText.label = "ScoreDisplay";

    const minimap = new Graphics();
    minimap.label = "Minimap";
    minimap.alpha = 0.5;

    ui.addChild(scoreText, minimap);

    // Empty container
    const effects = new Container();
    effects.label = "Effects";

    root.addChild(world, ui, effects);

    const result = pixiContainerToString(root);

    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "GameScene"
      │  → children: 3
      ├── 📦 Container "World"
      │   │  → children: 4
      │   ├── 📦 Container "Player"
      │   │   │  → children: 2
      │   │   │  → alpha: 0.90
      │   │   ├── 🖼️ Sprite "PlayerSprite"
      │   │   │      → texture: "EMPTY"
      │   │   └── 🎨 Graphics "Sword"
      │   ├── 📦 Container "Enemy"
      │   │   │  → children: 2
      │   │   ├── 🖼️ Sprite
      │   │   │      → texture: "EMPTY"
      │   │   └── 🎨 Graphics "HealthBar"
      │   │          → alpha: 0.75
      │   ├── 📦 Container "TreasureChest"
      │   │   │  → children: 2
      │   │   │  → hidden
      │   │   ├── 🖼️ Sprite
      │   │   │      → texture: "EMPTY"
      │   │   └── 🎨 Graphics "Sparkles"
      │   └── 📦 Container "MaskedItem"
      │       │  → children: 2
      │       │  → 😷 masked
      │       ├── 📦 Container "ItemContent"
      │       └── 🖼️😷 Sprite "MaskSprite"
      │              → texture: "EMPTY"
      ├── 📦 Container "UI"
      │   │  → children: 2
      │   ├── 📝 Text "ScoreDisplay"
      │   └── 🎨 Graphics "Minimap"
      │          → alpha: 0.50
      └── 📦 Container "Effects"
      "
    `);
  });

  test("handles containers without labels", () => {
    const parent = new Container();
    const child = new Sprite();
    parent.addChild(child);

    const result = pixiContainerToString(parent);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container
      │  → children: 1
      └── 🖼️ Sprite
             → texture: "EMPTY"
      "
    `);
  });

  test("handles different Pixi display object types", () => {
    const container = new Container();
    container.label = "MixedTypes";

    container.addChild(
      new Sprite(),
      new Graphics(),
      new Text({ text: "Hello" }),
      new Container(),
    );

    // Set labels for clarity
    container.children[0].label = "Image";
    container.children[1].label = "Shape";
    container.children[2].label = "Label";
    container.children[3].label = "Group";

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "MixedTypes"
      │  → children: 4
      ├── 🖼️ Sprite "Image"
      │      → texture: "EMPTY"
      ├── 🎨 Graphics "Shape"
      ├── 📝 Text "Label"
      └── 📦 Container "Group"
      "
    `);
  });

  test("handles deeply nested structures", () => {
    let current = new Container();
    current.label = "Level0";
    const root = current;

    // Create 5 levels of nesting
    for (let i = 1; i <= 5; i++) {
      const next = new Container();
      next.label = `Level${i}`;
      current.addChild(next);
      current = next;
    }

    const result = pixiContainerToString(root);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "Level0"
      │  → children: 1
      └── 📦 Container "Level1"
          │  → children: 1
          └── 📦 Container "Level2"
              │  → children: 1
              └── 📦 Container "Level3"
                  │  → children: 1
                  └── 📦 Container "Level4"
                      │  → children: 1
                      └── 📦 Container "Level5"
      "
    `);
  });

  test("handles multiple properties at once", () => {
    const container = new Container();
    container.label = "MultiProp";
    container.visible = false;
    container.alpha = 0.3;
    container.mask = new Graphics();

    const child = new Container();
    container.addChild(child);

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "MultiProp"
      │  → children: 1
      │  → hidden
      │  → alpha: 0.30
      │  → 😷 masked
      └── 📦 Container
      "
    `);
  });

  test("includes position when not at origin", () => {
    const container = new Container();
    container.label = "Positioned";
    container.x = 100;
    container.y = 50;

    const child = new Container();
    child.label = "ChildAt30,40";
    child.x = 30;
    child.y = 40;

    const sprite = new Sprite();
    sprite.x = 5;
    sprite.y = 10;

    child.addChild(sprite);
    container.addChild(child);

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "Positioned"
      │  → @(x=100, y=50)
      │  → children: 1
      └── 📦 Container "ChildAt30,40"
          │  → @(x=30, y=40)
          │  → children: 1
          └── 🖼️ Sprite
                 → @(x=5, y=10)
                 → texture: "EMPTY"
      "
    `);
  });

  test("displays texture information for Sprites", () => {
    const container = new Container();
    container.label = "SpriteShowcase";

    // Sprite with labeled texture
    const spriteWithLabeledTexture = new Sprite();
    spriteWithLabeledTexture.label = "PlayerSprite";
    // Mock texture with label
    spriteWithLabeledTexture.texture = fakeTexture("player_idle");

    // Sprite with anonymous texture (no label)
    const spriteWithAnonTexture = new Sprite();
    spriteWithAnonTexture.label = "BackgroundSprite";
    // Mock texture without label
    spriteWithAnonTexture.texture = {} as unknown as Texture;

    // Sprite with null texture
    const spriteWithoutTexture = new Sprite();
    spriteWithoutTexture.label = "EmptySprite";
    spriteWithoutTexture.texture = null as unknown as Texture;

    container.addChild(
      spriteWithLabeledTexture,
      spriteWithAnonTexture,
      spriteWithoutTexture,
    );

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "SpriteShowcase"
      │  → children: 3
      ├── 🖼️ Sprite "PlayerSprite"
      │      → texture: "player_idle"
      ├── 🖼️ Sprite "BackgroundSprite"
      │      → texture: "(anon texture)"
      └── 🖼️ Sprite "EmptySprite"
             → texture: "EMPTY"
      "
    `);
  });

  test("handles Sprites with textures and other properties", () => {
    const container = new Container();
    container.label = "ComplexSprite";

    const sprite = new Sprite();
    sprite.label = "AnimatedSprite";
    sprite.x = 50;
    sprite.y = 100;
    sprite.alpha = 0.7;
    // Mock texture
    sprite.texture = fakeTexture("walk_frame_01");

    container.addChild(sprite);

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "ComplexSprite"
      │  → children: 1
      └── 🖼️ Sprite "AnimatedSprite"
             → @(x=50, y=100)
             → alpha: 0.70
             → texture: "walk_frame_01"
      "
    `);
  });

  test("handles Sprite subclasses with texture info", () => {
    const container = new Container();
    container.label = "SubclassTest";

    // Create a mock Sprite subclass
    class CustomSprite extends Sprite {}

    const customSprite = new CustomSprite();
    customSprite.label = "MyCustomSprite";
    // Mock texture
    customSprite.texture = fakeTexture("custom_texture");

    container.addChild(customSprite);

    const result = pixiContainerToString(container);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "SubclassTest"
      │  → children: 1
      └── 📌 CustomSprite "MyCustomSprite"
             → texture: "custom_texture"
      "
    `);
  });

  test("shows mask emoji on containers used as masks", () => {
    const parent = new Container();
    parent.label = "MaskedParent";

    const content = new Container();
    content.label = "Content";

    const maskContainer = new Container();
    maskContainer.label = "MaskShape";

    const maskGraphics = new Graphics();
    maskGraphics.label = "CircleMask";

    maskContainer.addChild(maskGraphics);
    parent.addChild(content, maskContainer);
    parent.mask = maskContainer;

    const result = pixiContainerToString(parent);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "MaskedParent"
      │  → children: 2
      │  → 😷 masked
      ├── 📦 Container "Content"
      └── 📦😷 Container "MaskShape"
          │  → children: 1
          └── 🎨 Graphics "CircleMask"
      "
    `);
  });

  test("shows mask emoji with level indicator for grandparent masks", () => {
    const grandparent = new Container();
    grandparent.label = "Grandparent";

    const parent = new Container();
    parent.label = "Parent";

    const child = new Container();
    child.label = "Child";

    const maskSprite = new Sprite();
    maskSprite.label = "DeepMask";
    maskSprite.texture = fakeTexture("mask_texture");

    child.addChild(maskSprite);
    parent.addChild(child);
    grandparent.addChild(parent);

    // Set the deep nested sprite as grandparent's mask
    grandparent.mask = maskSprite;

    const result = pixiContainerToString(grandparent);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "Grandparent"
      │  → children: 1
      │  → 😷 masked
      └── 📦 Container "Parent"
          │  → children: 1
          └── 📦 Container "Child"
              │  → children: 1
              └── 🖼️😷^3 Sprite "DeepMask"
                     → texture: "mask_texture"
      "
    `);
  });

  test("shows multiple mask relationships", () => {
    const root = new Container();
    root.label = "Root";

    const level1 = new Container();
    level1.label = "Level1";

    const level2 = new Container();
    level2.label = "Level2";

    const sharedMask = new Graphics();
    sharedMask.label = "SharedMask";

    level2.addChild(sharedMask);
    level1.addChild(level2);
    root.addChild(level1);

    // Use the same mask for both root and level1
    root.mask = sharedMask;
    level1.mask = sharedMask;

    const result = pixiContainerToString(root);
    expect(result).toMatchInlineSnapshot(`
      "
      📦 Container "Root"
      │  → children: 1
      │  → 😷 masked
      └── 📦 Container "Level1"
          │  → children: 1
          │  → 😷 masked
          └── 📦 Container "Level2"
              │  → children: 1
              └── 🎨😷^2😷^3 Graphics "SharedMask"
      "
    `);
  });
});
