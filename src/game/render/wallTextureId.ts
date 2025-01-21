import type { SceneryName, Wall } from "../../sprites/planets";
import type { WallTextureId } from "../../sprites/scenerySpritesheetData";

export const wallTextureId = <P extends SceneryName, TDark extends boolean>(
  planet: P,
  wallName: Wall<P>,
  side: "left" | "away",
  dark: TDark,
) =>
  `${planet}${dark ? ".dark" : ""}.wall.${wallName}.${side}` as WallTextureId<
    P,
    TDark extends true ? ".dark" : ""
  >;
