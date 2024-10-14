import { Application, Container, Graphics, PointData, Sprite } from 'pixi.js';
import { AnyRoom, blockSizePx, Planet, Room, wallTextureId } from '../modelTypes';
import { zxSpectrumResolution } from '../originalGame';
import { pixiSpriteSheet, type TextureId } from '../sprites/pixiSpriteSheet';

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

const renderRoom = async <P extends Planet>(room: Room<P>) => {

    // NB: floor could be a tiling sprite and a graphics map:
    //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
    //  * https://pixijs.com/8.x/examples/masks/graphics

    const roomContainer = new Container();

    // sprites for floor tiles:
    if (room.floorType !== 'none') {
        const floorTexture: TextureId = room.floorType === 'deadly' ? 'generic.floor.deadly' : `${room.planet}.floor`;

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

                roomContainer.addChild(spriteAtBlock(ix, iy, floorTexture, { x: 0.5, y: 1 }));
            }
        }
    }

    // sprites for floor edge on x-axis (left side of screen):
    // note - we draw one more than needed (<=) to cover rooms with doors and obscure a bit more
    // floor over-draw
    for (let ix = 0; ix <= room.blockWidth; ix++) {
        roomContainer.addChild(spriteAtBlock(ix, 0, 'generic.edge.l', undefined, { x: 15, y: 5 }));
    }
    // sprites for floor edge on y-axis (left side of screen):
    // note - we draw one more than needed (<=) to cover rooms with doors and obscure a bit more
    // floor over-draw    
    for (let iy = 0; iy <= room.blockDepth; iy++) {
        roomContainer.addChild(spriteAtBlock(0, iy, 'generic.edge.r', undefined, { x: -1, y: 5 }));
    }

    // sprites for wall on x-axis (left wall):
    for (let iy = 0; iy < room.blockDepth; iy++) {
        const textureId: TextureId = wallTextureId(room.planet, room.walls.l[iy], 'l') as TextureId;
        console.log(textureId);
        roomContainer.addChild(spriteAtBlock(room.blockWidth, iy, textureId, { x: 0, y: 1 }));
    }

    // sprites for wall on y-axis (right wall):
    for (let ix = 0; ix < room.blockWidth; ix++) {
        const textureId = `${room.planet}.wall.${room.walls.r[ix]}.r` as TextureId;
        roomContainer.addChild(spriteAtBlock(ix, room.blockDepth, textureId, { x: 1, y: 1 }));
    }

    return roomContainer;
};

export const renderWorld = async (app: Application, room: AnyRoom) => {
    console.log('rendering room', room);

    // TODO: render a bit extra for any side with a door (to go under the door - about half a block)

    const worldContainer = new Container();

    // move origin to centre of screen 
    // TODO: change depending on geometry of current room
    worldContainer.x = zxSpectrumResolution.width / 2;
    worldContainer.y = zxSpectrumResolution.height * 0.75;

    // Create a graphics object to define our mask
    const rightSide = xyzBlockPosition(0, room.blockDepth).x;
    const leftSide = xyzBlockPosition(room.blockWidth, 0).x;

    const mask = new Graphics()
        // Add the rectangular area to show
        .rect(leftSide, -worldContainer.y, rightSide - leftSide, zxSpectrumResolution.height)
        .fill(0xff0000);

    worldContainer.addChild(mask);
    worldContainer.mask = mask;

    const roomContainer = await renderRoom(room);
    worldContainer.addChild(roomContainer);

    app.stage.addChild(worldContainer);

    return () => {
        app.stage.removeChild(roomContainer);
    }
};