#!/usr/bin/env -S pnpm tsx
/**
 * draws the lamp, mirror and lightBeam sprites into both spritesheets
 * (BlockStack and Toppy), in each sheet's established palette and style.
 *
 * Colour semantics (visible in the palette json colour names):
 *  - swop_* colours take part in per-room palette swaps, like other scenery
 *  - replaceLight/replaceDark are placeholders replaced in-game, so are
 *    never used for standard art
 *
 * usage:
 *   pnpm tsx scripts/genLightItemSprites.ts
 */
import { decode } from "@cwasm/webp";
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

import blockstackPalette from "../src/_generated/palette/spritesheetPalette.json" with { type: "json" };
import toppyPalette from "../src/_generated/palette/spritesheetToppyPalette.json" with { type: "json" };

type Rgba = [number, number, number, number];
type Img = {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
};

const hexToRgba = (hex: string): Rgba => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
  255,
];

const transparent: Rgba = [0, 0, 0, 0];

/** the texture-space colours each sheet draws the new items with */
type LightItemColours = {
  /** outlines */
  outline: Rgba;
  /** lamp housing */
  housingRim: Rgba;
  housingBase: Rgba;
  housingDark: Rgba;
  /** lamp LED panel, lit */
  panelLitBg: Rgba;
  panelLitDot: Rgba;
  /** lamp LED panel, unlit */
  panelOffBg: Rgba;
  panelOffDot: Rgba;
  /** mirror frame */
  frameLight: Rgba;
  frameMid: Rgba;
  /** mirror reflective surface */
  surface: Rgba;
  surfaceDark: Rgba;
  /** glints/streaks on the mirror surface */
  glint: Rgba;
  /** beam */
  beamBright: Rgba;
  beamMid: Rgba;
  beamDim: Rgba;
  /** the terminus glow, which can be brighter than the beam itself */
  terminusBright: Rgba;
  terminusMid: Rgba;
  terminusDim: Rgba;
};

const blockstackColours: LightItemColours = {
  outline: hexToRgba(blockstackPalette.pureBlack),
  housingRim: hexToRgba(blockstackPalette.lightGrey),
  housingBase: hexToRgba(blockstackPalette.midGrey),
  housingDark: hexToRgba(blockstackPalette.pureBlack),
  panelLitBg: hexToRgba(blockstackPalette.white),
  panelLitDot: hexToRgba(blockstackPalette.swop_yellow),
  panelOffBg: hexToRgba(blockstackPalette.pureBlack),
  panelOffDot: hexToRgba(blockstackPalette.midGrey),
  frameLight: hexToRgba(blockstackPalette.lightGrey),
  frameMid: hexToRgba(blockstackPalette.midGrey),
  surface: hexToRgba(blockstackPalette.replaceLight),
  surfaceDark: hexToRgba(blockstackPalette.replaceDark),
  glint: hexToRgba(blockstackPalette.white),
  beamBright: hexToRgba(blockstackPalette.highlightBeige),
  beamMid: hexToRgba(blockstackPalette.swop_yellow),
  beamDim: hexToRgba(blockstackPalette.highlightBeige),
  terminusBright: hexToRgba(blockstackPalette.white),
  terminusMid: hexToRgba(blockstackPalette.swop_yellow),
  terminusDim: hexToRgba(blockstackPalette.highlightBeige),
};

const toppyColours: LightItemColours = {
  outline: hexToRgba(toppyPalette.black),
  housingRim: hexToRgba(toppyPalette.grey1),
  housingBase: hexToRgba(toppyPalette.grey2),
  housingDark: hexToRgba(toppyPalette.grey3),
  panelLitBg: hexToRgba(toppyPalette.warm1),
  panelLitDot: hexToRgba(toppyPalette.warm3),
  panelOffBg: hexToRgba(toppyPalette.grey3),
  panelOffDot: hexToRgba(toppyPalette.grey1),
  frameLight: hexToRgba(toppyPalette.grey1),
  frameMid: hexToRgba(toppyPalette.grey2),
  surface: hexToRgba(toppyPalette.replaceLight),
  surfaceDark: hexToRgba(toppyPalette.replaceDark),
  glint: hexToRgba(toppyPalette.warm1),
  beamBright: hexToRgba(toppyPalette.warm1),
  beamMid: hexToRgba(toppyPalette.warm2),
  beamDim: hexToRgba(toppyPalette.warm3),
  terminusBright: hexToRgba(toppyPalette.warm1),
  terminusMid: hexToRgba(toppyPalette.warm2),
  terminusDim: hexToRgba(toppyPalette.warm3),
};

