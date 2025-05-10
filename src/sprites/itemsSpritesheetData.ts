import type { SpritesheetData } from "pixi.js";
import {
  fourDirections,
  fourDirectionsOfNumberedTextures,
  seriesOfAnimationFrameTextureIds,
  seriesOfNumberedTextures,
} from "./spriteGenerators";
import {
  largeItemGridLocation,
  largeItemTextureSize,
  smallItemGridLocation,
  smallItemTextureSize,
} from "./textureSizes";
import { withSpeed } from "./withSpeed";

const frames = {
  ...seriesOfNumberedTextures(
    "dalek",
    2,
    smallItemGridLocation({ x: 0, y: 0 }),
    smallItemTextureSize,
  ),
  "shadowMask.dalek": {
    frame: {
      ...smallItemGridLocation({ x: 2, y: 0 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "bubbles.cold",
    2,
    smallItemGridLocation({ x: 3, y: 0 }),
    smallItemTextureSize,
  ),

  homingBot: {
    frame: {
      ...smallItemGridLocation({ x: 5, y: 0 }),
      ...smallItemTextureSize,
    },
  },

  ball: {
    frame: {
      ...smallItemGridLocation({ x: 0, y: 1 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirections(
    "cyberman",
    smallItemGridLocation({ x: 1, y: 1 }),
    smallItemTextureSize,
  ),

  ...fourDirections(
    "charles",
    smallItemGridLocation({ x: 3, y: 1 }),
    smallItemTextureSize,
  ),
  "shadowMask.charles.away": {
    frame: {
      ...smallItemGridLocation({ x: 5, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.charles.right": {
    frame: {
      ...smallItemGridLocation({ x: 5, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirections(
    "elephant",
    smallItemGridLocation({ x: 6, y: 1 }),
    smallItemTextureSize,
  ),

  "crown.blacktooth": {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "crown.safari": {
    frame: {
      ...smallItemGridLocation({ x: 9, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "crown.egyptus": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "crown.penitentiary": {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "crown.bookworld": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "crown.dark": {
    frame: {
      ...smallItemGridLocation({ x: 13, y: 1 }),
      ...smallItemTextureSize,
    },
  },

  sticks: {
    frame: {
      ...smallItemGridLocation({ x: 8, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  cube: {
    frame: {
      ...smallItemGridLocation({ x: 9, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  drum: {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  hooter: {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  bag: {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  joystick: {
    frame: {
      ...smallItemGridLocation({ x: 13, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.joystick": {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirectionsOfNumberedTextures(
    "turtle",
    2,
    smallItemGridLocation({ x: 0, y: 3 }),
    smallItemTextureSize,
  ),
  "shadowMask.turtle.away": {
    frame: {
      ...smallItemGridLocation({ x: 4, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.turtle.right": {
    frame: {
      ...smallItemGridLocation({ x: 4, y: 4 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirections(
    "monkey",
    smallItemGridLocation({ x: 5, y: 3 }),
    smallItemTextureSize,
  ),

  ...fourDirections(
    "computerBot",
    smallItemGridLocation({ x: 7, y: 3 }),
    smallItemTextureSize,
  ),

  "spring.compressed": {
    frame: {
      ...smallItemGridLocation({ x: 9, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  "spring.released": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  "switch.left": {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  "switch.right": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.switch": {
    frame: {
      ...smallItemGridLocation({ x: 13, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  tower: {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  "shadowMask.tower": {
    frame: {
      ...smallItemGridLocation({ x: 15, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  scroll: {
    frame: {
      ...smallItemGridLocation({ x: 9, y: 4 }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },
  "shadow.scroll": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 4 }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },
  "shadowMask.scroll": {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 4 }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },
  "spikyBall.1": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "spikyBall.2": {
    frame: {
      ...smallItemGridLocation({ x: 13, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  puck: {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadow.smallRound": {
    frame: {
      ...smallItemGridLocation({ x: 15, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.smallRound": {
    frame: {
      ...smallItemGridLocation({ x: 16, y: 4 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "helicopterBug",
    4,
    smallItemGridLocation({ x: 0, y: 5 }),
    smallItemTextureSize,
  ),

  "barrier.x": {
    frame: {
      ...smallItemGridLocation({ x: 4, y: 5 }),
      ...smallItemTextureSize,
      pivot: { x: 18, y: 23 },
    },
  },
  "barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 5, y: 5 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 23 },
    },
  },
  "shadow.barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 6, y: 5 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 22 },
    },
  },
  "shadowMask.barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 5 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 22 },
    },
  },

  ...seriesOfNumberedTextures(
    "bubbles.taupe",
    3,
    smallItemGridLocation({ x: 8, y: 5 }),
    smallItemTextureSize,
  ),

  whiteRabbit: {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 5 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.whiteRabbit": {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 5 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "bubbles.white",
    3,
    smallItemGridLocation({ x: 13, y: 5 }),
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "fish",
    2,
    smallItemGridLocation({ x: 12, y: 6 }),
    smallItemTextureSize,
  ),

  doughnuts: {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 6 }),
      ...smallItemTextureSize,
    },
  },
  // deliberately blank sprite to use as a noop
  "shadowMask.doughnuts": {
    frame: {
      ...smallItemGridLocation({ x: 15, y: 6 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "lift",
    4,
    smallItemGridLocation({ x: 10, y: 8 }),
    smallItemTextureSize,
  ),
  "lift.static": {
    frame: {
      ...smallItemGridLocation({ x: 10, y: 7 }),
      ...smallItemTextureSize,
    },
  },

  "shadow.smallBlock": {
    frame: {
      ...smallItemGridLocation({ x: 11, y: 7 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.smallBlock": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 7 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirections(
    "skiHead.greenAndPink",
    { x: 251, y: 227 },
    { w: 24, h: 32 },
  ),
  ...fourDirections(
    "skiHead.starsAndStripes",
    { x: 301, y: 227 },
    { w: 24, h: 32 },
  ),
  "shadowMask.skiHead.away": {
    frame: {
      x: 351,
      y: 227,
      w: 24,
      h: 32,
    },
  },
  "shadowMask.skiHead.right": {
    frame: {
      x: 351,
      y: 260,
      w: 24,
      h: 32,
    },
  },

  "block.organic": {
    frame: {
      ...largeItemGridLocation({ x: 0, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.organic.disappearing": {
    frame: {
      ...largeItemGridLocation({ x: 1, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.organic.dark": {
    frame: {
      ...largeItemGridLocation({ x: 2, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.organic.dark.disappearing": {
    frame: {
      ...largeItemGridLocation({ x: 3, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.artificial": {
    frame: {
      ...largeItemGridLocation({ x: 4, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.artificial.disappearing": {
    frame: {
      ...largeItemGridLocation({ x: 5, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "book.x": {
    frame: {
      ...largeItemGridLocation({ x: 6, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "book.y": {
    frame: {
      ...largeItemGridLocation({ x: 7, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadow.fullBlock": {
    frame: {
      ...largeItemGridLocation({ x: 8, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.fullBlock": {
    frame: {
      ...largeItemGridLocation({ x: 9, y: 0 }),
      ...largeItemTextureSize,
    },
  },

  stepStool: {
    frame: {
      ...largeItemGridLocation({ x: 0, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.stepStool": {
    frame: {
      ...largeItemGridLocation({ x: 1, y: 1 }),
      ...largeItemTextureSize,
    },
  },

  volcano: {
    frame: {
      ...largeItemGridLocation({ x: 2, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.volcano": {
    frame: {
      ...largeItemGridLocation({ x: 3, y: 1 }),
      ...largeItemTextureSize,
    },
  },

  hushPuppy: {
    frame: {
      ...largeItemGridLocation({ x: 4, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.hushPuppy": {
    frame: {
      ...largeItemGridLocation({ x: 5, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  toaster: {
    frame: {
      ...largeItemGridLocation({ x: 6, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  sandwich: {
    frame: {
      ...largeItemGridLocation({ x: 7, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  spikes: {
    frame: {
      ...largeItemGridLocation({ x: 8, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.spikes": {
    frame: {
      ...largeItemGridLocation({ x: 9, y: 1 }),
      ...largeItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "conveyor.x",
    7,
    largeItemGridLocation({ x: 0, y: 2 }),
    largeItemTextureSize,
  ),
  "shadowMask.conveyor": {
    frame: {
      ...largeItemGridLocation({ x: 7, y: 2 }),
      ...largeItemTextureSize,
    },
  },
  button: {
    frame: {
      ...largeItemGridLocation({ x: 9, y: 2 }),
      ...largeItemTextureSize,
    },
  },
  "button.pressed": {
    frame: {
      ...largeItemGridLocation({ x: 10, y: 2 }),
      ...largeItemTextureSize,
    },
  },
  "button.surfaceMask": {
    frame: {
      ...largeItemGridLocation({ x: 11, y: 2 }),
      ...largeItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "conveyor.y",
    7,
    largeItemGridLocation({ x: 0, y: 3 }),
    largeItemTextureSize,
  ),
  teleporter: {
    frame: {
      ...largeItemGridLocation({ x: 7, y: 3 }),
      ...largeItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "teleporter.flashing",
    2,
    largeItemGridLocation({ x: 8, y: 3 }),
    largeItemTextureSize,
  ),
  "shadowMask.teleporter": {
    frame: {
      ...largeItemGridLocation({ x: 10, y: 3 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.teleporter.flashing": {
    frame: {
      ...largeItemGridLocation({ x: 11, y: 3 }),
      ...largeItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "particle",
    4,
    { x: 331, y: 396 },
    { w: 9, h: 11 },
  ),
} as const;

export const itemsSpritesheetData = {
  frames,
  animations: {
    "teleporter.flashing": withSpeed(
      ["teleporter.flashing.1", "teleporter.flashing.2"] as const,
      0.5,
    ),
    fish: withSpeed(["fish.1", "fish.2"] as const, 0.25),
    lift: withSpeed(["lift.1", "lift.2", "lift.3", "lift.4"] as const, 0.5),
    dalek: withSpeed(["dalek.1", "dalek.2"] as const, 0.5),
    "turtle.left": withSpeed(["turtle.left.1", "turtle.left.2"] as const, 0.25),
    "turtle.away": withSpeed(["turtle.away.1", "turtle.away.2"] as const, 0.25),
    "turtle.towards": withSpeed(
      ["turtle.towards.1", "turtle.towards.2"] as const,
      0.25,
    ),
    "turtle.right": withSpeed(
      ["turtle.right.1", "turtle.right.2"] as const,
      0.25,
    ),
    helicopterBug: withSpeed(
      [
        "helicopterBug.1",
        "helicopterBug.2",
        "helicopterBug.3",
        "helicopterBug.4",
      ] as const,
      0.5,
    ),
    "bubbles.cold": withSpeed(
      ["bubbles.cold.1", "bubbles.cold.2" /*, "bubbles.3"*/] as const,
      0.25,
    ),
    "bubbles.white": withSpeed(
      ["bubbles.white.1", "bubbles.white.2", "bubbles.white.3"] as const,
      0.5,
    ),
    "bubbles.bounce.white": withSpeed(
      [
        "bubbles.white.1",
        "bubbles.white.2",
        "bubbles.white.3",
        "bubbles.white.2",
      ] as const,
      0.5,
    ),
    "bubbles.doughnut": withSpeed(
      ["bubbles.taupe.1", "bubbles.taupe.2"] as const,
      0.5,
    ),
    "conveyor.x": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.x", 7),
      0.5,
    ),
    "conveyor.y": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.y", 7),
      0.5,
    ),
    "spring.bounce": withSpeed(
      [
        "spring.released",
        "spring.compressed",
        "spring.released",
        "spring.compressed",
        "spring.released",
      ] as const,
      0.5,
    ),
    // never actually used in the game(!) - for the manual only
    switch: withSpeed(["switch.left", "switch.right"] as const, 0.02),
    "particle.fade": withSpeed(
      seriesOfAnimationFrameTextureIds("particle", 4),
      0.5,
    ),
  },
} as const satisfies Pick<SpritesheetData, "frames" | "animations">;
