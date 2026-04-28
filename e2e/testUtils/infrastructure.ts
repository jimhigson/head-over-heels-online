import type { Page } from "@playwright/test";

import { test } from "@playwright/test";
import chalk from "chalk";

import type {
  JsonItemType,
  JsonItemUnion,
} from "../../src/model/json/JsonItem";
import type { Campaign } from "../../src/model/modelTypes";

import { entries } from "../../src/utils/entries";
import { elapsed, formatDuration } from "./logging";

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
  test.info().project.use.headless === false ? 1000 : 0;

export const retryWithRecovery = async <T>({
  action,
  recovery,
  maxAttempts = 5,
  logHeader,
  actionDescription,
  page,
  screenshotPrefix,
}: {
  action: (attempt: number) => Promise<T>;
  recovery?: (attempt: number) => Promise<void>;
  maxAttempts?: number;
  logHeader: string;
  actionDescription: string;
  page: Page;
  screenshotPrefix: string;
}): Promise<T> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(
      `${logHeader} ${elapsed()} Attempting ${actionDescription} (attempt ${attempt}/${maxAttempts - 1})...`,
    );

    const startTime = performance.now();
    try {
      const result = await action(attempt);
      console.log(
        `${logHeader} ${elapsed()} ... succeeded after`,
        chalk.yellow(formatDuration(performance.now() - startTime)),
      );
      return result;
    } catch (error) {
      console.log(
        `${logHeader} ${elapsed()} ${chalk.red(`Failed on attempt ${attempt}`)}: ${error}`,
      );

      // Take a screenshot on failure
      const screenshotPath = `test-results/${screenshotPrefix}-attempt-${attempt}-failed.png`;
      console.log(
        `${logHeader} ${elapsed()} Saving screenshot to ${screenshotPath}`,
      );
      await page
        .screenshot({
          path: screenshotPath,
          fullPage: false,
        })
        .catch((screenshotError) => {
          console.log(
            `${logHeader} ${elapsed()} Failed to save screenshot: ${screenshotError}`,
          );
        });

      if (attempt < maxAttempts - 1) {
        await page.waitForTimeout(500 * osSlowness);
        if (recovery) {
          await recovery(attempt);
        }
      } else {
        throw new Error(
          `Failed ${actionDescription} after ${maxAttempts} attempts: ${error}`,
        );
      }
    }
  }

  throw new Error(`Failed ${actionDescription} after ${maxAttempts} attempts`);
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
