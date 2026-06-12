/** format ms as h:mm:ss (or m:ss if under an hour), to the nearest second */
export const formatTimeTaken = (timeTakenMs: number): string => {
  const totalSeconds = Math.round(timeTakenMs / 1000);
  const seconds = `${totalSeconds % 60}`.padStart(2, "0");
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return hours > 0 ?
      `${hours}:${`${minutes}`.padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
};
