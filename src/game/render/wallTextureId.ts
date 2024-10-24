import { PlanetName, Wall } from "../../modelTypes";

export type WallTextureId<
  P extends PlanetName,
  W extends Wall<P> = Wall<P>,
> = `${P}.wall.${W}.${"left" | "away"}`;

export const wallTextureId = <P extends PlanetName, W extends Wall<P>>(
  planet: P,
  wallName: Wall<P>,
  side: "left" | "away",
) => `${planet}.wall.${wallName}.${side}` as WallTextureId<P, W>;
