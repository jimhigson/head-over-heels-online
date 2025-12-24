import type { Xyz } from "./vectors";

import { epsilon } from "../epsilon";

export const rotateVectorTowards = (
  from: Xyz,
  target: Xyz,
  angularVelocityRadiansPerMs: number,
  deltaMs: number,
): Xyz => {
  const currentLenSq = from.x * from.x + from.y * from.y;
  const targetLenSq = target.x * target.x + target.y * target.y;

  if (currentLenSq < epsilon || targetLenSq < epsilon) {
    return from;
  }

  const angleDiff = Math.atan2(
    from.x * target.y - from.y * target.x,
    from.x * target.x + from.y * target.y,
  );

  const absAngleDiff = Math.abs(angleDiff);

  if (absAngleDiff + epsilon > Math.PI) {
    // turning to opposite direction - short cut and go straight to the target
    return target;
  }
  if (absAngleDiff < epsilon) {
    return target;
  }

  const maxRotation = angularVelocityRadiansPerMs * deltaMs;
  const rotation = Math.max(-maxRotation, Math.min(maxRotation, angleDiff));

  const c = Math.cos(rotation);
  const s = Math.sin(rotation);

  return {
    x: from.x * c - from.y * s,
    y: from.x * s + from.y * c,
    z: from.z,
  };
};
