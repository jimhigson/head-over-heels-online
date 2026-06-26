export const renderBobSine = (
  roomTime: number,
  period: number,
  amplitude: number,
  /**
   * the item's `hash` (in `[0, 1)`), used to give each item a unique phase
   * offset so they don't bob in sync
   */
  phase: number | undefined,
  integerOnly: boolean,
) => {
  const phaseOffset = (phase ?? 0) * 20_000;
  const value = Math.sin((roomTime + phaseOffset) / period) * amplitude;
  return integerOnly ? Math.round(value) : value;
};

export const renderBobBounce = (
  roomTime: number,
  period: number,
  amplitude: number,
  /**
   * the item's `hash` (in `[0, 1)`), used to give each item a unique phase
   * offset so they don't bob in sync
   */
  phase: number | undefined,
  integerOnly: boolean,
) => {
  const phaseOffset = (phase ?? 0) * 20_000;
  const bounce = Math.abs(Math.sin((roomTime + phaseOffset) / (period * 2)));
  const value = (bounce * 2 - 1) * amplitude;
  return integerOnly ? Math.round(value) : value;
};
