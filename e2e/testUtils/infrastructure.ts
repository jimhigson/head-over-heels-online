import { test } from "@playwright/test";

import {
  type JsonItemType,
  type JsonItemUnion,
} from "../../src/model/json/JsonItem";
import { type Campaign } from "../../src/model/modelTypes";
import { entries } from "../../src/utils/entries";

// CI is slower, needs more time, even on arm64 runners (fastest on github).
// Windows is even slower (on the Github runners at least).
export const osSlowness =
  process.platform === "win32" ? 4
  : process.env.CI ? 1.5
  : 1;

/**
 * Pause before user-visible UI events (eg menu item clicks) so a human
 * watching the test in headed mode can follow what's happening. Returns 0
 * in headless mode (CI etc.) so tests don't pay the cost when nobody's
 * looking.
 */
export const slownessForHumanObserver = (): number =>
  test.info().project.use.headless === false ? 1_000 : 0;

/**
 * camera-rotation-family specs (rotation, sweep, transition) render in just the 2 most important
 * browsers so we don't have too many screenshots
 */
export const restrictToCameraRotationProjects = (): void => {
  const projectNames = ["chromium-desktop", "mobile-safari"];
  test.beforeEach(() => {
    const { name } = test.info().project;
    test.skip(
      !projectNames.includes(name),
      `camera-rotation snapshots are not browser-specific; run only on ${projectNames.join(", ")}`,
    );
  });
};

/** Resolves which room IDs to include based on filter parameters. */
export function* resolveRoomIds<RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  {
    rooms: roomsSpec,
    roomsContaining,
  }: {
    /** Comma-separated list of room IDs or patterns with * wildcard (e.g., "blacktooth*,moonbase*") */
    rooms: string | undefined;
    /** Filter to rooms containing a specific item type (e.g., "conveyor") or type[configProp=value] (e.g., "monster[which=skiHead]") */
    roomsContaining: string | undefined;
  },
): Generator<RoomId> {
  const patternRegexes = roomsSpec
    ?.split(",")
    .map((pattern) => new RegExp(`^${pattern.replace(/\*/g, ".*")}$`));
  const patternFilter =
    patternRegexes === undefined ? undefined : (
      (roomId: RoomId): boolean =>
        patternRegexes.some((regex) => regex.test(roomId))
    );

  const filterPattern =
    /^(?<type>[^[]+)(?:\[(?<prop>[^=]+)=(?<value>[^\]]+)\])?$/;

  const roomsContainingSpecs = roomsContaining?.split(",");

  const contentFilters = roomsContainingSpecs?.map((filter) => {
    const match = filterPattern.exec(filter);
    if (!match?.groups) {
      throw new Error(`Invalid ROOMS_CONTAINING filter syntax: ${filter}`);
    }
    const { type, prop, value } = match.groups;
    return {
      type: type as JsonItemType,
      requiredConfigAttr: prop,
      requiredConfigValue: value,
    };
  });

  const itemMatchesFilter = (
    { type, config }: JsonItemUnion<RoomId>,
    requiredType: JsonItemType,
    requiredConfigAttr: string,
    requiredConfigValue: unknown,
  ): boolean =>
    type === requiredType &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config as any)[requiredConfigAttr] === requiredConfigValue;

  const contentFilter =
    contentFilters === undefined ? undefined : (
      (room: Campaign<RoomId>["rooms"][RoomId]): boolean =>
        Object.values(room.items).some((item) =>
          contentFilters.some(
            ({ type, requiredConfigAttr, requiredConfigValue }) =>
              itemMatchesFilter(
                item,
                type,
                requiredConfigAttr,
                requiredConfigValue,
              ),
          ),
        )
    );

  const noFilters = patternFilter === undefined && contentFilter === undefined;

  for (const [roomId, room] of entries(rooms)) {
    const matchesPattern = patternFilter?.(roomId);
    const matchesContents = contentFilter?.(room);

    if (noFilters || matchesPattern || matchesContents) {
      yield roomId;
    }
  }
}
