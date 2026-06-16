import { hashStringToNumber0to1 } from "./hashStringToNumber0to1";

export const renderBobSine = (
  roomTime: number,
  period: number,
  amplitude: number,
  /** used to give each item a unique phase offset so they don't bob in sync */
  itemId: string,
  integerOnly: boolean,
) => {
  const phaseOffset = hashStringToNumber0to1(itemId) * 20_000;
  const value = Math.sin((roomTime + phaseOffset) / period) * amplitude;
  return integerOnly ? Math.round(value) : value;
};

export const renderBobBounce = (
  roomTime: number,
  period: number,
  amplitude: number,
  /** used to give each item a unique phase offset so they don't bob in sync */
  itemId: string,
  integerOnly: boolean,
) => {
  const phaseOffset = hashStringToNumber0to1(itemId) * 20_000;
  const bounce = Math.abs(Math.sin((roomTime + phaseOffset) / (period * 2)));
  const value = (bounce * 2 - 1) * amplitude;
  return integerOnly ? Math.round(value) : value;
};