// grid geometry - must match textureSizes.ts:
const largeCell = (gx: number, gy: number) => ({
  x: gx * 33 + 1,
  y: gy * 29 + 682,
  w: 32,
  h: 28,
});

// cell locations - must match itemsSpritesheetData.ts:
const lampCells = {
  "on.left": largeCell(17, -7),
  "on.away": largeCell(18, -7),
  "on.towards": largeCell(17, -6),
  "on.right": largeCell(18, -6),
  "off.left": largeCell(19, -7),
  "off.away": largeCell(20, -7),
  "off.towards": largeCell(19, -6),
  "off.right": largeCell(20, -6),
};
const mirrorCells = {
  awayLeft: largeCell(21, -7),
  awayRight: largeCell(22, -7),
  // the glint streaks overlay, drawn over reflections in the mirror:
  awayRightFront: largeCell(21, -6),
  // axis-aligned transition frames, shown briefly mid-flip:
  flippingX: largeCell(15, -7),
  flippingY: largeCell(16, -7),
};
const beamFrameCells = {
  x: [largeCell(17, -5), largeCell(18, -5), largeCell(19, -5)],
  y: [largeCell(20, -5), largeCell(21, -5), largeCell(22, -5)],
};
const beamTerminusCells = {
  x: { ...largeCell(15, -6), w: 16, h: 24 },
  y: { ...largeCell(16, -6), w: 16, h: 24 },
};
const beamCornerCells = {
  leftToAway: [largeCell(11, -4), largeCell(12, -4), largeCell(13, -4)],
  awayToLeft: [largeCell(14, -4), largeCell(15, -4), largeCell(16, -4)],
  leftToTowards: [largeCell(17, -4), largeCell(18, -4), largeCell(19, -4)],
  towardsToLeft: [largeCell(20, -4), largeCell(21, -4), largeCell(22, -4)],
};

type Cell = { x: number; y: number; w: number; h: number };

const pixelIndex = (img: Img, x: number, y: number) => (y * img.width + x) * 4;

const putPixel = (img: Img, cell: Cell, tx: number, ty: number, rgba: Rgba) => {
  if (tx < 0 || ty < 0 || tx >= cell.w || ty >= cell.h) {
    return;
  }
  const i = pixelIndex(img, cell.x + tx, cell.y + ty);
  const [r, g, b, a] = rgba;
  img.data[i] = r;
  img.data[i + 1] = g;
  img.data[i + 2] = b;
  img.data[i + 3] = a;
};

const clearCell = (img: Img, cell: Cell) => {
  for (let ty = 0; ty < cell.h; ty++) {
    for (let tx = 0; tx < cell.w; tx++) {
      putPixel(img, cell, tx, ty, transparent);
    }
  }
};

/*
 * iso texture-space geometry for a full block in a 32x28 cell.
 *
 * world->texture: tx = (y - x) + 16, ty = 28 - (x + y) / 2 - z
 * the left half (tx<16) shows the y=0 face, the right half the x=0 face.
 */

/** the [top, bottom) ty bounds of the block's visible side faces at column tx */
const sideFaceBounds = (tx: number): [number, number] => {
  const depthIntoFace = tx < 16 ? tx : 31 - tx;
  return [
    Math.floor(8 + depthIntoFace / 2),
    Math.floor(20 + depthIntoFace / 2),
  ];
};

/** half-width of the top-face diamond at row ty (0..15) */
const topDiamondHalfWidth = (ty: number) =>
  ty < 8 ? 2 * (ty + 1) : 2 * (16 - ty);

const inTopDiamond = (tx: number, ty: number) => {
  if (ty < 0 || ty > 15) {
    return false;
  }
  const hw = topDiamondHalfWidth(ty);
  return tx >= 16 - hw && tx < 16 + hw;
};

const inSideFaces = (tx: number, ty: number) => {
  if (tx < 0 || tx > 31) {
    return false;
  }
  const [top, bottom] = sideFaceBounds(tx);
  return ty >= top && ty < bottom && !inTopDiamond(tx, ty);
};

