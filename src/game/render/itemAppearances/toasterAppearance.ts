import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { Xy } from "../../../utils/vectors/vectors";
import type { ItemAppearance } from "./ItemAppearance";

import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import { maybeRenderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import { subXy } from "../../../utils/vectors/vectors";
import { isChargingCyberman } from "../../physics/itemPredicates";
import { createSprite } from "../createSprite";

/**
 * a 2d array of the ids of all the cybermen sat on this toaster,
 * indexed by x and y blocks
 */
type ChargingCybermanGridPositions = Array<Array<string | undefined>>;

type ToasterRenderProps = {
  chargePositions: ChargingCybermanGridPositions;
  cybermanActivationBitmask: number;
};

const findChargingPositions = (
  {
    state: { stoodOnBy, position: toasterPosition },
    config: { times },
  }: ItemInPlay<"deadlyBlock", string, string>,
  room: RoomState<string, string>,
): ChargingCybermanGridPositions => {
  const chargingCybermanGridPositions: ChargingCybermanGridPositions =
    new Array(times?.x ?? 1).fill(null).map(() => new Array(times?.y ?? 1));

  iterateStoodOnByItems(stoodOnBy, room)
    .filter(isChargingCyberman)
    .forEach(({ id, state: { position: monsterPosition } }) => {
      // get the block xyz relative to the toaster - toasters are consolidated
      const relativePosition = subXy(monsterPosition, toasterPosition);
      const relativePositionBlocks: Xy = {
        x: Math.floor(relativePosition.x / blockSizePx.w),
        y: Math.floor(relativePosition.y / blockSizePx.d),
      };
      if (
        relativePositionBlocks.x < 0 ||
        relativePositionBlocks.x >= (times?.x ?? 1) ||
        relativePositionBlocks.y < 0 ||
        relativePositionBlocks.y >= (times?.y ?? 1)
      ) {
        return;
      }
      chargingCybermanGridPositions[relativePositionBlocks.x][
        relativePositionBlocks.y
      ] = id;
    });

  return chargingCybermanGridPositions;
};

// create a bitmask of which cybermen belonging to this toaster are activates.
// Sets an upper limit of 53 cybermen on a toaster
//  - Number.MAX_SAFE_INTEGER is defined as (2^{53} - 1))
const makeCybermanActivationBitmask = (
  room: RoomState<string, string>,
  gridPositions: ChargingCybermanGridPositions,
): number => {
  let mask = 0;
  let bit = 1;

  for (const row of gridPositions) {
    for (const cybermanId of row) {
      if (cybermanId !== undefined) {
        const cyberman = room.items[cybermanId] as
          | ItemInPlay<"monster">
          | undefined;
        if (cyberman?.state.activated) {
          mask |= bit;
        }
      }
      bit <<= 1;
    }
  }

  return mask;
};

export const toasterAppearance: ItemAppearance<
  "deadlyBlock",
  ToasterRenderProps
> = ({
  renderContext: {
    item,
    room,
    general: { pixiRenderer },
  },
  currentRendering,
}) => {
  const {
    config: { times },
  } = item;

  const chargePositions =
    currentRendering === undefined ?
      findChargingPositions(item, room)
      // charging positions never changes during the lifetime of the renderer, so can always
      // get it from the current rendering
    : currentRendering.renderProps.chargePositions;

  const cybermanActivationBitmask = makeCybermanActivationBitmask(
    room,
    chargePositions,
  );

  const render =
    cybermanActivationBitmask !==
    currentRendering?.renderProps.cybermanActivationBitmask;

  if (!render) {
    return "no-update";
  }

  const outputContainer = createSprite({
    textureIdCallback(x, y) {
      const cyberManId = chargePositions[x][y];
      if (cyberManId === undefined) {
        return "toaster.off";
      }
      const cyberman = room.items[cyberManId] as
        | ItemInPlay<"monster">
        | undefined;
      return cyberman?.state.everActivated ? "toaster.off" : "toaster.on";
    },
    times: times ?? emptyObject,
  });

  // that container potentially contains many sprites - reduce to a single sprite
  const outputSprite = maybeRenderContainerToSprite(
    pixiRenderer,
    outputContainer,
  );

  return {
    output: outputSprite,
    renderProps: {
      chargePositions,
      cybermanActivationBitmask,
    },
  };
};
