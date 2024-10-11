import { Assets, Spritesheet, SpritesheetFrameData, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'
import { wallTileSize } from "./spriteFrames";
import { Planet } from "../modelTypes";

type BackgroundFrame<TPlanet extends Planet, TWallname extends string> = `${TPlanet}.wall.${TWallname}.${'l' | 'r'}` | `${TPlanet}.floor`;

function* backgroundFramesGenerator<TPlanet extends Planet, TWallname extends string>(planet: TPlanet, wallNames: TWallname[], startX: number, startY: number): Generator<[BackgroundFrame<TPlanet, TWallname>, SpritesheetFrameData]> {
    const { w, h } = wallTileSize;
    const yStep = w / 2;
    const n = wallNames.length;

    for (let i = 0; i < wallNames.length; i++) {
        yield [`${planet}.wall.${wallNames[i]}.l`, { frame: { x: startX + w * i, y: startY - yStep * i, w, h } }];
    }

    const lastI = n - 1;
    yield [`${planet}.floor`, { frame: { x: startX + lastI * w, y: startY - lastI * yStep + h + 1, w: 32, h: 16 } }];

    wallNames.reverse();
    const topY = startY - yStep * (n - 1);

    for (let i = 0; i < wallNames.length; i++) {
        yield [`${planet}.wall.${wallNames[i]}.r`, { frame: { x: startX + (w * (i + n)), y: topY + yStep * i, w, h } }];
    }
}
const backgroundFrames = <TPlanet extends Planet, TWallname extends string>(planet: TPlanet, wallNames: TWallname[], startX: number, startY: number): Record<BackgroundFrame<TPlanet, TWallname>, SpritesheetFrameData> => {
    return Object.fromEntries(backgroundFramesGenerator(planet, wallNames, startX, startY)) as Record<BackgroundFrame<TPlanet, TWallname>, SpritesheetFrameData>;
}

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);

export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
    frames: {
        ...backgroundFrames('blacktooth', ['plain', 'shield', 'armour', 'window'], 316, 124),
        'generic.edge.r': {
            frame: { x: 285, y: 146, w: 16, h: 32 }
        },
        'generic.edge.l': {
            frame: { x: 268, y: 146, w: 16, h: 32 }
        }
    },
    meta: { scale: 1 }
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = 'nearest';

export type TextureId = keyof typeof pixiSpriteSheet['textures'];

export const blacktoothWallTextureIdsL = ['blacktooth.wall.armour.l', "blacktooth.wall.plain.l", "blacktooth.wall.shield.l", "blacktooth.wall.window.l"] as const satisfies TextureId[];
export const blacktoothWallTextureIdsR = ['blacktooth.wall.armour.r', "blacktooth.wall.plain.r", "blacktooth.wall.shield.r", "blacktooth.wall.window.r"] as const satisfies TextureId[];