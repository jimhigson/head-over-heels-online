import { hashStringToNumber0to1 } from "./hashStringToNumber0to1";

export const renderBobSine = (
  roomTime: number,
  period: number,
  amplitude: number,
  /** used to give each item a unique phase offset so they don't bob in sync */
  itemId: string,
) => {
  const phaseOffset = hashStringToNumber0to1(itemId) * 20_000;
  return Math.sin((roomTime + phaseOffset) / period) * amplitude;
};

export const renderBobBounce = (
  roomTime: number,
  period: number,
  amplitude: number,
  /** used to give each item a unique phase offset so they don't bob in sync */
  itemId: string,
) => {
  const phaseOffset = hashStringToNumber0to1(itemId) * 20_000;
  const bounce = Math.abs(Math.sin((roomTime + phaseOffset) / (period * 2)));
  return (bounce * 2 - 1) * amplitude;
};
