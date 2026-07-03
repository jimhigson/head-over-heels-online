import { useCallback } from "preact/hooks";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenu } from "../../../ui/command/ContextMenu";
import { type Xy } from "../../../utils/vectors/vectors";
import { useEditorRoomRenderDimensions } from "../../slice/levelEditorSelectorHooks";
import {
  closeItemContextMenu,
  selectContextMenuXy,
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";
import { roomEditingAreaMarginPx } from "../roomEditingAreaMarginPx";
import { ActivationMenuItems } from "./ActivationMenuItems";
import { CoalesceMenuItem } from "./CoalesceMenuItem";
import { DeleteMenuItem } from "./DeleteMenuItem";
import { DisappearingMenuItems } from "./DisappearingMenuItems";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { ExplodeMenuItem } from "./ExplodeMenuItem";
import { MirrorOrientationMenuItems } from "./MirrorOrientationMenuItems";
import { MonsterMovementMenuItems } from "./MonsterMovementMenuItems";
import { StartDirectionMenuItems } from "./StartDirectionMenuItems";

/**
 * label summarising the current selection, eg "2 block" when all the same type,
 * or "3 items" when the types differ
 */
const selectionLabel = (types: readonly string[]): string =>
  types.every((type) => type === types[0]) ?
    `${types.length} ${types[0]}`
  : `${types.length} items`;

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
  const upscale = useAppSelector(selectUpscale);
  const roomRenderSize = useEditorRoomRenderDimensions();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

  const close = useCallback(() => dispatch(closeItemContextMenu()), [dispatch]);

  // contextMenuXy is in the room's projected screen space (scaled pixels) - the
  // inverse of upscaledMousePosition() - so convert it back to a viewport point:
  const anchor = useCallback((): Xy => {
    if (contextMenuXy === undefined || renderArea === null) {
      return { x: 0, y: 0 };
    }
    const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;
    const rect = renderArea.getBoundingClientRect();
    return {
      x:
        (contextMenuXy.x - roomRenderSize.l + roomEditingAreaMarginPx) *
          totalUpscale +
        rect.left,
      y:
        (contextMenuXy.y - roomRenderSize.t + roomEditingAreaMarginPx) *
          totalUpscale +
        rect.top,
    };
  }, [contextMenuXy, renderArea, roomRenderSize, upscale]);

  const open = contextMenuXy !== undefined && renderArea !== null;

  const selectedTypes = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined)
    .map((item) => item.type);

  return (
    <ContextMenu
      open={open}
      onClose={close}
      anchor={anchor}
      header={
        <span className="text-single-line">
          {selectionLabel(selectedTypes)}
        </span>
      }
    >
      <DeleteMenuItem />
      <DuplicateMenuItem />
      <ExplodeMenuItem />
      <CoalesceMenuItem />
      <ActivationMenuItems />
      <DisappearingMenuItems />
      <MonsterMovementMenuItems />
      <StartDirectionMenuItems />
      <MirrorOrientationMenuItems />
    </ContextMenu>
  );
};
