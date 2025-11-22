/**
 * Convert RGB (0-1 range) to CIE LAB color space
 * NOTE: Currently not used due to performance, kept for future optimization
 */
const rgbToLab = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  // Convert RGB to XYZ (assuming sRGB)
  // First, linearize sRGB values
  const linearize = (c: number): number => {
    if (c <= 0.04045) {
      return c / 12.92;
    }
    return Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  // Convert to XYZ using sRGB matrix (D65 illuminant)
  let x = rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375;
  let y = rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.072175;
  let z = rLin * 0.0193339 + gLin * 0.119192 + bLin * 0.9503041;

  // Normalize for D65 illuminant
  x = x / 0.95047;
  y = y / 1.0;
  z = z / 1.08883;

  // Convert XYZ to LAB
  const fx = (t: number): number => {
    if (t > 0.008856) {
      return Math.pow(t, 1 / 3);
    }
    return 7.787 * t + 16 / 116;
  };

  const xn = fx(x);
  const yn = fx(y);
  const zn = fx(z);

  const L = 116 * yn - 16;
  const a = 500 * (xn - yn);
  const bLab = 200 * (yn - zn);

  return [L, a, bLab];
};

/**
 * Calculate perceptual color distance using Delta E CIE 2000 approximation
 * For simplicity, using Euclidean distance in LAB space (Delta E 1976)
 * which is good enough for most purposes
 */
export const distSquaredPerceptual = (
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
): number => {
  const [L1, a1, b1Lab] = rgbToLab(r1, g1, b1);
  const [L2, a2, b2Lab] = rgbToLab(r2, g2, b2);

  const dL = L2 - L1;
  const da = a2 - a1;
  const db = b2Lab - b1Lab;

  // Delta E 1976 formula (Euclidean distance in LAB space)
  return dL * dL + da * da + db * db;
};