const inBlock = (tx: number, ty: number) =>
  inTopDiamond(tx, ty) || inSideFaces(tx, ty);

/** recolour every shape pixel that borders transparency to the outline colour */
const outlineBlockSilhouette = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  for (let ty = 0; ty < cell.h; ty++) {
    for (let tx = 0; tx < cell.w; tx++) {
      if (!inBlock(tx, ty)) {
        continue;
      }
      const onSilhouette =
        !inBlock(tx - 1, ty) ||
        !inBlock(tx + 1, ty) ||
        !inBlock(tx, ty - 1) ||
        !inBlock(tx, ty + 1);
      if (onSilhouette) {
        putPixel(img, cell, tx, ty, colours.outline);
      }
    }
  }
};

type LampDirection = "away" | "left" | "right" | "towards";

/**
 * the lamp housing: a dark vented metal casing, visually distinct from the
 * standard blocks, with an LED panel on the face it shines from. The panel
 * is fully lit (bright) when the lamp is on. For directions whose emitting
 * face is hidden from the camera (left/away), a lit strip shows along the
 * top face's edge nearest that face
 */
const drawLamp = (
  img: Img,
  cell: Cell,
  direction: LampDirection,
  lit: boolean,
  colours: LightItemColours,
) => {
  clearCell(img, cell);

  // top face: light rim around louvred vents:
  for (let ty = 0; ty < 16; ty++) {
    const hw = topDiamondHalfWidth(ty);
    for (let tx = 16 - hw; tx < 16 + hw; tx++) {
      const nearEdge =
        tx <= 16 - hw + 3 || tx >= 16 + hw - 4 || ty <= 1 || ty >= 14;
      putPixel(
        img,
        cell,
        tx,
        ty,
        nearEdge ? colours.housingRim
        : ty % 2 === 0 ? colours.housingDark
        : colours.housingBase,
      );
    }
  }

  // side faces: vented casing with a shadowed base:
  for (let tx = 0; tx < 32; tx++) {
    const [top, bottom] = sideFaceBounds(tx);
    const depth = tx < 16 ? tx : 31 - tx;
    for (let ty = top; ty < bottom; ty++) {
      if (inTopDiamond(tx, ty)) {
        continue;
      }
      const rowIn = ty - top;
      const isVentSlot =
        depth >= 3 &&
        depth <= 12 &&
        depth % 3 !== 0 &&
        rowIn >= 3 &&
        rowIn <= 8;
      putPixel(
        img,
        cell,
        tx,
        ty,
        isVentSlot || rowIn >= 10 ? colours.housingDark : colours.housingBase,
      );
    }
  }

  // the emitting face:
  if (direction === "towards" || direction === "right") {
    // visible face - full LED panel, bright when lit:
    const txStart = direction === "towards" ? 1 : 17;
    const txEnd = direction === "towards" ? 14 : 30;
    for (let tx = txStart; tx <= txEnd; tx++) {
      const [top, bottom] = sideFaceBounds(tx);
      for (let ty = top + 1; ty < bottom - 1; ty++) {
        if (inTopDiamond(tx, ty)) {
          continue;
        }
        const isBorder =
          tx === txStart || tx === txEnd || ty === top + 1 || ty === bottom - 2;
        if (isBorder) {
          putPixel(img, cell, tx, ty, colours.outline);
          continue;
        }
        const depth = tx < 16 ? tx : 31 - tx;
        const rowIn = ty - top;
        const isDot = depth % 2 === 0 && rowIn % 2 === 0;
        putPixel(
          img,
          cell,
          tx,
          ty,
          lit ?
            isDot ? colours.panelLitDot
            : colours.panelLitBg
          : isDot ? colours.panelOffDot
          : colours.panelOffBg,
        );
      }
    }
  } else {
    // hidden face - lit strip along the nearest top edge:
    for (let ty = 0; ty <= 7; ty++) {
      const hw = topDiamondHalfWidth(ty);
      const stripStart = direction === "left" ? 16 - hw : 16 + hw - 5;
      for (let i = 0; i < 5; i++) {
        putPixel(
          img,
          cell,
          stripStart + i,
          ty,
          lit ?
            (ty + i) % 3 === 0 ?
              colours.panelLitDot
            : colours.panelLitBg
          : (ty + i) % 3 === 0 ? colours.panelOffDot
          : colours.panelOffBg,
        );
      }
      putPixel(
        img,
        cell,
        direction === "left" ? stripStart + 5 : stripStart - 1,
        ty,
        colours.outline,
      );
    }
  }

  outlineBlockSilhouette(img, cell, colours);
};

