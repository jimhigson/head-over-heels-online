import { Assets, Spritesheet, SpritesheetFrameData, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'
import { Planet, wallTypes, WallTextureId, SpriteSize } from "../modelTypes";

export const blockSizePx = { w: 16, d: 16, h: 8 /* z is a guess and possibly wrong */ };
export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 55 } as const satisfies SpriteSize;
export const doorTexturePivotX = { x: 0, y: 52 };
export const doorTexturePivotY = { x: 24, y: 52 };

type BackgroundFrame<TPlanet extends Planet> = WallTextureId<TPlanet> | `${TPlanet}.floor`;

function* backgroundFramesGenerator<TPlanet extends Planet>(planet: TPlanet, startX: number, startY: number): Generator<[BackgroundFrame<TPlanet>, SpritesheetFrameData]> {
    const wallNames = wallTypes[planet];

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = wallNames.length;

    let i = 0;
    for (; i < wallNames.length; i++) {
        yield [`${planet}.wall.${wallNames[i]}.left`, { frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize } }];
        yield [`${planet}.wall.${wallNames[i]}.away`, { frame: { x: startX + w * ((n << 1) - i - 1), y: startY - yStep * i, ...wallTileSize } }];
    }

    const lastI = i - 1;
    yield [`${planet}.floor`, { frame: { x: startX + lastI * w, y: startY - lastI * yStep + h + 1, ...floorTileSize } }];
}
const backgroundFrames = <TPlanet extends Planet>(planet: TPlanet, startX: number, startY: number): Record<BackgroundFrame<TPlanet>, SpritesheetFrameData> => {
    return Object.fromEntries(backgroundFramesGenerator(planet, startX, startY)) as Record<BackgroundFrame<TPlanet>, SpritesheetFrameData>;
}

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);

export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
    frames: {
        ...backgroundFrames('blacktooth', 316, 124),
        ...backgroundFrames('bookworld', 356, 23),
        ...backgroundFrames('egyptus', 435, 23),
        ...backgroundFrames('penitentiary', 513, 23),
        ...backgroundFrames('moonbase', 459, 124),
        ...backgroundFrames('market', 384, 210),
        ...backgroundFrames('safari', 488, 210),
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
            frame: { x: 381, y: 424, ...floorTileSize }
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
        }
    },
    meta: { scale: 1 }
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = 'nearest';

export type TextureId = keyof typeof pixiSpriteSheet['textures'];
