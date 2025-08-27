import { describe, expect, test } from "vitest";

import { convertCampaign } from "./convertCampaign";

const converted = await convertCampaign();

describe("covert campaign handbrake to protect against accidental changes", async () => {
  test.each(Object.entries(converted.rooms))(
    "%s",
    async (_campaignName, campaign) => {
      expect(campaign).toMatchSnapshot();
    },
  );
});
