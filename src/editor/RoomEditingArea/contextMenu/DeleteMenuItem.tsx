import { useAppDispatch } from "../../../store/hooks";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import { deleteSelected } from "../../slice/levelEditorSlice";

/** Deletes the selected items. Always available. */
export const DeleteMenuItem = () => {
  const dispatch = useAppDispatch();

  return (
    <ContextMenuItem
      value="delete"
      onSelect={() => dispatch(deleteSelected({ timestamp: Date.now() }))}
    >
      Delete
    </ContextMenuItem>
  );
};
