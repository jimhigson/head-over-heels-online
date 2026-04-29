import type { SpritesheetFrameData } from "pixi.js";
import type { Merge, SetOptional } from "type-fest";

import type { SceneryName, Wall } from "../sprites/planets";
import type { RoomJson } from "./RoomJson";

import { blockSizePx } from "../game/physics/mechanicsConstants";

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
export const isCharacterName = (name: string): name is CharacterName =>
  name === "head" || name === "heels";

export type AnyWall = Wall<SceneryName>;

export const floorThickness = blockSizePx.z;
export const wallThickness = blockSizePx.x / 2;

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
 * Variant of Campaign where the locator's campaignName is optional — used
 * by the editor when a campaign hasn't been named yet.
 */
export type OptionallyNamedCampaign<RoomId extends string> = Merge<
  Campaign<RoomId>,
  { locator: SetOptional<CampaignLocator, "campaignName"> }
>;

export type UnknownCampaign = Campaign<string>;

export type CampaignRoomId<C extends UnknownCampaign> = string &
  keyof C["rooms"];
export type CampaignRoom<C extends UnknownCampaign> =
  C extends Campaign<infer RoomId> ? RoomJson<RoomId, string, SceneryName>
  : never;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
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
