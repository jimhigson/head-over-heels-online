import { CommandItem } from "./command";
import type { Campaign } from "../model/modelTypes";
import { Select } from "./Select";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import type { ReactNode } from "react";
import naturalCompare from "natural-compare-lite";

export type RoomSelectProps<RoomId extends string> = {
  campaign: Pick<Campaign<RoomId>, "rooms">;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  value?: RoomId;
  triggerButtonClassName?: string;
  onSelect?: (roomId: RoomId) => void;
  excludeRoomIds?: RoomId[];
  tooltipContent?: ReactNode;
};

export function RoomSelect<RoomId extends string>({
  campaign,
  onSelect,
  headRoomId,
  heelsRoomId,
  value,
  triggerButtonClassName,
  excludeRoomIds = [],
  tooltipContent,
}: RoomSelectProps<RoomId>) {
  const roomIds = Object.keys(campaign.rooms)
    .filter((r) => !excludeRoomIds.includes(r as RoomId))
    .sort(naturalCompare) as RoomId[];

  return (
    <Select<RoomId>
      onSelect={(roomId) => onSelect?.(roomId)}
      value={value}
      values={roomIds}
      triggerButtonClassName={triggerButtonClassName}
      placeholder="search"
      tooltipContent={tooltipContent}
      disableCommandInput={false}
      triggerButtonLabel={value ?? "none"}
      OptionCommandItem={({ value, onSelect }) => {
        return (
          <CommandItem value={value} onSelect={onSelect} className="px-1">
            {headRoomId === value && (
              <span className="sprite mr-1 my-1 texture-head_walking_towards_2" />
            )}
            {heelsRoomId === value && (
              <span className="sprite mr-1 my-1 texture-heels_walking_towards_2" />
            )}
            <BitmapText>{value}</BitmapText>
          </CommandItem>
        );
      }}
    />
  );
}
