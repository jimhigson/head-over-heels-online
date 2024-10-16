import { Assets, Spritesheet, SpritesheetFrameData, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'
import { PlanetName, WallTextureId, SpriteSize, planets } from "../modelTypes";

export const blockSizePx = { w: 16, d: 16, h: 8 /* z is a guess and possibly wrong */ };
export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 55 } as const satisfies SpriteSize;
export const doorTexturePivotX = { x: 0, y: 52 };
export const doorTexturePivotY = { x: 24, y: 52 };

type BackgroundFrame<TPlanet extends PlanetName> = WallTextureId<TPlanet> | `${TPlanet}.floor`;

function* backgroundFramesGenerator<TPlanet extends PlanetName>(planet: TPlanet, startX: number, startY: number): Generator<[BackgroundFrame<TPlanet>, SpritesheetFrameData]> {
    const walls = planets[planet].walls;

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = walls.length;

    let i = 0;
    for (; i < walls.length; i++) {
        yield [`${planet}.wall.${walls[i]}.left`, { frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize } }];
        yield [`${planet}.wall.${walls[i]}.away`, { frame: { x: startX + w * ((n << 1) - i - 1), y: startY - yStep * i, ...wallTileSize } }];
    }

    const lastI = i - 1;
    yield [`${planet}.floor`, { frame: { x: startX + lastI * w, y: startY - lastI * yStep + h + 1, ...floorTileSize } }];
}
const backgroundFrames = <TPlanet extends PlanetName>(planet: TPlanet, startX: number, startY: number): Record<BackgroundFrame<TPlanet>, SpritesheetFrameData> => {
    return Object.fromEntries(backgroundFramesGenerator(planet, startX, startY)) as Record<BackgroundFrame<TPlanet>, SpritesheetFrameData>;
}

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);

export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
    frames: {
        ...backgroundFrames('blacktooth', 487, 335),
        ...backgroundFrames('bookworld', 356, 23),
        ...backgroundFrames('egyptus', 435, 23),
        ...backgroundFrames('jail', 455, 351),
        ...backgroundFrames('market', 378, 244),
        ...backgroundFrames('moonbase', 384, 141),
        ...backgroundFrames('penitentiary', 513, 23),
        ...backgroundFrames('safari', 482, 244),
        'generic.edge.right': {
            frame: { x: 277, y: 146, w: 8, h: 9 }
        },
        'generic.edge.towards': {
            frame: { x: 268, y: 146, w: 8, h: 9 }
        },
        'generic.wall.overdraw': {
            frame: { x: 313, y: 37, w: wallTileSize.w, h: floorTileSize.h * 2 },
        },
        'generic.floor.deadly': {
            frame: { x: 379, y: 444, ...floorTileSize }
        },
        // doors: x=left/right, y=towards/away
        'generic.door.front.x': {
            frame: { x: 227, y: 13, w: 24, h: 56 },
        },
        'generic.door.back.x': {
            frame: { x: 243, y: 5, w: 24, h: 56 }
        },
        'generic.door.front.y': {
            frame: { x: 286, y: 13, w: 24, h: 56 }
        },
        'generic.door.back.y': {
            frame: { x: 270, y: 5, w: 24, h: 56 }
        },
        'moonbase.door.front.x': {
            frame: { x: 344, y: 161, w: 24, h: 56 },
        },
        'moonbase.door.back.x': {
            frame: { x: 360, y: 153, w: 24, h: 56 }
        },
        'moonbase.door.front.y': {
            frame: { x: 528, y: 161, w: 24, h: 56 },
        },
        'moonbase.door.back.y': {
            frame: { x: 512, y: 153, w: 24, h: 56 }
        },
        'items.teleporter': {
            frame: { x: 4, y: 450, w: 32, h: 28 }
        }
    },
    meta: { scale: 1 }
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = 'nearest';

export type TextureId = keyof typeof pixiSpriteSheet['textures'];
