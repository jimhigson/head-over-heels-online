/** the lowest-numbered `room_<n>` id that isn't already a room */
export const firstUntakenRoomId = <RoomId extends string>(
  rooms: Partial<Record<RoomId, unknown>>,
): RoomId => {
  for (let roomNumber = 0; ; roomNumber++) {
    const roomId = `room_${roomNumber}` as RoomId;
    if (rooms[roomId] === undefined) {
      return roomId;
    }
  }
};
