import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import { isWallDirectionHiddenAtAngle } from "../../../model/json/WallJsonConfig";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { isDoorPartInHiddenWall } from "../renderBox/makeItemRenderBoxAtCameraAngle";

type ShadowFieldsItem = Pick<
  UnionOfAllItemInPlayTypes,
  | "castsShadowWhileStoodOn"
  | "hintShadowDirections"
  | "noShadowCastOn"
  | "shadowCastTexture"
> & { type?: ItemInPlayType; config?: unknown };

/**
 * the shadow an item casts at this camera angle - the stored texture, gated
 * for the angle-dependent cases: hint shadows (hidden walls, corner cubes)
 * only cast when their directions face the camera; door legs only cast their
 * floating threshold in a hidden wall; the door frame top only casts in a
 * visible wall
 */
export const shadowCastTextureAtAngle = (
  item: ShadowFieldsItem,
  cameraAngle: Xy,
): ShadowFieldsItem["shadowCastTexture"] => {
  const { shadowCastTexture } = item;
  if (shadowCastTexture === undefined) {
    return undefined;
  }
  if (item.hintShadowDirections !== undefined) {
    return (
        item.hintShadowDirections.every((d) =>
          isWallDirectionHiddenAtAngle(d, cameraAngle),
        )
      ) ?
        shadowCastTexture
      : undefined;
  }
  switch (item.type) {
    case "doorLegs":
      return (
          isDoorPartInHiddenWall(
            item.config as { direction: Xyz; onFloorEdge: boolean },
            cameraAngle,
          )
        ) ?
          shadowCastTexture
        : undefined;
    case "doorFrame": {
      const config = item.config as {
        direction: Xyz;
        onFloorEdge: boolean;
        part: "far" | "near" | "top";
      };
      if (config.part !== "top") {
        return shadowCastTexture;
      }
      return isDoorPartInHiddenWall(config, cameraAngle) ? undefined : (
          shadowCastTexture
        );
    }
    default:
      return shadowCastTexture;
  }
};

/** see {@link shadowCastTextureAtAngle} - the stood-on gate for hint shadows */
export const castsShadowWhileStoodOnAtAngle = (
  item: ShadowFieldsItem,
  cameraAngle: Xy,
): boolean => {
  if (item.type === "wall") {
    return isWallDirectionHiddenAtAngle(
      (item.config as { direction: Xyz }).direction,
      cameraAngle,
    );
  }
  if (item.hintShadowDirections !== undefined) {
    return item.hintShadowDirections.every((d) =>
      isWallDirectionHiddenAtAngle(d, cameraAngle),
    );
  }
  if (item.type === "doorLegs") {
    return isDoorPartInHiddenWall(
      item.config as { direction: Xyz; onFloorEdge: boolean },
      cameraAngle,
    );
  }
  return item.castsShadowWhileStoodOn;
};

/**
 * the door frame top spares the door legs its shadow only when in a visible
 * wall; everything else's noShadowCastOn is angle-invariant
 */
export const noShadowCastOnAtAngle = (
  item: ShadowFieldsItem,
  cameraAngle: Xy,
): ShadowFieldsItem["noShadowCastOn"] => {
  if (item.type === "doorFrame") {
    const config = item.config as {
      direction: Xyz;
      onFloorEdge: boolean;
      part: "far" | "near" | "top";
    };
    if (config.part === "top" && isDoorPartInHiddenWall(config, cameraAngle)) {
      return undefined;
    }
  }
  return item.noShadowCastOn;
};
