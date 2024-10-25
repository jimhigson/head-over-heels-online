import { ZxSpectrumRoomColour } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";
import { ItemType, UnknownItem } from "./Item";
import { Simplify } from "type-fest";
import { PlanetName, Wall } from "./sprites/planets";

export const directions = ["away", "towards", "left", "right"] as const;
export type Direction = (typeof directions)[number];

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

  items: UnknownItem<RoomId>[];
};

export type RoomState = Omit<RoomJson<PlanetName, string>, "floorSkip">;

export type EitherCharacterState = {
  lives: number;
  shield: number;
  // if both chars are in same room, will be ===
  roomState: unknown; //RoomState;
};

export type GameState = {
  head: Simplify<
    EitherCharacterState & {
      hasHooter: boolean;
      /** how many big jumps we can do */
      jumps: number;
      donuts: number;
    }
  >;
  heels: Simplify<
    EitherCharacterState & {
      hasBag: boolean;
      /** how many steps we can go fast for */
      fast: number;
      carrying: ItemType;
    }
  >;
};

export type Campaign<RoomId extends string> = {
  startRoom: RoomId;
  rooms: Record<RoomId, RoomJson<PlanetName, RoomId>>;
};

export type UnknownCampaign = Campaign<string>;

export type CampaignRoomId<C extends UnknownCampaign> = string &
  keyof C["rooms"];
export type CampaignRoom<C extends UnknownCampaign> =
  C extends Campaign<infer RoomId> ? RoomJson<PlanetName, RoomId> : never;

export type AnyRoom = RoomJson<PlanetName, string>;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
export type SpriteSize = Pick<SpriteFrame, "w" | "h">;
