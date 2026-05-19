import { roomGridSizeXY } from "./mapConstants";
import { project } from "./svgHelpers";

export const floorFillPathD = `
M ${project({})}
L ${project({ y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY })}
z`;
