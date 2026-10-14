import { useCallback } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenu } from "../../../ui/command/ContextMenu";
import { MenuHeader } from "../../../ui/menuBar/MenuHeader";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  closeItemContextMenu,
  selectContextMenuXy,
} from "../../slice/levelEditorSlice";
import { useEditorViewport } from "../viewport/EditorViewportProvider";
import { ItemActionMenuItems } from "./ItemActionMenuItems";
import { useSelectionLabel } from "./useSelectionLabel";

export type ItemContextMenuProps = {
  /** the element the room is rendered into, used to anchor the menu to the cursor */
  renderArea: HTMLDivElement | null;
};

/**
 * Bridges the editor store to the generic `ContextMenu`: opens from the stored
 * `contextMenuXy`, converts it to a viewport point, and shows the available
 * actions. Each action component decides for itself whether it should appear.
 */
export const ItemContextMenu = ({ renderArea }: ItemContextMenuProps) => {
  const dispatch = useAppDispatch();
  const contextMenuXy = useEditorAppSelector(selectContextMenuXy);
  const viewport = useEditorViewport();
  const selectionLabel = useSelectionLabel();

  const close = useCallback(() => dispatch(closeItemContextMenu()), [dispatch]);

  // contextMenuXy is in engine (projection-space) coordinates - convert to a
  // page point via the viewport's transform:
  const anchor = useCallback((): Xy => {
    if (contextMenuXy === undefined || renderArea === null) {
      return { x: 0, y: 0 };
    }
    const rect = renderArea.getBoundingClientRect();
    const panePoint = viewport.toScreen(contextMenuXy);
    return {
      x: panePoint.x + rect.left,
      y: panePoint.y + rect.top,
    };
  }, [contextMenuXy, renderArea, viewport]);

  const open = contextMenuXy !== undefined && renderArea !== null;

  return (
    <ContextMenu open={open} onClose={close} anchor={anchor}>
      <MenuHeader label={selectionLabel} />
      <ItemActionMenuItems />
    </ContextMenu>
  );
};
