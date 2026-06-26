import { type SpritesheetFrameData } from "pixi.js";
import { type Merge, type SetOptional } from "type-fest";

import { type SceneryName, type Wall } from "../sprites/planets";
import { type RoomJson } from "./RoomJson";

export const individualCharacterNames = ["head", "heels"] as const;
export const characterNames = [
  ...individualCharacterNames,
  "headOverHeels",
] as const;
export type IndividualCharacterName = (typeof individualCharacterNames)[number];
export type CharacterName = (typeof characterNames)[number];
export const otherIndividualCharacterName = (
  name: IndividualCharacterName,
): IndividualCharacterName => (name === "head" ? "heels" : "head");

export type AnyWall = Wall<SceneryName>;

export type Campaign<RoomId extends string> = {
  rooms: Record<RoomId, RoomJson<RoomId, string, SceneryName>>;
  locator: CampaignLocator;
  meta?: {
    published: boolean;
    /**
     * so that when we come back, we can continue editing the campaign
     * from where we were
     */
    //lastEditedRoom: EditorRoomId;
  };
};

/**
 * The part of a Campaign stored in the db `data` column. Everything else
 * (userId, campaignName, version, published) lives in other db columns, so taking off
 * the blob prevents data inconsistency and keeps things OAOO.
 */
export type DbCampaign<RoomId extends string> = Omit<
  Campaign<RoomId>,
  "locator" | "meta"
>;

/**
 * Variant of Campaign where the locator's campaignName is optional — used
 * by the editor when a campaign hasn't been named yet.
 */
export type OptionallyNamedCampaign<RoomId extends string> = Merge<
  Campaign<RoomId>,
  { locator: SetOptional<CampaignLocator, "campaignName"> }
>;

type SpriteFrame = SpritesheetFrameData["frame"];
export type SpriteSize = Pick<SpriteFrame, "h" | "w">;

/**
 * A locator for a specific campaign, identified by user ID and campaign name.
 */
export type CampaignLocator = {
  /**
   * the id (from supabase at auth.users.id, which is a uuid) of the user who
   * created this campaign, or the sentinel `originalUserId` (`@@original`)
   * for the bundled original campaign.
   */
  userId: string;
  campaignName: string;
  /** -1 means 'latest' */
  version: number;
};
