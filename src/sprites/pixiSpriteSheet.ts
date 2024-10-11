import { Assets, Spritesheet, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'
import { wallTileSize } from "./spriteFrames";

//Object.entries(spriteFrames.background);

/*const backgroundFrames = {};

const pixiSpriteSheetData: SpritesheetData = {
    frames: {
        ...backgroundFrames
    },
    meta: {
        scale: 1
    }
};
*/

const blacktoothWalls = () => {
    let x = 316;
    let y = 124;
    const { w, h } = wallTileSize;

    return {
        'blacktooth.wall.plain.l': {
            frame: { x: x, y: 124, w, h }
        },
        'blacktooth.wall.shield.l': {
            frame: {
                x: x += w, y: y -= (w / 2), w, h
            }
        },
        'blacktooth.wall.armour.l': {
            frame: { x: x += w, y: y -= (w / 2), w, h }
        },
        'blacktooth.wall.window.l': {
            frame: { x: x += w, y: y -= (w / 2), w, h }
        },
        'blacktooth.wall.window.r': {
            frame: { x: x += w, y: y, w, h }
        },
        'blacktooth.wall.armour.r': {
            frame: {
                x: x += w, y: y += (w / 2), w, h
            }
        },
        'blacktooth.wall.shield.r': {
            frame: { x: x += w, y: y += (w / 2), w, h }
        },
        'blacktooth.wall.plain.r': {
            frame: { x: x += w, y: y += (w / 2), w, h }
        }
    };
}

const spritesTexture = await Assets.load<Texture>(spritesheetUrl);
export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
    frames: {
        'blacktooth.floor': {
            frame: { x: 364, y: 156, w: 32, h: 16 }
            //frame: { x: 0, y: 0, w: 100, h: 100 }
        },
        ...blacktoothWalls(),
        'blacktooth.wall.plain.r': {
            frame: { x: 428, y: 124, w: 16, h: 55 }
        },
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