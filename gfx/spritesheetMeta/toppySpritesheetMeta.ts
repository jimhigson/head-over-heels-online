import {
  paletteToppy,
  type ToppyPaletteColourName,
} from "../../src/sprites/palette/spritesheetPalette";
import { type SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

export const toppySpritesheetMeta: SpritesheetMetadata<
  ToppyPaletteColourName,
  "Toppy"
> = {
  name: "Toppy",
  palette: paletteToppy,
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
    "turtle.away.1": { copyFrom: { textureId: "turtle.left.1", flipX: true } },
    "turtle.away.2": { copyFrom: { textureId: "turtle.left.2", flipX: true } },
    "turtle.right.1": {
      copyFrom: { textureId: "turtle.towards.1", flipX: true },
    },
    "turtle.right.2": {
      copyFrom: { textureId: "turtle.towards.2", flipX: true },
    },
    "cyberman.away": { copyFrom: { textureId: "cyberman.left", flipX: true } },
    "cyberman.right": {
      copyFrom: { textureId: "cyberman.towards", flipX: true },
    },
    "skiHead.greenAndPink.away": {
      copyFrom: { textureId: "skiHead.greenAndPink.left", flipX: true },
    },
    "skiHead.greenAndPink.right": {
      copyFrom: { textureId: "skiHead.greenAndPink.towards", flipX: true },
    },
    "charles.away": { copyFrom: { textureId: "charles.left", flipX: true } },
    "charles.right": {
      copyFrom: { textureId: "charles.towards", flipX: true },
    },
    "monkey.away": { copyFrom: { textureId: "monkey.left", flipX: true } },
    "monkey.right": { copyFrom: { textureId: "monkey.towards", flipX: true } },
    "computerBot.away": {
      copyFrom: { textureId: "computerBot.left", flipX: true },
    },
    "computerBot.right": {
      copyFrom: { textureId: "computerBot.towards", flipX: true },
    },
    "elephant.away": { copyFrom: { textureId: "elephant.left", flipX: true } },
    "helicopterBug.2": {
      copyFrom: { textureId: "helicopterBug.1", flipX: true },
    },
    "barrier.y.disappearing": {
      copyFrom: { textureId: "barrier.x.disappearing", flipX: true },
    },
    "barrier.x": { copyFrom: { textureId: "barrier.x.disappearing" } },
    "barrier.y": {
      copyFrom: { textureId: "barrier.x.disappearing", flipX: true },
    },
    "planet.safari": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.egyptus": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.penitentiary": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.bookworld": { copyFrom: { textureId: "planet.blacktooth" } },
    "lift.3": { copyFrom: { textureId: "lift.2", flipX: true } },
    "lift.4": { copyFrom: { textureId: "lift.1", flipX: true } },
    "shadow.lift.3": { copyFrom: { textureId: "shadow.lift.2", flipX: true } },
    "shadow.lift.4": { copyFrom: { textureId: "shadow.lift.1", flipX: true } },
    "book.y": { copyFrom: { textureId: "book.x", flipX: true } },
    "shadowMask.fullBlock": { copyFrom: { textureId: "shadowMask.book" } },
    "conveyor.x.7": { copyFrom: { textureId: "conveyor.x.1" } },
    "conveyor.y.1": { copyFrom: { textureId: "conveyor.x.1", flipX: true } },
    "conveyor.y.2": { copyFrom: { textureId: "conveyor.x.2", flipX: true } },
    "conveyor.y.3": { copyFrom: { textureId: "conveyor.x.3", flipX: true } },
    "conveyor.y.4": { copyFrom: { textureId: "conveyor.x.4", flipX: true } },
    "conveyor.y.5": { copyFrom: { textureId: "conveyor.x.5", flipX: true } },
    "conveyor.y.6": { copyFrom: { textureId: "conveyor.x.6", flipX: true } },
    "conveyor.y.7": { copyFrom: { textureId: "conveyor.x.1", flipX: true } },
    "shadowMask.toaster.disabled": {
      copyFrom: { textureId: "shadowMask.toaster" },
    },
    "particle.heels.3": { copyFrom: { textureId: "particle.head.3" } },
    "head.walking.towards.1": {
      copyFrom: { textureId: "head.walking.right.1", flipX: true },
    },
    "head.walking.towards.2": {
      copyFrom: { textureId: "head.walking.right.2", flipX: true },
    },
    "head.walking.towards.3": {
      copyFrom: { textureId: "head.walking.right.3", flipX: true },
    },
    "head.falling.towards": {
      copyFrom: { textureId: "head.falling.right", flipX: true },
    },
    "head.blinking.towards": {
      copyFrom: { textureId: "head.blinking.right", flipX: true },
    },
    "head.looking1.towards": {
      copyFrom: { textureId: "head.looking1.right", flipX: true },
    },
    "head.looking2.towards": {
      copyFrom: { textureId: "head.looking2.right", flipX: true },
    },
    "head.walking.towardsLeft.1": {
      copyFrom: { textureId: "head.walking.awayRight.1", flipX: true },
    },
    "head.walking.towardsLeft.2": {
      copyFrom: { textureId: "head.walking.awayRight.2", flipX: true },
    },
    "head.walking.towardsLeft.3": {
      copyFrom: { textureId: "head.walking.awayRight.3", flipX: true },
    },
    "head.falling.towardsLeft": {
      copyFrom: { textureId: "head.falling.awayRight", flipX: true },
    },
    "head.blinking.towardsLeft": {
      copyFrom: { textureId: "head.blinking.awayRight", flipX: true },
    },
    "head.walking.left.3": {
      copyFrom: { textureId: "head.walking.away.3", flipX: true },
    },
    "head.falling.left": {
      copyFrom: { textureId: "head.falling.away", flipX: true },
    },
    "bubbles.heels.6": {
      copyFrom: { textureId: "bubbles.heels.5", flipX: true },
    },
    "heels.walking.towardsLeft.1": {
      copyFrom: { textureId: "heels.walking.awayRight.1", flipX: true },
    },
    "heels.walking.towardsLeft.2": {
      copyFrom: { textureId: "heels.walking.awayRight.2", flipX: true },
    },
    "heels.walking.towardsLeft.3": {
      copyFrom: { textureId: "heels.walking.awayRight.3", flipX: true },
    },
    "heels.falling.towardsLeft": {
      copyFrom: { textureId: "heels.falling.awayRight", flipX: true },
    },
    "heels.blinking.towardsLeft": {
      copyFrom: { textureId: "heels.blinking.awayRight", flipX: true },
    },
    "heels.looking1.towardsLeft": {
      copyFrom: { textureId: "heels.looking1.awayRight", flipX: true },
    },
    "heels.walking.left.1": {
      copyFrom: { textureId: "heels.walking.away.1", flipX: true },
    },
    "heels.walking.left.2": {
      copyFrom: { textureId: "heels.walking.away.2", flipX: true },
    },
    "heels.walking.left.3": {
      copyFrom: { textureId: "heels.walking.away.3", flipX: true },
    },
    "moonbase.wallDoorTransition.left.mask": {
      copyFrom: {
        textureId: "moonbase.wallDoorTransition.away.mask",
        flipX: true,
      },
    },
    "hud.char.⁍": { copyFrom: { textureId: "hud.char.⁌", flipX: true } },
    "hud.char.⟳": { copyFrom: { textureId: "hud.char.⎌", flipX: true } },
    "hud.char.↺": { copyFrom: { textureId: "hud.char.↻", flipX: true } },
    // near-mirrors: intended as exact mirrors of their opposite direction but
    // with a few accidental differing pixels, so not auto-detected. Their own
    // regions are blanked and they render from the clean mirror, dropping the
    // stray pixels.
    "head.walking.left.1": {
      copyFrom: { textureId: "head.walking.away.1", flipX: true },
    },
    "head.walking.left.2": {
      copyFrom: { textureId: "head.walking.away.2", flipX: true },
    },
    "heels.falling.left": {
      copyFrom: { textureId: "heels.falling.away", flipX: true },
    },
    "elephant.right": {
      copyFrom: { textureId: "elephant.towards", flipX: true },
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
    "skiHead.starsAndStripes.away",
    "skiHead.starsAndStripes.towards",
    "skiHead.starsAndStripes.left",
    "skiHead.starsAndStripes.right",
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