/*
 * the full-block "display case" cage the mirror's pane swivels inside -
 * the visual truth of the mirror's (always axis-aligned, full-block)
 * collision box. Split into back/front parts so the face-on mirror can
 * render reflections sandwiched between them. The cage and pane rotate
 * rigidly together, so the cage looks identical in both rest orientations
 * and only the mid-flip frames show it turned 45°
 */

/** cage parts behind the pane: the back corner post and the top back edges */
const drawMirrorCageBack = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  for (let z = 0; z <= 11; z++) {
    const ty = 11 - z;
    putPixel(img, cell, 15, ty, colours.frameMid);
    putPixel(img, cell, 16, ty, colours.frameMid);
  }
  // top back edges, from the side corners up to the back corner:
  for (let a = 0; a <= 15; a++) {
    const ty = 8 - Math.floor(a / 2);
    putPixel(img, cell, a, ty, colours.frameMid);
    putPixel(img, cell, 31 - a, ty, colours.frameMid);
  }
};

/** cage parts in front of the pane: side/front posts, top front and base
 * front edges */
const drawMirrorCageFront = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  // side corner posts:
  for (let ty = 8; ty <= 20; ty++) {
    putPixel(img, cell, 0, ty, colours.outline);
    putPixel(img, cell, 1, ty, colours.frameLight);
    putPixel(img, cell, 30, ty, colours.frameLight);
    putPixel(img, cell, 31, ty, colours.outline);
  }
  // top front edges, from the side corners down to the front corner:
  for (let a = 0; a <= 15; a++) {
    const ty = 8 + Math.floor(a / 2);
    putPixel(img, cell, a, ty, colours.frameMid);
    putPixel(img, cell, 31 - a, ty, colours.frameMid);
  }
  // base front edges, along the block's floor footprint:
  for (let a = 0; a <= 15; a++) {
    const ty = 20 + Math.floor(a / 2);
    putPixel(img, cell, a, ty, colours.frameMid);
    putPixel(img, cell, 31 - a, ty, colours.frameMid);
  }
  // front corner post:
  for (let z = 0; z <= 11; z++) {
    const ty = 27 - z;
    putPixel(img, cell, 15, ty, colours.frameLight);
    putPixel(img, cell, 16, ty, colours.frameLight);
  }
  // feet at the side posts' bases:
  for (const tx of [0, 1, 30, 31]) {
    putPixel(img, cell, tx, 21, colours.frameMid);
    putPixel(img, cell, tx, 22, colours.outline);
  }
};

/**
 * the face-on mirror: its pane runs along the awayRight<->towardsLeft
 * diagonal, which projects to a 32x12 screen rectangle facing the camera
 */
const drawMirrorAwayRight = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  clearCell(img, cell);
  drawMirrorCageBack(img, cell, colours);
  // the pane's base line (z=0 along the diagonal) is at ty=20, top (z=12) at ty=8:
  const top = 8;
  const bottom = 20;
  for (let tx = 0; tx < 32; tx++) {
    for (let ty = top; ty <= bottom; ty++) {
      const isFramePost = tx <= 1 || tx >= 30;
      const isBorder = ty === top || ty === bottom;
      if (isFramePost) {
        putPixel(
          img,
          cell,
          tx,
          ty,
          tx === 0 || tx === 31 ? colours.outline : colours.frameLight,
        );
        continue;
      }
      if (isBorder) {
        putPixel(img, cell, tx, ty, colours.outline);
        continue;
      }
      // near-flat placeholder-coloured surface, so the (darker) two-toned
      // reflections rendered over it stand out; shaded only at its base:
      putPixel(
        img,
        cell,
        tx,
        ty,
        ty > 17 ? colours.surfaceDark : colours.surface,
      );
    }
  }
};

/**
 * the edge-on mirror: its pane runs along the awayLeft<->towardsRight
 * diagonal, which is parallel to the view axis - we see only its edge,
 * a thin vertical strip up the middle of the block, inside its cage
 */
