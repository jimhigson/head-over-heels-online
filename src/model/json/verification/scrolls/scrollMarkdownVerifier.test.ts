import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import type { VerificationCampaign } from "../verificationTypes";
import type { MarkdownProblem } from "./markdownValid";
import { scrollMarkdownVerifier } from "./scrollMarkdownVerifier";

test("flags a scroll with a heading missing its space", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: { gives: "scroll", source: "inline", markdown: "##Godspede" },
  });

  const [issue] = runCheck(scrollMarkdownVerifier, campaignOf({ roomA }));

  expect({ itemIds: issue.itemIds, fixable: issue.fixable }).toEqual({
    itemIds: [itemId],
    fixable: true,
  });
});

test("flags a heading missing its space in a later paragraph", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: ["## Fine", "text", "###Not fine"],
    },
  });

  expect(
    runCheck(scrollMarkdownVerifier, campaignOf({ roomA })).map(
      ({ issueData: { problem } }) => problem,
    ),
  ).toEqual<MarkdownProblem[]>([
    { type: "headingMissingSpace", heading: "###Not fine" },
  ]);
});

test("accepts headings with their space", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: ["## Fine", "### Also\tfine", "a #hash mid-line"],
    },
  });

  expect(runCheck(scrollMarkdownVerifier, campaignOf({ roomA }))).toEqual([]);
});

test.for([
  {
    shownAsWritten: "#s in a fenced code block",
    markdown: "```sh\n#!/bin/sh\n#comment\n```",
  },
  {
    shownAsWritten: "an image in a fenced code block",
    markdown: "```\n![](texture-noSuchThing)\n```",
  },
  {
    shownAsWritten: "an image in an indented code block",
    markdown: "text\n\n    ![](texture-noSuchThing)",
  },
  {
    shownAsWritten: "an image in inline code",
    markdown: "an image is written `![](texture-noSuchThing)`",
  },
  {
    shownAsWritten: "an escaped image",
    markdown: "\\![](texture-noSuchThing)",
  },
])("accepts $shownAsWritten, which shows as written", ({ markdown }) => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: { gives: "scroll", source: "inline", markdown },
  });

  expect(runCheck(scrollMarkdownVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("fixing a heading leaves the same line in a code block as written", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: "##Install\n```\n##Install\n```",
    },
  });
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(scrollMarkdownVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect<VerificationCampaign["rooms"][string]["items"][string]>(
    fixed.rooms.roomA.items[itemId],
  ).toEqual({
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: "## Install\n```\n##Install\n```",
    },
  });
});

test("fixing a heading adds its space, keeping the rest of the scroll", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: ["##Emperors\nThe Emperor\n###Guards", "## Fine", "##Emperors"],
    },
  });
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(scrollMarkdownVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect<VerificationCampaign["rooms"][string]["items"][string]>(
    fixed.rooms.roomA.items[itemId],
  ).toEqual({
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "## Emperors\nThe Emperor\n###Guards",
        "## Fine",
        "## Emperors",
      ],
    },
  });
});

test("flags an image of a texture that doesn't exist", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: "![](texture-noSuchThing)text",
    },
  });

  const [issue] = runCheck(scrollMarkdownVerifier, campaignOf({ roomA }));

  expect({ itemIds: issue.itemIds, fixable: issue.fixable }).toEqual({
    itemIds: [itemId],
    fixable: false,
  });
});

test("flags an image of a texture that not every spritesheet has", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      // toppy's heels has no standing frames
      markdown: "![](texture-heels_standing_d4)text",
    },
  });

  expect(
    runCheck(scrollMarkdownVerifier, campaignOf({ roomA })).map(
      ({ issueData: { problem } }) => problem,
    ),
  ).toEqual<MarkdownProblem[]>([
    { type: "unknownImageTexture", textureClass: "texture-heels_standing_d4" },
  ]);
});

test("an image named with direction names can be fixed", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: "![](texture-head_walking_right_2)text",
    },
  });

  const [issue] = runCheck(scrollMarkdownVerifier, campaignOf({ roomA }));

  expect(issue.fixable).toBe(true);
});

