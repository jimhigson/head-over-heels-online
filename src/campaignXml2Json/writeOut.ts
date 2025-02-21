import { readdir, readFile, writeFile } from "node:fs/promises";
import { canonicalize } from "json-canonicalize";
import { objectValues } from "iter-tools";
import { iterate } from "../utils/iterate";
import { orderBy } from "natural-orderby";
import type { AnyRoomJson } from "../model/RoomJson";
import type { Operation } from "fast-json-patch";
import fastJsonPatch from "fast-json-patch";

/* multi-line string are easier to read than single-line strings with \n */
function convertMultilineToTemplate(jsonString: string): string {
  // Regular expression to match strings containing `\n` within quotes
  const multilineRegex = /"([^"\\]*(?:\\.[^"\\]*)*\\n[^"\\]*(?:\\.[^"\\]*)*)"/g;

  // Replace matches with template literal syntax
  return jsonString.replace(multilineRegex, (_match, multilineContent) => {
    // Unescape JSON-escaped characters
    const unescapedContent = multilineContent
      .replace(/\\"/g, '"') // Unescape double quotes
      .replace(/\\\\/g, "\\") // Unescape backslashes
      .replace(/\\n/g, "\n"); // Convert escaped \n to real newlines

    // Wrap in backticks for multi-line JavaScript template literals
    return `\`${unescapedContent.replace(/`/g, "\\`")}\``; // Escape backticks
  });
}

const roomTs = (room: AnyRoomJson): string =>
  `
import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";\n
import {type OriginalCampaignRoomId} from '../OriginalCampaignRoomId.ts';\n
export const room = inferRoomJson(${convertMultilineToTemplate(canonicalize(room))}) satisfies RoomJson<"${room.planet}", OriginalCampaignRoomId>;
`;

export const writeOut = async (convertedRooms: Record<string, AnyRoomJson>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const jsonConvertedFilename = `${targetDir}/campaign.converted.json`;
  const tsBarrellFilename = `${targetDir}/campaign.ts`;
  const tsRoomFilename = (roomId: string) => `${targetDir}/rooms/${roomId}.ts`;
  const tsRoomIdsFilename = `${targetDir}/OriginalCampaignRoomId.ts`;
  const patchFilename = (roomId: string) =>
    `${targetDir}/patches/${roomId}.patch.json`;

  const readExtraRooms = async (): Promise<Record<string, AnyRoomJson>> => {
    const extraRoomNames = await readdir(`${targetDir}/extraRooms`);
    console.log("we have extra rooms", extraRoomNames);
    const extraRoomPromises = extraRoomNames.map(async (extraRoomFilename) => [
      extraRoomFilename.replace(/\.ts$/, ""),
      (await import(`../../${targetDir}/extraRooms/${extraRoomFilename}`))
        .room as AnyRoomJson,
    ]);

    const extraRooms = await Promise.all(extraRoomPromises);
    return Object.fromEntries(extraRooms);
  };
  const convertedRoomsAndExtraRooms = {
    ...convertedRooms,
    ...(await readExtraRooms()),
  };

  const writeConvertedJsonPromise = writeFile(
    jsonConvertedFilename,
    JSON.stringify({ rooms: convertedRooms }),
  );

  const roomIdsSorted = orderBy(Object.keys(convertedRoomsAndExtraRooms));

  const writeOriginalCampaignRoomIdType = writeFile(
    tsRoomIdsFilename,
    `
        export type OriginalCampaignRoomId = ${roomIdsSorted
          .map((roomId) => `"${roomId}"`)
          .join("|\n")};\n
    `,
  );

  const writeTsBarrell = writeFile(
    tsBarrellFilename,
    `
    /* eslint-disable */
    import type {Campaign} from "../../model/modelTypes.ts";\n
    import {type OriginalCampaignRoomId} from './OriginalCampaignRoomId.ts';\n

    ${roomIdsSorted
      .map(
        (roomId) => `import {room as ${roomId}} from "./rooms/${roomId}.ts";`,
      )
      .join("\n")};\n
        
    export const campaign = { 
      "rooms": { 
        ${roomIdsSorted.join(",\n")}
       }
    } as const satisfies Campaign<OriginalCampaignRoomId> as Campaign<OriginalCampaignRoomId>;`,
  );

  await Promise.all([
    writeTsBarrell,
    writeOriginalCampaignRoomIdType,
    writeConvertedJsonPromise,
    ...iterate(objectValues(convertedRoomsAndExtraRooms)).map(async (room) => {
      try {
        if (room.id === undefined) {
          throw new Error("room without an id");
        }

        let roomPatch: Operation[];
        try {
          roomPatch = JSON.parse(
            await readFile(patchFilename(room.id), "utf8"),
          );
        } catch (_e) {
          // failed to load - proably no patch exists for this room
          roomPatch = [];
        }

        const roomPatched = fastJsonPatch.applyPatch(
          room,
          roomPatch as Operation[],
        ).newDocument;

        return writeFile(tsRoomFilename(room.id), roomTs(roomPatched));
      } catch (e) {
        console.error(e);
        throw new Error(`Error writing room ${room.id}`, e as Error);
      }
    }),
  ]);
};
