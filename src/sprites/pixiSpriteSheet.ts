import { Assets, Spritesheet, type Texture } from "pixi.js"
import spritesheetUrl from '../../gfx/sprites.png'

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
const spritesTexture = await Assets.load<Texture>(spritesheetUrl);
export const pixiSpriteSheet = new Spritesheet(spritesTexture, {
    frames: {
        'blacktooth.floor': {
            frame: { x: 364, y: 156, w: 32, h: 16 }
            //frame: { x: 0, y: 0, w: 100, h: 100 }
        },
        'blacktooth.wall.plain.l': {
            frame: { x: 316, y: 124, w: 16, h: 55 }
        },
        'blacktooth.wall.plain.r': {
            frame: { x: 428, y: 124, w: 16, h: 55 }
        },
        'generic.edge.r': {
            frame: { x: 285, y: 146, w: 16, h: 24 }
        },
        'generic.edge.l': {
            frame: { x: 268, y: 146, w: 16, h: 24 }
        }
    },
    meta: { scale: 1 }
});

await pixiSpriteSheet.parse();
pixiSpriteSheet.textureSource.scaleMode = 'nearest';