import { expect, test } from "vitest";

import { type AnyRoomJson } from "../RoomJson";
import { migrateTeleporterActivationInPlace } from "./migrateTeleporterActivationInPlace";

const roomWithTeleporterConfig = (config: object): AnyRoomJson =>
  ({
    id: "room",
    planet: "egyptus",
    color: { hue: "cyan", shade: "basic" },
    items: {
      t: { type: "teleporter", position: { x: 0, y: 0, z: 0 }, config },
    },
  }) as unknown as AnyRoomJson;

test("a teleporter conditional on a store path names the planet instead", () => {
  const room = roomWithTeleporterConfig({
    toRoom: "elsewhere",
    activatedOnStoreValue: "planetsLiberated.egyptus",
  });
  migrateTeleporterActivationInPlace(room);

  expect(room.items["t"]?.config).toEqual({
    toRoom: "elsewhere",
    activatedIfPlanetLiberated: "egyptus",
  });
});

test("a teleporter already naming its planet is left as it is", () => {
  const room = roomWithTeleporterConfig({
    toRoom: "elsewhere",
    activatedIfPlanetLiberated: "safari",
  });
  migrateTeleporterActivationInPlace(room);

  expect(room.items["t"]?.config).toEqual({
    toRoom: "elsewhere",
    activatedIfPlanetLiberated: "safari",
  });
});

test("a teleporter with no condition is left as it is", () => {
  const room = roomWithTeleporterConfig({ toRoom: "elsewhere" });
  migrateTeleporterActivationInPlace(room);

  expect(room.items["t"]?.config).toEqual({ toRoom: "elsewhere" });
});
