import { expect, test } from "vitest";

import type { AnyRoomJson } from "../../model/RoomJson";
import type { RoomJsonFloorsExtent } from "./floorsExtent";

import { roomJsonFloorsExtent } from "./floorsExtent";

test("returns undefined for room with no floors", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      wall1: {
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 5 },
        },
      },
      monster1: {
        type: "monster",
        position: { x: 2, y: 2, z: 0 },
        config: {
          which: "dalek",
          activated: "on",
          movement: "patrol-randomly-diagonal",
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toBeUndefined();
});

test("calculates extent for room with single floor", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 2, y: 3, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 4, y: 5 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 2, y: 3, z: 0 },
    to: { x: 6, y: 8, z: 0 }, // 2+4, 3+5, 0
  });
});

test("calculates extent for room with multiple non-overlapping floors", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 1, y: 1, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 3, y: 3 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 10, y: 10, z: 2 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 5, y: 5 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 1, y: 1, z: 0 },
    to: { x: 15, y: 15, z: 2 }, // max(1+3, 10+5), max(1+3, 10+5), max(0, 2)
  });
});

test("calculates extent for room with overlapping floors", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 2, y: 2, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 6, y: 6 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 5, y: 5, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 2, y: 2, z: 0 },
    to: { x: 13, y: 13, z: 0 }, // max(2+6, 5+8), max(2+6, 5+8)
  });
});

test("handles floors at different z-levels", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 5, y: 5 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 2, y: 2, z: 3 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 3, y: 3 },
        },
      },
      floor3: {
        type: "floor",
        position: { x: 1, y: 1, z: -1 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 2, y: 2 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 0, y: 0, z: -1 },
    to: { x: 5, y: 5, z: 3 },
  });
});

test("handles floors with different floor types", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 3, y: 3 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 5, y: 5, z: 0 },
        config: {
          floorType: "deadly",
          times: { x: 4, y: 4 },
        },
      },
      floor3: {
        type: "floor",
        position: { x: 2, y: 8, z: 0 },
        config: {
          floorType: "none",
          times: { x: 2, y: 2 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 0, y: 0, z: 0 },
    to: { x: 9, y: 10, z: 0 }, // max(0+3, 5+4, 2+2), max(0+3, 5+5, 8+2)
  });
});

test("handles floors at negative positions", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: -5, y: -3, z: -2 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 8 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 2, y: 3, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 3, y: 3 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: -5, y: -3, z: -2 },
    to: { x: 5, y: 6, z: 0 }, // max(-5+10, 2+3), max(-3+8, 3+3)
  });
});

test("handles single tile floors (times 1x1)", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 4, y: 4, z: 2 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 1, y: 1 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 4, y: 4, z: 2 },
    to: { x: 5, y: 5, z: 2 },
  });
});

test("handles large floors", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 10, y: 20, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 50, y: 60 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 10, y: 20, z: 0 },
    to: { x: 60, y: 80, z: 0 },
  });
});

test("ignores non-floor items when calculating extent", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      floor1: {
        type: "floor",
        position: { x: 5, y: 5, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 3, y: 3 },
        },
      },
      wall1: {
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 20 },
        },
      },
      block1: {
        type: "block",
        position: { x: 10, y: 10, z: 0 },
        config: {
          style: "organic",
          times: { x: 5, y: 5 },
        },
      },
      monster1: {
        type: "monster",
        position: { x: 15, y: 15, z: 0 },
        config: {
          which: "dalek",
          activated: "on",
          movement: "patrol-randomly-diagonal",
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 5, y: 5, z: 0 },
    to: { x: 8, y: 8, z: 0 },
  });
});

test("handles room with many floors forming complex shape", () => {
  const roomJson: AnyRoomJson = {
    id: "testRoom",
    planet: "blacktooth",
    color: { hue: "green", shade: "basic" },
    items: {
      // L-shaped room
      floor1: {
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 5 },
        },
      },
      floor2: {
        type: "floor",
        position: { x: 0, y: 5, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 5, y: 15 },
        },
      },
      // Separate island
      floor3: {
        type: "floor",
        position: { x: 15, y: 10, z: 2 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
      },
    },
  };

  const extent = roomJsonFloorsExtent(roomJson);

  expect(extent).toEqual<RoomJsonFloorsExtent>({
    from: { x: 0, y: 0, z: 0 },
    to: { x: 23, y: 20, z: 2 }, // max(10, 5, 15+8), max(5, 5+15, 10+8)
  });
});
