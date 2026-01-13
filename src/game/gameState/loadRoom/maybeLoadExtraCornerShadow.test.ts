import { expect, test } from "vitest";

import type { OriginalCampaignRoomId } from "../../../_generated/originalCampaign/OriginalCampaignRoomId";

import { campaign } from "../../../_generated/originalCampaign/campaign";
import { entries } from "../../../utils/entries";
import { maybeLoadExtraCornerShadow } from "./maybeLoadExtraCornerShadow";

const roomsWithExtraCornerShadow = new Set<OriginalCampaignRoomId>([
  "blacktooth11",
  "blacktooth20",
  "blacktooth27fish",
  "blacktooth50market",
  "blacktooth62fish",
  "blacktooth66",
  "blacktooth71",
  "blacktooth72",
  "blacktooth74",
  "bookworld1",
  "bookworld9",
  "bookworld12fish",
  "bookworld16",
  "bookworld23",
  "egyptus8",
  "egyptus18",
  "egyptus24",
  "egyptus26",
  "egyptus28",
  "moonbase7",
  "moonbase12",
  "moonbase14",
  "moonbase16",
  "moonbase20",
  "moonbase23",
  "penitentiary11",
  "penitentiary26",
  "penitentiary28",
  "safari7",
  "safari23",
]);

const roomsWithShadow = entries(campaign.rooms).filter(([roomId]) =>
  roomsWithExtraCornerShadow.has(roomId),
);
const roomsWithoutShadow = entries(campaign.rooms).filter(
  ([roomId]) => !roomsWithExtraCornerShadow.has(roomId),
);

test.each(roomsWithShadow)("%s has the extra corner shadow", (_, roomJson) => {
  const yieldCount = [...maybeLoadExtraCornerShadow(roomJson)].length;
  expect(yieldCount).toBe(1);
});

test.each(roomsWithoutShadow)(
  "%s does not have the extra corner shadow",
  (_, roomJson) => {
    const yieldCount = [...maybeLoadExtraCornerShadow(roomJson)].length;
    expect(yieldCount).toBe(0);
  },
);
