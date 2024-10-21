import { ZxSpectrumRoomColour } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";
import { TestCampaignRoomId } from "./testCampaign";
import { ItemType, UnknownItem } from "./Item";
import { Simplify } from "type-fest";
import { OriginalCampaignRoomId } from "./_generated/originalCampaign/campaign";

export const directions = ["away", "towards", "left", "right"] as const;
export type Direction = (typeof directions)[number];

export type Floor = "deadly" | "none" | `${PlanetName}`;

export type Xy = {
  x: number;
  y: number;
};
export type Xyz = {
  x: number;
  y: number;
  z: number;
};

export const planets = {
  jail: { walls: ["bars"] },
  blacktooth: { walls: ["armour", "shield", "plain"] },
  bookworld: { walls: ["person", "book"] },
  egyptus: { walls: ["sarcophagus", "hieroglyphics"] },
  market: { walls: ["passage", "fruits", "more-fruits"] },
  moonbase: { walls: ["window1", "window2", "window3", "coil"] },
  penitentiary: { walls: ["loop", "skeleton"] },
  safari: { walls: ["window", "shield", "wall"] },
} as const satisfies Record<string, { walls: string[] }>;

export type PlanetName = keyof typeof planets;
export const planetNames = Object.keys(planets) as PlanetName[];

export type AllPlanets = typeof planets;
export type Wall<P extends PlanetName> =
  | AllPlanets[P]["walls"][number]
  /**
   * none means render nothing in this space - if this is a mistake in the xml,
   * overide it with jsonpatch
   */
  | "none";

export type AnyWall = Wall<PlanetName>;

export type Door<RoomIds extends string> = {
  ordinal: number;
  z: number;
  toRoom: RoomIds;
};

export type DoorMap<RoomIds extends string> = Partial<
  Record<Direction, Door<RoomIds>>
>;

/* which graphics to use for all the walls in a room? */
export type RoomWalls<P extends PlanetName> = {
  left: Wall<P>[];
  away: Wall<P>[];
};

export type RoomJson<P extends PlanetName, RoomIds extends string> = {
  id: RoomIds;
  size: {
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    x: number;
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    y: number;
  };
  planet: P;
  floor: Floor;
  roomAbove?: RoomIds;
  roomBelow?: RoomIds;
  walls: RoomWalls<P>;
  // the color the room was shown in in the zx spectrum original game. This is used to provide highlight
  // colours in each room
  color: ZxSpectrumRoomColour;
  // for now, can only have one room per direction - this seems to work with the original game
  // levels but could be expanded to support multiple
  doors: DoorMap<RoomIds>;
  items: UnknownItem[];
};

export type RoomState = {
  items: UnknownItem[];
};

export type EitherCharacterState = {
  lives: number;
  shield: number;
  // if both chars are in same room, will be ===
  roomState: RoomState;
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

export type Campaign<RoomIds extends string> = Record<
  RoomIds,
  RoomJson<PlanetName, RoomIds>
>;

export type AnyRoom = RoomJson<PlanetName, string>;

export type SpriteFrame = SpritesheetFrameData["frame"];
export type SpritePosition = Pick<SpriteFrame, "x" | "y">;
export type SpriteSize = Pick<SpriteFrame, "w" | "h">;

export type WallTextureId<
  P extends PlanetName,
  W extends Wall<P> = Wall<P>,
> = `${P}.wall.${W}.${"left" | "away"}`;

export const wallTextureId = <P extends PlanetName, W extends Wall<P>>(
  planet: P,
  wallName: Wall<P>,
  side: "left" | "away",
) => `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;

export type RoomId = OriginalCampaignRoomId | TestCampaignRoomId;