const drawMirrorAwayLeft = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  clearCell(img, cell);
  drawMirrorCageBack(img, cell, colours);
  for (let ty = 0; ty < 28; ty++) {
    putPixel(img, cell, 14, ty, colours.outline);
    putPixel(img, cell, 15, ty, colours.frameMid);
    putPixel(img, cell, 16, ty, ty % 3 === 0 ? colours.glint : colours.surface);
    putPixel(img, cell, 17, ty, colours.outline);
  }
  // cap the top and bottom of the strip:
  for (let tx = 14; tx <= 17; tx++) {
    putPixel(img, cell, tx, 0, colours.outline);
    putPixel(img, cell, tx, 27, colours.outline);
  }
  drawMirrorCageFront(img, cell, colours);
};

/**
 * the axis-aligned transition frame shown briefly as a mirror rotates 90°
 * between its diagonal orientations: the pane halfway through the turn,
 * running straight along the x or y axis through the centre of the block.
 * The cage doesn't turn - it is the (fixed) collision box; only the pane
 * swivels inside it.
 *
 * In texture space, the pane's base runs from the block's left/right corner
 * to the front corner, at half the iso slope of the block edges
 */
const drawMirrorFlipping = (
  img: Img,
  cell: Cell,
  axis: "x" | "y",
  colours: LightItemColours,
) => {
  clearCell(img, cell);
  drawMirrorCageBack(img, cell, colours);
  // for the y-aligned pane, the bottom of the pane at column tx is
  // 28 - tx/2 (exclusive); the x-aligned pane is its horizontal mirror:
  const flipTx = (tx: number) => (axis === "y" ? tx : 32 - tx);
  for (let tx = 8; tx <= 24; tx++) {
    const bottom = Math.floor(28 - tx / 2);
    const top = bottom - 12;
    for (let ty = top; ty < bottom; ty++) {
      const isPost = tx <= 9 || tx >= 23;
      const isBorder = ty === top || ty === bottom - 1;
      putPixel(
        img,
        cell,
        flipTx(tx),
        ty,
        isPost && (tx === 8 || tx === 24) ? colours.outline
        : isPost ? colours.frameLight
        : isBorder ? colours.outline
        : ty > bottom - 4 ? colours.surfaceDark
        : colours.surface,
      );
    }
  }
  drawMirrorCageFront(img, cell, colours);
};

/**
 * the cage parts in front of the face-on mirror's pane, as a separate
 * texture so the game can render reflections sandwiched between the
 * surface and the cage
 */
const drawMirrorAwayRightFront = (
  img: Img,
  cell: Cell,
  colours: LightItemColours,
) => {
  clearCell(img, cell);
  drawMirrorCageFront(img, cell, colours);
};

/**
 * one half-block (8 world px) tile of beam, tiled along the beam's length.
 * Three animation frames shift the light pulses along the beam so the light
 * appears to travel. All patterns repeat with period 8 along the beam so
 * tiles join seamlessly.
 */
const drawBeamTile = (
  img: Img,
  cell: Cell,
  axis: "x" | "y",
  /** animation frame 0..2 */
  frame: number,
  colours: LightItemColours,
) => {
  clearCell(img, cell);

  /*
   * tile box: 8 long, 8 across, 8 tall, drawn for the x axis then mirrored
   * for y. In texture space (16x16, anchored at the box's min corner):
   *  - top face: diamond with corners (8,0),(16,4),(8,8),(0,4)
   *  - side face: parallelogram on the left half, columns tx 0..8
   * only edges running along the beam are drawn, so tiles join seamlessly
   */
  const flipTx = (tx: number) => (axis === "x" ? tx : 15 - tx);
  const put = (tx: number, ty: number, colour: Rgba) =>
    putPixel(img, cell, flipTx(tx), ty, colour);

  // per-frame shift of the travelling pulses (8px over 3 frames):
  const pulseOffset = Math.round((frame * 8) / 3);
  // 4px-long pulses with 4px gaps, travelling towards +along:
  const inPulse = (along: number, phase: number) =>
    (along - pulseOffset + phase + 16) % 8 < 4;

  // a stair line on the top face at across-position p, masked by mask(a):
  const topFaceLine = (
    p: number,
    colour: Rgba,
    mask: (a: number) => boolean = () => true,
  ) => {
    for (let a = 0; a < 8; a++) {
      if (!mask(a)) {
        continue;
      }
      put(Math.floor(p - a) + 8, Math.floor(8 - (a + p) / 2), colour);
      put(Math.floor(p - a) + 9, Math.floor(8 - (a + p) / 2), colour);
    }
  };
  // a stair line on the visible long side face, at height z:
  const sideFaceLine = (
    z: number,
    colour: Rgba,
    mask: (a: number) => boolean = () => true,
  ) => {
    for (let tx = 0; tx < 8; tx++) {
      const a = 8 - tx;
      if (!mask(a)) {
        continue;
      }
      put(tx, Math.floor(12 + tx / 2) - 1 - z, colour);
    }
  };

  // static bright edges so the beam always has a continuous body:
  topFaceLine(7, colours.beamBright);
  topFaceLine(0, colours.beamBright);
  // travelling pulses up the middle and down the side:
  topFaceLine(3.5, colours.beamMid, (a) => inPulse(a, 0));
  sideFaceLine(4, colours.beamMid, (a) => inPulse(a, 2));
  sideFaceLine(0, colours.beamDim, (a) => inPulse(a, 4));
};

