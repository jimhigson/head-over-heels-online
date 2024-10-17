import { planets, Xy, type PlanetName, type Room, type RoomWalls, type Wall } from "./modelTypes.ts"

const generateWalls = <P extends PlanetName>(roomSize: Xy, planet: P): RoomWalls<P> => {

    const walls = planets[planet].walls;

    function* gen(): Generator<Wall<P>> {
        const n = walls.length;

        for (let i = 0; ; i++) {
            yield walls[i % n];
        }
    }

    return {
        away: [...gen().take(roomSize.x)],
        left: [...gen().take(roomSize.y)]
    };

}

export const testCampaign = () => ({
    'doorsRoom': {
        size: { x: 4, y: 5 },
        walls: generateWalls({ x: 4, y: 5 }, 'blacktooth'),
        doors: {
            away: {
                ordinal: 1,
                toRoom: 'deep',
                z: 2
            },
            left: {
                ordinal: 2,
                toRoom: 'wide',
                z: 2
            },
            towards: {
                ordinal: 2,
                toRoom: 'big',
                z: 2
            },
            right: {
                ordinal: 0,
                toRoom: 'zRoom',
                z: 1
            }
        },
        floor: 'blacktooth',
        id: 'a',
        items: [],
        planet: 'blacktooth',
        zxSpectrumColor: 'cyan'
    } satisfies Room<'blacktooth'>,
    'zRoom': {
        size: { x: 4, y: 5 },
        walls: generateWalls({ x: 4, y: 5 }, 'egyptus'),
        doors: {
            left: {
                ordinal: 1,
                toRoom: 'doorsRoom',
                z: 2
            },
        },
        floor: 'deadly',
        id: 'a',
        items: [
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 0, z: 2
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 1, z: 2
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 2, z: 2
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 3, z: 3
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 4, z: 3
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 3, z: 2
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                x: 1, y: 4, z: 2
            },
            {
                type: 'teleporter',
                toRoom: 'doorsRoom',
                x: 0, y: 0, z: 0
            },
            {
                // comes after in the list but should be drawn behind:
                type: 'teleporter',
                toRoom: 'doorsRoom',
                x: 1, y: 1, z: 0
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'teleporter',
                toRoom: 'doorsRoom',
                x: 2, y: 2, z: 0
            },
        ],
        planet: 'egyptus',
        zxSpectrumColor: 'cyan'
    } satisfies Room<'egyptus'>,
    'wide': {
        size: { x: 10, y: 3 },
        walls: generateWalls({ x: 10, y: 3 }, 'market'),
        doors: {
            right: {
                ordinal: 1,
                toRoom: 'doorsRoom',
                z: 2
            },
        },
        floor: 'deadly',
        id: 'a',
        items: [],
        planet: 'market',
        zxSpectrumColor: 'cyan'
    } satisfies Room<'market'>,
    'deep': {
        size: { x: 3, y: 10 },
        walls: generateWalls({ x: 3, y: 10 }, 'moonbase'),
        doors: {
            towards: {
                ordinal: 1,
                toRoom: 'doorsRoom',
                z: 2
            },
        },
        floor: 'deadly',
        id: 'a',
        items: [],
        planet: 'moonbase',
        zxSpectrumColor: 'cyan'
    } satisfies Room<'moonbase'>,
    'big': {
        size: { x: 10, y: 10 },
        walls: generateWalls({ x: 10, y: 10 }, 'moonbase'),
        doors: {
            towards: {
                ordinal: 1,
                toRoom: 'doorsRoom',
                z: 2
            },
        },
        floor: 'deadly',
        id: 'a',
        items: [],
        planet: 'moonbase',
        zxSpectrumColor: 'cyan'
    } satisfies Room<'moonbase'>,
});
export type TestCampaignRoomId = keyof ReturnType<typeof testCampaign>;