import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { CssVariables } from "../game/components/CssVariables";
import type { Campaign } from "../model/modelTypes";

export type RoomSelectProps<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  viewingRoomId?: RoomId;
  className?: string;
  onRoomSelect?: (roomId: RoomId) => void;
};

export function RoomSelect<RoomId extends string>({
  campaign,
  onRoomSelect,
  headRoomId,
  heelsRoomId,
  viewingRoomId,
  className,
}: RoomSelectProps<RoomId>) {
  const [open, setOpen] = useState(false);

  const roomIds = Object.keys(campaign.rooms) as RoomId[];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${className}`}
        >
          {viewingRoomId || "Select a room"}
          <span
            className={`sprite ml-2 h-4 w-4 shrink-0 ${open ? "texture-hud_char_X" : "texture-hud_char_⬇"}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <CssVariables scaleFactor={1}>
          <Command className="w-[--radix-popper-anchor-width]">
            <CommandInput placeholder="Room id" />
            <CommandList>
              <CommandEmpty>No room found</CommandEmpty>
              <CommandGroup>
                {roomIds.map((r) => (
                  <CommandItem
                    key={r}
                    value={r}
                    className={viewingRoomId === r ? "bg-moss" : ""}
                    onSelect={(currentValue) => {
                      onRoomSelect?.(currentValue as RoomId);
                      setOpen(false);
                    }}
                  >
                    {headRoomId === r && (
                      <span className="sprite m-1 texture-head_walking_towards_2" />
                    )}
                    {heelsRoomId === r && (
                      <span className="sprite m-1 texture-heels_walking_towards_2" />
                    )}
                    {r}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CssVariables>
      </PopoverContent>
    </Popover>
  );
}
