import { ZxSpectrumRoomColour } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";
import { ItemType, UnknownItem } from "./Item";
import { Simplify } from "type-fest";
import { PlanetName, Wall } from "./sprites/planets";
import { KeyAssignment } from "./game/input/listenForInput";

export const directions = ["away", "towards", "left", "right"] as const;
export type Direction = (typeof directions)[number];

export type PlayableCharacter = "head" | "heels";

export type Floor = "deadly" | "none" | `${PlanetName}`;

export type Xy = {
  x: number;
  y: number;
};

export const crossAxis = (axis: Axis): Axis => (axis === "x" ? "y" : "x");

export const addXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy =>
  xys.reduce<Xy>(
    (ac, xyi) => ({
      x: ac.x + (xyi.x ?? 0),
      y: ac.y + (xyi.y ?? 0),
    }),
    xy,
  );

export type Xyz = {
  x: number;
  y: number;
  z: number;
};
export type XyMaybeZ = {
  x: number;
  y: number;
  z?: number;
};
export type Axis = "x" | "y";

export type AnyWall = Wall<PlanetName>;

/* which graphics to use for all the walls in a room? */
export type RoomWalls<P extends PlanetName> = {
  left: Wall<P>[];
  away: Wall<P>[];
};

/**
 * serialisation format of a room to be stored in while not in play
 */
export type RoomJson<P extends PlanetName, RoomId extends string> = {
  id: RoomId;
  size: {
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    x: number;
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    y: number;
  };
  planet: P;
  floor: Floor;
  floorSkip: Xy[];
  roomAbove?: RoomId;
  roomBelow?: RoomId;
  walls: RoomWalls<P>;
  // the color the room was shown in in the zx spectrum original game. This is used to provide highlight
  // colours in each room
  color: ZxSpectrumRoomColour;

  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: Record<string, UnknownItem<RoomId>>;
};
export type AnyRoomJson = RoomJson<PlanetName, string>;

/**
 * Representation of a room in-play. This is in memory only for the current
 * one or two rooms (that head and heels are in, but they could be in the same
 * room)
 */
export type LoadedRoom<P extends PlanetName, RoomId extends string> = Simplify<
  Omit<RoomJson<P, RoomId>, "items"> & {
    items: UnknownItem<RoomId>[];
  }
>;
export type AnyLoadedRoom = LoadedRoom<PlanetName, string>;

export type EitherCharacterState<RoomId extends string> = {
  lives: number;
  shield: number;
  // if both chars are in same room, will be ===
  roomState: LoadedRoom<PlanetName, RoomId>;
};

export type GameState<RoomId extends string> = {
  keyAssignment: KeyAssignment;
  currentCharacter: PlayableCharacter;

  head: Simplify<
    EitherCharacterState<RoomId> & {
      hasHooter: boolean;
      /** how many big jumps we can do */
      jumps: number;
      donuts: number;
    }
  >;
  heels: Simplify<
    EitherCharacterState<RoomId> & {
      hasBag: boolean;
      /** how many steps we can go fast for */
      fast: number;
      carrying: ItemType | null;
    }
  >;
};

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
