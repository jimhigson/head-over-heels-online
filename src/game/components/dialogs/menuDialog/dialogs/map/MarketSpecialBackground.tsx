import type { OriginalCampaignRoomId } from "../../../../../../_generated/originalCampaign/OriginalCampaignRoomId";
import { useTotalUpscale } from "../../../../../../store/selectors";
import {
  type Xyz,
  originXyz,
  addXy,
  addXyz,
} from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type { Bounds } from "./Map.svg";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { mapClasses } from "./mapColours";
import { mapSvgMarginX, mapSvgMarginY } from "./mapConstants";
import { roomWorldPosition } from "./roomWorldPosition";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";
import { pathXy } from "./svgHelpers";

/**
 * only for the original campaign -
 * a semi-hardcoded non-rectangular surround for the market to allow it to be labelled inside
 * of blacktooth escape
 */

export const MarketSpecialBackground = ({
  originalCampaignPositions,
  mapBounds,
  containerWidth,
}: {
  originalCampaignPositions: SortedObjectOfRoomGridPositionSpecs<OriginalCampaignRoomId>;
  mapBounds: Bounds;
  containerWidth: number;
}) => {
  const scale = useTotalUpscale();
  const contentW = mapBounds.r - mapBounds.l + 2 * mapSvgMarginX;

  type RoomAndSubRoomId = keyof typeof originalCampaignPositions;

  const offset = {
    x: -mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2,
    y: -mapBounds.t + mapSvgMarginY,
  };

  const shapePointXy = (
    roomAndSubRoomId: RoomAndSubRoomId,
    gridPositionAdjust: Partial<Xyz> = originXyz,
  ) => {
    return addXy(
      offset,
      projectWorldXyzToScreenXy(
        roomWorldPosition(
          addXyz(
            originalCampaignPositions[roomAndSubRoomId].gridPosition,
            gridPositionAdjust,
          ),
        ),
      ),
    );
  };

  // describe the points of a diamond shape:
  const xy1 = shapePointXy("blacktooth44market/*", {
    x: 1,
    z: 1.5,
  });
  const xy2 = shapePointXy("blacktooth44market/*", {
    x: 1,
  });
  const xy3 = shapePointXy("blacktooth45market/*");

  const xy4 = shapePointXy("blacktooth48market/*", {
    y: 1,
  });
  const xy5 = shapePointXy("blacktooth53market/*", {
    x: 0,
    y: 0,
    z: 0,
  });
  const xy6 = shapePointXy("blacktooth53market/*", {
    x: 0,
    y: 1,
    z: 0,
  });
  const xy7 = shapePointXy("blacktooth53market/*", {
    x: 1,
    y: 1,
    z: 0,
  });
  const xy8 = shapePointXy("blacktooth52market/*", {
    x: 1,
    y: 0.5,
    z: 0,
  });

  const leftBound = scale * 8 * 2;
  const title = "Market";
  const titleRightBound = (title.length + 3) * scale * 8;
  const titleHeight = scale * 8 * 2 + 32;
  return (
    <>
      <path
        className={`${mapClasses.market.bgClassName} stroke-metallicBlueHalfbrite zx:stroke-zxCyan`}
        strokeWidth={12}
        d={`
M ${pathXy({ x: leftBound, y: xy8.y + titleHeight })}
L ${pathXy({ x: titleRightBound, y: xy8.y + titleHeight })}
L ${pathXy({ x: titleRightBound, y: xy1.y })}
L ${pathXy(xy1)}
L ${pathXy(xy2)}
L ${pathXy(xy3)}
L ${pathXy(xy4)}
L ${pathXy(xy5)}
L ${pathXy(xy6)}
L ${pathXy(xy7)}
L ${pathXy(xy8)}
L ${pathXy({ ...xy8, x: leftBound })}
z`}
      />
      <MapBackgroundSection
        y={xy8.y}
        mapTitle={title}
        className={mapClasses.market.bgClassName}
        textOnly
      />
    </>
  );
};
