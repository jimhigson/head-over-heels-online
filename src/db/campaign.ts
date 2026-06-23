import { type SetOptional } from "type-fest";

import { type Tables } from "../_generated/db";
import { type EditorCampaign } from "../editor/editorTypes";
import { migrateCampaignInPlace } from "../model/inPlaceMutators/migrateCampaignInPlace";
import {
  type Campaign,
  type CampaignLocator,
  type DbCampaign,
} from "../model/modelTypes";
import { type CampaignDbClient } from "./CampaignDbClient";
import {
  compressCampaignObject,
  decompressCampaignObject,
} from "./compressCampaignObject";

/** strip the column-backed fields, leaving only what belongs in the db blob */
export const campaignToDbCampaign = <RoomId extends string>(
  campaign: Pick<Campaign<RoomId>, "rooms">,
): DbCampaign<RoomId> => ({ rooms: campaign.rooms });

/**
 * Rebuild a full Campaign from the db blob plus the row's columns (the source of
 * truth for everything except the rooms). Any stale locator/meta/name baked into
 * old blobs is dropped here - only `rooms` is read from the blob.
 */
export const dbCampaignToCampaign = <RoomId extends string>(
  dbCampaign: DbCampaign<RoomId>,
  row: Pick<
    Tables<"campaigns">,
    "created_by" | "name" | "published" | "version"
  >,
): Campaign<RoomId> => ({
  rooms: dbCampaign.rooms,
  locator: {
    userId: row.created_by,
    campaignName: row.name,
    version: row.version,
  },
  meta: { published: row.published },
});

export type CampaignGetLocator = SetOptional<
  CampaignLocator,
  /**
   * userId is optional - will use the current user if not given
   */
  | "userId"
  /**
   * version is optional - will get the latest if not given
   */
  | "version"
>;

export type SaveFailureType = "auth" | "conflict" | "network" | "other";

export type SaveFailure = {
  type: SaveFailureType;
  /** for a conflict, the newer version now in the db (when the error reveals it) */
  latest?: number;
  message: string;
};

export type SaveResult =
  | { failure: SaveFailure; ok: false }
  | { ok: true; version: number };

/** map a db / transport error from a save into a category the editor can act on */
export const classifySaveError = (error: {
  code?: null | string;
  message?: string;
}): SaveFailure => {
  const message = error.message ?? "save failed";
  const { code } = error;

  // explicit force-with-lease rejection, or a unique (user, name, version) race -
  // both mean someone saved underneath us
  if (code === "P0001" || message.includes("stale_base_version")) {
    const [, found] = /found (\d+)/.exec(message) ?? [];
    return {
      type: "conflict",
      latest: found === undefined ? undefined : Number(found),
      message,
    };
  }
  if (code === "23505") {
    return { type: "conflict", message };
  }
  // anon / no auth.uid() (created_by null), or a rejected / expired jwt
  if (code === "23502" || code === "PGRST301" || code === "42501") {
    return { type: "auth", message };
  }
  // no postgres error code -> a transport / network failure
  if (code === null || code === undefined) {
    return { type: "network", message };
  }
  return { type: "other", message };
};

export const saveCampaignToDb = async (
  /**
   * client for the rpc call - saving requires a logged-in user, so this
   * should be the authed (editor) client
   */
  db: CampaignDbClient,
  campaign: EditorCampaign,
  {
    baseVersion,
    force = false,
  }: {
    /** the version we believe is latest (force-with-lease); null skips the check */
    baseVersion: null | number;
    /** save regardless of the lease, overwriting any newer work */
    force?: boolean;
  },
): Promise<SaveResult> => {
  if (campaign.locator.campaignName === undefined) {
    throw new Error("can not save a campaign without a name");
  }

  try {
    const res = await db.rpc("save_campaign_version", {
      p_name: campaign.locator.campaignName,
      p_data: await compressCampaignObject(campaignToDbCampaign(campaign)),
      p_published: campaign.meta?.published ?? false,
      // undefined omits the arg, so the proc uses its NULL default (skip the lease)
      p_base_version: baseVersion ?? undefined,
      p_force: force,
    });

    if (res.error) {
      return { ok: false, failure: classifySaveError(res.error) };
    }
    return { ok: true, version: res.data };
  } catch (e) {
    // threw before a db response came back - treat as a transport failure
    return {
      ok: false,
      failure: {
        type: "network",
        message: e instanceof Error ? e.message : "could not reach the server",
      },
    };
  }
};

export const loadCampaignFromDb = async (
  /** client for the rpc call */
  db: CampaignDbClient,
  options: CampaignGetLocator,
): Promise<Campaign<string>> => {
  const res = await db.rpc("get_latest_campaign", {
    p_campaign_name: options.campaignName,
    p_user_id: options.userId,
    // the db doesn't recognise -1 - needs undefined
    p_version: options.version === -1 ? undefined : options.version,
  });

  if (res.error) {
    throw new Error("could not get campaign", { cause: res.error });
  }

  const dbCampaign = await decompressCampaignObject<DbCampaign<string>>(
    res.data.data,
  );

  // db campaigns can predate format changes (eg walls without tiles):
  migrateCampaignInPlace(dbCampaign);

  // rebuild from the row's columns (the source of truth); stale locator/meta/name
  // baked into old blobs is dropped - only rooms is read from the blob
  return dbCampaignToCampaign(dbCampaign, res.data);
};

/**
 * The latest version number the db holds for a (user, campaign), or 0 if it has
 * never been saved. Lightweight (no data blob) - used to detect that the db has
 * moved ahead of a loaded campaign. Deliberately NOT localStorage-cached: a stale
 * offline fallback would defeat the staleness check.
 */
export const getLatestCampaignVersion = async (
  /** client for the rpc call */
  db: CampaignDbClient,
  locator: Pick<CampaignLocator, "campaignName" | "userId">,
): Promise<number> => {
  const res = await db.rpc("get_latest_campaign_version", {
    p_campaign_name: locator.campaignName,
    p_user_id: locator.userId,
  });

  if (res.error) {
    throw new Error("could not get latest campaign version", {
      cause: res.error,
    });
  }

  return res.data;
};

export type CampaignInfoInDirectory = {
  name: string;
  version: number;
  created_at: string;
};

export type CampaignDirectory = {
  [userId: string]: {
    user: {
      id: string;
      username: string;
      isCurrentUser: boolean;
    };
    campaigns: {
      [campaignName: string]: CampaignInfoInDirectory;
    };
  };
};

export const getAllUsersLatestCampaigns = async (
  /** client for the rpc call */
  db: CampaignDbClient,
  {
    publishedOnly,
  }: {
    publishedOnly: boolean;
  },
): Promise<CampaignDirectory> => {
  const res = await db.rpc("get_all_users_latest_campaigns", {
    p_published_only: publishedOnly,
  });

  if (res.error) {
    throw new Error("could not get user campaigns", { cause: res.error });
  }

  return res.data as CampaignDirectory;
};
