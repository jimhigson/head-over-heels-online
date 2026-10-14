import { useEditorAppSelector } from "../../../store/store";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { itemToolCommandDefinitions } from "../../commands/itemToolCommandDefinitions";

export const WallToolButton = () => {
  const wallCommand = useEditorAppSelector((state) =>
    itemToolCommandDefinitions.wall(state),
  );

  return <CommandToolbarButton command={wallCommand} />;
};
