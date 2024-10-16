import { ZxSpectrumColor } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";

export const directions = ['away', 'towards', 'left', 'right'] as const;
export type Direction = (typeof directions)[number];

export type Floor = 'deadly' | 'none' | `${PlanetName}`;

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

export type AllPlanets = typeof planets;
export type Wall<P extends PlanetName> = AllPlanets[P]['walls'][number];

export type AnyWall = Wall<PlanetName>;

export type Door = {
    ordinal: number;
    z: number;
    toRoom: string;
};

export type DoorMap = Partial<Record<Direction, Door>>;

export type Room<P extends PlanetName> = {
    id: string,
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    width: number,
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    depth: number,
    planet: P,
    floor: Floor,
    roomAbove?: string,
    roomBelow?: string,
    walls: {
        left: Wall<P>[],
        away: Wall<P>[],
    },
    zxSpectrumColor: ZxSpectrumColor,
    // for now, can only have one room per direction - this seems to work with the original game
    // levels but could be expanded to support multiple
    doors: DoorMap
    items: Item[];
}

type itemLocation = { x: number, y: number, z: number }

export type Teleporter = itemLocation & {
    type: 'teleporter',
    toRoom: string
}

export type Barrier = itemLocation & {
    type: 'barrier',
    alongAxis: 'x' | 'y'
}

export type Item = Teleporter | Barrier; // or others!

export type AnyRoom = Room<PlanetName>


export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

export type WallTextureId<P extends PlanetName, W extends Wall<P> = Wall<P>> = `${P}.wall.${W}.${'left' | 'away'}`;

export const wallTextureId = <P extends PlanetName, W extends Wall<P>>(planet: P, wallName: Wall<P>, side: 'left' | 'away') =>
    `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;