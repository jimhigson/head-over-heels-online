import { describe, expect, test } from "vitest";

import type { ItemInPlay } from "../../../model/ItemInPlay";

import { basicEmptyRoom } from "../../../_testUtils/basicRoom";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { combinePlayablesInSymbiosis } from "../../gameState/mutators/symbiosis";
import { GridSpatialIndex } from "../gridSpace/GridSpatialIndex";
import { checkSpaceAvailableToPutDown } from "./puttingDown";

const makeHeels = (position: Xyz) => {
  const [heels] = loadItemFromJson(
    "heels",
    {
      type: "player",
      position,
      config: { which: "heels" },
    },
    basicEmptyRoom("firstRoom"),
    {},
  );
  return heels as ItemInPlay<"heels">;
};

const makeHeadOverHeels = (position: Xyz) => {
  const [heels] = loadItemFromJson(
    "heels",
    {
      type: "player",
      position,
      config: { which: "heels" },
    },
    basicEmptyRoom("firstRoom"),
    {},
  );
  const [head] = loadItemFromJson(
    "heels",
    {
      type: "player",
      position: addXyz(position, { z: 1 }),
      config: { which: "head" },
    },
    basicEmptyRoom("firstRoom"),
    {},
  );

  return combinePlayablesInSymbiosis({
    head: head as ItemInPlay<"head">,
    heels: heels as ItemInPlay<"heels">,
  });
};

const makeBlock = (position: Xyz) => {
  const [block] = loadItemFromJson(
    "block",
    {
      type: "block",
      position,
      config: { style: "organic" },
    },
    basicEmptyRoom("firstRoom"),
    {},
  );
  return block as ItemInPlay<"block">;
};

const makePortableBlock = (position: Xyz) => {
  const [portableBlock] = loadItemFromJson(
    "portableBlock",
    {
      type: "portableBlock",
      position,
      config: { style: "cube" },
    },
    basicEmptyRoom("firstRoom"),
    {},
  );
  return portableBlock as ItemInPlay<"block">;
};

describe("checkSpaceAvailableToPutDown", () => {
  test("if heels is the only item in the room, can put down", () => {
    const heels = makeHeels({ x: 0, y: 0, z: 0 });

    expect(
      checkSpaceAvailableToPutDown(heels, new GridSpatialIndex([heels])),
    ).toBe(true);
  });

  test("if headOverHeels is the only item in the room, can put down", () => {
    const headOverHeels = makeHeadOverHeels({ x: 0, y: 0, z: 0 });

    expect(
      checkSpaceAvailableToPutDown(
        headOverHeels,
        new GridSpatialIndex([headOverHeels]),
      ),
    ).toBe(true);
  });

  test("there is not space if a block directly above heels", () => {
    const heels = makeHeels({ x: 0, y: 0, z: 0 });
    const block = makeBlock({ x: 0, y: 0, z: 1 });

    expect(
      checkSpaceAvailableToPutDown(heels, new GridSpatialIndex([heels, block])),
    ).toBe(false);
  });

  describe("with portable blocks on top of heels", () => {
    test("can still put down with clear sky", () => {
      const portableBlock = makePortableBlock({ x: 0, y: 0, z: 1 });
      const heels = makeHeels({ x: 0, y: 0, z: 0 });

      expect(
        checkSpaceAvailableToPutDown(
          heels,
          new GridSpatialIndex([heels, portableBlock]),
        ),
      ).toBe(true);
    });
    test("can put down if the portable block goes alongside but doesn't collide with immovable blocks", () => {
      const heels = makeHeels({ x: 1, y: 0, z: 0 });
      const portableBlock = makePortableBlock({ x: 1.5, y: 0, z: 1 });
      const block = makeBlock({ x: 0.5, y: 0, z: 2 });

      expect(
        checkSpaceAvailableToPutDown(
          heels,
          new GridSpatialIndex([heels, portableBlock, block]),
        ),
      ).toBe(true);
    });
    test("can not put down if a portable block one up and a normal block two up from heels", () => {
      const block = makeBlock({ x: 0, y: 0, z: 2 });
      const portableBlock = makePortableBlock({ x: 0, y: 0, z: 1 });
      const heels = makeHeels({ x: 0, y: 0, z: 0 });

      expect(
        checkSpaceAvailableToPutDown(
          heels,
          new GridSpatialIndex([heels, portableBlock, block]),
        ),
      ).toBe(false);
    });
  });
});
