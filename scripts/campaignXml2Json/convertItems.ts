import { Item, Teleporter, Barrier } from "../../src/Item";
import { LooseDoorMap, map, convertXYZ, convertDirection } from "./convertCampaign";
import { convertRoomId } from "./convertRoomId";
import { Xml2JsonRoom, roomNameFromXmlFilename } from "./readToJson";

export const convertItems = (roomName: string, xml2JsonRoom: Xml2JsonRoom, doorMap: LooseDoorMap): Item[] => {

    return xml2JsonRoom.items.map((item): Item | undefined => {
        switch (true) {
            case item.kind === 'teleport': {

                const roomOnMap = map[roomName];
                const destination = roomOnMap.teleport;

                if (destination === undefined) {
                    throw new Error('teleporter with no destination');
                }

                return {
                    type: "teleporter",
                    toRoom: convertRoomId(roomNameFromXmlFilename(destination)),
                    position: convertXYZ(item, xml2JsonRoom, doorMap)
                } satisfies Teleporter;
            }

            case item.kind === 'bars-ns' || item.kind === 'bars-ew': {
                return {
                    type: 'barrier',
                    alongAxis: item.kind === 'bars-ns' ? 'y' : 'x',
                    position: convertXYZ(item, xml2JsonRoom, doorMap)
                } satisfies Barrier;
            }

            case item.kind === 'brick1':
            case item.kind === 'brick2': {
                return {
                    type: 'block',
                    style: item.kind === 'brick1' ? 'artificial' : 'organic',
                    position: convertXYZ(item, xml2JsonRoom, doorMap)
                };
            }

            case item.kind === 'vulcano': {
                return {
                    type: 'deadly-block',
                    style: 'volcano',
                    position: convertXYZ(item, xml2JsonRoom, doorMap)
                };
            }

            case item.kind === 'conveyor': {
                return {
                    type: 'conveyor',
                    direction: convertDirection(item.orientation),
                    position: convertXYZ(item, xml2JsonRoom, doorMap)
                };
            }

            case item.kind === 'extra-life':
            case item.kind === 'donuts':
            case item.kind === 'horn':
            case item.kind === 'handbag':
                {
                    const conversions = {
                        horn: 'hooter',
                        handbag: 'bag'
                    }

                    return {
                        type: 'pickup',
                        gives: conversions[item.kind] || item.kind,
                        position: convertXYZ(item, xml2JsonRoom, doorMap)
                    };
                }

            case item.kind === 'mortal-fish':
            case item.kind === 'reincarnation-fish':
                {
                    return {
                        type: 'fish',
                        alive: item.kind === 'reincarnation-fish',
                        position: convertXYZ(item, xml2JsonRoom, doorMap)
                    };
                }

            case item.kind === 'trampoline':
                {
                    return {
                        type: 'spring',
                        position: convertXYZ(item, xml2JsonRoom, doorMap)
                    };
                }

            default:
                //item.kind satisfies never;
                return undefined;
        }
    }).filter((x): x is Item => x !== undefined);
};
