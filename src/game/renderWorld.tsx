import { Application, Container, Graphics, PointData, Sprite } from 'pixi.js';
import { AnyRoom, Direction, Door, PlanetName, Room, RoomId, wallTextureId, Xy } from '../modelTypes';
import { zxSpectrumResolution } from '../originalGame';
import { blockSizePx, doorTexturePivot, pixiSpriteSheet, type TextureId } from '../sprites/pixiSpriteSheet';

const makeClickPortal = (toRoom: RoomId, { onPortalClick }: RenderWorldOptions, ...sprite: Container[]) => {
    sprite.forEach(sprite => sprite.on('click', () => {
        onPortalClick(toRoom);
    }));
}
function* makeClickPortals(toRoom: RoomId, options: RenderWorldOptions, sprites: Generator<Container>): Generator<Container> {
    for (const s of sprites) {
        makeClickPortal(toRoom, options, s);
        yield s;
    }
}

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
const spriteAtBlock = ({ x, y, z = 0 }: { x: number, y: number, z?: number }, textureId: TextureId, { anchor, flipX, pivot }: SpriteAtBlockOptions): Sprite => {
    const sprite = new Sprite(pixiSpriteSheet.textures[textureId]);
    if (anchor !== undefined)
        sprite.anchor = anchor;
    if (pivot !== undefined)
        sprite.pivot = pivot;

    const pos = xyzPosition(x * blockSizePx.w, y * blockSizePx.d, z * blockSizePx.h);

    sprite.x = pos.x;
    sprite.y = pos.y;

    sprite.eventMode = 'static';
    sprite.on('click', () => { console.log(`tile (xB=${x}) (yB=${y}) xpx=${pos.x} ypx=${pos.y} tex=${textureId}`) });

    if (flipX === true) {
        sprite.scale.x = -1;
    }

    return sprite;
}

