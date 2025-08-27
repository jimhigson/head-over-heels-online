import type { JsonItem } from "../model/json/JsonItem";
import type { Xy } from "../utils/vectors/vectors";
import type { XmlFloorKind, XmlScenery } from "./readToJson";

import { convertSceneryName } from "./convertPlanetName";

function* convertFloor(
  roomDimensions: Xy,
  xmlFloorKind: XmlFloorKind,
  xmlScenery?: XmlScenery,
): Generator<JsonItem<"floor">> {
  const floorSizeXy = {
    x: roomDimensions.x,
    y: roomDimensions.y,
  };

  yield {
    type: "floor",
    config:
      xmlFloorKind === "absent" ?
        {
          floorType: "none",
          times: floorSizeXy,
        }
      : xmlFloorKind === "mortal" ?
        {
          floorType: "deadly",
          times: floorSizeXy,
        }
      : {
          floorType: "standable",
          scenery: convertSceneryName(xmlScenery),
          times: floorSizeXy,
        },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
}

export { convertFloor };
