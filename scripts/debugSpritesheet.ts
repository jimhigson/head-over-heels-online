#!/usr/bin/env -S pnpm tsx

/**
 * Generates the committed debug spritesheet gfx/spritesDebug.webp from the
 * BlockStack source art gfx/sprites.webp.
 *
 * Every sprite is flattened to a flat ZX Spectrum block colour (chosen per
 * sprite by name hash) with its texture id written across it in a tiny pixel
 * font. Gameplay sprites (characters, monsters, pickups, portable
 * items, springs, joysticks, crowns, planets) fill their whole frame; the rest
 * (walls, blocks, doors, scenery) keep their silhouette. Floors bake to pure
 * unlabelled white so sprites and shadows land visibly on them. Shadows, shadow
 * masks, hud and editor sprites are copied through unchanged - shadows carry the
 * red-channel encoding the loader turns into alpha, the others need to stay
 * legible.
 *
 * The text is masked to the sprite's own drawn pixels (never escaping the
 * silhouette) and blended at 50% - black over light block colours, white over
 * dark ones.
 */
import { type Color } from "pixi.js";
import sharp from "sharp";

import { debugSpritesheetMeta } from "../gfx/spritesheetMeta/debugSpritesheetMeta";
import { monsterMovements } from "../src/model/json/MonsterJsonConfig";
import { zxSpectrumColors, zxSpectrumColorsDimmed } from "../src/originalGame";
import {
  makeSpritesheetData,
  type TextureId,
} from "../src/sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { entries } from "../src/utils/entries";

const sourcePath = "gfx/sprites.webp";
const outPath = "gfx/spritesDebug.webp";

type Rgb = [number, number, number];

const toRgb = (colour: Color): Rgb => {
  const [r, g, b] = colour.toUint8RgbArray();
  return [r, g, b];
};

const rgbKey = ([r, g, b]: Rgb): string => `${r},${g},${b}`;

/**
 * the original ZX Spectrum palette as bright/dimmed pairs per hue, black
 * excluded. Sprites bake to one of these colours (chosen by name hash); an
 * animation alternates between its hue's two shades so it stays on-palette
 */
const zxHuePairs = entries(zxSpectrumColors)
  .filter(([name]) => name !== "black")
  .map(([name, bright]) => ({
    bright: toRgb(bright),
    dimmed: toRgb(zxSpectrumColorsDimmed[name]),
  }));

const blockColours: Rgb[] = zxHuePairs.flatMap(({ bright, dimmed }) => [
  bright,
  dimmed,
]);

/** the bright/dimmed pair a block colour belongs to, keyed by both its shades */
const huePairByColour = new Map(
  zxHuePairs.flatMap((pair) => [
    [rgbKey(pair.bright), pair],
    [rgbKey(pair.dimmed), pair],
  ]),
);

/** frames of one sprite (ids differing only by a trailing number) share a colour */
const spriteBaseName = (textureId: TextureId): string =>
  textureId.replace(/\.\d+$/, "");

const blockColourFor = (textureId: TextureId): Rgb => {
  const name = spriteBaseName(textureId);
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return blockColours[Math.abs(hash) % blockColours.length];
};

const isLight = ([r, g, b]: Rgb): boolean =>
  0.299 * r + 0.587 * g + 0.114 * b >= 128;

const frameNumber = (textureId: TextureId): number => {
  const match = textureId.match(/\.(?<n>\d+)$/);
  return match === null ? 0 : Number(match.groups!.n);
};

/**
 * the colour a sprite's frame is filled with. Animation frames (ids ending in
 * a frame number) alternate between the bright and dimmed shades of their
 * block colour's hue frame by frame, so the animation is visible on the debug
 * sheet while staying on the ZX Spectrum palette
 */
const fillColourFor = (textureId: TextureId): Rgb => {
  const base = blockColourFor(textureId);
  const frame = frameNumber(textureId);
  const pair = huePairByColour.get(rgbKey(base));
  if (frame === 0 || pair === undefined) {
    return base;
  }
  return frame % 2 === 0 ? pair.bright : pair.dimmed;
};

