import { findNodeAtOffset, getLocation, parseTree } from "jsonc-parser";
import { describe, expect, it } from "vitest";

import type { AnyRoomJson } from "../../../model/RoomJson";

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

  it("matches nested exact path patterns", () => {
    const jsonContent = {
      meta: {
        nonContiguousRelationship: {
          with: {
            room: "room123",
          },
        },
      },
    };

    const jsonString = JSON.stringify(jsonContent);
    const tree = parseTree(jsonString);

    // Find offset of "room123" value
    const offset = jsonString.indexOf('"room123"') + 1;
    const roomValueNode = findNodeAtOffset(tree!, offset);
    const nodeAncestors = getNodeAncestors(roomValueNode);

    // Get the actual path like the hook does
    const { path } = getLocation(jsonString, offset);
    const reversedPath = path.toReversed();

    expect(
      matchesPattern(
        "meta.nonContiguousRelationship.with.room",
        reversedPath,
        nodeAncestors,
      ),
    ).toBe(true);

    // Should match partial patterns at the leaf
    expect(matchesPattern("with.room", reversedPath, nodeAncestors)).toBe(true);

    // Should not match if pattern is in wrong order
    expect(matchesPattern("room.with", reversedPath, nodeAncestors)).toBe(
      false,
    );
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
