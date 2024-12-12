import type { SpritesheetFrameData } from "pixi.js";
import type { ItemInPlay, UnknownItemInPlay } from "./ItemInPlay";
import type { Simplify } from "type-fest";
import type { PlanetName, Wall } from "../sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import type { RoomJson } from "./RoomJson";

export const characterNames = ["head", "heels"] as const;
export type CharacterName = (typeof characterNames)[number];
export const otherCharacterName = (name: CharacterName) =>
  name === "head" ? "heels" : "head";
export const isCharacterName = (name: string): name is CharacterName =>
  name === "head" || name === "heels";

export type Floor = "deadly" | "none" | `${PlanetName}`;

export type AnyWall = Wall<PlanetName>;

export const floorThickness = blockSizePx.h;
export const wallThickness = blockSizePx.w / 2;

/* which graphics to use for all the walls in a room? */
export type RoomWalls<P extends PlanetName> = {
  left: Wall<P>[];
  away: Wall<P>[];
};

/**
 * a map of items-in-play in a room
 **/
export type RoomStateItems<
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string = string,
> = Record<ItemId, UnknownItemInPlay<RoomId>> & {
  head?: ItemInPlay<"head", P, RoomId, "head">;
  heels?: ItemInPlay<"heels", P, RoomId, "heels">;
};

/**
 * Representation of a room in-play. This is in memory only for the current
 * one or two rooms (that head and heels are in, but they could be in the same
 * room)
 */
export type RoomState<
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string = string,
> = Simplify<
  Omit<RoomJson<P, RoomId>, "items"> & {
    items: RoomStateItems<P, RoomId, ItemId>;
  }
>;
export type UnknownRoomState = RoomState<PlanetName, string>;

export type Campaign<RoomId extends string> = {
  rooms: Record<RoomId, RoomJson<PlanetName, RoomId>>;
};

export type UnknownCampaign = Campaign<string>;

export type CampaignRoomId<C extends UnknownCampaign> = string &
  keyof C["rooms"];
export type CampaignRoom<C extends UnknownCampaign> =
  C extends Campaign<infer RoomId> ? RoomJson<PlanetName, RoomId> : never;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
export type SpriteSize = Pick<SpriteFrame, "w" | "h">;
