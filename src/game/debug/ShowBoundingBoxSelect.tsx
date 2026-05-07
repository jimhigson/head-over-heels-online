import { useState } from "react";

import { type ItemInPlayType, itemInPlayTypes } from "../../model/ItemInPlay";
import { roomItemsIterable, type RoomStateItems } from "../../model/RoomState";
import { useAppDispatch } from "../../store/hooks";
import {
  useShowBoundingBoxTypes,
  useShowRoomScrollBounds,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  setShowBoundingBoxType,
  toggleUserSetting,
} from "../../store/slices/userSettings/userSettingsSlice";
import { Button } from "../../ui/Button";
import { cn } from "../../ui/cn";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { Switch, SwitchN } from "../../ui/Switch";
import { CssVariables } from "../components/CssVariables";
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
  const [open, setOpen] = useState(false);
  const [visibleTypes, setVisibleTypes] = useState<readonly ItemInPlayType[]>(
    sortedItemInPlayTypes,
  );

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
      } else {
        setVisibleTypes(sortedItemInPlayTypes);
      }
    }
    setOpen(nextOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <CssVariables scaleFactor={2}>
          <Command className="w-24">
            <CommandInput placeholder="filter types..." />
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
              <CommandGroup>
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
                      label={itemType}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CssVariables>
      </PopoverContent>
    </Popover>
  );
};
