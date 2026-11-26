import { afterEach, expect, test, vi } from "vitest";

import { editorRoomUrl } from "./editorRoomUrl";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("names the campaign and room in an editor served beside the game", () => {
  vi.stubGlobal("window", {
    location: { href: "https://example.com/?cheats=1#moonbase2" },
  });

  expect(
    editorRoomUrl(
      "/editor/",
      { userId: "@@original", campaignName: "original", version: -1 },
      "blacktooth1",
    ),
  ).toBe(
    "https://example.com/editor/?campaignName=original&campaignAuthorUserId=%40%40original#blacktooth1",
  );
});

test("escapes a room id's characters in an editor on its own origin", () => {
  vi.stubGlobal("window", { location: { href: "https://example.com/" } });

  expect(
    editorRoomUrl(
      "https://ed.example.com/",
      { userId: "user-1", campaignName: "my rooms", version: 3 },
      "café#1",
    ),
  ).toBe(
    "https://ed.example.com/?campaignName=my+rooms&campaignAuthorUserId=user-1#caf%C3%A9%231",
  );
});
