import { Assets, Spritesheet, SpritesheetData } from "pixi.js"
import { spriteFrames } from "./SpriteFrames";


Object.entries(spriteFrames.background);

const backgroundFrames = {};

const pixiSpriteSheetData: SpritesheetData = {
    frames: {
        ...backgroundFrames
    },
    meta: {
        scale: 1
    }
};

const spritesTexture = await Assets.load('gfx/sprites-fs8.png');
export const pixiSpriteSheet = new Spritesheet(spritesTexture, pixiSpriteSheetData);

