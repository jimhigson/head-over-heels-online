import type { OriginalCampaignRoomId } from "../src/originalCampaign/OriginalCampaignRoomId";

export type ScreenshotTestOptions = {
  rooms?: OriginalCampaignRoomId[];
  noUncolourised?: boolean;
  mainMenuOnly?: boolean;
};
