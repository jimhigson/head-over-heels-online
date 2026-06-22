/** one end of a teleporter link - a specific sub-room of a room on the map */
export type TeleporterCell<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  /**
   * the teleporter (or destination) item this end refers to, when known - lets
   * the renderer point the arrow at the item's icon rather than the room centre
   */
  itemId?: string;
};

/** a teleporter sends the player from one cell on the map to another */
export type TeleporterLink<RoomId extends string> = {
  from: TeleporterCell<RoomId>;
  to: TeleporterCell<RoomId>;
};
