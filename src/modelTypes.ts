import { ZxSpectrumColor } from "./originalGame";
import { SpritesheetFrameData } from "pixi.js";

export const directions = ['away', 'towards', 'left', 'right'] as const;
export type Direction = (typeof directions)[number];
export const planets = ['blacktooth', 'moonbase', 'market', 'bookworld', 'penitentiary', 'safari', 'egyptus'] as const;
export type Planet = (typeof planets)[number]

type FloorType = 'normal' | 'deadly' | 'none';

export const wallTypes = {
    blacktooth: ['plain', 'shield', 'armour', 'window'],
    bookworld: ['person', 'book'],
    egyptus: ['sarcophagus', 'hieroglyphics'],
    market: ['passage', 'fruits', 'more-fruits'],
    moonbase: ['window1', 'window2', 'window3', 'coil'],
    penitentiary: ['loop', 'skeleton'],
    safari: ['window', 'shield', 'wall']
} as const satisfies { [P in Planet]: string[] };

export type AllWallTypes = typeof wallTypes;
export type WallType<P extends Planet> = AllWallTypes[P][number];

export type Room<P extends Planet> = {
    id: string,
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    blockWidth: number,
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    blockDepth: number,
    planet: P,
    floorType: FloorType,
    roomAbove?: Room<P>,
    roomBelow?: Room<P>,
    walls: {
        l: WallType<P>[],
        r: WallType<P>[],
    },
    zxSpectrumColor: ZxSpectrumColor,
}

export type AnyRoom = Room<Planet>


export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

export const blockSizePx = { w: 16, d: 16, h: 8 /* z is a guess and possibly wrong */ };
export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 55 } as const satisfies SpriteSize;

export type WallTextureId<P extends Planet, W extends WallType<P>> = `${P}.wall.${W}.${'l' | 'r'}`;

export const wallTextureId = <P extends Planet, W extends WallType<P>>(planet: P, wallName: WallType<P>, side: 'l' | 'r') =>
    `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;