/**
 * sprites that fill their whole frame rather than keeping their silhouette:
 * the moving, collectable and carryable objects, whose exact shape doesn't
 * matter for reading placement off the screen
 */
const fullRectPrefixes = new Set<string>([
  // players and other characters
  "head",
  "heels",
  "charles",
  "headlessBase",
  // monsters
  ...Object.keys(monsterMovements),
  "spikyBall",
  "fish",
  // pickups
  "whiteRabbit",
  "bag",
  "doughnuts",
  "hooter",
  "scroll",
  // portable items
  "portableTeleporter",
  "cube",
  "drum",
  "sticks",
  // individually requested
  "spring",
  "joystick",
  "crown",
  "planet",
]);

const isFullRect = (textureId: TextureId): boolean =>
  fullRectPrefixes.has(textureId.split(".")[0]);

/** copied through unchanged: functional alpha or must stay legible */
const isExempt = (textureId: TextureId): boolean =>
  textureId.startsWith("shadow.") ||
  textureId.startsWith("shadowMask.") ||
  textureId.startsWith("hud.") ||
  textureId.startsWith("editor.");

const isFloor = (textureId: TextureId): boolean =>
  textureId.endsWith(".floor") || textureId.endsWith(".floor.deadly");

/**
 * a Tom-Thumb-style 3×5 pixel font - about the smallest legible pixel font,
 * drawn as literal pixels so it stays crisp. Uppercase, digits and basic
 * punctuation only; each glyph is 5 rows of 3 bits
 */
const glyphs: { [char: string]: [number, number, number, number, number] } = {
  A: [0b010, 0b101, 0b111, 0b101, 0b101],
  B: [0b110, 0b101, 0b110, 0b101, 0b110],
  C: [0b011, 0b100, 0b100, 0b100, 0b011],
  D: [0b110, 0b101, 0b101, 0b101, 0b110],
  E: [0b111, 0b100, 0b110, 0b100, 0b111],
  F: [0b111, 0b100, 0b110, 0b100, 0b100],
  G: [0b011, 0b100, 0b101, 0b101, 0b011],
  H: [0b101, 0b101, 0b111, 0b101, 0b101],
  I: [0b111, 0b010, 0b010, 0b010, 0b111],
  J: [0b011, 0b001, 0b001, 0b101, 0b010],
  K: [0b101, 0b101, 0b110, 0b101, 0b101],
  L: [0b100, 0b100, 0b100, 0b100, 0b111],
  M: [0b101, 0b111, 0b111, 0b101, 0b101],
  N: [0b110, 0b101, 0b101, 0b101, 0b101],
  O: [0b010, 0b101, 0b101, 0b101, 0b010],
  P: [0b110, 0b101, 0b110, 0b100, 0b100],
  Q: [0b010, 0b101, 0b101, 0b010, 0b001],
  R: [0b110, 0b101, 0b110, 0b101, 0b101],
  S: [0b011, 0b100, 0b010, 0b001, 0b110],
  T: [0b111, 0b010, 0b010, 0b010, 0b010],
  U: [0b101, 0b101, 0b101, 0b101, 0b111],
  V: [0b101, 0b101, 0b101, 0b101, 0b010],
  W: [0b101, 0b101, 0b111, 0b111, 0b101],
  X: [0b101, 0b101, 0b010, 0b101, 0b101],
  Y: [0b101, 0b101, 0b010, 0b010, 0b010],
  Z: [0b111, 0b001, 0b010, 0b100, 0b111],
  "0": [0b111, 0b101, 0b101, 0b101, 0b111],
  "1": [0b010, 0b110, 0b010, 0b010, 0b111],
  "2": [0b110, 0b001, 0b010, 0b100, 0b111],
  "3": [0b110, 0b001, 0b010, 0b001, 0b110],
  "4": [0b101, 0b101, 0b111, 0b001, 0b001],
  "5": [0b111, 0b100, 0b110, 0b001, 0b110],
  "6": [0b011, 0b100, 0b110, 0b101, 0b010],
  "7": [0b111, 0b001, 0b010, 0b010, 0b010],
  "8": [0b010, 0b101, 0b010, 0b101, 0b010],
  "9": [0b010, 0b101, 0b011, 0b001, 0b110],
  ".": [0b000, 0b000, 0b000, 0b000, 0b010],
  "-": [0b000, 0b000, 0b111, 0b000, 0b000],
  "/": [0b001, 0b001, 0b010, 0b100, 0b100],
};

