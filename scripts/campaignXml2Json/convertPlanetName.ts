import { PlanetName } from "../../src/modelTypes";
import { XmlScenery } from "./readToJson";

export const convertPlanetName = (
  xmlSceneryName: XmlScenery | undefined,
): PlanetName => {
  switch (xmlSceneryName) {
    case undefined:
      return "jail";
    case "byblos":
      return "bookworld";
    case "moon":
      return "moonbase";
    default:
      return xmlSceneryName;
  }
};
