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

export type AnyRoom = Room<Planet>


export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

export type WallTextureId<P extends Planet, W extends WallType<P> = WallType<P>> = `${P}.wall.${W}.${'left' | 'away'}`;

export const wallTextureId = <P extends Planet, W extends WallType<P>>(planet: P, wallName: WallType<P>, side: 'left' | 'away') =>
    `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;