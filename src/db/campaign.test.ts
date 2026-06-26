import { expect, test } from "vitest";

import { type Campaign } from "../model/modelTypes";
import {
  campaignToDbCampaign,
  classifySaveError,
  dbCampaignToCampaign,
  type SaveFailure,
} from "./campaign";

// the converters never inspect room contents, so an empty rooms record is enough
const rooms = {} as Campaign<string>["rooms"];

test("campaignToDbCampaign keeps only the rooms (column-backed fields stripped)", () => {
  const campaign: Campaign<string> = {
    rooms,
    locator: { userId: "u1", campaignName: "c", version: 5 },
    meta: { published: true },
  };
  expect(campaignToDbCampaign(campaign)).toEqual({ rooms });
});

test("dbCampaignToCampaign rebuilds locator and meta from the row's columns", () => {
  expect<Campaign<string>>(
    dbCampaignToCampaign(
      { rooms },
      {
        created_by: "user-42",
        name: "my campaign",
        version: 7,
        published: true,
      },
    ),
  ).toEqual<Campaign<string>>({
    rooms,
    locator: { userId: "user-42", campaignName: "my campaign", version: 7 },
    meta: { published: true },
  });
});

test("dbCampaignToCampaign drops stale locator/meta/name baked into an old blob", () => {
  // an old full-campaign blob, decompressed and read as a DbCampaign
  const oldBlob = {
    rooms,
    locator: { userId: "STALE", campaignName: "STALE", version: 1 },
    meta: { published: false },
    name: "stale-top-level-name",
  } as unknown as Parameters<typeof dbCampaignToCampaign>[0];

  // toEqual is exact, so this also asserts no stale `name`/fields leak through
  expect<Campaign<string>>(
    dbCampaignToCampaign(oldBlob, {
      created_by: "real-user",
      name: "real name",
      version: 9,
      published: true,
    }),
  ).toEqual<Campaign<string>>({
    rooms,
    locator: { userId: "real-user", campaignName: "real name", version: 9 },
    meta: { published: true },
  });
});

test("classifySaveError maps a stale-base-version rejection to a conflict with the latest version", () => {
  expect<SaveFailure>(
    classifySaveError({
      code: "P0001",
      message: "stale_base_version: expected latest 6, found 7",
    }),
  ).toEqual<SaveFailure>({
    type: "conflict",
    latest: 7,
    message: "stale_base_version: expected latest 6, found 7",
  });
});

test("classifySaveError maps a unique-version race (23505) to a conflict", () => {
  expect(
    classifySaveError({ code: "23505", message: "duplicate key value" }).type,
  ).toBe("conflict");
});

test("classifySaveError maps a not-null created_by (23502) to auth", () => {
  expect(classifySaveError({ code: "23502", message: "null value" }).type).toBe(
    "auth",
  );
});

test("classifySaveError maps a missing error code to network", () => {
  expect(classifySaveError({ message: "Failed to fetch" }).type).toBe(
    "network",
  );
});

test("classifySaveError falls back to other for an unrecognised code", () => {
  expect(classifySaveError({ code: "42P01", message: "boom" }).type).toBe(
    "other",
  );
});
