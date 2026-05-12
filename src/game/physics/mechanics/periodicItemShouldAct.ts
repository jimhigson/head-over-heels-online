export const periodicItemShouldAct = (
  state: { delay?: number; period: number; lastActedAtRoomTime: number },
  roomTime: number,
  startTime = 0,
): boolean => {
  const delay = state.delay ?? 0;
  if (roomTime < startTime + delay) {
    return false;
  }
  return state.lastActedAtRoomTime + state.period < roomTime;
};