const glyphWidth = 3;
const glyphHeight = 5;
/** horizontal advance per character (glyph width + 1px spacing) */
const advance = glyphWidth + 1;
/** vertical advance per line (glyph height + 1px spacing) */
const lineAdvance = glyphHeight + 1;

const run = async () => {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width } = info;

  const out = Buffer.alloc(data.length);

  const setPixel = (
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number,
  ) => {
    const i = (y * width + x) * 4;
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = a;
  };
  const sourceAlpha = (x: number, y: number): number =>
    data[(y * width + x) * 4 + 3];
  const copyFromSource = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    out[i] = data[i];
    out[i + 1] = data[i + 1];
    out[i + 2] = data[i + 2];
    out[i + 3] = data[i + 3];
  };

  const spritesheetData = makeSpritesheetData(debugSpritesheetMeta);

  for (const [textureId, { frame }] of Object.entries(spritesheetData.frames)) {
    const { x, y, w, h } = frame;

    if (isExempt(textureId as TextureId)) {
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          copyFromSource(xx, yy);
        }
      }
      continue;
    }

    if (isFloor(textureId as TextureId)) {
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          setPixel(xx, yy, 0xff, 0xff, 0xff, 0xff);
        }
      }
      continue;
    }

    const fullRect = isFullRect(textureId as TextureId);
    const [br, bg, bb] = fillColourFor(textureId as TextureId);
    // a sprite pixel is one the block colour is painted onto: the whole frame
    // for full-rect sprites, otherwise wherever the source art is opaque
    const isSpritePixel = (xx: number, yy: number): boolean =>
      fullRect || sourceAlpha(xx, yy) > 0;

    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        if (isSpritePixel(xx, yy)) {
          setPixel(xx, yy, br, bg, bb, 0xff);
        }
      }
    }

    // label: one dotted-id segment per line, centred both ways; over-long
    // segments start at the left edge and are cut off at the right (never
    // wrapped mid-word), excess lines dropped. Each text pixel is blended 50%
    // into the block colour beneath it, in whichever of black/white contrasts,
    // and only where the sprite is actually painted
    const [tr, tg, tb] = isLight([br, bg, bb]) ? [0, 0, 0] : [0xff, 0xff, 0xff];
    const maxLines = Math.max(1, Math.floor(h / lineAdvance));
    const lines = textureId.split(".").slice(0, maxLines);
    const blockHeight = lines.length * lineAdvance - 1;
    const topY = y + Math.floor((h - blockHeight) / 2);
    const clipRightX = x + w;

    for (const [lineIndex, line] of lines.entries()) {
      const lineY = topY + lineIndex * lineAdvance;
      const lineWidth = line.length * advance - 1;
      let penX = Math.max(x, x + Math.floor((w - lineWidth) / 2));
      for (const char of line.toUpperCase()) {
        if (penX >= clipRightX) {
          break;
        }
        const glyph = glyphs[char];
        if (glyph !== undefined) {
          for (let row = 0; row < glyphHeight; row++) {
            for (let col = 0; col < glyphWidth; col++) {
              const px = penX + col;
              const py = lineY + row;
              if (
                px < clipRightX &&
                py >= y &&
                py < y + h &&
                (glyph[row] >> (glyphWidth - 1 - col)) & 1 &&
                isSpritePixel(px, py)
              ) {
                setPixel(
                  px,
                  py,
                  Math.round((tr + br) / 2),
                  Math.round((tg + bg) / 2),
                  Math.round((tb + bb) / 2),
                  0xff,
                );
              }
            }
          }
        }
        penX += advance;
      }
    }
  }

  await sharp(out, { raw: info })
    // 6 is the maximum webp effort sharp accepts:
    .webp({ lossless: true, effort: 6 })
    .toFile(outPath);
  console.log(`written ${outPath}`);
};

run();
