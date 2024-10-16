import { PlanetName, Room, Wall, planets } from "../modelTypes";

function* sequentialRowTypes<P extends PlanetName>(planet: P): Generator<Wall<P>> {
    const planetWallTypes = planets[planet].walls;
    console.log(planetWallTypes);

    for (let i = 0; ; i++) {
        yield planetWallTypes[i % planetWallTypes.length];
    }
}

export const simpleRoom = <P extends PlanetName>(planet: P, width: number, depth: number): Room<P> => {

    return ({
        id: 'simple',
        width: width,
        depth: depth,
        // jail doesn't have its own floor tiles (at least not yet)
        floor: planet,
        planet,
        zxSpectrumColor: 'cyan-basic',
        walls: {
            left: [...sequentialRowTypes(planet).take(depth)],
            away: [...sequentialRowTypes(planet).take(width)],
        },
        doors: {
            left: { ordinal: 2, toRoomId: 'nowhere' },
            away: { ordinal: 3, toRoomId: 'nowhere' },
            right: { ordinal: 1, toRoomId: 'nowhere' },
            towards: { ordinal: 3, toRoomId: 'nowhere' }
        }
    } as const);
};
