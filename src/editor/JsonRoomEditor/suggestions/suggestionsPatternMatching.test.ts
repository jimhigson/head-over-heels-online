import { findNodeAtOffset, getLocation, parseTree } from "jsonc-parser";
import { describe, expect, it } from "vitest";

import { type AnyRoomJson } from "../../../model/RoomJson";
import { getNodeAncestors } from "./getNodeAncestors";
import { matchesPattern } from "./suggestionsPatternMatching";

describe("matchesPattern", () => {
  it("matches exact path patterns", () => {
    const jsonContent = {
      items: {
        door1: {
          type: "door" as "door",
          position: { x: 0, y: 0, z: 0 },
          config: {
            toRoom: "room2",
            direction: "away" as "away",
          },
        },
      },
    } satisfies Pick<AnyRoomJson, "items">;

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "room2" value
    const offset = jsonString.indexOf('"room2"') + 1; // +1 to be inside the string
    const toRoomValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(toRoomValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(matchesPattern("toRoom", reversedPath, nodeAncestors)).toBe(true);
    // Should not match different patterns
    expect(matchesPattern("roomAbove", reversedPath, nodeAncestors)).toBe(
      false,
    );
    // This should match since config.toRoom appears in the path
    expect(matchesPattern("config.toRoom", reversedPath, nodeAncestors)).toBe(
      true,
    );
  });

  it("matches nested exact path patterns, including the whole-room (*) NCR with.room and with.subRoom", () => {
    const jsonContent = {
      meta: {
        subRooms: {
          "*": {
            nonContiguousRelationship: {
              with: {
                room: "room123",
                subRoom: "subRoom1",
              },
            },
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // cursor at the with.room value:
    const roomOffset = jsonString.indexOf('"room123"') + 1;
    const roomAncestors = getNodeAncestors(findNodeAtOffset(tree!, roomOffset));
    const roomPath = getLocation(jsonString, roomOffset).path.toReversed();

    expect(
      matchesPattern(
        "meta.subRooms.*.nonContiguousRelationship.with.room",
        roomPath,
        roomAncestors,
      ),
    ).toBe(true);
    // Should match partial patterns at the leaf
    expect(matchesPattern("with.room", roomPath, roomAncestors)).toBe(true);
    // Should not match if pattern is in wrong order
    expect(matchesPattern("room.with", roomPath, roomAncestors)).toBe(false);
    // the room cursor is not the subRoom, so the subRoom pattern must not match
    expect(
      matchesPattern(
        "meta.subRooms.*.nonContiguousRelationship.with.subRoom",
        roomPath,
        roomAncestors,
      ),
    ).toBe(false);

    // cursor at the with.subRoom value:
    const subRoomOffset = jsonString.indexOf('"subRoom1"') + 1;
    const subRoomAncestors = getNodeAncestors(
      findNodeAtOffset(tree!, subRoomOffset),
    );
    const subRoomPath = getLocation(
      jsonString,
      subRoomOffset,
    ).path.toReversed();

    expect(
      matchesPattern(
        "meta.subRooms.*.nonContiguousRelationship.with.subRoom",
        subRoomPath,
        subRoomAncestors,
      ),
    ).toBe(true);
    // Should match partial patterns at the leaf
    expect(matchesPattern("with.subRoom", subRoomPath, subRoomAncestors)).toBe(
      true,
    );
  });

  it("matches the above.subRoom and below.subRoom patterns of a sub-room", () => {
    const jsonContent = {
      meta: {
        subRooms: {
          "*": {
            above: { room: "upRoom", subRoom: "upSub" },
            below: { room: "downRoom", subRoom: "downSub" },
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    const aboveOffset = jsonString.indexOf('"upSub"') + 1;
    const aboveAncestors = getNodeAncestors(
      findNodeAtOffset(tree!, aboveOffset),
    );
    const abovePath = getLocation(jsonString, aboveOffset).path.toReversed();
    expect(
      matchesPattern(
        "meta.subRooms.*.above.subRoom",
        abovePath,
        aboveAncestors,
      ),
    ).toBe(true);

    const belowOffset = jsonString.indexOf('"downSub"') + 1;
    const belowAncestors = getNodeAncestors(
      findNodeAtOffset(tree!, belowOffset),
    );
    const belowPath = getLocation(jsonString, belowOffset).path.toReversed();
    expect(
      matchesPattern(
        "meta.subRooms.*.below.subRoom",
        belowPath,
        belowAncestors,
      ),
    ).toBe(true);
  });

  it("matches sub-room link patterns on a named (divided) cell, not only the literal '*'", () => {
    // a divided room keys its sub-rooms by name (here "0"), not "*". The `*` in
    // the pattern is a wildcard, so this must still match - it would fail if `*`
    // were ever treated as a literal key, which is the case the other (always-
    // "*") sub-room tests can't distinguish.
    const jsonContent = {
      meta: {
        subRooms: {
          "0": {
            above: { room: "upRoom", subRoom: "upSub" },
            nonContiguousRelationship: {
              with: { room: "ncrRoom", subRoom: "ncrSub" },
            },
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    const aboveOffset = jsonString.indexOf('"upSub"') + 1;
    const aboveAncestors = getNodeAncestors(
      findNodeAtOffset(tree!, aboveOffset),
    );
    const abovePath = getLocation(jsonString, aboveOffset).path.toReversed();
    expect(
      matchesPattern(
        "meta.subRooms.*.above.subRoom",
        abovePath,
        aboveAncestors,
      ),
    ).toBe(true);

    const ncrOffset = jsonString.indexOf('"ncrSub"') + 1;
    const ncrAncestors = getNodeAncestors(findNodeAtOffset(tree!, ncrOffset));
    const ncrPath = getLocation(jsonString, ncrOffset).path.toReversed();
    expect(
      matchesPattern(
        "meta.subRooms.*.nonContiguousRelationship.with.subRoom",
        ncrPath,
        ncrAncestors,
      ),
    ).toBe(true);
  });

  it("matches patterns with wildcards", () => {
    const jsonContent = {
      items: {
        joystick1: {
          type: "joystick" as const,
          position: { x: 0, y: 0, z: 0 },
          config: {
            controls: ["someId"],
          },
        },
      },
    } satisfies Pick<AnyRoomJson, "items">;

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "someId" value
    const offset = jsonString.indexOf('"someId"') + 1;
    const someIdValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(someIdValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern("config.controls.*", reversedPath, nodeAncestors),
    ).toBe(true);

    // could have also have given the correct index:
    expect(
      matchesPattern("config.controls.0", reversedPath, nodeAncestors),
    ).toBe(true);

    // Should not match without wildcard and index that doesn't exist
    expect(
      matchesPattern("config.controls.5", reversedPath, nodeAncestors),
    ).toBe(false);
  });

  it("matches patterns with multiple wildcards", () => {
    const jsonContent = {
      config: {
        modifies: {
          switch1: {
            item1: {
              controls: {
                charles1: true,
              },
            },
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of true value for charles1
    const offset = jsonString.indexOf("true");
    const charles1ValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(charles1ValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern(
        "config.modifies.*.*.controls.*",
        reversedPath,
        nodeAncestors,
      ),
    ).toBe(true);

    // Should not match with wrong structure
    expect(
      matchesPattern(
        "config.modifies.*.controls.*",
        reversedPath,
        nodeAncestors,
      ),
    ).toBe(false);
  });

  it("does not match non-matching paths", () => {
    const jsonContent = {
      items: {
        door1: {
          type: "door" as "door",
          position: { x: 0, y: 0, z: 0 },
          config: {
            toRoom: "room2",
            direction: "away" as "away",
          },
        },
      },
    } satisfies Pick<AnyRoomJson, "items">;

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "room2" value
    const offset = jsonString.indexOf('"room2"') + 1;
    const toRoomValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(toRoomValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(matchesPattern("nonExistent", reversedPath, nodeAncestors)).toBe(
      false,
    );
    expect(matchesPattern("path.to.nowhere", reversedPath, nodeAncestors)).toBe(
      false,
    );
  });

  it("does not match when path is shorter than pattern", () => {
    const jsonContent = {
      config: {
        controls: {
          id1: true,
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset at config level (inside the config object)
    const offset = jsonString.indexOf('"controls"') - 1; // Just before "controls"
    const configNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(configNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern("config.controls.*", reversedPath, nodeAncestors),
    ).toBe(false);
  });

  it("matches when path is longer than pattern (pattern at leaf)", () => {
    const jsonContent = {
      items: {
        joystick1: {
          type: "joystick" as const,
          position: { x: 0, y: 0, z: 0 },
          config: {
            controls: ["someId"],
          },
        },
      },
    } satisfies Pick<AnyRoomJson, "items">;

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "someId" value
    const offset = jsonString.indexOf('"someId"') + 1;
    const someIdValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(someIdValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern("config.controls.*", reversedPath, nodeAncestors),
    ).toBe(true);

    // Should not match if pattern expects items at the wrong position
    expect(
      matchesPattern("items.controls.*", reversedPath, nodeAncestors),
    ).toBe(false);
  });

  it("matches wildcard in middle of pattern", () => {
    const jsonContent = {
      modifies: {
        anyValue: {
          targets: {
            targetId: "value",
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "value" string
    const offset = jsonString.indexOf('"value"') + 1;
    const targetIdValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(targetIdValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern("modifies.*.targets.*", reversedPath, nodeAncestors),
    ).toBe(true);

    // Does not match with a wrong node:
    expect(
      matchesPattern("modifies.*.targetsWrong.*", reversedPath, nodeAncestors),
    ).toBe(false);

    // Can also match without wildcards
    expect(
      matchesPattern(
        "modifies.anyValue.targets.targetId",
        reversedPath,
        nodeAncestors,
      ),
    ).toBe(true);
  });

  it("handles numeric indices in path", () => {
    const jsonContent = {
      modifies: [
        {
          targets: ["target1", "target2"],
        },
      ],
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "target2" value
    const offset = jsonString.indexOf('"target2"') + 1;
    const secondTargetNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(secondTargetNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern("modifies.*.targets.*", reversedPath, nodeAncestors),
    ).toBe(true);
  });

  describe("attribute selector syntax", () => {
    it("matches [type=door].config.toDoor from real editor scenario", () => {
      // Simulate what happens in real editor - JSON at room level
      const roomJson = {
        id: "testRoom",
        items: {
          door1: {
            type: "door",
            position: { x: 0, y: 0, z: 0 },
            config: {
              toRoom: "otherRoom",
              toDoor: "someDoor", // cursor here
              direction: "away" as const,
            },
          },
        },
      } satisfies Pick<AnyRoomJson, "id" | "items">;

      const jsonString = JSON.stringify(roomJson);
      const tree = parseTree(jsonString);

      // Find offset of "someDoor" value
      const offset = jsonString.indexOf('"someDoor"') + 1;
      const toDoorValueNode = findNodeAtOffset(tree!, offset);
      const nodeAncestors = getNodeAncestors(toDoorValueNode);

      // Get the actual path like the hook does
      const { path } = getLocation(jsonString, offset);
      const reversedPath = path.toReversed();

      expect(
        matchesPattern(
          "[type=door].config.toDoor",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(true);
    });

    it("matches [type=door].config.toDoor when cursor is at toDoor value", () => {
      const jsonContent = {
        items: {
          door1: {
            type: "door",
            position: { x: 0, y: 0, z: 0 },
            config: {
              toRoom: "otherRoom",
              toDoor: "otherDoor",
              direction: "away" as const,
            },
          },
        },
      } satisfies Pick<AnyRoomJson, "items">;

      const jsonString = JSON.stringify(jsonContent);
      const tree = parseTree(jsonString);

      // Find offset of "otherDoor" value
      const offset = jsonString.indexOf('"otherDoor"') + 1;
      const toDoorValueNode = findNodeAtOffset(tree!, offset);
      const nodeAncestors = getNodeAncestors(toDoorValueNode);

      // Get the actual path like the hook does
      const { path } = getLocation(jsonString, offset);
      const reversedPath = path.toReversed();

      expect(
        matchesPattern(
          "[type=door].config.toDoor",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(true);
    });

    it("matches patterns with [type=door] attribute selector", () => {
      const jsonContent = {
        items: {
          door1: {
            type: "door",
            position: { x: 0, y: 0, z: 0 },
            config: {
              toRoom: "otherRoom",
              toDoor: "otherDoor",
              direction: "away" as const,
            },
          },
        },
      } satisfies Pick<AnyRoomJson, "items">;

      const jsonString = JSON.stringify(jsonContent);
      const tree = parseTree(jsonString);

      // Find offset of "otherDoor" value
      const offset = jsonString.indexOf('"otherDoor"') + 1;
      const toDoorValueNode = findNodeAtOffset(tree!, offset);
      const nodeAncestors = getNodeAncestors(toDoorValueNode);

      // Get the actual path like the hook does
      const { path } = getLocation(jsonString, offset);
      const reversedPath = path.toReversed();

      expect(
        matchesPattern(
          "[type=door].config.toDoor",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(true);

      // Should not match with wrong type selector
      expect(
        matchesPattern(
          "[type=wall].config.toDoor",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(false);

      // Should still match without type selector (pattern matches at leaf)
      expect(matchesPattern("config.toDoor", reversedPath, nodeAncestors)).toBe(
        true,
      );
    });

    it("does not match attribute selector when type doesn't match", () => {
      const jsonContent = {
        items: {
          wall1: {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "away" as const,
              tiles: ["plain", "plain"],
            },
          },
        },
      } satisfies Pick<AnyRoomJson, "items">;

      const jsonString = JSON.stringify(jsonContent);
      const tree = parseTree(jsonString);

      // Find offset in tiles array - first "plain" value
      const offset = jsonString.indexOf('["plain"') + 2; // +2 to be inside first "plain"
      const tilesValueNode = findNodeAtOffset(tree!, offset);
      const nodeAncestors = getNodeAncestors(tilesValueNode);

      // Get the actual path like the hook does
      const { path } = getLocation(jsonString, offset);
      const reversedPath = path.toReversed();

      // The path will be to the array element, not "tiles" property
      // so we need to test a pattern that matches the actual structure
      expect(
        matchesPattern(
          "[type=door].config.tiles.*",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(false);

      // Should match with correct type
      expect(
        matchesPattern(
          "[type=wall].config.tiles.*",
          reversedPath,
          nodeAncestors,
        ),
      ).toBe(true);
    });
  });
});
