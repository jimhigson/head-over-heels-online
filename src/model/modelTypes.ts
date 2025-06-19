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

export type Campaign<RoomId extends string> = {
  rooms: Record<RoomId, RoomJson<RoomId, string, SceneryName>>;
  name: string;
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
