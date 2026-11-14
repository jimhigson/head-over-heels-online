import { Suspense } from "preact/compat";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";

import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { Dialog } from "../../ui/Dialog";
import { DialogHeader } from "../../ui/DialogHeader";
import { DialogPortal } from "../../ui/DialogPortal";
import { SpinnerHeels } from "../../ui/Spinner";
import { Tab } from "../../ui/tabs/Tab";
import { TabBar } from "../../ui/tabs/TabBar";
import {
  type ShortcutKeys,
  useKeyboardShortcut,
} from "../../ui/useKeyboardShortcut";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../editorTypes";
import { LazyDialogRoomArea } from "../RoomEditingArea/DialogRoomArea.lazy";
import {
  dialogRoomClosed,
  dialogRoomOpened,
  selectOpenRoomSelectedJsonItemIds,
  selectRoom,
  setSelectedItemsInRoom,
} from "../slice/levelEditorSlice";
import { type OpenRoomId } from "../slice/OpenRoom";
import { type DialogRoom } from "../slice/reducers/openRoomsReducers";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import { ChooseRoomMap } from "./ChooseRoomMap";
import { type TeleporterDestination } from "./chooseTeleporterDestination";
import { teleporterDefaultLandingItemId } from "./teleporterDefaultLandingItemId";

type DestinationTab = "map" | "room";

const destinationTabs: DestinationTab[] = ["map", "room"];

const okShortcutKeys: ShortcutKeys = ["Enter"];

export type ChooseTeleporterDestinationDialogProps = {
  campaign: EditorCampaign;
  /** the room the teleporters are in */
  fromRoomId: EditorRoomId;
  /** the teleporters whose destination is being chosen */
  teleporterIds: readonly EditorRoomItemId[];
  /** the destination chosen when the dialog opens, if any */
  initialDestination: TeleporterDestination | undefined;
  onChoose: (destination: TeleporterDestination) => void;
  onCancel: () => void;
};

export type RoomItemPickerProps = {
  openRoomId: OpenRoomId;
  /**
   * a link in the room (eg a door's annotation) was followed to another room
   */
  onFollowLink: (roomId: EditorRoomId) => void;
};

/**
 * a rendering of the open room, where clicking an item picks it
 */
const RoomItemPicker = ({ openRoomId, onFollowLink }: RoomItemPickerProps) => (
  <Suspense fallback={<SpinnerHeels loadingBorder />}>
    <LazyDialogRoomArea openRoomId={openRoomId} onFollowLink={onFollowLink} />
  </Suspense>
);

/**
 * choose where teleporters lead: a room from the map, and the item in it to
 * land on from a rendering of the room. Where the room has a single
 * teleporter, landing on it needs no item named
 */
