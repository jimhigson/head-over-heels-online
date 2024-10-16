import { CompassDirections, readMapToJson, readRoomToJson, Xml2JsonRoom, roomNameFromXmlFilename, XmlScenery } from "./readToJson";
import { readdir, open } from 'node:fs/promises';
import { AnyRoom, AnyWall, Direction, Door, DoorMap, Floor, Item, PlanetName, planets } from '../../src/modelTypes';
import { ZxSpectrumColor } from "../../src/originalGame";

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

type RoomDimensions = {
    depth: number,
    width: number
}
const convertRoomDimensions = ({ xTiles, yTiles }: Xml2JsonRoom, doorMap: DoorMap): RoomDimensions => {
    const depth = parseInt(yTiles) - (doorMap.towards ? 1 : 0) - (doorMap.away ? 1 : 0)
    const width = parseInt(xTiles) - (doorMap.left ? 1 : 0) - (doorMap.right ? 1 : 0)

    return { depth, width };
}

const convertWalls = (roomJson: Xml2JsonRoom, direction: 'left' | 'away', doorMap: DoorMap): AnyWall[] => {

    const dims = convertRoomDimensions(roomJson, doorMap);
    const wallLength = direction === 'away' ? dims.width : dims.depth;

    const xmlJsonAxis = direction === 'left' ? 'y' : 'x';
    const planet = convertPlanetName(roomJson.scenery);
    const result: AnyWall[] = new Array(wallLength);
    result.fill('door');

    // compensate for the xml basing from 1 when there's a door in that direction:
    const offset = doorMap[direction] === undefined ? 0 : 1;

    roomJson.walls
        .filter(wall => wall.along === xmlJsonAxis)
        .forEach(wall => result[wall.position - offset] = convertWallName(planet, wall.picture));

    return result;
}

const convertDoors = (roomName: string, { items: jsonItems }: Xml2JsonRoom): DoorMap => {

    const roomOnMap = map[roomName];

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

            const door: Door = { ordinal: parseInt(where === 'south' ? y : x), z: 0, toRoom: toRoomId };
            return [convertDirection(where), door] as [Direction, Door];
        });
    return Object.fromEntries(doorEntries) as DoorMap;

}

const convertItems = (roomName: string, { items: jsonItems }: Xml2JsonRoom, roomDimensions: RoomDimensions): Item[] => {

    return jsonItems
        .filter((xmlJsonItem) => xmlJsonItem.kind === 'teleport')
        .map(({ x, y, z }): Item => {
            const roomOnMap = map[roomName];
            const destination = roomOnMap.teleport;

            if (destination === undefined) {
                throw new Error();
            }

            return ({
                type: "teleporter",
                toRoom: roomNameFromXmlFilename(destination),
                // TODO: probably needs to compensate for doors
                x: roomDimensions.width - parseInt(x) - 1,
                y: roomDimensions.depth - parseInt(y) - 1,
                z: parseInt(z)
            });
        });
}

const convertRoomJson = async (roomName: string) => {
    const roomJson = await readRoomToJson(roomName);
    const { floorKind: jsonFloorKind, scenery: jsonScenery, color } = roomJson;

    const roomOnMap = map[roomName];
    if (roomOnMap === undefined) {
        throw new Error(`${roomName} not on the map`);
    }

    const doors = convertDoors(roomName, roomJson);

    // the xml adds extra tiles for doors - compensate for this by deleting them:
    const roomDimensions = convertRoomDimensions(roomJson, doors);

    // the xml calls bookworld "byblos" 🤷‍♂️
    const planet = convertPlanetName(jsonScenery);

    const floorMap: Record<string, Floor> = {
        'plain': planet,
        'absent': 'none',
        'mortal': 'deadly'
    };

    const room: AnyRoom = {
        id: roomName,
        floor: floorMap[jsonFloorKind],
        planet,
        roomBelow: roomOnMap['below'] && roomNameFromXmlFilename(roomOnMap['below']),
        roomAbove: roomOnMap['above'] && roomNameFromXmlFilename(roomOnMap['above']),
        ...roomDimensions,
        doors,
        walls: {
            away: convertWalls(roomJson, 'away', doors),
            left: convertWalls(roomJson, 'left', doors),
        },
        items: convertItems(roomName, roomJson, roomDimensions),
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
writeOut.write(`export const originalCampaign = {\n`);
for (const [roomName, room] of Object.entries(rooms)) {
    await writeOut.write(`    "${roomName}": ${JSON.stringify(room)} satisfies Room<"${room.planet}">,\n`);
}
await writeOut.write(`} as const;\n`);
await writeOut.write(`export type RoomId = keyof typeof originalCampaign;\n`);
await writeOut.close();
