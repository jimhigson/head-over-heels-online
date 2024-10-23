"use client";

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
import { CampaignRoom, CampaignRoomId, UnknownCampaign } from "@/modelTypes";

export type RoomSelectProps<C extends UnknownCampaign> = {
  campaign: C;
  room: CampaignRoom<C> | undefined;
  onRoomSelect: (room: CampaignRoomId<C>) => void;
};

export function RoomSelect<C extends UnknownCampaign>({
  onRoomSelect: onRoomChange,
  room,
  campaign,
}: RoomSelectProps<C>) {
  const [open, setOpen] = React.useState(false);

  const roomIds = Object.keys(campaign) as Array<CampaignRoomId<C>>;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {room?.id}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {roomIds.map((r) => (
                <CommandItem
                  key={r}
                  value={r}
                  onSelect={(currentValue) => {
                    onRoomChange(currentValue as CampaignRoomId<C>);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      room?.id === r ? "opacity-100" : "opacity-0",
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
