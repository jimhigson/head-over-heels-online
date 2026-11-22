import { describe, expect, test } from "vitest";

import { emptyArray } from "../../utils/empty";
import type { Xyz, XyzBox } from "../../utils/vectors/vectors";
import { SpatialIndex } from "../physics/gridSpace/SpatialIndex";
import {
  appendApproximateCollisionsTowardsWithIndex,
  type CollideableItem,
  collision2Items,
  collisionBoxWithIndex,
  collisionItemWithIndex,
  findCollisionBoxWithIndex,
  hasCollisionBoxWithIndex,
  hasCollisionItemWithIndex,
} from "./aabbCollision";

describe("collision1to1", () => {
  test("overlapping items in x collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
        },
        {
          id: "itemB",
          state: { box: { x: 0.5, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
        },
      ),
    ).toBe(true);
  });

  test("overlapping items in y collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
        },
        {
          id: "itemB",
          state: { box: { x: 0, y: 0.5, z: 0, xd: 1, yd: 1, zd: 1 } },
        },
      ),
    ).toBe(true);
  });

  test("overlapping items in z collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
        },
        {
          id: "itemB",
          state: { box: { x: 0, y: 0, z: 0.5, xd: 1, yd: 1, zd: 1 } },
        },
      ),
    ).toBe(true);
  });
});

