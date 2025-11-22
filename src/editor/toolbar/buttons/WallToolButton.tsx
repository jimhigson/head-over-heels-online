import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../../slice/levelEditorSlice";
import { rotatingSceneryTiles } from "../../slice/rotatingSceneryTiles";
import { twClass } from "../../twClass";
import { buttonSpriteRevertColourClasses } from "../buttonSizeClassNames";
import { ItemToolButton } from "../ItemToolButton";

export const WallToolButton = () => {
  const scenery = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const itemTool = {
    type: "wall",
    config: {
      direction: "away", // arbitrary, to be corrected on placement
      tiles: Array.from(rotatingSceneryTiles(scenery, 1)),
    },
  } as const;

  const textureClassname = twClass(
    scenery === "blacktooth" ? "texture-blacktooth_wall_plain_away"
    : scenery === "bookworld" ? "texture-bookworld_wall_cowboy_away"
    : scenery === "jail" ? "texture-jail_wall_bars_away"
    : scenery === "egyptus" ? "texture-egyptus_wall_hieroglyphics_away"
    : scenery === "market" ? "texture-market_wall_passage_away"
    : scenery === "moonbase" ? "texture-moonbase_wall_window1_away"
    : scenery === "penitentiary" ? "texture-penitentiary_wall_loop_away"
    : "texture-safari_wall_wall_away",
  );

  return (
    <ItemToolButton itemTool={itemTool}>
      <span
        className={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
      />
    </ItemToolButton>
  );
};
