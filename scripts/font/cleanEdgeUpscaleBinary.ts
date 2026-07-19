/**
 * CPU port of the cleanEdge upscaler (scale mode, with 2:1 slopes) for
 * two-tone (ink/blank) art, used offline to build the smooth ui font.
 * Original algorithm by torcado (MIT): https://torcado.com/cleanEdge/
 *
 * This is the binary degeneration of the game's class-based pass
 * (cleanEdgeTwoPass.frag pass A): with only ink and blank classes,
 * similarity is equality, colour distance is inequality, and ink always
 * takes priority over blank (as colour does over transparent in the
 * shader). The geometry - edge detection, the five slant cases, flips and
 * cleanup - is a faithful transliteration of the branching original.
 */

type InkAt = (
  /** source column */
  x: number,
  /** source row */
  y: number,
) => boolean;

const frac = (v: number) => v - Math.floor(v);

/** cd() of the original: binary distance between two samples */
const cd = (col1: boolean, col2: boolean): number => (col1 === col2 ? 0 : 1);

/** higher() of the original: ink outranks blank */
const higher = (thisCol: boolean, otherCol: boolean): boolean =>
  thisCol && !otherCol;

/** the original's slice colour choice `(cd(ref,a) <= cd(ref,b)) ? a : b` */
const pick = (ref: boolean, a: boolean, b: boolean): boolean =>
  cd(ref, a) <= cd(ref, b) ? a : b;

const distToLine = (
  testPtX: number,
  testPtY: number,
  pt1X: number,
  pt1Y: number,
  pt2X: number,
  pt2Y: number,
  dirX: number,
  dirY: number,
): number => {
  const lineDirX = pt2X - pt1X;
  const lineDirY = pt2Y - pt1Y;
  const perpDirX = lineDirY;
  const perpDirY = -lineDirX;
  const dirToPt1X = pt1X - testPtX;
  const dirToPt1Y = pt1Y - testPtY;
  const perpLength = Math.hypot(perpDirX, perpDirY);
  const sign = perpDirX * dirX + perpDirY * dirY > 0 ? 1 : -1;
  return (sign * (perpDirX * dirToPt1X + perpDirY * dirToPt1Y)) / perpLength;
};

// the original's lineWidth is 1.0, which its SLOPE clamp leaves unchanged, so
// the flipped distance form is `1 - distToLine` and the final threshold shift
// is -0.5, both written literally below

/**
 * sliceDist of the original, on binary samples. Returns the sliced-in sample
 * where a slice covers the point, or undefined for no slice (the vec4(-1)
 * sentinel).
 */
