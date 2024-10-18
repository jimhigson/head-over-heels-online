import { Application, Container, PointData } from 'pixi.js';
import { AnyRoom, PlanetName, Room, RoomId, Xyz } from '../modelTypes';
import { zxSpectrumResolution } from '../originalGame';
import { hintColours, Shades } from "../hintColours";
import { blockSizePx, pixiSpriteSheet, type TextureId } from '../sprites/pixiSpriteSheet';
import { ColorReplaceFilter } from 'pixi-filters';
import { renderItems } from './renderItems';
import { renderWalls } from './renderWalls';
import { renderFrontDoors } from './renderDoor';
import { renderFloor } from './renderFloor';



/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectToScreen = (x: number, y: number, z: number = 0): Xyz => {
    const projY = -(x + y) / 2 - z;
    return {
        x: y - x, y: projY,
        // z here is the z-index, for if the renderer needs it
        z: (z << 8) + projY
    };
}
export const xyzBlockPosition = (xBlock: number, yBlock: number, zBlock: number = 0): PointData => {
    const x = xBlock * blockSizePx.w;
    const y = yBlock * blockSizePx.d;
    const z = zBlock * blockSizePx.h;

    return projectToScreen(x, y, z);
}

export type SpriteAtBlockOptions = {
    anchor?: PointData;
    pivot?: PointData;
    flipX?: true;
    /** 
     * if set, will give the sprite a z-index. this isn't needed for sprites that
     * can render themselves in a known-good order - ie, back-to-front 
     */
    giveZIndex?: true;
};
export const doorTexture = (room: AnyRoom, axis: 'x' | 'y') => {
    const worldSpecificTexture = pixiSpriteSheet.textures[`${room.planet}.door.front.${axis}` as TextureId] !== undefined;

    const frontTexture = (worldSpecificTexture ? `${room.planet}.door.front.${axis}` : `generic.door.front.${axis}`) as TextureId;
    const backTexture = (worldSpecificTexture ? `${room.planet}.door.back.${axis}` : `generic.door.back.${axis}`) as TextureId;

    return {
        frontTexture,
        backTexture
    }
}

function iterateToContainer(gen: Generator<Container>, into?: Container) {
    const c = into || new Container();
    for (const s of gen) {
        c.addChild(s);
    }
    return c;
}

function* renderBackground(room: AnyRoom, options: RenderWorldOptions): Generator<Container, undefined, undefined> {

    yield* renderFloor(room, options);
    yield* renderWalls(room, options);

    yield iterateToContainer(renderItems(room, options));
    yield* renderFrontDoors(room, options);
}

export const paletteSwapFilters = (shades: Shades) => [
    new ColorReplaceFilter({ originalColor: 0x00FFFF, targetColor: shades.basic, tolerance: 0.05 }),
    new ColorReplaceFilter({ originalColor: 0x008888, targetColor: shades.dimmed, tolerance: 0.05 })
];

const renderRoom = <P extends PlanetName>(room: Room<P>, options: RenderWorldOptions) => {

    // NB: floor could be a tiling sprite and a graphics map:
    //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
    //  * https://pixijs.com/8.x/examples/masks/graphics

    const roomContainer = new Container();

    for (const container of renderBackground(room, options)) {
        roomContainer.addChild(container);
    }

    roomContainer.filters = paletteSwapFilters(hintColours[room.color].main);

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