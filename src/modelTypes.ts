import { OriginalCampaignRoomId } from "./originalCampaign";
import { ZxSpectrumRoomColour } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";
import { TestCampaignRoomId } from "./testCampaign";
import { Item } from "./Item";

export const directions = ['away', 'towards', 'left', 'right'] as const;
export type Direction = (typeof directions)[number];

export type Floor = 'deadly' | 'none' | `${PlanetName}`;

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
    jail: { walls: ['bars'] },
    blacktooth: { walls: ['armour', 'shield', 'plain'] },
    bookworld: { walls: ['person', 'book'] },
    egyptus: { walls: ['sarcophagus', 'hieroglyphics'] },
    market: { walls: ['passage', 'fruits', 'more-fruits'] },
    moonbase: { walls: ['window1', 'window2', 'window3', 'coil'] },
    penitentiary: { walls: ['loop', 'skeleton'] },
    safari: { walls: ['window', 'shield', 'wall'] }
} as const satisfies Record<string, { walls: string[]; }>;

export type PlanetName = keyof (typeof planets);
export const planetNames = Object.keys(planets) as PlanetName[];

export type AllPlanets = typeof planets;
export type Wall<P extends PlanetName> = AllPlanets[P]['walls'][number];

export type AnyWall = Wall<PlanetName>;

export type Door<RoomIds extends string> = {
    ordinal: number;
    z: number;
    toRoom: RoomIds;
};

export type DoorMap<RoomIds extends string> = Partial<Record<Direction, Door<RoomIds>>>;

/* which graphics to use for all the walls in a room? */
export type RoomWalls<P extends PlanetName> = {
    left: Wall<P>[];
    away: Wall<P>[];
};

export type Room<P extends PlanetName, RoomIds extends string> = {
    id: RoomIds,
    size: {
        /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
        x: number,
        /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
        y: number,
    }
    planet: P,
    floor: Floor,
    roomAbove?: RoomIds,
    roomBelow?: RoomIds,
    walls: RoomWalls<P>,
    // the color the room was shown in in the zx spectrum original game. This is used to provide highlight
    // colours in each room
    color: ZxSpectrumRoomColour,
    // for now, can only have one room per direction - this seems to work with the original game
    // levels but could be expanded to support multiple
    doors: DoorMap<RoomIds>
    items: Item[];
}

export type Campaign<RoomIds extends string> = Record<RoomIds, Room<PlanetName, RoomIds>>

export type AnyRoom = Room<PlanetName, string>

export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

export type WallTextureId<P extends PlanetName, W extends Wall<P> = Wall<P>> = `${P}.wall.${W}.${'left' | 'away'}`;

export const wallTextureId = <P extends PlanetName, W extends Wall<P>>(planet: P, wallName: Wall<P>, side: 'left' | 'away') =>
    `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;


export type RoomId = OriginalCampaignRoomId | TestCampaignRoomId;