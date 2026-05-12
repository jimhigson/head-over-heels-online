import { useEditorAppSelector } from "../../../store/store";
import { buttonDefinitions } from "../buttonDefinitions";
import { ItemToolButton } from "../ItemToolButton";

export const WallToolButton = () => {
  const wallProps = useEditorAppSelector((state) =>
    buttonDefinitions.wall(state.levelEditor),
  );

  return <ItemToolButton {...wallProps} />;
};
