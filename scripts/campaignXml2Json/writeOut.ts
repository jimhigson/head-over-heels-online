import { canonicalize } from "json-canonicalize";
import { orderBy } from "natural-orderby";
import { writeFile } from "node:fs/promises";

import { columnarEncode } from "../../src/columnar/encoder";
import { type Campaign } from "../../src/model/modelTypes";
import { type AnyRoomJson } from "../../src/model/RoomJson";
import { entries, valuesIter } from "../../src/utils/entries";

/**
 * the prod build loads the original campaign from the columnar blob + decoder;
 * dev loads the plain ts so room edits show up without regenerating. The unused
 * branch is dead-code-eliminated, so prod ships only one of the two.
 */
const loadOriginalCampaignTs = `
import { importOnce } from "../../utils/importOnce.ts";
import { type Campaign } from "../../model/modelTypes.ts";
import { columnarDecode } from "../../columnar/decoder.ts";
import { type OriginalCampaignRoomId } from "./OriginalCampaignRoomId.ts";

export const loadOriginalCampaign = importOnce(
  async (): Promise<Campaign<OriginalCampaignRoomId>> => {
    if (import.meta.env.DEV) {
      return (await import("./campaign.ts")).campaign;
    }
    // only the blob is lazy; the decoder is already in the graph (db loads use
    // it too), so importing it dynamically would not split it into its own chunk
    const { default: url } = await import("./campaign.columnar.json?url");
    return columnarDecode<OriginalCampaignRoomId>(
      await (await fetch(url)).json(),
    );
  },
);
`;

const roomTs = ({ $schema: _, ...room }: AnyRoomJson): string =>
  `
import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";\n
import {type OriginalCampaignRoomId} from '../OriginalCampaignRoomId.ts';\n
export const room = inferRoomJson(${canonicalize(room)}) satisfies RoomJson<OriginalCampaignRoomId, string, "${room.planet}">;
`;

export const writeOut = async ({
  rooms: convertedRooms,
  locator,
}: Campaign<string>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const tsBarrellFilename = `${targetDir}/campaign.ts`;
  const tsRoomFilename = (roomId: string) => `${targetDir}/rooms/${roomId}.ts`;
  const tsRoomIdsFilename = `${targetDir}/OriginalCampaignRoomId.ts`;

  const convertedRoomsAndExtraRooms = {
    ...convertedRooms,
  };

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
      "locator": ${canonicalize(locator)},
      "rooms": {
        ${roomIdsSorted.join(",\n")}
       },
    } as const satisfies Campaign<OriginalCampaignRoomId> as Campaign<OriginalCampaignRoomId>;`,
  );

  // the columnar blob must hold exactly what the .ts rooms hold, so strip
  // $schema the same way roomTs does before encoding
  const roomsForBlob = Object.fromEntries(
    entries(convertedRoomsAndExtraRooms).map(
      ([id, { $schema: _, ...room }]) => [id, room],
    ),
  );
  const writeColumnarBlob = writeFile(
    `${targetDir}/campaign.columnar.json`,
    JSON.stringify(
      // the original campaign only ever decodes back for play (its editable
      // source is the .ts), so drop the ids nothing references to save bytes
      columnarEncode({ locator, rooms: roomsForBlob } as Campaign<string>, {
        dropUnreferencedIds: true,
      }),
    ),
  );

  const writeLoadOriginalCampaign = writeFile(
    `${targetDir}/loadOriginalCampaign.ts`,
    loadOriginalCampaignTs,
  );

  await Promise.all([
    writeTsBarrell,
    writeOriginalCampaignRoomIdType,
    writeColumnarBlob,
    writeLoadOriginalCampaign,
    ...valuesIter(convertedRoomsAndExtraRooms).map(async (room) => {
      try {
        if (room.id === undefined) {
          throw new Error("room without an id");
        }

        return writeFile(tsRoomFilename(room.id), roomTs(room));
      } catch (e) {
        console.error(e);
        throw new Error(`Error writing room ${room.id}`, e as Error);
      }
    }),
  ]);
};
