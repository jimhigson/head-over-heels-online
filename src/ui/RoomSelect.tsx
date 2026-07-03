import naturalCompare from "natural-compare-lite";
import { type ComponentChildren } from "preact";

import { cssForRoomColour } from "../editor/toolbar/buttons/RoomColourSelect";
import { CssVariables } from "../game/components/CssVariables";
import { usePlayableTailwindSpriteClassname } from "../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { type Campaign } from "../model/modelTypes";
import { useIsUncolourised } from "../store/slices/gameMenus/gameMenusSelectors";
import { CommandItem } from "./command/CommandItem";
import { CommandMatch } from "./command/CommandMatch";
import { Select } from "./Select";

export type RoomSelectProps<RoomId extends string> = {
  campaign: Pick<Campaign<RoomId>, "rooms">;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  value?: RoomId;
  triggerButtonClassName?: string;
  onSelect?: (roomId: RoomId) => void;
  excludeRoomIds?: RoomId[];
  tooltipContent?: ComponentChildren;
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
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const roomIds = Object.keys(campaign.rooms)
    .filter((r) => !excludeRoomIds.includes(r as RoomId))
    .sort(naturalCompare) as RoomId[];

  const uncolourised = useIsUncolourised();

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
      OptionCommandItem={({ itemValue, onSelect }) => {
        return (
          <CommandItem
            value={itemValue}
            onSelect={onSelect}
            class="px-1"
            data-test-id={`room-select-${itemValue}`}
            style={cssForRoomColour(
              campaign.rooms[itemValue].color.hue,
              uncolourised,
            )}
          >
            {headRoomId === itemValue && (
              <CssVariables scaleFactor={1}>
                <span
                  class={`sprite mr-1 my-1 ${spriteClassname({ character: "head", action: "idle", facingXy8: "towards" })}`}
                />
              </CssVariables>
            )}
            {heelsRoomId === itemValue && (
              <CssVariables scaleFactor={1}>
                <span
                  class={`sprite mr-1 my-1 ${spriteClassname({ character: "heels", action: "idle", facingXy8: "towards" })}`}
                />
              </CssVariables>
            )}
            <CommandMatch text={itemValue} />
          </CommandItem>
        );
      }}
    />
  );
}
