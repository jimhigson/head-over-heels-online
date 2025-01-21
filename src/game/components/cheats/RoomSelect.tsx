import type { GameApi } from "../../GameApi";
import { useCurrentlyViewedRoom } from "./useCurrentRoom";
import { CssSprite } from "../Sprite";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";

export type RoomSelectProps<RoomId extends string> = {
  gameApi?: GameApi<RoomId>;
  className?: string;
};

export function RoomSelect<RoomId extends string>({
  gameApi,
  className,
}: RoomSelectProps<RoomId>) {
  const [open, setOpen] = useState(false);

  const viewingRoomId = useCurrentlyViewedRoom();

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
          <CssSprite
            className={`"ml-2 h-4 w-4 shrink-0 ${open ? "texture-hud.char.X" : "texture-hud.char.⬇"}`}
          />
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
                    <CssSprite className="m-1 head.walking.towards.2" />
                  )}
                  {gameApi.gameState.characterRooms.heels?.id === r && (
                    <CssSprite className="m-1 texture-heels.walking.towards.2" />
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
