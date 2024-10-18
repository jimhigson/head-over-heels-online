import { Container } from "pixi.js";
import { AnyRoom, Door, Direction, Xy, RoomId } from "../modelTypes";
import { doorTexturePivot } from "../sprites/pixiSpriteSheet";
import { makeClickPortals } from "./makeClickPortal";
import { doorTexture, RenderWorldOptions } from "./renderWorld";
import { spriteAtBlock } from "./spriteAtBlock";


export function* renderDoor(room: AnyRoom, door: Door, side: Direction) {

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
                yield spriteAtBlock({ ...p, z: door.z }, `generic.door.threshold.${axis}`, { pivot: { x: pivotX, y: 12 } });
            }
        }
    }

    const { backTexture, frontTexture } = doorTexture(room, axis);

    yield spriteAtBlock({ ...backPos, z: door.z }, backTexture, { pivot: doorTexturePivot[axis] });
    yield spriteAtBlock({ ...frontPos, z: door.z }, frontTexture, { pivot: doorTexturePivot[axis] });
}

/**
 * renders the doors on the right and towards edges - ie, those not embedded in wall sprites
 */
export function* renderFrontDoors(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {

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