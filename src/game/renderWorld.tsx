import { Application, Container, Graphics, PointData, Sprite, TilingSprite, ViewContainer } from 'pixi.js';
import { AnyRoom, Planet, Room, wallTextureId } from '../modelTypes';
import { zxSpectrumResolution } from '../originalGame';
import { blockSizePx, doorTexturePivotX, doorTexturePivotY, floorTileSize, pixiSpriteSheet, type TextureId } from '../sprites/pixiSpriteSheet';

/* position on 2d screen for a given xyz in game-space 3d pixels */
const xyzPosition = (x: number, y: number, z: number = 0) => {
    return { x: y - x, y: -(x + y) / 2 - z };
}
const xyzBlockPosition = (xBlock: number, yBlock: number, zBlock: number = 0): PointData => {
    const x = xBlock * blockSizePx.w;
    const y = yBlock * blockSizePx.d;
    const z = zBlock * blockSizePx.h;

    return xyzPosition(x, y, z);
}

type SpriteAtBlockOptions = {
    anchor?: PointData;
    pivot?: PointData;
    flipX?: true;
};
const spriteAtBlock = (xBlock: number, yBlock: number, textureId: TextureId, { anchor, flipX, pivot }: SpriteAtBlockOptions): Sprite => {
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

    if (flipX === true) {
        sprite.scale.x = -1;
    }

    return sprite;
}

function* renderFloorTiles(room: AnyRoom): Generator<Container, undefined, undefined> {

    if (room.floorType === 'none') {
        return;
    }

    const hasDoorTowards = !!room.doors.towards;
    const hasDoorRight = !!room.doors.right;

    const blockXMin = room.doors.right ? -0.5 : 0;
    const blockXMax = room.blockWidth + (room.doors.left ? 0.5 : 0);
    const blockYMin = room.doors.towards ? -0.5 : 0;
    const blockYMax = room.blockDepth + (room.doors.towards ? 0.5 : 0);

    const rightSide = xyzBlockPosition(blockXMin, blockYMax);
    const leftSide = xyzBlockPosition(blockXMax, blockYMin);
    const frontSide = xyzBlockPosition(blockXMin, blockYMin); // aka the origin
    const backSide = xyzBlockPosition(blockXMax, blockYMax); // aka the origin

    const floorTileTexture: TextureId = room.floorType === 'deadly' ? 'generic.floor.deadly' : `${room.planet}.floor`;

    const floorContainer = new Container();
    const tilesContainer = new Container();

    for (let ix = - 1; ix <= room.blockWidth; ix++) {
        for (let iy = -1; iy <= room.blockDepth; iy++) {
            // each sprite covers enough graphics for 2 blocks. we only need to
            // render a sprite for the 'white' squares on the chessboard (render or
            // not according to a checkerboard pattern)
            if ((ix % 2 === 0) !== (iy % 2 === 0))
                continue;

            tilesContainer.addChild(spriteAtBlock(ix, iy, floorTileTexture, { anchor: { x: 0.5, y: 1 } }));
        }
    }

    const tilesMask = new Graphics()
        // Add the rectangular area to show
        .poly(
            [
                frontSide,
                rightSide,
                backSide,
                leftSide
            ],
            true
        )
        .fill(0xff0000)
        // use a stroke to draw more than is strictly on the floor for the purpose of extending
        // under the pixelated edges of other sprites that are otherdrawn - otherwise the edge
        // would be a very smooth diagonal on modern screens
        .stroke({ width: 8 })

    tilesContainer.addChild(tilesMask);
    tilesContainer.mask = tilesMask;

    floorContainer.addChild(tilesContainer);

    // render the floor edges
    const edgeContainer = new Container();

    for (let ix = blockXMin; ix <= room.blockWidth; ix += 0.5) {
        edgeContainer.addChild(spriteAtBlock(ix, hasDoorTowards ? -0.5 : 0, 'generic.edge.towards', { pivot: { x: 7, y: 1 } }));
    }
    for (let iy = blockYMin; iy <= room.blockDepth; iy += 0.5) {
        edgeContainer.addChild(spriteAtBlock(hasDoorRight ? -0.5 : 0, iy, 'generic.edge.right', { pivot: { x: 0, y: 1 } }));
    }

    const edgeRightPoint = xyzBlockPosition(0, room.blockDepth);
    const edgeLeftPoint = xyzBlockPosition(room.blockWidth, 0);

    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMask = new Graphics()
        // Add the rectangular area to show
        .poly(
            [
                { x: frontSide.x, y: frontSide.y + 16 },
                { x: edgeRightPoint.x, y: edgeRightPoint.y + 16 },
                { x: edgeRightPoint.x, y: -999 },
                { x: edgeLeftPoint.x, y: -999 },
                { x: edgeLeftPoint.x, y: edgeLeftPoint.y + 16 },
            ],
            true
        )
        .fill(0xffff00)

    floorContainer.addChild(floorMask);
    floorContainer.addChild(edgeContainer);
    floorContainer.mask = floorMask;

    yield floorContainer;
}

