import type { SpritesheetFrameData } from "pixi.js";
import type { ItemInPlay, UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { Simplify } from "type-fest";
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

export type Floor = "deadly" | "none" | `${SceneryName}`;

export type AnyWall = Wall<SceneryName>;

export const floorThickness = blockSizePx.h;
export const wallThickness = blockSizePx.w / 2;

/* which graphics to use for all the walls in a room? */
export type RoomWalls<P extends SceneryName> = {
  left: Wall<P>[];
  away: Wall<P>[];
};

/**
 * a map of items-in-play in a room
 **/
export type RoomStateItems<
  P extends SceneryName,
  RoomId extends string,
  ItemId extends string = string,
> = Record<ItemId, UnionOfAllItemInPlayTypes<RoomId>> & {
  head?: ItemInPlay<"head", P, RoomId, "head">;
  heels?: ItemInPlay<"heels", P, RoomId, "heels">;
  headOverHeels?: ItemInPlay<"headOverHeels", P, RoomId, "headOverHeels">;
  // every room has a floor edge:
  floorEdge: ItemInPlay<"floorEdge", P, RoomId, "floorEdge">;
};

/**
 * Representation of a room in-play. This is in memory only for the current
 * one or two rooms (that head and heels are in, but they could be in the same
 * room)
 */
export type RoomState<
  P extends SceneryName,
  RoomId extends string,
  ItemId extends string = string,
> = Simplify<
  Omit<RoomJson<P, RoomId>, "items"> & {
    items: RoomStateItems<P, RoomId, ItemId>;
    /** the json this room was loaded from */
    roomJson: RoomJson<P, RoomId, ItemId>;
    /**
     * how long (in ms) this room has been in play for - only advanced while the room
     * is the current room
     */
    roomTime: number;
  }
>;
export type UnknownRoomState = RoomState<SceneryName, string>;

export type Campaign<RoomId extends string> = {
  rooms: Record<RoomId, RoomJson<SceneryName, RoomId>>;
};

export type UnknownCampaign = Campaign<string>;

export type CampaignRoomId<C extends UnknownCampaign> = string &
  keyof C["rooms"];
export type CampaignRoom<C extends UnknownCampaign> =
  C extends Campaign<infer RoomId> ? RoomJson<SceneryName, RoomId> : never;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
export type SpriteSize = Pick<SpriteFrame, "w" | "h">;
