import type { PlanetName, SceneryName } from "../sprites/planets";
import type { XmlScenery } from "./readToJson";

export const convertSceneryName = (
  xmlSceneryName: undefined | XmlScenery,
): SceneryName => {
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

export const convertPlanetName = (
  xmlSceneryName: undefined | XmlScenery,
): PlanetName => {
  switch (xmlSceneryName) {
    case undefined: // jail
    case "moon":
    case "market":
      throw new Error(`unknown planet from scenery name: ${xmlSceneryName}`);
    case "byblos":
      return "bookworld";
    default:
      return xmlSceneryName;
  }
};
