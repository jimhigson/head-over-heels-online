import { Assets, Spritesheet, SpritesheetFrameData, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'
import { Planet, wallTypes, WallType, wallTileSize, floorTileSize } from "../modelTypes";

type BackgroundFrame<TPlanet extends Planet> = `${TPlanet}.wall.${WallType<TPlanet>}.${'l' | 'r'}` | `${TPlanet}.floor`;

function* backgroundFramesGenerator<TPlanet extends Planet>(planet: TPlanet, startX: number, startY: number): Generator<[BackgroundFrame<TPlanet>, SpritesheetFrameData]> {
    const wallNames = wallTypes[planet];

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = wallNames.length;

    let i = 0;
    for (; i < wallNames.length; i++) {
        yield [`${planet}.wall.${wallNames[i]}.l`, { frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize } }];
        yield [`${planet}.wall.${wallNames[i]}.r`, { frame: { x: startX + w * ((n << 1) - i - 1), y: startY - yStep * i, ...wallTileSize } }];
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
        'generic.edge.r': {
            frame: { x: 285, y: 146, w: 16, h: 32 }
        },
        'generic.edge.l': {
            frame: { x: 268, y: 146, w: 16, h: 32 }
        },
        'generic.floor.deadly': {
            frame: { x: 341, y: 424, ...floorTileSize }
        }
    },
    meta: { scale: 1 }
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = 'nearest';

export type TextureId = keyof typeof pixiSpriteSheet['textures'];
