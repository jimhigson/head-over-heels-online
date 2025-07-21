import { expect, test } from "vitest";
import { convertCampaign } from "./convertCampaign";

test("covert campaign handbrake to protect against accidental changes", async () => {
  //the whole original campaign in a single snapshot - if this test breaks but a change was intentional, regenerate the snapshots
  expect(await convertCampaign()).toMatchSnapshot();
});
