import type { Xy, Xyz } from "../../../../../../utils/vectors/vectors";

import { projectWorldXyzToScreenXy } from "../../../../../render/projections";

export const roundForSvg = (n: number) => {
  return Math.round(n * 10) / 10;
};
export const translateXyz = (xyz: Partial<Xyz>) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${roundForSvg(xy.x)},${roundForSvg(xy.y)})`;
};
export const project = (xyz: Partial<Xyz>) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return pathXy(xy);
};

export const pathXy = (xy: Xy) => {
  return `${roundForSvg(xy.x)},${roundForSvg(xy.y)}`;
};
