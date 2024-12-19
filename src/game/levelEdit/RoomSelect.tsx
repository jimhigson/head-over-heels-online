import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
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
import { ImgSprite } from "../components/Sprite";

export type RoomSelectProps<RoomId extends string> = {
  gameApi?: GameApi<RoomId>;
  className?: string;
};

export function RoomSelect<RoomId extends string>({
  gameApi,
  className,
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
          className={`justify-between ${className}`}
        >
          {viewingRoomId || "Select a room"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
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
                    gameApi.changeRoom(currentValue as RoomId);
                    setOpen(false);
                  }}
                >
                  {gameApi.gameState.characterRooms.head?.id === r && (
                    <ImgSprite
                      textureId="head.walking.towards.2"
                      scale={2}
                      className="m-1"
                    />
                  )}
                  {gameApi.gameState.characterRooms.heels?.id === r && (
                    <ImgSprite
                      textureId="heels.walking.towards.2"
                      scale={2}
                      className="m-1"
                    />
                  )}
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
