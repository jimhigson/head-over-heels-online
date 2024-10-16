import { inspect } from "node:util";
import { CompassDirections, readMapToJson, readRoomToJson, roomNameFromXmlFilename, XmlScenery } from "./readToJson";
import { readdir, writeFile, open } from 'node:fs/promises';
import { AnyRoom, AnyWall, Direction, Door, DoorMap, Floor, PlanetName, planets, Wall } from '../../src/modelTypes';
import { ZxSpectrumColor } from "../../src/originalGame";

const inspectOptions = { depth: 8, maxArrayLength: Number.MAX_SAFE_INTEGER, colors: true };
const map = await readMapToJson();

const allRoomNames = (await readdir('gamedata-map-xml')).filter(name => name.endsWith('.xml') && name !== 'map.xml').map(roomNameFromXmlFilename);

const convertWallName = (planetName: PlanetName, pictureName: string): AnyWall => {

    // the remake I got the xml from has special tree walls for the final room, but the original
    // game uses the bars:
    if (pictureName.startsWith('trees')) {
        return 'bars';
    }

    const pictureNameRegex = /(?<p>\w+)-wall-(?:x|y)(?:-(?<n>\d+))?.png/;

    const regexMatch = pictureNameRegex.exec(pictureName);

    if (regexMatch === null || regexMatch.groups === undefined) {
        throw new Error(`can't understand wall pictureName: ${pictureName}`);
    }

    const wallTypeIndex = regexMatch.groups['n'] ? parseInt(regexMatch.groups['n']) : 1;

    return planets[planetName].walls[wallTypeIndex - 1];
}

const convertDirection = (compassDirection: CompassDirections): Direction => {
    // directions other than NESW are guesses and might be wrong - need to look into
    // why we have these.

    switch (compassDirection) {
        case 'north':
        case 'northwest':
        case 'northeast':
            return 'left';
        case 'south':
        case 'southeast':
        case 'southwest':
            return 'right';
        case 'east':
        case 'eastsouth':
        case 'eastnorth':
            return 'away';
        case 'west':
        case 'westnorth':
        case 'westsouth':
            return 'towards';

        default:
            compassDirection satisfies never;
            throw new Error(`Error converting direction: do not understand "${compassDirection}"`);
    }
}

const convertPlanetName = (xmlSceneryName: XmlScenery | undefined): PlanetName => {
    switch (xmlSceneryName) {
        case undefined:
            return 'jail';
        case 'byblos':
            return 'bookworld';
        case 'moon':
            return 'moonbase';
        default:
            return xmlSceneryName;
    }
}

const convertRoomJson = async (roomName: string) => {
    const { items: jsonItems, walls: jsonWalls, floorKind: jsonFloorKind, scenery: jsonScenery, xTiles, yTiles, color }
        = await readRoomToJson(roomName);

    const roomOnMap = map[roomName];
    if (roomOnMap === undefined) {
        throw new Error(`${roomName} not on the map`);
    }

    const doorEntries = jsonItems
        .filter(i => i.class === 'door')
        // filter out doors to nowhere (huh?)
        .filter(({ where }) => {
            const goesSomewhere = roomOnMap[where] !== undefined;

            if (!goesSomewhere) {
                console.warn(`room ${roomName} has a ${where} door that goes nowhere on the map`);
            }
            return goesSomewhere;
        })
        .map(({ where, x, y }) => {

            const toRoomId = roomNameFromXmlFilename(roomOnMap[where]!);

            const door: Door = { ordinal: parseInt(where === 'south' ? x : y), z: 0, toRoomId };
            return [convertDirection(where), door] as [Direction, Door];
        });
    const doors = Object.fromEntries(doorEntries) as DoorMap;

    // the xml calls bookworld "byblos" 🤷‍♂️
    const planet = convertPlanetName(jsonScenery);
    const wallsLeft = jsonWalls.filter(wall => wall.along === 'x').map(wall => convertWallName(planet, wall.picture));
    const wallsAway = jsonWalls.filter(wall => wall.along === 'y').map(wall => convertWallName(planet, wall.picture));

    const floorMap: Record<string, Floor> = {
        'plain': planet,
        'absent': 'none',
        'mortal': 'deadly'
    };

    const room: AnyRoom = {
        id: roomName,
        floor: floorMap[jsonFloorKind],
        planet,
        depth: parseInt(yTiles),
        width: parseInt(xTiles),
        doors,
        walls: {
            away: wallsAway,
            left: wallsLeft
        },
        zxSpectrumColor: color as ZxSpectrumColor,
    };

    return room;
};

const rooms: Record<string, AnyRoom> = {};
for (const roomName of allRoomNames) {
    try {
        const room = await convertRoomJson(roomName);

        rooms[roomName] = room;
    } catch (e) {
        throw new Error(`error converting room ${roomName} :: ${(e as Error).message}
            ${(e as Error).stack}`);
    }
}

const writeOut = await open('src/originalCampaign.ts', 'w');
writeOut.write(`import type {Room} from "./modelTypes.ts"\n`);
writeOut.write(`export const rooms = {\n`);
for (const [roomName, room] of Object.entries(rooms)) {
    await writeOut.write(`    "${roomName}": ${JSON.stringify(room)} satisfies Room<"${room.planet}">,\n`);
}
await writeOut.write(`} as const;`);
await writeOut.close();
