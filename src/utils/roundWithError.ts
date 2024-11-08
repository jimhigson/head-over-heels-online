export const roundWithError = (valueFloat: number) => {
  const valueInt = Math.round(valueFloat);

  return {
    valueInt,
    roundingError: valueFloat - valueInt,
  };
};
