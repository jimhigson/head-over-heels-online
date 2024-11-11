import type { WallTextureId } from "@/sprites/scenerySpritesheetData";
import type { PlanetName, Wall } from "@/sprites/planets";

export const wallTextureId = <P extends PlanetName>(
  planet: P,
  wallName: Wall<P>,
  side: "left" | "away",
) => `${planet}.wall.${wallName}.${side}` as WallTextureId<P>;
