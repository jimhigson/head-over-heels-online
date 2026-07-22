import { type FloorConfig } from "../../model/json/ItemConfigMap";
import { isTextureId } from "../../sprites/assertIsTextureId";
import { type SceneryName } from "../../sprites/planets";
import { type AppSpritesheetData } from "../../sprites/spritesheet/AppSpritesheet";
import { type BaseTextureIdWithPrefix } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

type FloorTextureId = BaseTextureIdWithPrefix<
  `${SceneryName}${".dark" | ""}.floor` | `generic${".dark" | ""}.floor`
>;

export const floorTextureId = (
  floorConfig: FloorConfig<SceneryName>,
  dark: boolean,
  spritesheetData: AppSpritesheetData,
): FloorTextureId => {
  const { floorType } = floorConfig;

  if (floorType !== "deadly" && floorType !== "standable") {
    throw new Error(`floorTextureId called with floorType "${floorType}"`);
  }

  // only the generic scenery has deadly floor art, so the deadly suffix and
  // the per-scenery floors are separate ids, not a scenery × suffix product:
  const isDeadly = floorType === "deadly";

  if (!dark) {
    return isDeadly ? "generic.floor.deadly" : `${floorConfig.scenery}.floor`;
  }

  const darkTextureId =
    isDeadly ?
      ("generic.dark.floor.deadly" as const)
    : (`${floorConfig.scenery}.dark.floor` as const);

  // not every scenery has a dark floor; fall back to the lit one:
  return (
    isTextureId(darkTextureId, spritesheetData) ? darkTextureId
    : isDeadly ? "generic.floor.deadly"
    : `${floorConfig.scenery}.floor`
  );
};
