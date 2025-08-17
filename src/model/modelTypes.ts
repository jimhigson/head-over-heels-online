import type { SpritesheetFrameData } from "pixi.js";
import type { SceneryName, Wall } from "../sprites/planets";
import type { RoomJson } from "./RoomJson";
import { blockSizePx } from "../sprites/spritePivots";

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

export const floorThickness = blockSizePx.h;
export const wallThickness = blockSizePx.w / 2;

/**
 * special value to use in place of a superbase auth.users.id
 * for *.ts campaigns created baked-in to the game's deploy
 * (ie, the original game)
 *
 * @see Campaign.userId
 */
export const originalUserId = "@@original" as const;
export const originalCampaignName = "original" as const;
export const originalCampaignLocator: CampaignLocator = {
  userId: originalUserId,
  campaignName: originalCampaignName,
  version: -1,
};

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

export type UnknownCampaign = Campaign<string>;

export type CampaignRoomId<C extends UnknownCampaign> = string &
  keyof C["rooms"];
export type CampaignRoom<C extends UnknownCampaign> =
  C extends Campaign<infer RoomId> ? RoomJson<RoomId, string, SceneryName>
  : never;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
export type SpriteSize = Pick<SpriteFrame, "w" | "h">;

/**
 * A locator for a specific campaign, identified by user ID and campaign name.
 */
export type CampaignLocator = {
  /**
   * the id (from supabase at auth.users.id, which is a uuid) of the user who
   * created this campaign, or special value '@@original'
   * @see originalUserId
   */
  userId: string;
  campaignName: string;
  /** -1 means 'latest' */
  version: number;
};
