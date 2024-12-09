import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { GameApi } from "../GameApi";
import { useCurrentlyViewedRoom } from "./useCurrentRoom";

export type RoomSelectProps<RoomId extends string> = {
  gameApi?: GameApi<RoomId>;
};

export function RoomSelect<RoomId extends string>({
  gameApi,
}: RoomSelectProps<RoomId>) {
  const [open, setOpen] = React.useState(false);

  const viewingRoomId = useCurrentlyViewedRoom(gameApi);

  if (gameApi === undefined) {
    return null;
  }

  const roomIds = Object.keys(gameApi.campaign.rooms) as RoomId[];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {viewingRoomId || "Select a room"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Room id" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {roomIds.map((r) => (
                <CommandItem
                  key={r}
                  value={r}
                  onSelect={(currentValue) => {
                    gameApi.changeRoom(currentValue as RoomId);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      viewingRoomId === r ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {r}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
