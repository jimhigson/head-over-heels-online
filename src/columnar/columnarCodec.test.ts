import { canonicalize } from "json-canonicalize";
import { expect, test } from "vitest";

import { campaign as originalCampaign } from "../_generated/originalCampaign/campaign";
import generatedBlob from "../_generated/originalCampaign/campaign.columnar.json";
import { type Campaign } from "../model/modelTypes";
import { entries } from "../utils/entries";
import adversarial from "./__fixtures__/adversarial.json";
import sequel25 from "./__fixtures__/sequel_25.json";
import {
  columnarDecode,
  type ColumnarEncoded,
  isColumnarEncoded,
} from "./decoder";
import { columnarEncode, referencedItemIds } from "./encoder";

// real DB campaign (captured via `pnpm tsx scripts/fetchCampaign.ts sequel_25`)
// and a hand-built campaign packing the codec's sharp edges into a few rooms:
// a null config value, an empty config, a fractional position, a value that
// equals the default absent-marker, and config keys present on some siblings
// but not others.
const fixtures: Record<string, Campaign<string>> = {
  original: originalCampaign,
  sequel_25: sequel25 as Campaign<string>,
  adversarial: adversarial as Campaign<string>,
};

/**
 * each room reduced to its room-level fields plus its items as a
 * content-sorted array - ie everything except the item-id keys, which dropping
 * unreferenced ids is allowed to change. Lets a test assert the same content
 * survived without pinning the (synthesised) keys.
 */
const itemContents = (campaign: Campaign<string>) =>
  Object.fromEntries(
    entries(campaign.rooms).map(([roomId, { items, ...room }]) => [
      roomId,
      {
        ...room,
        items: Object.values(items)
          .map((item) => ({ item, key: canonicalize(item) }))
          .sort((a, b) =>
            a.key < b.key ? -1
            : a.key > b.key ? 1
            : 0,
          )
          .map(({ item }) => item),
      },
    ]),
  );

test.for(Object.entries(fixtures))("round-trips %s exactly", ([, campaign]) => {
  expect(columnarDecode(columnarEncode(campaign))).toEqual(campaign);
});

test("the encoder is deterministic (identical bytes on re-encode)", () => {
  expect(JSON.stringify(columnarEncode(fixtures.sequel_25))).toEqual(
    JSON.stringify(columnarEncode(fixtures.sequel_25)),
  );
});

test("the adversarial campaign forces an absent-marker other than the default", () => {
  // "c" has gives: "!@", so the encoder must pick a different marker
  expect(columnarEncode(fixtures.adversarial)._absent).not.toEqual("!@");
});

test("dropping unreferenced ids keeps the same item content", () => {
  const encoded = columnarEncode(originalCampaign, {
    dropUnreferencedIds: true,
  });
  expect(itemContents(columnarDecode(encoded))).toEqual(
    itemContents(originalCampaign),
  );
});

test("dropping unreferenced ids keeps every referenced id resolvable", () => {
  const decoded = columnarDecode(
    columnarEncode(originalCampaign, { dropUnreferencedIds: true }),
  );
  for (const [roomId, ids] of referencedItemIds(fixtures.original.rooms)) {
    for (const id of ids) {
      expect(decoded.rooms[roomId].items[id]).toEqual(
        fixtures.original.rooms[roomId].items[id],
      );
    }
  }
});

/**
 * cross-room links a door/teleporter makes by pairing `toRoom` with a target
 * id (`toItemId` / `toDoor`) - collected here independently of the encoder's
 * own reference detection, so this is a real check that dropping ids never
 * breaks a link (the original campaign has several of these).
 */
const crossRoomTargets = (campaign: Campaign<string>) =>
  entries(campaign.rooms).flatMap(([, room]) =>
    Object.values(room.items).flatMap((item) => {
      const config = item.config as {
        toRoom?: string;
        toItemId?: string;
        toDoor?: string;
      };
      const { toRoom } = config;
      return toRoom === undefined ?
          []
        : [config.toItemId, config.toDoor]
            .filter((id) => id !== undefined)
            .map((id) => ({ toRoom, id }));
    }),
  );

test("dropping unreferenced ids keeps cross-room targets resolvable", () => {
  const targets = crossRoomTargets(originalCampaign);
  // guard the guard: the original campaign really does have cross-room links
  expect(targets.length).toBeGreaterThan(0);
  const decoded = columnarDecode(
    columnarEncode(originalCampaign, { dropUnreferencedIds: true }),
  );
  for (const { toRoom, id } of targets) {
    expect(decoded.rooms[toRoom].items[id]).toBeDefined();
  }
});

test("the generated original-campaign blob decodes to the same item content", () => {
  expect(isColumnarEncoded(generatedBlob)).toBe(true);
  const decoded = columnarDecode(generatedBlob as ColumnarEncoded);
  expect(itemContents(decoded)).toEqual(itemContents(originalCampaign));
  // the shipped blob itself must keep every cross-room link intact
  for (const { toRoom, id } of crossRoomTargets(originalCampaign)) {
    expect(decoded.rooms[toRoom].items[id]).toBeDefined();
  }
});
