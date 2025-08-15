import type { Campaign } from "../../../model/modelTypes";
import { typedURLSearchParams } from "../../../options/queryParams";

export const cheatsOn = () => typedURLSearchParams().get("cheats") === "1";

export const cheatRoomIdFromUrlHash = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  url: string,
): RoomId | undefined => {
  const u = new URL(url);
  const maybeRoomId = u.hash.substring(1);
  if (maybeRoomId === "") return undefined;
  if (campaign.rooms[maybeRoomId as RoomId] === undefined) return undefined;
  return u.hash.substring(1) as RoomId;
};
