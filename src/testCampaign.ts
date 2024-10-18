import { planetNames, planets, Xy, type PlanetName, type Room, type RoomWalls, type Wall } from "./modelTypes.ts"
import { zxSpectrumRoomColours, ZxSpectrumRoomColours } from "./originalGame.ts";

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

// create matrix of rooms - one in each world/colour combination
const colourRooms = () => {
    type Entry<P extends PlanetName> = [`${P}-${ZxSpectrumRoomColours}`, Room<P>];

    function* room(): Generator<Entry<PlanetName>> {
        for (let ip = 0; ip < planetNames.length; ip++) {
            const p = planetNames[ip];
            for (let ic = 0; ic < planetNames.length; ic++) {
                const c = zxSpectrumRoomColours[ic];
                yield [
                    `${p}-${c}`,
                    {
                        size: { x: 8, y: 8 },
                        walls: generateWalls({ x: 8, y: 8 }, p),
                        color: c,
                        doors: {
                            left: {
                                ordinal: 1,
                                toRoom: `${p}-${zxSpectrumRoomColours[(zxSpectrumRoomColours.length + ic - 1) % zxSpectrumRoomColours.length]}`,
                                z: 0
                            },
                            right: {
                                ordinal: 0,
                                toRoom: `${p}-${zxSpectrumRoomColours[(ic + 1) % zxSpectrumRoomColours.length]}`,
                                z: 0
                            },
                            towards: {
                                ordinal: 1,
                                toRoom: `${planetNames[(planetNames.length + ip - 1) % planetNames.length]}-${c}`,
                                z: 0
                            },
                            away: {
                                ordinal: 0,
                                toRoom: `${planetNames[(planetNames.length + ip + 1) % planetNames.length]}-${c}`,
                                z: 0
                            }
                        },
                        floor: p,
                        planet: p,
                        items: [{
                            type: 'teleporter',
                            position: {
                                x: 2,
                                y: 2,
                                z: 0
                            },
                            toRoom: 'doorsRoom'
                        }],
                        id: `${p}-${c}`
                    }
                ];
            }
        }
    }
    return Object.fromEntries(room())
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
        items: [{
            type: 'teleporter',
            toRoom: 'blacktooth-cyan',
            position: {
                x: 1,
                y: 0,
                z: 0
            }
        }],
        planet: 'blacktooth',
        color: 'cyan'
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
                position: { x: 1, y: 0, z: 2 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 1, z: 2 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 2, z: 2 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 2, z: 1 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 2, z: 0 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 3, z: 3 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 4, z: 3 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 3, z: 2 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'barrier',
                alongAxis: 'y',
                position: { x: 1, y: 4, z: 2 }
            },
            {
                type: 'teleporter',
                toRoom: 'doorsRoom',
                position: { x: 0, y: 0, z: 0 }
            },
            {
                // comes after in the list but should be drawn behind:
                type: 'teleporter',
                toRoom: 'doorsRoom',
                position: { x: 1, y: 1, z: 0 }
            },
            {
                // comes after in the list but should be drawn behind in terms of z-index:
                type: 'teleporter',
                toRoom: 'doorsRoom',
                position: { x: 2, y: 2, z: 0 }
            },
        ],
        planet: 'egyptus',
        color: 'cyan'
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
        color: 'cyan'
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
        color: 'cyan'
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
        color: 'cyan'
    } satisfies Room<'moonbase'>,
    ...colourRooms()
});
export type TestCampaignRoomId = keyof ReturnType<typeof testCampaign>;