export const ChooseTeleporterDestinationDialog = ({
  campaign,
  fromRoomId,
  teleporterIds,
  initialDestination,
  onChoose,
  onCancel,
}: ChooseTeleporterDestinationDialogProps) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<DestinationTab>(
    initialDestination === undefined ? "map" : "room",
  );
  // the room picked from, and the items selected in it when it opens:
  const [pickerRoom, setPickerRoom] = useState<DialogRoom | undefined>(
    initialDestination === undefined ? undefined : (
      {
        roomId: initialDestination.toRoom,
        selectedJsonItemIds:
          initialDestination.toItemId === undefined ?
            []
          : [initialDestination.toItemId],
      }
    ),
  );
  const toRoom = pickerRoom?.roomId;
  // the dialog's open room on the picker room, for as long as it is shown:
  const [pickerOpenRoomId, setPickerOpenRoomId] = useState<
    OpenRoomId | undefined
  >(undefined);
  useLayoutEffect(() => {
    if (pickerRoom === undefined) {
      return;
    }
    const opening = dialogRoomOpened(pickerRoom);
    dispatch(opening);
    setPickerOpenRoomId(opening.payload.openRoomId);
    return () => {
      dispatch(dialogRoomClosed(opening.payload.openRoomId));
    };
  }, [dispatch, pickerRoom]);
  // a new open room for each room, so changing room clears the item picked:
  const chooseRoom = useCallback(
    (roomId: EditorRoomId) => {
      if (roomId !== toRoom) {
        setPickerRoom({ roomId, selectedJsonItemIds: [] });
      }
    },
    [toRoom],
  );

  const pickedItemId = useEditorAppSelector((state) =>
    pickerOpenRoomId === undefined ? undefined : (
      selectOpenRoomSelectedJsonItemIds(state, pickerOpenRoomId)[0]
    ),
  );
  const roomJson = useEditorAppSelector((state) =>
    toRoom === undefined ? undefined : selectRoom(state, toRoom),
  );
  const defaultLandingItemId =
    roomJson === undefined ? undefined : (
      teleporterDefaultLandingItemId(roomJson, teleporterIds)
    );
  const landingItemId = pickedItemId ?? defaultLandingItemId;

  const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
  const dialogRef = useCallback((el: HTMLDialogElement | null) => {
    setDialogEl(el);
    el?.focus();
  }, []);
  useKeyboardShortcut(["Escape"], false, onCancel, dialogEl);

  const canOk = toRoom !== undefined && landingItemId !== undefined;
  const ok = () => {
    if (toRoom !== undefined) {
      onChoose({
        toRoom,
        // naming the item landed on by default is redundant:
        toItemId:
          pickedItemId === defaultLandingItemId ? undefined : pickedItemId,
      });
    }
  };
  useKeyboardShortcut(okShortcutKeys, !canOk, ok, dialogEl);

  return (
    <DialogPortal>
      {/* at dialog z index, so it also covers any dialog this was opened over: */}
      <Border class="scale-editor !z-dialog" scrim />
      <div class="contents no-keyboard-shortcuts">
        <Dialog
          ref={dialogRef}
          tall
          wide
          class="scale-editor p-1 flex flex-col gap-1"
        >
          <DialogHeader>Teleport to</DialogHeader>
          {/* the tabs and what they show, with no gap between: */}
          <div class="flex flex-col flex-1 min-h-0">
            <TabBar tabLabels={destinationTabs} label="Destination">
              {destinationTabs.map((destinationTab) => (
                <Tab
                  key={destinationTab}
                  label={destinationTab}
                  shortLabel={destinationTab}
                  isActive={tab === destinationTab}
                  // a room's items can be picked only once there is a room:
                  disabled={destinationTab === "room" && toRoom === undefined}
                  onSelect={() => setTab(destinationTab)}
                  class={`${buttonSmallHeightClassNames} pr-1`}
                />
              ))}
            </TabBar>
            <div class="relative flex-1 min-h-0 grow-1">
              <div class={tab === "map" ? "h-full" : "hidden"}>
                <ChooseRoomMap
                  campaign={campaign}
                  mapRoomId={fromRoomId}
                  chosenRoomId={toRoom}
                  onChoose={chooseRoom}
                />
              </div>
              {/* kept mounted while the map is shown, so its pixi app isn't rebuilt: */}
              <div
                class={tab === "room" ? "h-full flex flex-col gap-1" : "hidden"}
              >
                <div class="relative flex-1 min-h-0">
                  {pickerOpenRoomId !== undefined && (
                    <RoomItemPicker
                      key={pickerOpenRoomId}
                      openRoomId={pickerOpenRoomId}
                      // following a link picks from that room instead:
                      onFollowLink={chooseRoom}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <span class="text-single-line text-lightGrey self-end">
            {toRoom === undefined ?
              "no room chosen"
            : landingItemId === undefined ?
              `lands in room ‘${toRoom}’ — no item to land on`
            : landingItemId === defaultLandingItemId ?
              `lands in room ‘${toRoom}’ on teleporter ‘${landingItemId}’ (by default)`
            : `lands in room ‘${toRoom}’ on item ‘${landingItemId}’`}
          </span>
          <div class="flex flex-wrap gap-1 text-white items-center">
            <Button
              aria-label="Clear item"
              onClick={() =>
                dispatch(setSelectedItemsInRoom({ jsonItemIds: [] }))
              }
              disabled={pickedItemId === undefined}
              class="px-1 py-half self-stretch"
            >
              <span class="text-single-line">Clear item</span>
            </Button>
            <Button
              aria-label="Cancel"
              onClick={onCancel}
              class="px-1 py-half self-stretch ml-auto"
            >
              <span class="text-single-line">Cancel</span>
            </Button>
            <Button
              aria-label="OK"
              onClick={ok}
              disabled={!canOk}
              shortcutKeys={okShortcutKeys}
              class="bg-midRed px-1 py-half"
            >
              <span class="text-single-line">OK</span>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
