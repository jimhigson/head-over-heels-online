import type { MatcherState } from "vitest";

import { originXyz } from "../../../../utils/vectors/vectors";
import type { ItemToolItem, Tool } from "../Tool";

/**
 * an item without a position goes at the origin, so is given that position
 */
const withPosition = ({
  position = originXyz,
  ...toolItem
}: ItemToolItem): ItemToolItem => ({ ...toolItem, position });

export const toolItemMatchers = {
  /**
   * like toEqual, for the item tool's items (or an item tool), except that an
   * item without a position equals one at the origin, since that is where it
   * goes
   */
  toEqualToolItems(
    this: MatcherState,
    received: ReadonlyArray<ItemToolItem> | Tool,
    expected: ReadonlyArray<ItemToolItem>,
  ) {
    if ("type" in received && received.type !== "item") {
      return {
        pass: false,
        message: () =>
          `expected an item tool, but got a tool of type ${received.type}`,
      };
    }
    const receivedItems = "type" in received ? received.items : received;

    const receivedWithPositions = receivedItems.map(withPosition);
    const expectedWithPositions = expected.map(withPosition);
    return {
      pass: this.equals(receivedWithPositions, expectedWithPositions),
      message: () =>
        `expected tool items${this.isNot ? " not" : ""} to equal these, with no position the same as the origin:\n${this.utils.diff(
          expectedWithPositions,
          receivedWithPositions,
        )}`,
    };
  },
};