test("flags each problem in a scroll once", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "##Please\n![](texture-cyberman_towards)one",
        "##Please\n![](texture-cyberman_towards?float-right)two",
        "![](texture-heels_standing_towards)three",
      ],
    },
  });

  expect(
    runCheck(scrollMarkdownVerifier, campaignOf({ roomA })).map(
      ({ issueData: { problem } }) => problem,
    ),
  ).toEqual<MarkdownProblem[]>([
    { type: "headingMissingSpace", heading: "##Please" },
    { type: "unknownImageTexture", textureClass: "texture-cyberman_towards" },
    {
      type: "unknownImageTexture",
      textureClass: "texture-heels_standing_towards",
    },
  ]);
});

test("accepts images of textures and animations, with or without other classes", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "![](texture-doughnuts)one",
        "![](texture-crown_bookworld?float-right)two",
        "![](texture-animated-dalek?float-right&clear-right)three",
        "![](texture-animated-reversed-dalek)four",
        "![](texture-sticks ?float-left&clear-left)five",
      ],
    },
  });

  expect(runCheck(scrollMarkdownVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("fixing an image changes every image of its texture, keeping their other classes", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "![](texture-blacktooth_wall_shield_away?bg-pureBlack&float-right)one",
        "![](texture-blacktooth_wall_shield_away)two![](texture-doughnuts)",
      ],
    },
  });
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(scrollMarkdownVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect<VerificationCampaign["rooms"][string]["items"][string]>(
    fixed.rooms.roomA.items[itemId],
  ).toEqual({
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "![](texture-blacktooth_wall_shield_d2?bg-pureBlack&float-right)one",
        "![](texture-blacktooth_wall_shield_d2)two![](texture-doughnuts)",
      ],
    },
  });
});

test("applying every fix in turn leaves no problems", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "##Please\n![](texture-cyberman_towards)one",
        "###Again\n![](texture-heels_walking_towards_2)two",
      ],
    },
  });
  const campaign = campaignOf({ roomA });

  const fixed = runCheck(scrollMarkdownVerifier, campaign).reduce(
    (fixedCampaign, { verifier, issueData }) =>
      verifier.fix(fixedCampaign, issueData),
    campaign,
  );

  expect(runCheck(scrollMarkdownVerifier, fixed)).toEqual([]);
});

test("applying every fix in turn leaves no problems when an image fix changes a heading's line", () => {
  const roomA = newRoom();
  addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: [
        "![](texture-cyberman_towards)a",
        "##Cyberman ![](texture-cyberman_towards)",
      ],
    },
  });
  const campaign = campaignOf({ roomA });

  const fixed = runCheck(scrollMarkdownVerifier, campaign).reduce(
    (fixedCampaign, { verifier, issueData }) =>
      verifier.fix(fixedCampaign, issueData),
    campaign,
  );

  expect(runCheck(scrollMarkdownVerifier, fixed)).toEqual([]);
});

test("fixing a heading the scroll doesn't have throws", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: { gives: "scroll", source: "inline", markdown: "## Fine" },
  });

  expect(() =>
    scrollMarkdownVerifier.fix(campaignOf({ roomA }), {
      roomId: "roomA",
      itemId,
      problem: { type: "headingMissingSpace", heading: "##Fine" },
    }),
  ).toThrow();
});

test("fixing an image no texture is like throws", () => {
  const roomA = newRoom();
  const itemId = addItem(roomA, "scroll_test", {
    type: "pickup",
    position: { x: 1, y: 1, z: 0 },
    config: {
      gives: "scroll",
      source: "inline",
      markdown: "![](texture-noSuchThing)text",
    },
  });

  expect(() =>
    scrollMarkdownVerifier.fix(campaignOf({ roomA }), {
      roomId: "roomA",
      itemId,
      problem: {
        type: "unknownImageTexture",
        textureClass: "texture-noSuchThing",
      },
    }),
  ).toThrow();
});
