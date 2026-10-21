import { type ZxSpectrumRoomHue } from "../originalGame";
import { entries, fromAllEntries } from "../utils/entries";
import { type Campaign } from "./modelTypes";

/**
 * each room's colour hue, by room id
 */
export type RoomHues<RoomId extends string> = Readonly<
  Record<RoomId, ZxSpectrumRoomHue>
>;

export const roomHues = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
): RoomHues<RoomId> =>
  fromAllEntries(
    entries(rooms).map(([roomId, room]) => [roomId, room.color.hue] as const),
  );
