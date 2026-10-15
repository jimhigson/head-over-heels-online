import { store, useEditorAppSelector } from "../../store/store";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { Switch, Switch3 } from "../../ui/Switch";
import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandMenuItem } from "../commands/CommandMenuItem";
import {
  changeGridResolution,
  changeWallsFloorsLocked,
  type GridResolution,
  gridResolutions,
  setAutoCoalesce,
} from "../slice/levelEditorSlice";

/** the edit menu: the sidebar's edit section */
export const EditMenuItems = () => {
  const gridResolution = useEditorAppSelector(
    (state) => state.levelEditor.gridResolution,
  );
  const wallsFloorsLocked = useEditorAppSelector(
    (state) => state.levelEditor.wallsFloorsLocked,
  );
  const autoCoalesce = useEditorAppSelector(
    (state) => state.levelEditor.autoCoalesce,
  );

  return (
    <>
      <CommandMenuItem command={actionCommandDefinitions.undo} />
      <CommandMenuItem command={actionCommandDefinitions.redo} />
      <CommandMenuItem command={actionCommandDefinitions.copy} />
      <CommandMenuItem command={actionCommandDefinitions.paste} />
      <CommandMenuItem command={actionCommandDefinitions.delete} />
      <CommandMenuItem command={actionCommandDefinitions.pointerTool} />
      <CommandMenuItem command={actionCommandDefinitions.eyeDropperTool} />
      <CommandMenuItem command={actionCommandDefinitions.commandPalette} />
      <MenuItem
        label="Snap"
        shortcutKeys={["S"]}
        keepsMenuOpen
        onSelect={() =>
          store.dispatch(
            changeGridResolution(
              gridResolutions[
                (gridResolutions.indexOf(gridResolution) + 1) %
                  gridResolutions.length
              ],
            ),
          )
        }
        control={
          <Switch3
            ariaLabel="Grid snap resolution"
            values={gridResolutions}
            valueLabels={["block", "half", "fine"]}
            value={gridResolution}
            onChange={(resolution: GridResolution) =>
              store.dispatch(changeGridResolution(resolution))
            }
          />
        }
      />
      <MenuItem
        label="Lock walls and floors"
        shortcutKeys={["C"]}
        keepsMenuOpen
        onSelect={() =>
          store.dispatch(changeWallsFloorsLocked(!wallsFloorsLocked))
        }
        control={
          <Switch
            ariaLabel="Lock walls and floors"
            value={wallsFloorsLocked}
            onChange={(locked) =>
              store.dispatch(changeWallsFloorsLocked(locked))
            }
          />
        }
      />
      <MenuItem
        label="Coalesce blocks"
        shortcutKeys={["L"]}
        keepsMenuOpen
        onSelect={() => store.dispatch(setAutoCoalesce(!autoCoalesce))}
        control={
          <Switch
            ariaLabel="Coalesce blocks"
            value={autoCoalesce}
            onChange={(coalesce) => store.dispatch(setAutoCoalesce(coalesce))}
          />
        }
      />
    </>
  );
};