/**
 * the glow where a beam terminates: a disc drawn on the plane whose normal
 * is the beam's direction (the across/up plane), so it reads as the light's
 * energy dissipating against whatever blocks it. The across axis shears the
 * screen y by half, per the iso projection; the y-normal disc is the
 * horizontal mirror of the x-normal one
 */
const drawBeamTerminus = (
  img: Img,
  cell: Cell,
  axis: "x" | "y",
  colours: LightItemColours,
) => {
  clearCell(img, cell);
  for (let tx = 0; tx < cell.w; tx++) {
    const across = axis === "x" ? tx - 8 : 8 - tx;
    for (let ty = 0; ty < cell.h; ty++) {
      const up = 12 - ty - across / 2;
      const rSquared = across * across + up * up;
      if (rSquared <= 2.5 ** 2) {
        putPixel(img, cell, tx, ty, colours.terminusBright);
      } else if (rSquared <= 4.5 ** 2) {
        putPixel(img, cell, tx, ty, colours.terminusMid);
      } else if (rSquared <= 6.5 ** 2 && (tx + ty) % 2 === 0) {
        // dithered rim so the glow fades out:
        putPixel(img, cell, tx, ty, colours.terminusDim);
      }
    }
  }
};

type BeamCornerVariant = keyof typeof beamCornerCells;

type CornerArm = { axis: "x" | "y"; sign: -1 | 1 };

/**
 * the two world directions each corner shape connects: light flows in along
 * `incident` and out along `outgoing`. The same texture also serves the
 * opposite flow (eg awayToRight uses leftToTowards), played in reverse
 */
const cornerVariantArms: Record<
  BeamCornerVariant,
  { incident: CornerArm; outgoing: CornerArm }
> = {
  leftToAway: {
    incident: { axis: "x", sign: 1 },
    outgoing: { axis: "y", sign: 1 },
  },
  awayToLeft: {
    incident: { axis: "y", sign: 1 },
    outgoing: { axis: "x", sign: 1 },
  },
  leftToTowards: {
    incident: { axis: "x", sign: 1 },
    outgoing: { axis: "y", sign: -1 },
  },
  towardsToLeft: {
    incident: { axis: "y", sign: -1 },
    outgoing: { axis: "x", sign: 1 },
  },
};

/**
 * the bend where a beam reflects at a mirror, drawn in the mirror's whole
 * 32x28 block cell (so the renderer can place it exactly where the mirror
 * block is). The two arms of the bend continue the beam tiles' art from the
 * mirror's aabb faces in to the pane (the diagonal through the block's
 * centre), where the flow lines turn the corner. Pulse phase is carried
 * along the light's path so the bend joins both adjoining beam segments
 * seamlessly
 */
