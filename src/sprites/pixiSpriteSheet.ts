import {
  Assets,
  Spritesheet,
  SpritesheetFrameData,
  type Texture,
} from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";
import { PlanetName, WallTextureId, SpriteSize, planets } from "../modelTypes";

export const blockSizePx = { w: 16, d: 16, h: 12 };
export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 55 } as const satisfies SpriteSize;
export const doorTextureSize = { w: 24, h: 56 };
export const doorLegsTextureSize = { w: 16, h: 32 };

export const largeItemTextureSize = { w: 32, h: 28 };
export const smallItemTextureSize = { w: 24, h: 24 };

// doors are position so the face we can see (maybe facing away from the room) is on the position
// given. This means that doors facing towards the camera need to be given negative x or y (value of -0.5)
export const doorTexturePivot = {
  x: { x: 16, y: 56 },
  y: { x: 8, y: 56 },
};
export const doorLegsPivotY = { x: 0, y: 36 };

type BackgroundFrame<TPlanet extends PlanetName> =
  | WallTextureId<TPlanet>
  | `${TPlanet}.floor`;

function* backgroundFramesGenerator<TPlanet extends PlanetName>(
  planet: TPlanet,
  startX: number,
  startY: number,
): Generator<[BackgroundFrame<TPlanet>, SpritesheetFrameData]> {
  const walls = planets[planet].walls;

  const { w, h } = wallTileSize;
  const yStep = w >> 1;
  const n = walls.length;

  let i = 0;
  for (; i < walls.length; i++) {
    yield [
      `${planet}.wall.${walls[i]}.left`,
      { frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize } },
    ];
    yield [
      `${planet}.wall.${walls[i]}.away`,
      {
        frame: {
          x: startX + w * ((n << 1) - i - 1),
          y: startY - yStep * i,
          ...wallTileSize,
        },
      },
    ];
  }

  const lastI = i - 1;
  yield [
    `${planet}.floor`,
    {
      frame: {
        x: startX + lastI * w,
        y: startY - lastI * yStep + h + 1,
        ...floorTileSize,
      },
    },
  ];
}
const backgroundFrames = <TPlanet extends PlanetName>(
  planet: TPlanet,
  startX: number,
  startY: number,
): Record<BackgroundFrame<TPlanet>, SpritesheetFrameData> => {
  return Object.fromEntries(
    backgroundFramesGenerator(planet, startX, startY),
  ) as Record<BackgroundFrame<TPlanet>, SpritesheetFrameData>;
};

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);

export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
  frames: {
    ...backgroundFrames("blacktooth", 487, 335),
    ...backgroundFrames("bookworld", 356, 23),
    ...backgroundFrames("egyptus", 435, 23),
    ...backgroundFrames("jail", 455, 351),
    ...backgroundFrames("market", 378, 244),
    ...backgroundFrames("moonbase", 384, 141),
    ...backgroundFrames("penitentiary", 513, 23),
    ...backgroundFrames("safari", 482, 244),
    "generic.edge.right": {
      frame: { x: 536, y: 392, w: 8, h: 9 },
    },
    "generic.edge.towards": {
      frame: { x: 527, y: 392, w: 8, h: 9 },
    },
    "generic.wall.overdraw": {
      frame: { x: 210, y: 37, w: wallTileSize.w, h: floorTileSize.h * 2 },
    },
    "generic.floor.deadly": {
      frame: { x: 379, y: 444, ...floorTileSize },
    },
    // doors names after the axis they go along: x=towards/away, y=left/right
    "generic.door.legs.base": {
      frame: { x: 314, y: 60, w: wallTileSize.w, h: 9 },
    },
    "generic.door.legs.pillar": {
      frame: { x: 314, y: 48, w: wallTileSize.w, h: 12 },
    },
    "generic.door.front.y": {
      frame: { x: 227, y: 13, ...doorTextureSize },
    },
    "generic.door.back.y": {
      frame: { x: 243, y: 5, ...doorTextureSize },
    },
    "generic.door.legs.threshold.y": {
      frame: { x: 331, y: 30, w: wallTileSize.w, h: 18 },
    },
    "generic.door.threshold.x": {
      frame: { x: 270, y: 70, w: 26, h: 19 },
    },
    "generic.door.threshold.y": {
      frame: { x: 241, y: 70, w: 26, h: 19 },
    },
    "generic.door.platform.towards": {
      frame: { x: 270, y: 144, w: 32, h: 32 },
    },
    "generic.door.front.x": {
      frame: { x: 286, y: 13, ...doorTextureSize },
    },
    "generic.door.back.x": {
      frame: { x: 270, y: 5, ...doorTextureSize },
    },
    "generic.door.legs.threshold.x": {
      frame: { x: 314, y: 30, w: wallTileSize.w, h: 18 },
    },
    "generic.door.platform.left": {
      frame: { x: 235, y: 114, w: 32, h: 28 },
    },
    "moonbase.door.front.y": {
      frame: { x: 344, y: 161, ...doorTextureSize },
    },
    "moonbase.door.back.y": {
      frame: { x: 360, y: 153, ...doorTextureSize },
    },
    "moonbase.door.front.x": {
      frame: { x: 528, y: 161, ...doorTextureSize },
    },
    "moonbase.door.back.x": {
      frame: { x: 512, y: 153, ...doorTextureSize },
    },
    "items.teleporter": {
      frame: { x: 4, y: 450, ...largeItemTextureSize },
    },
    "items.barrier.x": {
      frame: { x: 313, y: 389, w: 24, h: 24 },
    },
    "items.barrier.y": {
      frame: { x: 313, y: 414, w: 24, h: 24 },
    },
    "items.block.organic": {
      frame: { x: 172, y: 388, ...largeItemTextureSize },
    },
    "items.block.artificial": { 
      frame: { x: 138, y: 388, ...largeItemTextureSize },
    },
    "items.block.tower": {
      frame: { x: 286, y: 414, ...smallItemTextureSize },
    },
    "items.volcano": {
      frame: { x: 344, y: 414, ...largeItemTextureSize },
    },
    "items.toaster": {
      frame: { x: 111, y: 423, ...largeItemTextureSize },
    },
    "items.conveyor.x": {
      frame: { x: 259, y: 440, ...largeItemTextureSize },
    },
    "items.conveyor.y": {
      frame: { x: 292, y: 440, ...largeItemTextureSize },
    },
    "items.bunny": {
      frame: { x: 340, y: 358, ...smallItemTextureSize },
    },
    "items.donuts": {
      frame: { x: 313, y: 358, ...smallItemTextureSize },
    },
    "items.hooter": {
      frame: { x: 286, y: 358, ...smallItemTextureSize },
    },
    "items.bag": {
      frame: { x: 259, y: 358, ...smallItemTextureSize },
    },
    "items.fish1": {
      frame: { x: 259, y: 388, ...smallItemTextureSize },
    },
    "items.fish2": {
      frame: { x: 284, y: 388, ...smallItemTextureSize },
    },
    "items.spring.compressed": {
      frame: { x: 4, y: 421, ...smallItemTextureSize },
    },
    "items.spring.released": {
      frame: { x: 29, y: 421, ...smallItemTextureSize },
    },
  },
  meta: { scale: 1 },
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = "nearest";

export type TextureId = keyof (typeof pixiSpriteSheet)["textures"];
