import {
  Assets,
  Spritesheet,
  SpritesheetFrameData,
  type Texture,
} from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";
import { SpriteSize, Direction, Xy } from "../modelTypes";
import { PlanetName, planets, Wall } from "@/sprites/planets";

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

export type WallTextureId<PS extends PlanetName> = {
  [P in PS]: `${P}.wall.${Wall<P>}.${"left" | "away"}`;
}[PS];

type BackgroundTextureId<TPlanet extends PlanetName> =
  | WallTextureId<TPlanet>
  | `${TPlanet}.floor`;

const backgroundFrames = <TPlanet extends PlanetName>(
  planet: TPlanet,
  startX: number,
  startY: number,
): Record<BackgroundTextureId<TPlanet>, SpritesheetFrameData> => {
  function* backgroundFramesGenerator<TPlanet extends PlanetName>(
    planet: TPlanet,
    startX: number,
    startY: number,
  ): Generator<[BackgroundTextureId<TPlanet>, SpritesheetFrameData]> {
    const walls = planets[planet].walls;

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = walls.length;

    let i = 0;
    for (; i < walls.length; i++) {
      yield [
        `${planet}.wall.${walls[i]}.left`,
        {
          frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize },
        },
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

  return Object.fromEntries(
    backgroundFramesGenerator(planet, startX, startY),
  ) as Record<BackgroundTextureId<TPlanet>, SpritesheetFrameData>;
};

type DirectionalTexture<TName extends string> = `${TName}.${Direction}`;
const fourDirections = <TName extends string>(
  name: TName,

  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<`${TName}.${Direction}`, SpritesheetFrameData> => {
  function* generator(): Generator<
    [`${TName}.${Direction}`, SpritesheetFrameData]
  > {
    yield [`${name}.left`, { frame: { x: startX, y: startY, ...textureSize } }];
    yield [
      `${name}.away`,
      { frame: { x: startX + textureSize.w + 2, y: startY, ...textureSize } },
    ];
    yield [
      `${name}.towards`,
      { frame: { x: startX, y: startY + textureSize.h + 2, ...textureSize } },
    ];
    yield [
      `${name}.right`,
      {
        frame: {
          x: startX + textureSize.w + 2,
          y: startY + textureSize.h + 2,
          ...textureSize,
        },
      },
    ];
  }

  return Object.fromEntries(generator()) as Record<
    DirectionalTexture<TName>,
    SpritesheetFrameData
  >;
};

//technically not all our animations have four frames but that's the maximum and it'll do ok
// could be a bit smarter here really
type AnimatedTextureName<TName extends string> =
  `${TName}.${"1" | "2" | "3" | "4"}`;
const animatedSeries = <TName extends string>(
  name: TName,
  n: number,
  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<AnimatedTextureName<TName>, SpritesheetFrameData> => {
  function* generator(): Generator<
    [AnimatedTextureName<TName>, SpritesheetFrameData]
  > {
    for (let i = 0; i < n; i++) {
      yield [
        `${name}.${i + 1}` as AnimatedTextureName<TName>,
        {
          frame: {
            x: startX + i * (textureSize.w + 1),
            y: startY,
            ...textureSize,
          },
        },
      ];
    }
  }

  return Object.fromEntries(generator()) as Record<
    AnimatedTextureName<TName>,
    SpritesheetFrameData
  >;
};

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);

const spritesheetData = {
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
    "generic.wall.overdraw.debug": {
      frame: { x: 210, y: 4, w: wallTileSize.w, h: floorTileSize.h * 2 },
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
    teleporter: {
      frame: { x: 4, y: 450, ...largeItemTextureSize },
    },
    "barrier.x": {
      frame: { x: 313, y: 389, w: 24, h: 24 },
    },
    "barrier.y": {
      frame: { x: 313, y: 414, w: 24, h: 24 },
    },
    "block.organic": {
      frame: { x: 172, y: 388, ...largeItemTextureSize },
    },
    "block.artificial": {
      frame: { x: 138, y: 388, ...largeItemTextureSize },
    },
    "block.tower": {
      frame: { x: 286, y: 414, ...smallItemTextureSize },
    },
    volcano: {
      frame: { x: 344, y: 414, ...largeItemTextureSize },
    },
    toaster: {
      frame: { x: 111, y: 423, ...largeItemTextureSize },
    },
    spikes: {
      frame: { x: 379, y: 414, ...largeItemTextureSize },
    },
    "conveyor.x": {
      frame: { x: 259, y: 440, ...largeItemTextureSize },
    },
    "conveyor.y": {
      frame: { x: 292, y: 440, ...largeItemTextureSize },
    },
    bunny: {
      frame: { x: 340, y: 358, ...smallItemTextureSize },
    },
    donuts: {
      frame: { x: 313, y: 358, ...smallItemTextureSize },
    },
    crown: {
      frame: { x: 367, y: 358, ...smallItemTextureSize },
    },
    hooter: {
      frame: { x: 286, y: 358, ...smallItemTextureSize },
    },
    bag: {
      frame: { x: 259, y: 358, ...smallItemTextureSize },
    },
    ...animatedSeries("fish", 2, { x: 259, y: 388 }, smallItemTextureSize),
    "spring.compressed": {
      frame: { x: 4, y: 421, ...smallItemTextureSize },
    },
    "spring.released": {
      frame: { x: 29, y: 421, ...smallItemTextureSize },
    },
    "head.toward1": {
      frame: { x: 29, y: 266, ...smallItemTextureSize },
    },
    "heels.toward1": {
      frame: { x: 184, y: 266, ...smallItemTextureSize },
    },

    ...animatedSeries("lift", 4, { x: 259, y: 474 }, smallItemTextureSize),
    ...animatedSeries("dalek", 2, { x: 4, y: 4 }, smallItemTextureSize),

    "headless-base": {
      frame: { x: 57, y: 4, ...smallItemTextureSize },
    },
    joystick: {
      frame: { x: 259, y: 414, ...smallItemTextureSize },
    },
    anvil: {
      frame: { x: 144, y: 423, ...largeItemTextureSize },
    },
    "book.x": {
      frame: { x: 184, y: 450, ...largeItemTextureSize },
    },
    "book.y": {
      frame: { x: 222, y: 450, ...largeItemTextureSize },
    },
    sandwich: {
      frame: { x: 4, y: 356, ...largeItemTextureSize },
    },
    sticks: {
      frame: { x: 4, y: 391, ...smallItemTextureSize },
    },
    cube: {
      frame: { x: 31, y: 391, ...smallItemTextureSize },
    },
    drum: {
      frame: { x: 58, y: 391, ...smallItemTextureSize },
    },
    "switch.off": {
      frame: { x: 111, y: 454, ...smallItemTextureSize },
    },
    "switch.on": {
      frame: { x: 136, y: 454, ...smallItemTextureSize },
    },
    ...fourDirections(
      "american-football-head",
      { x: 4, y: 34 },
      { w: 24, h: 32 },
    ),
    ...fourDirections("charles", { x: 118, y: 34 }, smallItemTextureSize),
    ...fourDirections("cyberman", { x: 61, y: 34 }, smallItemTextureSize),
    ...fourDirections("monkey", { x: 118, y: 90 }, smallItemTextureSize),
    ...fourDirections("elephant", { x: 118, y: 146 }, smallItemTextureSize),
    ...fourDirections("computer-bot", { x: 173, y: 146 }, smallItemTextureSize),

    ...animatedSeries("bubbles", 3, { x: 4, y: 107 }, smallItemTextureSize),

    ...animatedSeries("turtle.left", 2, { x: 4, y: 137 }, smallItemTextureSize),
    ...animatedSeries(
      "turtle.away",
      2,
      { x: 55, y: 137 },
      smallItemTextureSize,
    ),
    ...animatedSeries(
      "turtle.towards",
      2,
      { x: 4, y: 163 },
      smallItemTextureSize,
    ),
    ...animatedSeries(
      "turtle.right",
      2,
      { x: 55, y: 163 },
      smallItemTextureSize,
    ),

    ...animatedSeries(
      "helicopter-bug",
      4,
      { x: 4, y: 194 },
      smallItemTextureSize,
    ),

    "hush-puppy": {
      frame: { x: 163, y: 300, ...largeItemTextureSize },
    },
    ball: {
      frame: { x: 84, y: 4, ...smallItemTextureSize },
    },
    puck: {
      frame: { x: 111, y: 392, ...smallItemTextureSize },
    },
  },
  animations: {
    fish: ["fish.1", "fish.2"],
    lift: ["lift.1", "lift.2", "lift.3", "lift.4"],
    dalek: ["dalek.1", "dalek.2"],
    "turtle.left": ["turtle.left.1", "turtle.left.2"],
    "turtle.away": ["turtle.away.1", "turtle.away.2"],
    "turtle.towards": ["turtle.towards.1", "turtle.towards.2"],
    "turtle.right": ["turtle.right.1", "turtle.right.2"],
    "helicopter-bug": [
      "helicopter-bug.1",
      "helicopter-bug.2",
      "helicopter-bug.3",
      "helicopter-bug.4",
    ],
    bubbles: ["bubbles.1", "bubbles.2" /*, "bubbles.3"*/],
  },
  meta: { scale: 1 },
};

export const pixiSpriteSheet = new Spritesheet(spritesTexture, spritesheetData);

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = "nearest";

export type TextureId = keyof (typeof pixiSpriteSheet)["textures"];
export type AnimationId = keyof (typeof pixiSpriteSheet)["animations"];
