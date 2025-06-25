import { rotatingSceneryTiles } from "../slice/createStarterRoom";
import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";
import { ItemToolButton } from "./ItemToolButton";

export const WallToolButton = () => {
  const scenery = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const itemTool = {
    type: "wall",
    config: {
      direction: "away", // arbitrary, to be corrected on placement
      tiles: rotatingSceneryTiles(scenery, 1),
    },
  } as const;

  const textureClassname = twClass(
    scenery === "blacktooth" ? "texture-blacktooth.wall.plain.away"
    : scenery === "bookworld" ? "texture-bookworld.wall.cowboy.away"
    : scenery === "jail" ? "texture-jail.wall.bars.away."
    : scenery === "egyptus" ? "texture-egyptus.wall.hieroglyphics.away"
    : scenery === "market" ? "texture-market.wall.passage.away"
    : scenery === "moonbase" ? "texture-moonbase.wall.window1.away"
    : scenery === "penitentiary" ? "texture-penitentiary.wall.loop.away"
    : "texture-safari.wall.window.away",
  );

  return (
    <ItemToolButton itemTool={itemTool}>
      <span
        className={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
      />
    </ItemToolButton>
  );
};
