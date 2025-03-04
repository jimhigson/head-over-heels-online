import { Container, Graphics } from "pixi.js";
import { edgePaletteSwapFilters } from "../../filters/standardFilters";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";
import { floorRenderExtent } from "../../renderExtent";
import { type ItemAppearance, itemRenderOnce } from "../ItemAppearance";
import { renderEdge } from "./renderEdge";
import { defaultUserSettings } from "../../../../store/gameMenusSlice";

export const floorEdgeAppearance: ItemAppearance<"floorEdge"> = itemRenderOnce(
  ({ room, onHold, displaySettings }) => {
    const {
      blockXMin,
      blockYMin,
      blockXMax,
      blockYMax,
      edgeLeftX,
      edgeRightX,
    } = floorRenderExtent(room.roomJson);
    const blockXExtent = blockXMax - blockXMin;
    const blockYExtent = blockYMax - blockYMin;

    const container = new Container({ label: `floorEdge` });

    const overDrawToHideFallenItems = new Graphics({
      label: "overDrawToHideFallenItems",
    })
      // Add the rectangular area to show
      .poly(
        [
          projectBlockXyzToScreenXy({ x: blockXExtent, y: 0 }),
          projectBlockXyzToScreenXy({ x: 0, y: 0 }),
          projectBlockXyzToScreenXy({ x: 0, y: blockYExtent }),
          { ...projectBlockXyzToScreenXy({ x: 0, y: blockYExtent }), y: 999 },
          { ...projectBlockXyzToScreenXy({ x: blockXExtent, y: 0 }), y: 999 },
        ],
        true,
      )
      .fill(0x000000);
    // move overdraw down so its edge is hidden under the floor edge sprites:
    overDrawToHideFallenItems.y = 8;
    container.addChild(overDrawToHideFallenItems);

    const { towards: towardsEdgeContainer, right: rightEdgeContainer } =
      renderEdge(
        {
          blockXMin,
          blockYMin,
        },
        room.roomJson,
      );

    const colourise: boolean =
      !onHold &&
      !(
        displaySettings.uncolourised ??
        defaultUserSettings.displaySettings.uncolourised
      );
    towardsEdgeContainer.filters = edgePaletteSwapFilters(
      room,
      "towards",
      colourise,
    );
    rightEdgeContainer.filters = edgePaletteSwapFilters(
      room,
      "right",
      colourise,
    );

    container.addChild(towardsEdgeContainer);
    container.addChild(rightEdgeContainer);

    // render black everywhere below the floor edge - this will mean items that fall out of
    // the room via the floor will not show under the hud:
    // rendering strategy differs slightly from original here - we don't render floors added in for near-side
    // doors all the way to their (extended) edge - we cut the (inaccessible) corners of the room off
    const floorMaskCutOffLeftAndRight = new Graphics({
      label: "floorMaskCutOffLeftAndRight",
    })
      // Add the rectangular area to show
      .poly(
        [
          { x: edgeLeftX, y: 999 },
          { x: edgeLeftX, y: -999 },
          { x: edgeRightX, y: -999 },
          { x: edgeRightX, y: 999 },
        ],
        true,
      )
      .fill(0xffff00);
    container.addChild(floorMaskCutOffLeftAndRight);
    container.mask = floorMaskCutOffLeftAndRight;

    // the floor never changes rendering so can cache to optimise:
    container.cacheAsTexture(true);

    return container;
  },
);
