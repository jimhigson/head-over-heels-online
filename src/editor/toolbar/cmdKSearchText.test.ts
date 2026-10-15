import { expect, test } from "vitest";

import { fuzzyMatchRank } from "../../ui/command/fuzzyMatch";
import { type ActionCommand } from "../commands/EditorCommand";
import { cmdKSearchText } from "./cmdKSearchText";

const shieldCommand: ActionCommand = {
  type: "action",
  label: "Shield pickup",
  synonyms: ["invincible", "iron pills"],
  action: () => () => {},
};

test("a command is found by one of its synonyms", () => {
  expect(
    fuzzyMatchRank(
      cmdKSearchText("pickup.shield", shieldCommand),
      "iron pills",
    ),
  ).not.toBeNull();
});

test("a command is still found by its label", () => {
  expect(
    fuzzyMatchRank(cmdKSearchText("pickup.shield", shieldCommand), "shield"),
  ).not.toBeNull();
});
