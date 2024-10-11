import { Application, Assets, Container, Graphics, PointData, Sprite, type Texture } from 'pixi.js';
import { Room } from '../modelTypes';
import { blockSizePx, floorTileSize } from '../sprites/spriteFrames';
import { zxSpectrumResolution } from '../originalGame';
import { blacktoothWallTextureIdsL, blacktoothWallTextureIdsR, pixiSpriteSheet, type TextureId } from '../sprites/pixiSpriteSheet';

const xyzPosition = (x: number, y: number, z: number = 0) => {
    return { x: y - x, y: -(x + y) / 2 - z };
}
const xyzBlockPosition = (xBlock: number, yBlock: number, zBlock: number = 0) => {
    const x = xBlock * blockSizePx.w;
    const y = yBlock * blockSizePx.d;
    const z = zBlock * blockSizePx.h;

    return xyzPosition(x, y, z);
}

const spriteAtBlock = (xBlock: number, yBlock: number, textureId: TextureId, anchor?: PointData, pivot?: PointData): Sprite => {
    const sprite = new Sprite(pixiSpriteSheet.textures[textureId]);
    if (anchor !== undefined)
        sprite.anchor = anchor;
    if (pivot !== undefined)
        sprite.pivot = pivot;

    const pos = xyzPosition(xBlock * blockSizePx.w, yBlock * blockSizePx.d, 0);

    sprite.x = pos.x;
    sprite.y = pos.y;

    sprite.eventMode = 'static';
    sprite.on('click', () => { console.log(`tile (xB=${xBlock}) (yB=${yBlock}) xpx=${pos.x} ypx=${pos.y} tex=${textureId}`) });

    return sprite;
}

const renderRoom = async (app: Application, room: Room) => {

    // NB: floor could be a tiling sprite and a graphics map:
    //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
    //  * https://pixijs.com/8.x/examples/masks/graphics

    const roomContainer = new Container();

    // sprites for floor tiles:
    for (let ix = -1; ix <= room.blockWidth; ix++) {
        for (let iy = -1; iy <= room.blockDepth; iy++) {
            // each sprite covers enough graphics for 2 blocks. we only need to
            // render a sprite for the 'white' squares on the chessboard (render or
            // not according to a checkerboard pattern)
            if ((ix % 2 === 0) !== (iy % 2 === 0))
                continue;

            if (ix === room.blockWidth && iy === -1)
                continue;

            if (ix === -1 && iy === room.blockDepth)
                continue;

            roomContainer.addChild(spriteAtBlock(ix, iy, 'blacktooth.floor', { x: 0.5, y: 1 }));
        }
    }

    // sprites for floor edge on x-axis:


    for (let ix = 0; ix < room.blockWidth; ix++) {
        roomContainer.addChild(spriteAtBlock(ix, 0, 'generic.edge.l', undefined, { x: 16, y: 9 }));
    }
    // sprites for floor edge on y-axis:
    for (let iy = 0; iy < room.blockDepth; iy++) {
        roomContainer.addChild(spriteAtBlock(0, iy, 'generic.edge.r', undefined, { x: 0, y: 9 }));
    }

    // sprites for wall edge on x-axis (left wall):
    for (let iy = 0; iy < room.blockDepth; iy++) {
        const textureId = blacktoothWallTextureIdsL[iy % 4];
        roomContainer.addChild(spriteAtBlock(room.blockWidth, iy, textureId, { x: 0, y: 1 }));
    }

    // sprites for wall edge on y-axis (right wall):
    for (let ix = 0; ix < room.blockWidth; ix++) {
        const textureId = blacktoothWallTextureIdsR[ix % 4];
        roomContainer.addChild(spriteAtBlock(ix, room.blockDepth, textureId, { x: 1, y: 1 }));
    }


    return roomContainer;
};

export const renderWorld = async (app: Application, room: Room) => {
    // doesn't work:
    //TexturePool.textureOptions.scaleMode = 'nearest';

    // TODO: render a bit extra for any side with a door (to go under the door - about half a block)

    //const wallsContainer = new Container();

    const worldContainer = new Container();

    // Create a graphics object to define our mask
    const rightSide = xyzBlockPosition(0, room.blockDepth).x;
    const leftSide = xyzBlockPosition(room.blockWidth, 0).x;
    console.log(leftSide);
    const mask = new Graphics()
        // Add the rectangular area to show
        .rect(leftSide, -zxSpectrumResolution.height, rightSide - leftSide, zxSpectrumResolution.height)
        .fill(0xffffff);

    worldContainer.addChild(mask);
    worldContainer.mask = mask;

    // move origin to centre of screen
    worldContainer.x = zxSpectrumResolution.width / 2;
    worldContainer.y = zxSpectrumResolution.height * 0.75;

    const roomContainer = await renderRoom(app, room);
    worldContainer.addChild(roomContainer);

    app.stage.addChild(worldContainer);
    //app.stage.addChild(wallsContainer);

    return () => {
        app.stage.removeChild(roomContainer);
        //app.stage.removeChild(wallsContainer);
    }
};