const sliceDist = (
  pointXIn: number,
  pointYIn: number,
  mainDirX: number,
  mainDirY: number,
  pdX: number,
  pdY: number,
  ub: boolean,
  u: boolean,
  uf: boolean,
  uff: boolean,
  b: boolean,
  c: boolean,
  f: boolean,
  ff: boolean,
  db: boolean,
  d: boolean,
  df: boolean,
  dff: boolean,
  ddb: boolean,
  dd: boolean,
  ddf: boolean,
): boolean | undefined => {
  //flip point
  const pointX = mainDirX * (pointXIn - 0.5) + 0.5;
  const pointY = mainDirY * (pointYIn - 0.5) + 0.5;
  const centerX = 0.5;
  const centerY = 0.5;

  const dtl = (
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    flipDir: boolean,
  ) =>
    distToLine(
      pointX,
      pointY,
      centerX + p1x * pdX,
      centerY + p1y * pdY,
      centerX + p2x * pdX,
      centerY + p2y * pdY,
      flipDir ? -pdX : pdX,
      flipDir ? -pdY : pdY,
    );

  //edge detection
  const distAgainst =
    4.0 * cd(f, d) + cd(uf, c) + cd(c, db) + cd(ff, df) + cd(df, dd);
  const distTowards =
    4.0 * cd(c, df) + cd(u, f) + cd(f, dff) + cd(b, d) + cd(d, ddf);
  let shouldSlice =
    distAgainst < distTowards ||
    (distAgainst < distTowards + 0.001 && !higher(c, f)); //equivalent edges edge case
  if (
    f === d &&
    d === b &&
    b === u &&
    uf === df &&
    df === db &&
    db === ub &&
    c !== f
  ) {
    //checkerboard edge case
    shouldSlice = false;
  }
  if (!shouldSlice) {
    return undefined;
  }

  let dist = 1.0;
  let flip = false;

  if (f === d && d === db && !(f === d && d === b) && !(uf === db)) {
    //lower shallow 2:1 slant
    if (c === df && higher(c, f)) {
      //single pixel wide diagonal, dont flip
    } else {
      //priority edge cases
      if (higher(c, f)) {
        flip = true;
      }
      if (u === f && !(c === df) && !higher(c, u)) {
        flip = true;
      }
    }

    dist =
      flip ?
        //midpoints of neighbor two-pixel groupings
        1.0 - dtl(1.5, -1.0, -0.5, 0.0, true)
      : dtl(1.5, 0.0, -0.5, 1.0, false);

    //cleanup slant transitions (shallow)
    if (
      !flip &&
      c === uf &&
      !(c === uf && uf === uff && !(c === uf && uf === ff) && !(d === uff))
    ) {
      dist = Math.min(dist, dtl(2.0, -1.0, -0.0, 1.0, false));
    }

    dist -= 0.5;
    return dist <= 0.0 ? pick(c, f, d) : undefined;
  } else if (uf === f && f === d && !(u === f && f === d) && !(uf === db)) {
    //forward steep 2:1 slant
    if (c === df && higher(c, d)) {
      //single pixel wide diagonal, dont flip
    } else {
      //priority edge cases
      if (higher(c, d)) {
        flip = true;
      }
      if (b === d && !(c === df) && !higher(c, d)) {
        flip = true;
      }
    }

    dist =
      flip ?
        1.0 - dtl(0.0, -0.5, -1.0, 1.5, true)
      : dtl(1.0, -0.5, 0.0, 1.5, false);

    //cleanup slant transitions (steep)
    if (
      !flip &&
      c === db &&
      !(c === db && db === ddb && !(c === db && db === dd) && !(f === ddb))
    ) {
      dist = Math.min(dist, dtl(1.0, 0.0, -1.0, 2.0, false));
    }

    dist -= 0.5;
    return dist <= 0.0 ? pick(c, f, d) : undefined;
  } else if (f === d) {
    //45 diagonal
    if (c === df && higher(c, f)) {
      //single pixel diagonal along neighbors, dont flip
      if (!(c === dd) && !(c === ff)) {
        //line against triple color stripe edge case
        flip = true;
      }
    } else {
      //priority edge cases
      if (higher(c, f)) {
        flip = true;
      }
      if (!(c === b) && b === f && f === d && d === u) {
        flip = true;
      }
    }
    //single pixel 2:1 slope, dont flip
    if (
      ((f === db && u === f && f === df) ||
        (uf === d && b === d && d === df)) &&
      !(c === df)
    ) {
      flip = true;
    }

    dist =
      flip ?
        //midpoints of own diagonal pixels
        1.0 - dtl(1.0, -1.0, -1.0, 1.0, true)
        //midpoints of corner neighbor pixels
      : dtl(1.0, 0.0, 0.0, 1.0, false);

    //cleanup slant transitions (shallow then steep)
    if (
      !flip &&
      c === uf &&
      uf === uff &&
      !(c === uf && uf === ff) &&
      !(d === uff)
    ) {
      dist = Math.max(dist, dtl(1.5, 0.0, -0.5, 1.0, false));
    }

    if (
      !flip &&
      ddb === db &&
      db === c &&
      !(dd === db && db === c) &&
      !(ddb === f)
    ) {
      dist = Math.max(dist, dtl(1.0, -0.5, 0.0, 1.5, false));
    }

    dist -= 0.5;
    return dist <= 0.0 ? pick(c, f, d) : undefined;
  } else if (
    ff === df &&
    df === d &&
    !(ff === df && df === c) &&
    !(uff === d)
  ) {
    //far corner of shallow slant
    if (f === dff && higher(f, ff)) {
      //single pixel wide diagonal, dont flip
    } else {
      //priority edge cases
      if (higher(f, ff)) {
        flip = true;
      }
      if (uf === ff && !(f === dff) && !higher(f, uf)) {
        flip = true;
      }
    }
    dist =
      flip ?
        1.0 - dtl(2.5, -1.0, 0.5, 0.0, true)
      : dtl(2.5, 0.0, 0.5, 1.0, false);

    dist -= 0.5;
    return dist <= 0.0 ? pick(f, ff, df) : undefined;
  } else if (
    f === df &&
    df === dd &&
    !(c === df && df === dd) &&
    !(f === ddb)
  ) {
    //far corner of steep slant
    if (d === ddf && higher(d, dd)) {
      //single pixel wide diagonal, dont flip
    } else {
      //priority edge cases
      if (higher(d, dd)) {
        flip = true;
      }
      if (db === dd && !(d === ddf) && !higher(d, dd)) {
        flip = true;
      }
    }

    dist =
      flip ?
        1.0 - dtl(0.0, 0.5, -1.0, 2.5, true)
      : dtl(1.0, 0.5, 0.0, 2.5, false);

    dist -= 0.5;
    return dist <= 0.0 ? pick(d, df, dd) : undefined;
  }
  return undefined;
};

