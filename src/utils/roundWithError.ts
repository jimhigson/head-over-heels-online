
export type RoundedWithError = {
  valueInt: number;
  roundingError: number;
};

export const roundWithError = (valueFloat: number): RoundedWithError => {
  const valueInt = Math.round(valueFloat);

  return {
    valueInt,
    roundingError: valueFloat - valueInt,
  };
};
