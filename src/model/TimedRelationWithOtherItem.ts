export type TimedRelationWithOtherItem<RoomItemId extends string> = {
  /** by recording the time of the event,
   * we allow rendering to take into account events that happened in sub-ticks since the room's
   * last render
   */
  roomTime: number;
  /** the ids of the item is related to */
  by: Record<RoomItemId, true>;
};