const drawBeamCorner = (
  img: Img,
  cell: Cell,
  variant: BeamCornerVariant,
  /** animation frame 0..2 */
  frame: number,
  colours: LightItemColours,
) => {
  clearCell(img, cell);

  const { incident, outgoing } = cornerVariantArms[variant];
  /*
   * which diagonal the pane lies on: equal signs reflect in the x=y diagonal
   * (edge-on to the camera), opposite signs in the x+y diagonal (face-on)
   */
  const diag1 = incident.sign === outgoing.sign;

  // mirror-cell world coords: the beam band is 4..12 across, 2..10 up
  // (the beam sits 2px above the block's base):
  const paneAlongAt = (across: number) => (diag1 ? across : 16 - across);

  const pulseOffset = Math.round((frame * 8) / 3);
  const inPulse = (s: number, phase: number) =>
    (Math.floor(s) - pulseOffset + phase + 32) % 8 < 4;

  const putWorld = (
    x: number,
    y: number,
    z: number,
    colour: Rgba,
    wide: boolean,
  ) => {
    const tx = Math.floor(y - x) + 16;
    const ty = Math.floor(28 - (x + y) / 2 - z);
    putPixel(img, cell, tx, ty, colour);
    if (wide) {
      putPixel(img, cell, tx + 1, ty, colour);
    }
  };

  // the same flow-line elements as drawBeamTile, in mirror-cell coords:
  type FlowLine = {
    /** across-position within the beam's 4..12 band */
    across: number;
    z: number;
    /** texture rows are nudged up a px for side lines, like the tile art */
    tyAdjust: number;
    colour: Rgba;
    wide: boolean;
    /** pulse phase, or undefined for the static (always-lit) lines */
    phase?: number;
  };
  const flowLines: FlowLine[] = [
    { across: 4, z: 10, tyAdjust: 0, colour: colours.beamBright, wide: true },
    { across: 11, z: 10, tyAdjust: 0, colour: colours.beamBright, wide: true },
    {
      across: 7.5,
      z: 10,
      tyAdjust: 0,
      colour: colours.beamMid,
      wide: true,
      phase: 0,
    },
    {
      across: 4,
      z: 6,
      tyAdjust: -1,
      colour: colours.beamMid,
      wide: false,
      phase: 2,
    },
    {
      across: 4,
      z: 2,
      tyAdjust: -1,
      colour: colours.beamDim,
      wide: false,
      phase: 4,
    },
  ];

  const drawArm = (arm: CornerArm, role: "incident" | "outgoing") => {
    for (const { across, z, tyAdjust, colour, wide, phase } of flowLines) {
      const paneAlong = paneAlongAt(across);
      const armEnd = arm.sign > 0 === (role === "outgoing") ? 16 : 0;
      const [from, to] =
        role === "incident" ? [armEnd, paneAlong] : [paneAlong, armEnd];

      // distance already travelled when the light reaches the pane on this
      // flow line - so the pulse phase continues around the bend:
      const incidentAcross = diag1 ? across : 16 - across;
      const incidentEntry = incident.sign > 0 ? 0 : 16;
      const incidentLength = Math.abs(
        paneAlongAt(incidentAcross) - incidentEntry,
      );

      const step = Math.sign(to - from) || 1;
      for (
        let along = Math.round(from);
        step > 0 ? along <= to : along >= to;
        along += step
      ) {
        const s =
          role === "incident" ?
            Math.abs(along - armEnd)
          : incidentLength + Math.abs(along - paneAlong);
        if (phase !== undefined && !inPulse(s, phase)) {
          continue;
        }
        const [x, y] = arm.axis === "x" ? [along, across] : [across, along];
        // a ty row adjustment of -1 (up a pixel) is +1 world z:
        putWorld(x, y, z - tyAdjust, colour, wide);
      }
    }
  };

  // painter's order: for the edge-on pane the outgoing arm recedes behind
  // the incident one; for the face-on pane the outgoing arm comes forwards:
  if (diag1) {
    drawArm(outgoing, "outgoing");
    drawArm(incident, "incident");
  } else {
    drawArm(incident, "incident");
    drawArm(outgoing, "outgoing");
  }
};