function* renderFloor(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {


    const hasDoorTowards = !!room.doors.towards;
    const hasDoorRight = !!room.doors.right;

    const blockXMin = room.doors.right ? -0.5 : 0;
    const blockXMax = room.size.x + (room.doors.left ? 0.5 : 0);
    const blockYMin = room.doors.towards ? -0.5 : 0;
    const blockYMax = room.size.y + (room.doors.towards ? 0.5 : 0);

    const rightSide = xyzBlockPosition(blockXMin, blockYMax);
    const leftSide = xyzBlockPosition(blockXMax, blockYMin);
    const frontSide = xyzBlockPosition(blockXMin, blockYMin); // aka the origin
    const backSide = xyzBlockPosition(blockXMax, blockYMax); // aka the origin

    const { floor: floorType } = room;

    const floorContainer = new Container();

    if (floorType !== 'none') {
        const floorTileTexture: TextureId = floorType === 'deadly' ? 'generic.floor.deadly' : `${floorType}.floor`;

        const tilesContainer = new Container();

        // each sprite covers enough graphics for 2 blocks. we only need to
        // render a sprite for the 'white' squares on the chessboard (render or
        // not according to a checkerboard pattern)
        for (let ix = - 1; ix <= room.size.x; ix++) {
            for (let iy = ix % 2 - 1; iy <= room.size.y; iy += 2) {
                tilesContainer.addChild(spriteAtBlock({ x: ix, y: iy }, floorTileTexture, { anchor: { x: 0.5, y: 1 } }));
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
    }

    // render the floor edges
    const edgeContainer = new Container();

    for (let ix = blockXMin; ix <= room.size.x; ix += 0.5) {
        edgeContainer.addChild(spriteAtBlock({ x: ix, y: hasDoorTowards ? -0.5 : 0 }, 'generic.edge.towards', { pivot: { x: 7, y: 1 } }));
    }
    for (let iy = blockYMin; iy <= room.size.y; iy += 0.5) {
        edgeContainer.addChild(spriteAtBlock({ x: hasDoorRight ? -0.5 : 0, y: iy }, 'generic.edge.right', { pivot: { x: 0, y: 1 } }));
    }
    if (room.roomBelow) {
        makeClickPortal(room.roomBelow as RoomId, options, ...edgeContainer.children)
    }

    const edgeRightPoint = xyzBlockPosition(0, room.size.y);
    const edgeLeftPoint = xyzBlockPosition(room.size.x, 0);

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
        .fill(0xffff00);


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

function* renderDoor(room: AnyRoom, door: Door, side: Direction) {

    const isBack = side === 'left' || side === 'away';
    const axis = side === 'away' || side === 'towards' ? 'x' : 'y';
    const crossAxis = axis === 'x' ? 'y' : 'x';

    // doors occupy two positions
    const frontPos = { [axis]: door.ordinal, [crossAxis]: isBack ? room.size[crossAxis] : -0.5 } as Xy;
    const backPos = { [axis]: door.ordinal + 1, [crossAxis]: isBack ? room.size[crossAxis] : -0.5 } as Xy;

    console.log('rendering door on side', side, 'at', backPos, frontPos);

    // if there is a door, do not render the normal wall- render the door instead
    // TODO: only render the door back. The front needs to overdraw items in-game
    // but subsequent walls also need to over-render the door(!)
    // this means that maybe everything needs to be treated like a sortable object (?)
    if (isBack) {
        if (door.z === 0) {
            //TODO: flip like before
            yield spriteAtBlock(frontPos, 'generic.wall.overdraw', { anchor: { x: 0, y: 1 } });
        } else {
            const pivotX = side === 'left' ? 0 : 16;
            for (const p of [backPos, frontPos]) {
                yield spriteAtBlock(p, 'generic.door.legs.base', { pivot: { x: pivotX, y: 9 } });
                for (let z = 1; z <= door.z; z++) {
                    yield spriteAtBlock({ ...p, z }, 'generic.door.legs.pillar', { pivot: { x: pivotX, y: 9 } });
                }
                yield spriteAtBlock({ ...p, z: door.z }, `generic.door.legs.threshold.${axis}`, { pivot: { x: pivotX, y: 15 } });
            }
        }
    } else {
        if (door.z !== 0) {
            for (const p of [backPos, frontPos]) {
                const pivotX = side === 'towards' ? 18 : 8;
                yield spriteAtBlock({ ...p, z: door.z }, `generic.door.threshold.${axis}`, { pivot: { x: pivotX, y: 12 } })
            }
        }
    }

    const { backTexture, frontTexture } = doorTexture(room, axis);

    yield spriteAtBlock({ ...backPos, z: door.z }, backTexture, { pivot: doorTexturePivot[axis] });
    yield spriteAtBlock({ ...frontPos, z: door.z }, frontTexture, { pivot: doorTexturePivot[axis] });
}

function* renderWalls(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {
    // TODO: skip walls where there are doors:

    // sprites for wall on x-axis (left wall):
    const leftDoor = room.doors.left;
    for (let i = room.size.y - 1; i >= 0; i--) {

        if (leftDoor?.ordinal === i - 1) {
            yield* makeClickPortals(
                leftDoor.toRoom as RoomId,
                options,
                renderDoor(room, leftDoor, 'left')
            );
            i--;
            //continue wallLoop;
        } else {
            const textureId = wallTextureId(room.planet, room.walls.left[i], 'left') as TextureId;
            yield spriteAtBlock({ x: room.size.x, y: i }, textureId, { anchor: { x: 0, y: 1 } });
        }
    }

    // sprites for wall on y-axis (right wall):
    const awayDoor = room.doors.away;
    for (let i = room.size.x - 1; i >= 0; i--) {
        if (awayDoor?.ordinal === i - 1) {
            yield* makeClickPortals(
                awayDoor.toRoom as RoomId,
                options,
                renderDoor(room, awayDoor, 'away')
            );
            i--;
            //continue wallLoop;
        } else {
            const textureId = wallTextureId(room.planet, room.walls.away[i], 'away') as TextureId;
            yield spriteAtBlock({ x: i, y: room.size.y }, textureId, { anchor: { x: 1, y: 1 } });
        }
    }

}

/**
 * renders the doors on the right and towards edges - ie, those not embedded in wall sprites
 */
function* renderFrontDoors(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {

    // TODO: backs and fronts need to be rendered with content in-between    
    if (room.doors.right) {
        yield* makeClickPortals(
            room.doors.right.toRoom as RoomId,
            options,
            renderDoor(room, room.doors.right, 'right')
        );
    }
    if (room.doors.towards) {
        yield* makeClickPortals(
            room.doors.towards.toRoom as RoomId,
            options,
            renderDoor(room, room.doors.towards, 'towards')
        );
    }
}

function* renderItems(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {
    for (const item of room.items) {
        switch (item.type) {
            case 'teleporter': {
                const sprite = spriteAtBlock(item, 'items.teleporter', { anchor: { x: 0.5, y: 1 } });
                makeClickPortal(item.toRoom as RoomId, options, sprite)
                yield sprite;
                continue;
            }
            case 'barrier': {
                yield spriteAtBlock(item, 'items.barrier', { anchor: { x: 0.5, y: 1 } });
            }
        }
    }
}

function* renderBackground(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {
    yield* renderFloor(room, options);
    //yield* renderFloorEdges(room);
    yield* renderWalls(room, options);
    yield* renderItems(room, options);
    yield* renderFrontDoors(room, options);
}

const renderRoom = <P extends PlanetName>(room: Room<P>, options: RenderWorldOptions) => {

    // NB: floor could be a tiling sprite and a graphics map:
    //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
    //  * https://pixijs.com/8.x/examples/masks/graphics

    const roomContainer = new Container();

    for (const container of renderBackground(room, options)) {
        roomContainer.addChild(container);
    }

    return roomContainer;
};

export type RenderWorldOptions = {
    onPortalClick: (roomId: RoomId) => void;
}

export const renderWorld = (app: Application, room: AnyRoom, options: RenderWorldOptions) => {
    console.log('rendering room', room);

    // TODO: render a bit extra for any side with a door (to go under the door - about half a block)

    const worldContainer = new Container();

    // move origin to centre of screen 
    // TODO: change depending on geometry of current room
    worldContainer.x = zxSpectrumResolution.width / 2;
    worldContainer.y = zxSpectrumResolution.height * 0.75;

    const roomContainer = renderRoom(room, options);
    worldContainer.addChild(roomContainer);

    app.stage.addChild(worldContainer);

    return () => {
        app.stage?.removeChild(worldContainer);
    }
};