describe("collisionItemWithIndex", () => {
  test("finds the collision items using spatial index", () => {
    const subject: CollideableItem = {
      id: "subject",
      state: { box: { x: 0, y: 0, z: 0, xd: 2, yd: 1, zd: 1 } },
    };

    const colliding1: CollideableItem = {
      id: "colliding1",
      state: { box: { x: 1.9, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const colliding2: CollideableItem = {
      id: "colliding2",
      state: { box: { x: 0, y: 0.9, z: 0, xd: 2, yd: 1, zd: 1 } },
    };

    const nonColliding1: CollideableItem = {
      id: "nonColliding1",
      state: { box: { x: 0, y: 0, z: 1, xd: 2, yd: 1, zd: 1 } },
    };

    const nonColliding2: CollideableItem = {
      id: "nonColliding2",
      state: { box: { x: 2, y: 0, z: 0, xd: 2, yd: 1, zd: 1 } },
    };

    // Build a real spatial index for the test
    const index = new SpatialIndex<string, string, CollideableItem>([
      subject,
      colliding1,
      colliding2,
      nonColliding1,
      nonColliding2,
    ]);

    const actual = collisionItemWithIndex(subject, index);

    expect(actual.map((i) => i.id)).toEqual(["colliding1", "colliding2"]);
  });

  test("respects considerItem filter", () => {
    const subject: CollideableItem = {
      id: "subject",
      state: { box: { x: 0, y: 0, z: 0, xd: 2, yd: 1, zd: 1 } },
    };

    const colliding1: CollideableItem = {
      id: "colliding1",
      state: { box: { x: 1.9, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const colliding2: CollideableItem = {
      id: "colliding2",
      state: { box: { x: 0, y: 0.9, z: 0, xd: 2, yd: 1, zd: 1 } },
    };

    const index = new SpatialIndex<string, string, CollideableItem>([
      subject,
      colliding1,
      colliding2,
    ]);

    // Filter out colliding1
    const actual = collisionItemWithIndex(
      subject,
      index,
      (item) => item.id !== "colliding1",
    );

    expect(actual.map((i) => i.id)).toEqual(["colliding2"]);
  });

  test("does not include the subject itself", () => {
    const subject: CollideableItem = {
      id: "subject",
      state: { box: { x: 0, y: 0, z: 0, xd: 2, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([subject]);

    expect<ReadonlyArray<CollideableItem>>(
      collisionItemWithIndex(subject, index),
    ).toEqual<ReadonlyArray<CollideableItem>>([]);
  });
});

describe("collisionBoxWithIndex", () => {
  test("items only touching the box do not collide", () => {
    const touchingOnX: CollideableItem = {
      id: "touchingOnX",
      state: { box: { x: 2, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const touchingOnZ: CollideableItem = {
      id: "touchingOnZ",
      state: { box: { x: 0, y: 0, z: 1, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      touchingOnX,
      touchingOnZ,
    ]);

    expect<ReadonlyArray<CollideableItem>>(
      collisionBoxWithIndex({ x: 0, y: 0, z: 0, xd: 2, yd: 1, zd: 1 }, index),
    ).toEqual<ReadonlyArray<CollideableItem>>([]);
  });

  test("leaves out excludeItem", () => {
    const excluded: CollideableItem = {
      id: "excluded",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const included: CollideableItem = {
      id: "included",
      state: { box: { x: 0.5, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      excluded,
      included,
    ]);

    expect(
      collisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 2, yd: 1, zd: 1 },
        index,
        () => true,
        excluded,
      ).map((i) => i.id),
    ).toEqual<string[]>(["included"]);
  });

  test("an item spanning several of the box's cells appears once", () => {
    // 100px wide - spans several 32px index cells, as does the box:
    const wide: CollideableItem = {
      id: "wide",
      state: { box: { x: 0, y: 0, z: 0, xd: 100, yd: 100, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([wide]);

    expect(
      collisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 100, yd: 100, zd: 1 },
        index,
      ).map((i) => i.id),
    ).toEqual<string[]>(["wide"]);
  });

  test("returns the shared empty array when nothing collides", () => {
    const index = new SpatialIndex<string, string, CollideableItem>([]);

    expect(
      collisionBoxWithIndex({ x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 }, index),
    ).toBe(emptyArray);
  });
});

describe("appendApproximateCollisionsTowardsWithIndex", () => {
  const querying: CollideableItem = {
    id: "querying",
    state: { box: { x: 20, y: 20, z: 20, xd: 12, yd: 12, zd: 12 } },
  };
  const touchingEachFace: Array<{ face: string; towards: Xyz; box: XyzBox }> = [
    {
      face: "-x",
      towards: { x: -1, y: 0, z: 0 },
      box: { x: 8, y: 20, z: 20, xd: 12, yd: 12, zd: 12 },
    },
    {
      // across the index's cell boundary at 32:
      face: "+x",
      towards: { x: 1, y: 0, z: 0 },
      box: { x: 32, y: 20, z: 20, xd: 12, yd: 12, zd: 12 },
    },
    {
      face: "-y",
      towards: { x: 0, y: -1, z: 0 },
      box: { x: 20, y: 8, z: 20, xd: 12, yd: 12, zd: 12 },
    },
    {
      // across the index's cell boundary at 32:
      face: "+y",
      towards: { x: 0, y: 1, z: 0 },
      box: { x: 20, y: 32, z: 20, xd: 12, yd: 12, zd: 12 },
    },
    {
      face: "-z",
      towards: { x: 0, y: 0, z: -1 },
      box: { x: 20, y: 20, z: 8, xd: 12, yd: 12, zd: 12 },
    },
    {
      face: "+z",
      towards: { x: 0, y: 0, z: 1 },
      box: { x: 20, y: 20, z: 32, xd: 12, yd: 12, zd: 12 },
    },
  ];

  test.for(touchingEachFace)(
    "finds an item exactly touching the $face face, travelling towards it",
    ({ towards, box }) => {
      const touching: CollideableItem = { id: "touching", state: { box } };
      const index = new SpatialIndex<string, string, CollideableItem>([
        querying,
        touching,
      ]);
      const appended: CollideableItem[] = [];
      appendApproximateCollisionsTowardsWithIndex(
        querying.state.box,
        towards,
        index,
        querying,
        appended,
      );

      expect(appended.map((i) => i.id)).toEqual<string[]>(["touching"]);
    },
  );

  test.for(touchingEachFace)(
    "doesn't find an item exactly touching the $face face, travelling away from it",
    ({ towards, box }) => {
      const touching: CollideableItem = { id: "touching", state: { box } };
      const index = new SpatialIndex<string, string, CollideableItem>([
        querying,
        touching,
      ]);
      const appended: CollideableItem[] = [];
      appendApproximateCollisionsTowardsWithIndex(
        querying.state.box,
        { x: -towards.x, y: -towards.y, z: -towards.z },
        index,
        querying,
        appended,
      );

      expect(appended).toEqual<CollideableItem[]>([]);
    },
  );

  test("doesn't find an item touching a face it is travelling alongside", () => {
    const alongside: CollideableItem = {
      id: "alongside",
      state: { box: { x: 20, y: 32, z: 20, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      alongside,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: 1, y: 0, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended).toEqual<CollideableItem[]>([]);
  });

  test("finds items touching both faces travelled towards, travelling diagonally", () => {
    const onX: CollideableItem = {
      id: "onX",
      state: { box: { x: 32, y: 20, z: 20, xd: 12, yd: 12, zd: 12 } },
    };
    const onY: CollideableItem = {
      id: "onY",
      state: { box: { x: 20, y: 32, z: 20, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      onX,
      onY,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: 1, y: 1, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended.map((i) => i.id).toSorted()).toEqual<string[]>([
      "onX",
      "onY",
    ]);
  });

  test("finds an item exactly touching across a cell boundary on the min side", () => {
    const querying: CollideableItem = {
      id: "querying",
      state: { box: { x: 32, y: 32, z: 0, xd: 12, yd: 12, zd: 12 } },
    };
    const touching: CollideableItem = {
      id: "touching",
      state: { box: { x: 20, y: 32, z: 0, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      touching,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: -1, y: 0, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended.map((i) => i.id)).toEqual<string[]>(["touching"]);
  });

  test("finds an item almost touching, across a cell boundary", () => {
    // ends less than epsilon short of the index's cell boundary at 32:
    const querying: CollideableItem = {
      id: "querying",
      state: {
        box: { x: 20, y: 20, z: 20, xd: 11.999_95, yd: 12, zd: 12 },
      },
    };
    const nearlyTouching: CollideableItem = {
      id: "nearlyTouching",
      state: { box: { x: 32, y: 20, z: 20, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      nearlyTouching,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: 1, y: 0, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended.map((i) => i.id)).toEqual<string[]>(["nearlyTouching"]);
  });

  test("doesn't find an item epsilon or more apart", () => {
    const apart: CollideableItem = {
      id: "apart",
      state: { box: { x: 32.001, y: 20, z: 20, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      apart,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: 1, y: 0, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended).toEqual<CollideableItem[]>([]);
  });

  test("finds overlapping items without travelling, and leaves out excludeItem", () => {
    const overlapping: CollideableItem = {
      id: "overlapping",
      state: { box: { x: 26, y: 26, z: 26, xd: 12, yd: 12, zd: 12 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      querying,
      overlapping,
    ]);
    const appended: CollideableItem[] = [];
    appendApproximateCollisionsTowardsWithIndex(
      querying.state.box,
      { x: 0, y: 0, z: 0 },
      index,
      querying,
      appended,
    );

    expect(appended.map((i) => i.id)).toEqual<string[]>(["overlapping"]);
  });

  test("appends after the items already there, and each item it finds once", () => {
    // spans several of the index's 32px cells, as does the box:
    const wide: CollideableItem = {
      id: "wide",
      state: { box: { x: 0, y: 0, z: 0, xd: 100, yd: 100, zd: 12 } },
    };
    const alreadyThere: CollideableItem = {
      id: "alreadyThere",
      state: { box: { x: 200, y: 200, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([wide]);
    // an item already in the array is appended again if found:
    const appended: CollideableItem[] = [alreadyThere, wide];
    appendApproximateCollisionsTowardsWithIndex(
      { x: 0, y: 0, z: 0, xd: 100, yd: 100, zd: 12 },
      { x: 0, y: 0, z: 0 },
      index,
      alreadyThere,
      appended,
    );

    expect(appended.map((i) => i.id)).toEqual<string[]>([
      "alreadyThere",
      "wide",
      "wide",
    ]);
  });
});

describe("findCollisionBoxWithIndex", () => {
  test("finds an item colliding with the box", () => {
    const colliding: CollideableItem = {
      id: "colliding",
      state: { box: { x: 0.5, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      colliding,
    ]);

    expect(
      findCollisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 },
        index,
      ),
    ).toBe(colliding);
  });

  test("is undefined when nothing collides", () => {
    const touching: CollideableItem = {
      id: "touching",
      state: { box: { x: 1, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([touching]);

    expect(
      findCollisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 },
        index,
      ),
    ).toBeUndefined();
  });

  test("respects considerItem filter", () => {
    const filteredOut: CollideableItem = {
      id: "filteredOut",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const considered: CollideableItem = {
      id: "considered",
      state: { box: { x: 0.5, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      filteredOut,
      considered,
    ]);

    expect(
      findCollisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 },
        index,
        (item) => item.id !== "filteredOut",
      ),
    ).toBe(considered);
  });

  test("leaves out excludeItem", () => {
    const excluded: CollideableItem = {
      id: "excluded",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([excluded]);

    expect(
      findCollisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 },
        index,
        () => true,
        excluded,
      ),
    ).toBeUndefined();
  });
});

describe("hasCollisionBoxWithIndex", () => {
  test.for([
    { name: "overlapping", x: 0.5, expected: true },
    { name: "touching", x: 1, expected: false },
  ])("$name item: $expected", ({ x, expected }) => {
    const other: CollideableItem = {
      id: "other",
      state: { box: { x, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([other]);

    expect(
      hasCollisionBoxWithIndex(
        { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 },
        index,
      ),
    ).toBe(expected);
  });
});

describe("hasCollisionItemWithIndex", () => {
  test.for([
    { name: "overlapping", x: 0.5, expected: true },
    { name: "touching", x: 1, expected: false },
  ])("$name item: $expected", ({ x, expected }) => {
    const subject: CollideableItem = {
      id: "subject",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const other: CollideableItem = {
      id: "other",
      state: { box: { x, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([
      subject,
      other,
    ]);

    expect(hasCollisionItemWithIndex(subject, index)).toBe(expected);
  });

  test("the subject alone does not collide with itself", () => {
    const subject: CollideableItem = {
      id: "subject",
      state: { box: { x: 0, y: 0, z: 0, xd: 1, yd: 1, zd: 1 } },
    };
    const index = new SpatialIndex<string, string, CollideableItem>([subject]);

    expect(hasCollisionItemWithIndex(subject, index)).toBe(false);
  });
});