const drawAllForSheet = (img: Img, colours: LightItemColours) => {
  for (const [key, cell] of Object.entries(lampCells)) {
    const [litStr, direction] = key.split(".") as ["off" | "on", LampDirection];
    drawLamp(img, cell, direction, litStr === "on", colours);
  }
  drawMirrorAwayLeft(img, mirrorCells.awayLeft, colours);
  drawMirrorAwayRight(img, mirrorCells.awayRight, colours);
  drawMirrorAwayRightFront(img, mirrorCells.awayRightFront, colours);
  drawMirrorFlipping(img, mirrorCells.flippingX, "x", colours);
  drawMirrorFlipping(img, mirrorCells.flippingY, "y", colours);
  for (const axis of ["x", "y"] as const) {
    for (const [frame, cell] of beamFrameCells[axis].entries()) {
      drawBeamTile(img, cell, axis, frame, colours);
    }
    drawBeamTerminus(img, beamTerminusCells[axis], axis, colours);
  }
  for (const [variant, cells] of Object.entries(beamCornerCells)) {
    for (const [frame, cell] of cells.entries()) {
      drawBeamCorner(img, cell, variant as BeamCornerVariant, frame, colours);
    }
  }
};

/** find a chunk in a webp riff container, returning [start, end) offsets */
const findWebpChunk = (buf: Buffer, chunkId: string): [number, number] => {
  let off = 12;
  while (off < buf.length - 8) {
    const id = buf.toString("ascii", off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    const end = off + 8 + size + (size % 2);
    if (id === chunkId) {
      return [off, end];
    }
    off = end;
  }
  throw new Error(`no ${chunkId} chunk found in webp`);
};

/**
 * the BlockStack sheet is tagged Display P3 (the iff2png pipeline embeds the
 * profile with imagemagick). Tag the re-encoded sheet identically by splicing
 * the original file's VP8X+ICCP chunks, unchanged, around the new VP8L
 * bitstream - the pixel values themselves are already in the tagged space
 */
const withSplicedColourProfile = (
  encodedWebp: Buffer,
  originalFileWithProfile: Buffer,
): Buffer => {
  const [, originalVp8lStart] = findWebpChunk(originalFileWithProfile, "ICCP");
  const headerAndProfile = originalFileWithProfile.subarray(
    12,
    originalVp8lStart,
  );
  const [vp8lStart, vp8lEnd] = findWebpChunk(encodedWebp, "VP8L");
  const vp8l = encodedWebp.subarray(vp8lStart, vp8lEnd);
  const spliced = Buffer.concat([
    encodedWebp.subarray(0, 12),
    headerAndProfile,
    vp8l,
  ]);
  spliced.writeUInt32LE(spliced.length - 8, 4);
  return spliced;
};

const writeSheet = async (
  file: string,
  img: Img,
  /** for sheets that are colour-profile tagged: the original file bytes whose
   * VP8X+ICCP chunks should be carried over to the output */
  spliceProfileFrom?: Buffer,
) => {
  const encoded = await sharp(Buffer.from(img.data.buffer as ArrayBuffer), {
    raw: { width: img.width, height: img.height, channels: 4 },
  })
    .webp({ lossless: true, effort: 6 })
    .toBuffer();

  const webpBuffer =
    spliceProfileFrom === undefined ? encoded : (
      withSplicedColourProfile(encoded, spliceProfileFrom)
    );

  // verify the round trip is genuinely lossless before writing:
  const reDecoded = decode(webpBuffer);
  for (let i = 0; i < img.data.length; i += 4) {
    const aOrig = img.data[i + 3];
    const aNew = reDecoded.data[i + 3];
    const matches =
      aOrig === 0 ?
        aNew === 0
      : aNew === aOrig &&
        reDecoded.data[i] === img.data[i] &&
        reDecoded.data[i + 1] === img.data[i + 1] &&
        reDecoded.data[i + 2] === img.data[i + 2];
    if (!matches) {
      throw new Error(`webp round-trip not lossless at byte ${i} of ${file}`);
    }
  }
  writeFileSync(file, webpBuffer);
  console.log(`wrote ${file} (${(webpBuffer.length / 1024).toFixed(1)} KB)`);
};

// BlockStack - Display P3 tagged:
{
  const originalFile = readFileSync("gfx/sprites.webp");
  const decoded = decode(originalFile);
  const img: Img = {
    width: decoded.width,
    height: decoded.height,
    data: decoded.data,
  };
  drawAllForSheet(img, blockstackColours);
  await writeSheet("gfx/sprites.webp", img, originalFile);
}

// Toppy:
{
  const decoded = decode(readFileSync("gfx/spritesToppy.webp"));
  const img: Img = {
    width: decoded.width,
    height: decoded.height,
    data: decoded.data,
  };
  drawAllForSheet(img, toppyColours);
  await writeSheet("gfx/spritesToppy.webp", img);
}
