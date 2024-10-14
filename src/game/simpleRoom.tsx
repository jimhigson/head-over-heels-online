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
            l: [...sequentialRowTypes(planet).take(depth)],
            r: [...sequentialRowTypes(planet).take(width)],
        }
    } as const);
};
