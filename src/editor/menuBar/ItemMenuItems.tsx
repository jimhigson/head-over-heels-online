import { useEditorAppSelector } from "../../store/store";
import { MenuHeader } from "../../ui/menuBar/MenuHeader";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { ItemActionMenuItems } from "../RoomEditingArea/contextMenu/ItemActionMenuItems";
import { useSelectionLabel } from "../RoomEditingArea/contextMenu/useSelectionLabel";
import { selectCursorRoomSelectedJsonItemIds } from "../slice/levelEditorSlice";

/** the item menu: what right-clicking the selected items offers */
export const ItemMenuItems = () => {
  const somethingSelected = useEditorAppSelector(
    (state) => selectCursorRoomSelectedJsonItemIds(state).length > 0,
  );
  const selectionLabel = useSelectionLabel();

  return somethingSelected ?
      <>
        <MenuHeader label={selectionLabel} />
        <ItemActionMenuItems />
      </>
    : <MenuItem label="No items selected" disabled onSelect={() => {}} />;
};
