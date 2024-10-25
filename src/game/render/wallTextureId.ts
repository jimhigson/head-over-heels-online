import { WallTextureId } from "@/sprites/pixiSpriteSheet";
import { PlanetName, Wall } from "@/sprites/planets";

export const wallTextureId = <P extends PlanetName>(
  planet: P,
  wallName: Wall<P>,
  side: "left" | "away",
) => `${planet}.wall.${wallName}.${side}` as WallTextureId<P>;
