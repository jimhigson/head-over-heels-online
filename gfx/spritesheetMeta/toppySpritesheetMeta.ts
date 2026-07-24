import {
  paletteToppy,
  type ToppyPaletteColourName,
} from "../../src/sprites/palette/spritesheetPalette";
import { type SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { octantIndexOfDirection } from "../../src/utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { itemRenderExtents } from "./itemRenderExtents";

export const toppySpritesheetMeta: SpritesheetMetadata<
  ToppyPaletteColourName,
  "Toppy",
  false
> = {
  name: "Toppy",
  palette: paletteToppy,
  itemRenderExtents,
  playable: {
    head: {
      awayLeft: { shadowMask: true },
      away: { shadowMask: true, shadowMaskFalling: true },
      awayRight: {
        blinking: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      right: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      towardsRight: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      towards: {
        blinking: true,
        looking1: true,
        looking2: true,
        standing: 2,
      },
      towardsLeft: {
        blinking: true,
        standing: 2,
      },
      left: {},
    },
    heels: {
      awayLeft: { shadowMask: true },
      away: { shadowMask: true, jumpAscent: 3 },
      awayRight: {
        blinking: true,
        looking1: true,
        shadowMask: true,
        standing: 2,
      },
      right: {
        blinking: true,
        looking1: true,
        shadowMask: true,
        standing: 2,
        jumpAscent: 3,
      },
      towardsRight: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        standing: 2,
      },
      towards: { blinking: true, looking1: true, standing: 2, jumpAscent: 3 },
      towardsLeft: { blinking: true, looking1: true, standing: 2 },
      left: { jumpAscent: 3 },
    },
  },
  // each copyFrom is an exact duplicate, or exact horizontal mirror (flipX), of
  // another sprite, so it shares that sprite's region of the sheet and its own
  // region is blanked to transparent.
  overrides: {
    [`turtle.d${octantIndexOfDirection("away")}.1`]: {
      copyFrom: {
        textureId: `turtle.d${octantIndexOfDirection("left")}.1`,
        flipX: true,
      },
    },
    [`turtle.d${octantIndexOfDirection("away")}.2`]: {
      copyFrom: {
        textureId: `turtle.d${octantIndexOfDirection("left")}.2`,
        flipX: true,
      },
    },
    [`turtle.d${octantIndexOfDirection("right")}.1`]: {
      copyFrom: {
        textureId: `turtle.d${octantIndexOfDirection("towards")}.1`,
        flipX: true,
      },
    },
    [`turtle.d${octantIndexOfDirection("right")}.2`]: {
      copyFrom: {
        textureId: `turtle.d${octantIndexOfDirection("towards")}.2`,
        flipX: true,
      },
    },
    [`cyberman.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `cyberman.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    [`cyberman.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `cyberman.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    [`skiHead.greenAndPink.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `skiHead.greenAndPink.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    [`skiHead.greenAndPink.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `skiHead.greenAndPink.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    [`charles.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `charles.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    [`charles.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `charles.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    [`monkey.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `monkey.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    [`monkey.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `monkey.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    [`computerBot.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `computerBot.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    [`computerBot.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `computerBot.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    [`elephant.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `elephant.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    "helicopterBug.2": {
      copyFrom: { textureId: "helicopterBug.1", flipX: true },
    },
    [`barrier.d${octantIndexOfDirection("away")}.disappearing`]: {
      copyFrom: {
        textureId: `barrier.d${octantIndexOfDirection("left")}.disappearing`,
        flipX: true,
      },
    },
    [`barrier.d${octantIndexOfDirection("left")}`]: {
      copyFrom: {
        textureId: `barrier.d${octantIndexOfDirection("left")}.disappearing`,
      },
    },
    [`barrier.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `barrier.d${octantIndexOfDirection("left")}.disappearing`,
        flipX: true,
      },
    },
    "planet.safari": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.egyptus": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.penitentiary": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.bookworld": { copyFrom: { textureId: "planet.blacktooth" } },
    "lift.3": { copyFrom: { textureId: "lift.2", flipX: true } },
    "lift.4": { copyFrom: { textureId: "lift.1", flipX: true } },
    "shadow.lift.3": { copyFrom: { textureId: "shadow.lift.2", flipX: true } },
    "shadow.lift.4": { copyFrom: { textureId: "shadow.lift.1", flipX: true } },
    [`book.d${octantIndexOfDirection("away")}`]: {
      copyFrom: {
        textureId: `book.d${octantIndexOfDirection("left")}`,
        flipX: true,
      },
    },
    "shadowMask.fullBlock": { copyFrom: { textureId: "shadowMask.book" } },
    [`conveyor.d${octantIndexOfDirection("left")}.7`]: {
      copyFrom: { textureId: `conveyor.d${octantIndexOfDirection("left")}.1` },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.1`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.1`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.2`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.2`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.3`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.3`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.4`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.4`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.5`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.5`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.6`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.6`,
        flipX: true,
      },
    },
    [`conveyor.d${octantIndexOfDirection("away")}.7`]: {
      copyFrom: {
        textureId: `conveyor.d${octantIndexOfDirection("left")}.1`,
        flipX: true,
      },
    },
    "shadowMask.toaster.disabled": {
      copyFrom: { textureId: "shadowMask.toaster" },
    },
    "particle.heels.3": { copyFrom: { textureId: "particle.head.3" } },
    [`head.walking.d${octantIndexOfDirection("towards")}.1`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("right")}.1`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("towards")}.2`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("right")}.2`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("towards")}.3`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("right")}.3`,
        flipX: true,
      },
    },
    [`head.falling.d${octantIndexOfDirection("towards")}`]: {
      copyFrom: {
        textureId: `head.falling.d${octantIndexOfDirection("right")}`,
        flipX: true,
      },
    },
    [`head.blinking.d${octantIndexOfDirection("towards")}`]: {
      copyFrom: {
        textureId: `head.blinking.d${octantIndexOfDirection("right")}`,
        flipX: true,
      },
    },
    [`head.looking1.d${octantIndexOfDirection("towards")}`]: {
      copyFrom: {
        textureId: `head.looking1.d${octantIndexOfDirection("right")}`,
        flipX: true,
      },
    },
    [`head.looking2.d${octantIndexOfDirection("towards")}`]: {
      copyFrom: {
        textureId: `head.looking2.d${octantIndexOfDirection("right")}`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("towardsLeft")}.1`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("awayRight")}.1`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("towardsLeft")}.2`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("awayRight")}.2`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("towardsLeft")}.3`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("awayRight")}.3`,
        flipX: true,
      },
    },
    [`head.falling.d${octantIndexOfDirection("towardsLeft")}`]: {
      copyFrom: {
        textureId: `head.falling.d${octantIndexOfDirection("awayRight")}`,
        flipX: true,
      },
    },
    [`head.blinking.d${octantIndexOfDirection("towardsLeft")}`]: {
      copyFrom: {
        textureId: `head.blinking.d${octantIndexOfDirection("awayRight")}`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("left")}.3`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("away")}.3`,
        flipX: true,
      },
    },
    [`head.falling.d${octantIndexOfDirection("left")}`]: {
      copyFrom: {
        textureId: `head.falling.d${octantIndexOfDirection("away")}`,
        flipX: true,
      },
    },
    "bubbles.heels.6": {
      copyFrom: { textureId: "bubbles.heels.5", flipX: true },
    },
    [`heels.walking.d${octantIndexOfDirection("towardsLeft")}.1`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("awayRight")}.1`,
        flipX: true,
      },
    },
    [`heels.walking.d${octantIndexOfDirection("towardsLeft")}.2`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("awayRight")}.2`,
        flipX: true,
      },
    },
    [`heels.walking.d${octantIndexOfDirection("towardsLeft")}.3`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("awayRight")}.3`,
        flipX: true,
      },
    },
    [`heels.falling.d${octantIndexOfDirection("towardsLeft")}`]: {
      copyFrom: {
        textureId: `heels.falling.d${octantIndexOfDirection("awayRight")}`,
        flipX: true,
      },
    },
    [`heels.blinking.d${octantIndexOfDirection("towardsLeft")}`]: {
      copyFrom: {
        textureId: `heels.blinking.d${octantIndexOfDirection("awayRight")}`,
        flipX: true,
      },
    },
    [`heels.looking1.d${octantIndexOfDirection("towardsLeft")}`]: {
      copyFrom: {
        textureId: `heels.looking1.d${octantIndexOfDirection("awayRight")}`,
        flipX: true,
      },
    },
    [`heels.walking.d${octantIndexOfDirection("left")}.1`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("away")}.1`,
        flipX: true,
      },
    },
    [`heels.walking.d${octantIndexOfDirection("left")}.2`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("away")}.2`,
        flipX: true,
      },
    },
    [`heels.walking.d${octantIndexOfDirection("left")}.3`]: {
      copyFrom: {
        textureId: `heels.walking.d${octantIndexOfDirection("away")}.3`,
        flipX: true,
      },
    },
    [`moonbase.wallDoorTransition.d${octantIndexOfDirection("left")}.mask`]: {
      copyFrom: {
        textureId: `moonbase.wallDoorTransition.d${octantIndexOfDirection("away")}.mask`,
        flipX: true,
      },
    },
    // near-mirrors: intended as exact mirrors of their opposite direction but
    // with a few accidental differing pixels, so not auto-detected. Their own
    // regions are blanked and they render from the clean mirror, dropping the
    // stray pixels.
    [`head.walking.d${octantIndexOfDirection("left")}.1`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("away")}.1`,
        flipX: true,
      },
    },
    [`head.walking.d${octantIndexOfDirection("left")}.2`]: {
      copyFrom: {
        textureId: `head.walking.d${octantIndexOfDirection("away")}.2`,
        flipX: true,
      },
    },
    [`heels.falling.d${octantIndexOfDirection("left")}`]: {
      copyFrom: {
        textureId: `heels.falling.d${octantIndexOfDirection("away")}`,
        flipX: true,
      },
    },
    [`elephant.d${octantIndexOfDirection("right")}`]: {
      copyFrom: {
        textureId: `elephant.d${octantIndexOfDirection("towards")}`,
        flipX: true,
      },
    },
    "helicopterBug.4": {
      copyFrom: { textureId: "helicopterBug.3", flipX: true },
    },
    "headlessBase.3": {
      copyFrom: { textureId: "headlessBase.2", flipX: true },
    },
    "headlessBase.4": {
      copyFrom: { textureId: "headlessBase.1", flipX: true },
    },
  },
  missedTextures: [
    "dalek.dark.1",
    "dalek.dark.2",
    "block.organic.dark",
    "block.organic.dark.disappearing",
    "ball.uncolourised",
    `skiHead.starsAndStripes.d${octantIndexOfDirection("away")}`,
    `skiHead.starsAndStripes.d${octantIndexOfDirection("towards")}`,
    `skiHead.starsAndStripes.d${octantIndexOfDirection("left")}`,
    `skiHead.starsAndStripes.d${octantIndexOfDirection("right")}`,
  ],
  swops: {
    deactivated: {
      colours: {
        cool1: "grey1",
        cool2: "grey2",
        cool3: "grey3",
        cool4: "black",
        grey1: "grey2",
        grey2: "grey3",
        grey3: "black",
        pink1: "grey1",
        pink2: "grey2",
        warm1: "cool1",
        warm2: "cool1",
        warm3: "grey1",
        warm4: "grey2",
        warm5: "grey3",
        warm6: "black",
      },
      playableDeactivatedPreserveColours: {
        head: ["cool2", "cool3"],
        heels: ["pink1", "pink2"],
      },
    },
    doughnutted: {
      colours: {
        cool1: "warm3",
        cool2: "pink1",
        cool3: "warm4",
        cool4: "warm5",
        grey1: "pink1",
        grey2: "warm4",
        grey3: "warm5",
        warm6: "warm5",
        black: "warm6",
      },
    },
    // a blue reflection across the full range of cool tones: the source palette
    // is split into brightness quartiles (dark -> light) mapped to cool4, cool3,
    // cool2, cool1 in turn, so the reflection keeps its tonal variation:
    mirrorReflection: {
      colours: {
        black: "cool4",
        cool1: "cool2",
        cool2: "cool3",
        cool3: "cool4",
        grey1: "cool2",
        grey2: "cool3",
        grey3: "cool4",
        pink1: "cool2",
        pink2: "cool3",
        replaceDark: "cool3",
        replaceLight: "cool2",
        warm1: "cool2",
        warm2: "cool2",
        warm3: "cool3",
        warm4: "cool3",
        warm5: "cool4",
        warm6: "cool4",
      },
    },
  },
  effectColours: {
    head: "cool2",
    heels: "pink2",
    left: "warm1",
    right: "cool3",
    invulnerable: "warm2",
    dimText: "grey2",
    carry: "pink1",
    outline: "black",
  },
  // dark -> light gradient used by floating text fade-in/fade-out.
  // Ordered by Rec. 709 luma (0.2126*R + 0.7152*G + 0.0722*B) of each
  // palette colour in src/_generated/palette/spritesheetToppyPalette.json.
  // Starts above the darkest (black/warm6/cool4 skipped so the fade-in
  // begins mid-shadow) and ends on the lightest (warm1).
  floatingTextGradient: [
    "grey3", //   64.0
    "warm5", //   79.8
    "cool3", //  102.9
    "pink2", //  106.9
    "grey2", //  112.0
    "warm4", //  143.8
    "pink1", //  157.3
    "grey1", //  160.0
    "cool1", //  194.3
    "warm2", //  223.7
    "warm1", //  248.1
  ],
  buttonColours: {
    jump: "cool2",
    fire: "warm2",
    carry: "warm4",
    carryAndJump: "pink2",
    menu: "grey1",
    map: "grey1",
    rotateClockwise: "grey1",
    rotateAnticlockwise: "grey1",
  },
  supportsUncolourised: false,
  showFloorOverDraw: false,
  teleporterEffectBlackPoint: 0.25,
  mapToZxSpectrumForDeathEffectPalette: {
    warm1: "yellowBasic",
    warm2: "whiteBasic",
    warm3: "cyanBasic",
    warm4: "cyanDimmed",
    warm5: "blueBasic",
    warm6: "blueBasic",
    pink1: "cyanDimmed",
    pink2: "cyanDimmed",
    grey1: "cyanDimmed",
    grey2: "cyanDimmed",
    grey3: "blueBasic",
    black: "blackBasic",
    cool1: "cyanBasic",
    cool2: "cyanDimmed",
    cool3: "cyanDimmed",
    cool4: "blueBasic",
    bg_grey1: "whiteDimmed",
    bg_grey2: "cyanDimmed",
    bg_grey3: "blueBasic",
    bg_blue: "cyanDimmed",
    replaceLight: "whiteDimmed",
    replaceDark: "cyanDimmed",
  },
  mapToZxSpectrumPalette: {
    warm1: "whiteBasic",
    warm2: "yellowBasic",
    warm3: "yellowDimmed",
    warm4: "redBasic",
    warm5: "magentaDimmed",
    warm6: "redDimmed",
    pink1: "magentaDimmed",
    pink2: "magentaBasic",
    grey1: "whiteBasic",
    grey2: "whiteDimmed",
    cool1: "whiteBasic",
    cool2: "cyanBasic",
    cool3: "blueBasic",
    cool4: "blueDimmed",
    bg_grey1: "whiteBasic",
    bg_grey2: "blueDimmed",
    bg_blue: "blueBasic",
  },
};