/**
 * Upscale a two-tone bitmap by `factor` with the cleanEdge algorithm.
 * Returns a row-major boolean bitmap of size (w*factor) x (h*factor).
 * Out-of-bounds samples are blank, matching a glyph sitting alone on
 * transparent background.
 */
export const cleanEdgeUpscaleBinary = (
  /**
   * ink lookup for the source bitmap; called with coordinates that may be
   * outside [0,w)x[0,h), which must report blank
   */
  ink: InkAt,
  /**
   * source width in pixels
   */
  w: number,
  /**
   * source height in pixels
   */
  h: number,
  /**
   * upscale factor (the game uses up to 4)
   */
  factor: number,
): boolean[][] => {
  const out: boolean[][] = Array.from({ length: h * factor }, () =>
    new Array<boolean>(w * factor).fill(false),
  );

  for (let sy = 0; sy < h * factor; sy++) {
    for (let sx = 0; sx < w * factor; sx++) {
      // continuous source-space position of this subpixel (the shader's
      // vUV * uSheetSize)
      const pxX = (sx + 0.5) / factor;
      const pxY = (sy + 0.5) / factor;
      const localX = frac(pxX);
      const localY = frac(pxY);
      // centre of the containing texel (the shader's ceil(px) - 0.5)
      const cellX = Math.ceil(pxX) - 0.5;
      const cellY = Math.ceil(pxY) - 0.5;
      const pdX = Math.round(localX) * 2 - 1;
      const pdY = Math.round(localY) * 2 - 1;

      const at = (ox: number, oy: number): boolean =>
        ink(Math.floor(cellX + ox * pdX), Math.floor(cellY + oy * pdY));

      //neighbor pixels: Up, Down, Forward, and Back relative to quadrant
      const uub = at(-1, -2);
      const uu = at(0, -2);
      const uuf = at(1, -2);

      const ubb = at(-2, -2);
      const ub = at(-1, -1);
      const u = at(0, -1);
      const uf = at(1, -1);
      const uff = at(2, -1);

      const bb = at(-2, 0);
      const b = at(-1, 0);
      const c = at(0, 0);
      const f = at(1, 0);
      const ff = at(2, 0);

      const dbb = at(-2, 1);
      const db = at(-1, 1);
      const d = at(0, 1);
      const df = at(1, 1);
      const dff = at(2, 1);

      const ddb = at(-1, 2);
      const dd = at(0, 2);
      const ddf = at(1, 2);

      let col = c;

      //c_orner, b_ack, and u_p slices
      const cCol = sliceDist(
        localX,
        localY,
        1,
        1,
        pdX,
        pdY,
        ub,
        u,
        uf,
        uff,
        b,
        c,
        f,
        ff,
        db,
        d,
        df,
        dff,
        ddb,
        dd,
        ddf,
      );
      const bCol = sliceDist(
        localX,
        localY,
        -1,
        1,
        pdX,
        pdY,
        uf,
        u,
        ub,
        ubb,
        f,
        c,
        b,
        bb,
        df,
        d,
        db,
        dbb,
        ddf,
        dd,
        ddb,
      );
      const uCol = sliceDist(
        localX,
        localY,
        1,
        -1,
        pdX,
        pdY,
        db,
        d,
        df,
        dff,
        b,
        c,
        f,
        ff,
        ub,
        u,
        uf,
        uff,
        uub,
        uu,
        uuf,
      );

      if (cCol !== undefined) {
        col = cCol;
      }
      if (bCol !== undefined) {
        col = bCol;
      }
      if (uCol !== undefined) {
        col = uCol;
      }

      out[sy][sx] = col;
    }
  }

  return out;
};
