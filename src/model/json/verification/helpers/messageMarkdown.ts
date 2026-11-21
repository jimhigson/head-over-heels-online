import { escapeMarkdown } from "../../../../utils/markdown/escapeMarkdown";
import type { VerificationRoomItemId } from "../verificationTypes";

/**
 * an item's id as it shows in a verification message: strong, and escaped so
 * the id shows exactly as written
 */
export const itemIdMd = (itemId: VerificationRoomItemId): string =>
  `**${escapeMarkdown(itemId)}**`;

/**
 * any other value from the campaign (room ids, types, directions...) as it
 * shows in a verification message: emphasised, and escaped so it shows exactly
 * as written
 */
export const valueMd = (value: string): string => `*${escapeMarkdown(value)}*`;
