import { AnyWall } from "../../src/model/modelTypes";
import { AxisXy } from "../../src/utils/vectors";
import { PlanetName } from "../../src/sprites/planets";
import { wallNumbers } from "./wallNumbers";

// .png must be optional - it is given in <wall> elements in the xml
// but not when walls are given as pictures
// TODO: also support "invisible-wall-x" and "invisible-wall-y"
// TODO: - see room moonbase33triple
const pictureNameRegex =
  /(?<planet>\w+)-wall-(?<axis>x|y)(?:-(?<number>\d+))?(.png)?$/;

export const parseXmlWallName = (
  pictureName: string,
): { axis: AxisXy; wallTypeIndex: number } => {
  const regexMatch = pictureNameRegex.exec(pictureName);

  if (regexMatch === null || regexMatch.groups === undefined) {
    throw new Error(`can't understand wall pictureName: ${pictureName}`);
  }

  return {
    axis: regexMatch.groups["axis"] as AxisXy,
    // jail walls only have one tile so in the xml there's no number - use 1 to mean
    // the first (and only) wall variant:
    wallTypeIndex:
      regexMatch.groups["number"] ? parseInt(regexMatch.groups["number"]) : 1,
  };
};

export const convertWallName = (
  planetName: PlanetName,
  pictureName: string,
): AnyWall => {
  // the remake I got the xml from has special tree walls for the final room, but the original
  // game uses the bars:
  if (pictureName.startsWith("trees")) {
    return "bars";
  }

  const { wallTypeIndex } = parseXmlWallName(pictureName);

  const wall = wallNumbers[planetName][wallTypeIndex - 1];

  if (!wall) {
    throw new Error(
      `no wall at index ${wallTypeIndex} for planet ${planetName}`,
    );
  }

  return wall;
};

export const isWallName = (candidate: string): boolean => {
  return candidate.match(pictureNameRegex) !== null;
};