const doorTexture = (room: AnyRoom, axis: 'x' | 'y') => {
    const worldSpecificTexture = pixiSpriteSheet.textures[`${room.planet}.door.front.${axis}` as TextureId] !== undefined;

    const frontTexture = (worldSpecificTexture ? `${room.planet}.door.front.${axis}` : `generic.door.front.${axis}`) as TextureId;
    const backTexture = (worldSpecificTexture ? `${room.planet}.door.back.${axis}` : `generic.door.back.${axis}`) as TextureId;

    return {
        frontTexture,
        backTexture
    }
}

function* renderWalls(room: AnyRoom): Generator<Sprite, undefined, undefined> {
    // TODO: skip walls where there are doors:

    // sprites for wall on x-axis (left wall):
    const leftDoor = room.doors.left;
    for (let i = room.blockDepth - 1; i >= 0; i--) {

        if (leftDoor?.ordinal === i - 1) {
            const { backTexture, frontTexture } = doorTexture(room, 'x');

            // if there is a door, do not render the normal wall- render the door instead
            // TODO: only render the door back. The front needs to overdraw items in-game
            // but subsequent walls also need to over-render the door(!)
            // this means that maybe everything needs to be treated like a sortable object (?)
            yield spriteAtBlock(room.blockWidth + 0.5, i, 'generic.wall.overdraw', { anchor: { x: 0, y: 1 } });
            yield spriteAtBlock(room.blockWidth + 0.5, i, backTexture, { pivot: doorTexturePivotX });
            yield spriteAtBlock(room.blockWidth + 0.5, i - 1, frontTexture, { pivot: doorTexturePivotX });
            i--;
        } else {
            const textureId = wallTextureId(room.planet, room.walls.left[i], 'left') as TextureId;
            yield spriteAtBlock(room.blockWidth, i, textureId, { anchor: { x: 0, y: 1 } });
        }
    }

    // sprites for wall on y-axis (right wall):
    const awayDoor = room.doors.away;
    for (let i = room.blockWidth - 1; i >= 0; i--) {
        if (awayDoor?.ordinal === i - 1) {
            const { backTexture, frontTexture } = doorTexture(room, 'y');

            yield spriteAtBlock(i, room.blockDepth + 0.5, 'generic.wall.overdraw', { anchor: { x: 0, y: 1 }, flipX: true });
            yield spriteAtBlock(i, room.blockDepth + 0.5, backTexture, { pivot: doorTexturePivotY });
            yield spriteAtBlock(i - 1, room.blockDepth + 0.5, frontTexture, { pivot: doorTexturePivotY });
            i--;
            continue;
        } else {
            const textureId = wallTextureId(room.planet, room.walls.away[i], 'away') as TextureId;
            yield spriteAtBlock(i, room.blockDepth, textureId, { anchor: { x: 1, y: 1 } });
        }
    }

}


function* renderDoors(room: AnyRoom): Generator<Sprite, undefined, undefined> {
    // TODO: backs and fronts need to be rendered with content in-between    
    if (room.doors.right) {
        const { backTexture, frontTexture } = doorTexture(room, 'x');
        yield spriteAtBlock(0, room.doors.right.ordinal + 1, backTexture, { pivot: doorTexturePivotX });
        yield spriteAtBlock(0, room.doors.right.ordinal, frontTexture, { pivot: doorTexturePivotX });
    }
    if (room.doors.towards) {
        const { backTexture, frontTexture } = doorTexture(room, 'y');
        yield spriteAtBlock(room.doors.towards.ordinal + 1, 0, backTexture, { pivot: doorTexturePivotY });
        yield spriteAtBlock(room.doors.towards.ordinal, 0, frontTexture, { pivot: doorTexturePivotY });
    }
}

function* renderBackground(room: AnyRoom): Generator<Container, undefined, undefined> {
    yield* renderFloorTiles(room);
    //yield* renderFloorEdges(room);
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

    const roomContainer = await renderRoom(room);
    worldContainer.addChild(roomContainer);

    app.stage.addChild(worldContainer);

    return () => {
        app.stage.removeChild(roomContainer);
    }
};