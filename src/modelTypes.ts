import { ZxSpectrumColor } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";

export const directions = ['away', 'towards', 'left', 'right'] as const;
export type Direction = (typeof directions)[number];

type FloorType = 'deadly' | 'none' | `${PlanetName}`;

export const planets = {
    jail: { walls: ['bars'] },
    blacktooth: { walls: ['plain', 'shield', 'armour'] },
    bookworld: { walls: ['person', 'book'] },
    egyptus: { walls: ['sarcophagus', 'hieroglyphics'] },
    market: { walls: ['passage', 'fruits', 'more-fruits'] },
    moonbase: { walls: ['window1', 'window2', 'window3', 'coil'] },
    penitentiary: { walls: ['loop', 'skeleton'] },
    safari: { walls: ['window', 'shield', 'wall'] }
} as const satisfies Record<string, { walls: string[]; }>;

export type PlanetName = keyof (typeof planets);

export type AllPlanets = typeof planets;
export type WallType<P extends PlanetName> = AllPlanets[P]['walls'][number];

export type Room<P extends PlanetName> = {
    id: string,
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    blockWidth: number,
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    blockDepth: number,
    planet: P,
    floorType: FloorType,
    aboveRoomId?: string,
    belowRoomId?: string,
    walls: {
        left: WallType<P>[],
        away: WallType<P>[],
    },
    zxSpectrumColor: ZxSpectrumColor,
    // for now, can only have one room per direction - this seems to work with the original game
    // levels but could be expanded to support multiple
    doors: Partial<Record<Direction, { ordinal: number, toRoomId: string }>>
}

export type AnyRoom = Room<PlanetName>


export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

export type WallTextureId<P extends PlanetName, W extends WallType<P> = WallType<P>> = `${P}.wall.${W}.${'left' | 'away'}`;

export const wallTextureId = <P extends PlanetName, W extends WallType<P>>(planet: P, wallName: WallType<P>, side: 'left' | 'away') =>
    `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;