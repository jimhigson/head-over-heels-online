import { useState } from "preact/hooks";

import { type ItemInPlayType, itemInPlayTypes } from "../../model/ItemInPlay";
import { roomItemsIterable, type RoomStateItems } from "../../model/RoomState";
import { useAppDispatch } from "../../store/hooks";
import {
  useShowBoundingBoxTypes,
  useShowRoomScrollBounds,
  useShowSubrooms,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  setShowBoundingBoxType,
  toggleUserSetting,
} from "../../store/slices/userSettings/userSettingsSlice";
import { Button } from "../../ui/Button";
import { cn } from "../../ui/cn";
import { Command } from "../../ui/command/Command";
import { CommandGroup } from "../../ui/command/CommandGroup";
import { CommandInput } from "../../ui/command/CommandInput";
import { CommandItem } from "../../ui/command/CommandItem";
import { CommandList } from "../../ui/command/CommandList";
import { CommandMatch } from "../../ui/command/CommandMatch";
import { Popover } from "../../ui/Popover";
import { Switch, SwitchN } from "../../ui/Switch";
import { BitmapText } from "../components/tailwindSprites/BitmapText";

const sortedItemInPlayTypes = itemInPlayTypes.toSorted();

const allItemsStates = ["none", "some", "all"] as const;
type AllItemsState = (typeof allItemsStates)[number];

const allItemsState = (selectedCount: number): AllItemsState => {
  if (selectedCount === 0) {
    return "none";
  }
  if (selectedCount === itemInPlayTypes.length) {
    return "all";
  }
  return "some";
};

const triggerLabel = (selected: ItemInPlayType[]): string => {
  if (selected.length === 0) {
    return "none";
  }
  if (selected.length === itemInPlayTypes.length) {
    return "all";
  }
  if (selected.length === 1) {
    return selected[0];
  }
  return `${selected.length}`;
};

export type ShowBoundingBoxSelectProps = {
  getCurrentRoomItems?: () => RoomStateItems<string, string> | undefined;
};

export const ShowBoundingBoxSelect = ({
  getCurrentRoomItems,
}: ShowBoundingBoxSelectProps) => {
  const dispatch = useAppDispatch();
  const selected = useShowBoundingBoxTypes();
  const selectedSet = new Set(selected);
  const showRoomScrollBounds = useShowRoomScrollBounds();
  const showSubrooms = useShowSubrooms();
  const [open, setOpen] = useState(false);
  const [visibleTypes, setVisibleTypes] = useState<readonly ItemInPlayType[]>(
    sortedItemInPlayTypes,
  );

  const [typesNotInRoom, setTypesNotInRoom] = useState<
    readonly ItemInPlayType[]
  >([]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen && getCurrentRoomItems) {
      const items = getCurrentRoomItems();
      if (items) {
        const typesInRoom = new Set(
          roomItemsIterable(items).map((item) => item.type),
        );
        setVisibleTypes(
          sortedItemInPlayTypes.filter((t) => typesInRoom.has(t)),
        );
        setTypesNotInRoom(
          sortedItemInPlayTypes.filter((t) => !typesInRoom.has(t)),
        );
      } else {
        setVisibleTypes(sortedItemInPlayTypes);
        setTypesNotInRoom([]);
      }
    }
    setOpen(nextOpen);
  };

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      trigger={
        <Button
          className={cn(
            "h-2 px-1 flex flex-row gap-1 justify-start leading-none w-13",
          )}
        >
          <BitmapText className="grow overflow-hidden text-left">
            {triggerLabel(selected)}
          </BitmapText>
          <BitmapText className="grow-0">{open ? "X" : "⬇"}</BitmapText>
        </Button>
      }
      contents={
        <Command className="w-24">
          <CommandInput autoFocus placeholder="filter types..." />
          <CommandList>
            <CommandGroup>
              <CommandItem
                value="__room-scroll-bounds__"
                onSelect={() => {
                  dispatch(
                    toggleUserSetting({
                      path: "displaySettings.showRoomScrollBounds",
                    }),
                  );
                }}
                className="px-1"
              >
                <Switch
                  className="w-full"
                  value={showRoomScrollBounds}
                  label="scroll bounds"
                />
              </CommandItem>
              <CommandItem
                value="__sub-rooms__"
                onSelect={() => {
                  dispatch(
                    toggleUserSetting({
                      path: "displaySettings.showSubrooms",
                    }),
                  );
                }}
                className="px-1"
              >
                <Switch
                  className="w-full"
                  value={showSubrooms}
                  label="sub-rooms"
                />
              </CommandItem>
            </CommandGroup>
            <CommandGroup>
              <div className="px-1 py-half">
                <SwitchN
                  className="w-full"
                  value={allItemsState(selected.length)}
                  values={allItemsStates}
                  onChange={(newValue) => {
                    dispatch(
                      setShowBoundingBoxType({ value: newValue !== "none" }),
                    );
                  }}
                  label="items"
                />
              </div>
            </CommandGroup>
            <CommandGroup
              heading={
                <BitmapText
                  doubleHeight
                  className="pl-1 mt-1 text-moss zx:text-zxGreen toppy:text-toppyCool2 block"
                >
                  In room:
                </BitmapText>
              }
            >
              {visibleTypes.map((itemType) => (
                <CommandItem
                  key={itemType}
                  value={itemType}
                  onSelect={() => {
                    dispatch(
                      setShowBoundingBoxType({
                        itemType,
                        value: !selectedSet.has(itemType),
                      }),
                    );
                  }}
                  className="px-1"
                >
                  <Switch
                    className="w-full"
                    value={selectedSet.has(itemType)}
                    label={<CommandMatch text={itemType} />}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            {typesNotInRoom.length > 0 && (
              <CommandGroup
                heading={
                  <BitmapText
                    doubleHeight
                    className="pl-1 mt-1 text-moss zx:text-zxGreen toppy:text-toppyCool2 block"
                  >
                    Others
                  </BitmapText>
                }
              >
                {typesNotInRoom.map((itemType) => (
                  <CommandItem
                    key={itemType}
                    value={itemType}
                    onSelect={() => {
                      dispatch(
                        setShowBoundingBoxType({
                          itemType,
                          value: !selectedSet.has(itemType),
                        }),
                      );
                    }}
                    className="px-1"
                  >
                    <Switch
                      className="w-full"
                      value={selectedSet.has(itemType)}
                      label={<CommandMatch text={itemType} />}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      }
    />
  );
};
