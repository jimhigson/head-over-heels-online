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

let x: number = 0;
let y: number = 0;

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

  headlessBase: {
    frame: {
      ...smallItemGridLocation({ x: 7, y: 0 }),
      ...smallItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "headlessBase",
    4,
    smallItemGridLocation({ x: 8, y: 0 }),
    smallItemTextureSize,
  ),

  "headlessBase.all": {
    frame: {
      ...smallItemGridLocation({ x: 12, y: 0 }),
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
    "cyberman",
    smallItemGridLocation({ x: 6, y: 3 }),
    smallItemTextureSize,
  ),

  ...fourDirections(
    "skiHead.greenAndPink",
    smallItemGridLocation({ x: 9, y: 3 }),
    { w: 24, h: 32 },
  ),
  ...fourDirections(
    "skiHead.starsAndStripes",
    smallItemGridLocation({ x: 11, y: 3 }),
    { w: 24, h: 32 },
  ),

  "shadowMask.skiHead.away": {
    frame: {
      ...smallItemGridLocation({ x: 13, y: 3 }),
      ...smallItemTextureSize,
      h: 32,
    },
  },
  "shadowMask.skiHead.right": {
    frame: {
      ...smallItemGridLocation({ x: 14, y: 3 }),
      ...smallItemTextureSize,
      h: 32,
    },
  },

  ...fourDirections(
    "charles",
    smallItemGridLocation({ x: 0, y: 5 }),
    smallItemTextureSize,
  ),

  "shadowMask.charles.away": {
    frame: {
      ...smallItemGridLocation({ x: 2, y: 5 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.charles.right": {
    frame: {
      ...smallItemGridLocation({ x: 2, y: 6 }),
      ...smallItemTextureSize,
    },
  },

  ...fourDirections(
    "monkey",
    smallItemGridLocation({ x: 0, y: 7 }),
    smallItemTextureSize,
  ),

  ...fourDirections(
    "computerBot",
    smallItemGridLocation({ x: 3, y: 7 }),
    smallItemTextureSize,
  ),

  ...fourDirections(
    "elephant",
    smallItemGridLocation({ x: 6, y: 7 }),
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "helicopterBug",
    4,
    smallItemGridLocation({ x: 9, y: 7 }),
    smallItemTextureSize,
  ),

  "barrier.x.disappearing": {
    frame: {
      ...smallItemGridLocation({ x: 17, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 18, y: 23 },
    },
  },
  "barrier.y.disappearing": {
    frame: {
      ...smallItemGridLocation({ x: 18, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 23 },
    },
  },
  "barrier.x": {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 18, y: 23 },
    },
  },
  "barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 20, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 23 },
    },
  },
  "shadow.barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 22 },
    },
  },
  "shadowMask.barrier.y": {
    frame: {
      ...smallItemGridLocation({ x: 22, y: 0 }),
      ...smallItemTextureSize,
      pivot: { x: 6, y: 22 },
    },
  },

  "joystick.stick": {
    frame: {
      ...smallItemGridLocation({ x: 18, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "joystick.ball": {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "joystick.whole": {
    frame: {
      ...smallItemGridLocation({ x: 20, y: 1 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.joystick": {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 1 }),
      ...smallItemTextureSize,
    },
  },

  ball: {
    frame: {
      ...smallItemGridLocation({ x: 17, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.ball": {
    frame: {
      ...smallItemGridLocation({ x: 18, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  "ball.uncolourised": {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  "spikyBall.1": {
    frame: {
      ...smallItemGridLocation({ x: 20, y: 2 }),
      ...smallItemTextureSize,
    },
  },
  "spikyBall.2": {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 2 }),
      ...smallItemTextureSize,
    },
  },

  tower: {
    frame: {
      ...smallItemGridLocation({ x: 15, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  "shadowMask.tower": {
    frame: {
      ...smallItemGridLocation({ x: 16, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  sticks: {
    frame: {
      ...smallItemGridLocation({ x: 18, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  cube: {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  drum: {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 3 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.drum": {
    frame: {
      ...smallItemGridLocation({ x: 22, y: 3 }),
      ...smallItemTextureSize,
    },
  },

  puck: {
    frame: {
      ...smallItemGridLocation({ x: 15, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadow.smallRound": {
    frame: {
      ...smallItemGridLocation({ x: 16, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.smallRound": {
    frame: {
      ...smallItemGridLocation({ x: 17, y: 4 }),
      ...smallItemTextureSize,
    },
  },

  "spring.compressed": {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "spring.released": {
    frame: {
      ...smallItemGridLocation({ x: 20, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.spring.compressed": {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 4 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.spring.released": {
    frame: {
      ...smallItemGridLocation({ x: 22, y: 4 }),
      ...smallItemTextureSize,
    },
  },

  ...seriesOfNumberedTextures(
    "fish",
    2,
    smallItemGridLocation({ x: 16, y: 6 }),
    smallItemTextureSize,
  ),

  doughnuts: {
    frame: {
      ...smallItemGridLocation({ x: 18, y: 6 }),
      ...smallItemTextureSize,
    },
  },
  // deliberately blank sprite to use as a noop
  "shadowMask.doughnuts": {
    frame: {
      ...smallItemGridLocation({ x: 19, y: 6 }),
      ...smallItemTextureSize,
    },
  },

  hooter: {
    frame: {
      ...smallItemGridLocation({ x: 21, y: 6 }),
      ...smallItemTextureSize,
    },
  },
  bag: {
    frame: {
      ...smallItemGridLocation({ x: 22, y: 6 }),
      ...smallItemTextureSize,
    },
  },

  whiteRabbit: {
    frame: {
      ...smallItemGridLocation({ x: 24, y: 6 }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.whiteRabbit": {
    frame: {
      ...smallItemGridLocation({ x: 25, y: 6 }),
      ...smallItemTextureSize,
    },
  },

  "crown.blacktooth": {
    frame: {
      ...smallItemGridLocation({ x: (x = 16), y: (y = 7) }),
      ...smallItemTextureSize,
    },
  },
  "crown.safari": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "crown.egyptus": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "crown.penitentiary": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "crown.bookworld": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "crown.uncolourised": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },

  scroll: {
    frame: {
      ...smallItemGridLocation({ x: (x = 16), y: (y = 8) }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },
  "shadow.scroll": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },
  "shadowMask.scroll": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
      pivot: { x: 17, y: 24 },
    },
  },

  buttonInGame: {
    frame: {
      ...smallItemGridLocation({ x: (x = 16), y: (y = 9) }),
      ...smallItemTextureSize,
    },
  },
  "buttonInGame.pressed": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.buttonInGame": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },

  "switch.left": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "switch.right": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.switch": {
    frame: {
      ...smallItemGridLocation({ x: ++x, y }),
      ...smallItemTextureSize,
    },
  },

  "lift.static": {
    frame: {
      ...smallItemGridLocation({ x: 16, y: (y = 10) }),
      ...smallItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "lift",
    4,
    smallItemGridLocation({ x: 17, y }),
    smallItemTextureSize,
  ),
  "shadow.smallBlock": {
    frame: {
      ...smallItemGridLocation({ x: 21, y }),
      ...smallItemTextureSize,
    },
  },
  "shadowMask.smallBlock": {
    frame: {
      ...smallItemGridLocation({ x: 22, y }),
      ...smallItemTextureSize,
    },
  },
  ...seriesOfNumberedTextures(
    "shadow.lift",
    4,
    smallItemGridLocation({ x: 17, y: 11 }),
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "bubbles.white",
    3,
    smallItemGridLocation({ x: (x = 23), y: (y = 9) }),
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "bubbles.taupe",
    3,
    smallItemGridLocation({ x, y: ++y }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.jetpack",
    2,
    smallItemGridLocation({ x, y: ++y }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.blueGreen",
    2,
    smallItemGridLocation({ x, y: ++y }),
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.cold",
    2,
    smallItemGridLocation({ x, y: ++y }),
    smallItemTextureSize,
  ),

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
  "shadowMask.organic": {
    frame: {
      ...largeItemGridLocation({ x: 4, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.artificial": {
    frame: {
      ...largeItemGridLocation({ x: 5, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "block.artificial.disappearing": {
    frame: {
      ...largeItemGridLocation({ x: 6, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.artificial": {
    frame: {
      ...largeItemGridLocation({ x: 7, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "book.x": {
    frame: {
      ...largeItemGridLocation({ x: 8, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "book.y": {
    frame: {
      ...largeItemGridLocation({ x: 9, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.book": {
    frame: {
      ...largeItemGridLocation({ x: 10, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  // this is an alias of shadowMask.book - kept only because older saves may have
  // references to 'shadowMask.fullBlock' in their json-serialised gameState
  "shadowMask.fullBlock": {
    frame: {
      ...largeItemGridLocation({ x: 10, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadow.fullBlock": {
    frame: {
      ...largeItemGridLocation({ x: 11, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  spikes: {
    frame: {
      ...largeItemGridLocation({ x: 12, y: 0 }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.spikes": {
    frame: {
      ...largeItemGridLocation({ x: 13, y: 0 }),
      ...largeItemTextureSize,
    },
  },

  stepStool: {
    frame: {
      ...largeItemGridLocation({ x: (x = 0), y: (y = 1) }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.stepStool": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },

  "volcano.1": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "volcano.2": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.volcano": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },

  hushPuppy: {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.hushPuppy": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "toaster.on": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  // same as sprite below: kept for backwards compatibility with old saves (Jan '26)
  "toaster.off": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "toaster.off.1": {
    frame: {
      ...largeItemGridLocation({ x, y }),
      ...largeItemTextureSize,
    },
  },
  "toaster.off.2": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.toaster": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  sandwich: {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
      ...largeItemTextureSize,
    },
  },
  "shadowMask.sandwich": {
    frame: {
      ...largeItemGridLocation({ x: ++x, y }),
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
    "particle.head",
    4,
    { x: 100, y: 798 },
    { w: 9, h: 11 },
  ),
  ...seriesOfNumberedTextures(
    "particle.heels",
    4,
    { x: 100, y: 856 },
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
    "shadow.lift": withSpeed(
      [
        "shadow.lift.1",
        "shadow.lift.2",
        "shadow.lift.3",
        "shadow.lift.4",
      ] as const,
      0.5,
    ),
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
    "bubbles.blueGreen": withSpeed(
      ["bubbles.blueGreen.1", "bubbles.blueGreen.2"] as const,
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
    "bubbles.jetpack": withSpeed(
      ["bubbles.jetpack.1", "bubbles.jetpack.2"] as const,
      0.25,
    ),
    "conveyor.x": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.x", 7),
      0.5,
    ),
    "conveyor.y": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.y", 7),
      0.5,
    ),
    volcano: withSpeed(seriesOfAnimationFrameTextureIds("volcano", 2), 3 / 16),
    "toaster.off": withSpeed(
      seriesOfAnimationFrameTextureIds("toaster.off", 2),
      3 / 16,
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
    "shadowMask.spring.bounce": withSpeed(
      [
        "shadowMask.spring.released",
        "shadowMask.spring.compressed",
        "shadowMask.spring.released",
        "shadowMask.spring.compressed",
        "shadowMask.spring.released",
      ] as const,
      0.5,
    ),
    "headlessBase.scan": withSpeed(
      [
        "headlessBase.4",
        "headlessBase",
        "headlessBase.3",
        "headlessBase",
        "headlessBase.2",
        "headlessBase",
        "headlessBase.1",
        "headlessBase",
        "headlessBase",
        "headlessBase",
        "headlessBase",
        "headlessBase",
        "headlessBase.all",
        "headlessBase",
        "headlessBase",
        "headlessBase",
        "headlessBase",
      ] as const,
      0.25,
    ),
    "headlessBase.flash": withSpeed(
      ["headlessBase.all", "headlessBase"] as const,
      0.5,
    ),
    // never actually used in the game(!) - for the manual only
    switch: withSpeed(["switch.left", "switch.right"] as const, 0.02),
    "particle.head.fade": withSpeed(
      seriesOfAnimationFrameTextureIds("particle.head", 4),
      0.5,
    ),
    "particle.heels.fade": withSpeed(
      seriesOfAnimationFrameTextureIds("particle.heels", 4),
      0.5,
    ),
  },
} as const satisfies Pick<SpritesheetData, "animations" | "frames">;
