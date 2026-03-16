import { useAppSelectorWithLevelEditorSlice } from "../../slice/levelEditorSlice";
import { buttonDefinitions } from "../buttonDefinitions";
import { ItemToolButton } from "../ItemToolButton";

export const WallToolButton = () => {
  const wallProps = useAppSelectorWithLevelEditorSlice((state) =>
    buttonDefinitions.wall(state.levelEditor),
  );

  return <ItemToolButton {...wallProps} />;
};
