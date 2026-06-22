import { type Campaign } from "../../modelTypes";
import { type RoomJson } from "../../RoomJson";
import {
  type JsonItem,
  type JsonItemType,
  type JsonItemUnion,
} from "../JsonItem";

/**
 * the campaign verification layer runs against any campaign - the original game,
 * the editor's in-progress campaign, or a community one. It never relies on the
 * editor's branded room/item ids, so it works in plain `string`s; callers cast
 * their branded campaign to this at the boundary.
 */
export type VerificationRoomId = string;
export type VerificationRoomItemId = string;
export type VerificationCampaign = Campaign<string>;
export type VerificationRoomJson = RoomJson<string, string>;
export type VerificationJsonItem<T extends JsonItemType> = JsonItem<
  T,
  string,
  string
>;
export type VerificationJsonItemUnion = JsonItemUnion<string, string>;
