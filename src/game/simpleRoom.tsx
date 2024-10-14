import { Planet, Room, WallType, wallTypes } from "../modelTypes";

function* sequentialRowTypes<P extends Planet>(planet: P): Generator<WallType<P>> {
    const planetWallTypes = wallTypes[planet];
    console.log(planetWallTypes);

    for (let i = 0; ; i++) {
        yield planetWallTypes[i % planetWallTypes.length];
    }
}

export const simpleRoom = <P extends Planet>(planet: P, width: number, depth: number): Room<P> => {

    return ({
        id: 'simple',
        blockWidth: width,
        blockDepth: depth,
        floorType: 'normal',
        planet,
        zxSpectrumColor: 'cyan-basic',
        walls: {
            left: [...sequentialRowTypes(planet).take(depth)],
            away: [...sequentialRowTypes(planet).take(width)],
        },
        doors: {
            right: { ordinal: 1, toRoomId: 'nowhere' },
            left: { ordinal: 3, toRoomId: 'nowhere' },
            away: { ordinal: 3, toRoomId: 'nowhere' },
            towards: { ordinal: 1, toRoomId: 'nowhere' }
        }
    } as const);
};
