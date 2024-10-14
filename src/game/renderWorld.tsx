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

function* renderFloorTiles(room: AnyRoom): Generator<Sprite, undefined, undefined> {
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

                yield spriteAtBlock(ix, iy, floorTexture, { x: 0.5, y: 1 });
            }
        }
    }
}

function* renderFloorEdges(room: AnyRoom): Generator<Sprite, undefined, undefined> {

    const hasDoorTowards = !!room.doors.towards;
    const hasDoorRight = !!room.doors.right;

    // sprites for floor edge along x-axis (left side of screen):
    // note - we draw one more than needed (<=) to cover rooms with doors and obscure a bit more
    // floor over-draw
    const lStart = hasDoorRight ? -0.5 : 0;
    const lEnd = room.blockWidth - 0.5;// += hasDoorRight ? 0.5 : 0;
    for (let ix = lStart; ix <= lEnd; ix += 0.5) {
        yield spriteAtBlock(ix, hasDoorTowards ? -0.5 : 0, 'generic.edge.towards', undefined, { x: 7, y: 1 });
    }
    // sprites for floor edge towards us along y-axis (right side of screen):
    // note - we draw one more than needed (<=) to cover rooms with doors and obscure a bit more
    // floor over-draw    
    const tFirst = hasDoorTowards ? -0.5 : 0;
    const tLast = room.blockDepth;
    for (let iy = tFirst; iy <= tLast; iy += 0.5) {
        yield spriteAtBlock(hasDoorRight ? -0.5 : 0, iy, 'generic.edge.right', undefined, { x: 0, y: 1 });
    }
}

function* renderWalls(room: AnyRoom): Generator<Sprite, undefined, undefined> {
    // TODO: skip walls where there are doors:

    // sprites for wall on x-axis (left wall):
    for (let iy = 0; iy < room.blockDepth; iy++) {
        const textureId = wallTextureId(room.planet, room.walls.left[iy], 'left') as TextureId;
        yield spriteAtBlock(room.blockWidth, iy, textureId, { x: 0, y: 1 });
    }

    // sprites for wall on y-axis (right wall):
    for (let ix = 0; ix < room.blockWidth; ix++) {
        const textureId = wallTextureId(room.planet, room.walls.away[ix], 'away') as TextureId;
        yield spriteAtBlock(ix, room.blockDepth, textureId, { x: 1, y: 1 });
    }
}


function* renderDoors(room: AnyRoom): Generator<Sprite, undefined, undefined> {
    // TODO: backs and fronts need to be rendered with content in-between
    const doorHandle = { x: 0, y: 52 };
    if (room.doors.right) {
        yield spriteAtBlock(0, room.doors.right.ordinal, 'generic.door.front.leftRight', undefined, doorHandle);
        yield spriteAtBlock(0, room.doors.right.ordinal + 1, 'generic.door.back.leftRight', undefined, doorHandle);
    }
}

function* renderBackground(room: AnyRoom): Generator<Sprite, undefined, undefined> {
    yield* renderFloorTiles(room);
    yield* renderFloorEdges(room);
    yield* renderWalls(room);
    yield* renderDoors(room);
}

const renderRoom = async <P extends Planet>(room: Room<P>) => {

    // NB: floor could be a tiling sprite and a graphics map:
    //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
    //  * https://pixijs.com/8.x/examples/masks/graphics

    const roomContainer = new Container();

    for (const sprite of renderBackground(room)) {
        roomContainer.addChild(sprite);
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
    const hasDoorTowards = !!room.doors.towards;
    const hasDoorRight = !!room.doors.right;
    const rightSide = xyzBlockPosition(0, room.blockDepth + (hasDoorRight ? 0.5 : 0)).x;
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