export const periodicItemShouldAct = (
  state: { delay?: number; period: number; lastActedAtRoomTime: number },
  roomTime: number,
): boolean => {
  const delay = state.delay ?? 0;
  if (roomTime < delay) {
    return false;
  }
  return state.lastActedAtRoomTime + state.period < roomTime;
};
