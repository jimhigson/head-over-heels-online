import { type ComponentChildren } from "preact";

import { cssForRoomColour } from "../editor/toolbar/buttons/RoomColourSelect";
import { CssVariables } from "../game/components/CssVariables";
import { usePlayableTailwindSpriteClassname } from "../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { type RoomHues } from "../model/roomHues";
import { useIsUncolourised } from "../store/slices/gameMenus/gameMenusSelectors";
import { naturalCompare } from "../utils/naturalCompare";
import { CommandItem } from "./command/CommandItem";
import { CommandMatch } from "./command/CommandMatch";
import { CurrentMarker } from "./CurrentMarker";
import { Select } from "./Select";

export type RoomSelectProps<RoomId extends string> = {
  /**
   * the rooms to choose from, with the hue to show each in
   */
  roomHues: RoomHues<RoomId>;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  value?: RoomId;
  triggerButtonClassName?: string;
  onSelect?: (roomId: RoomId) => void;
  excludeRoomIds?: RoomId[];
  tooltipContent?: ComponentChildren;
  /**
   * what to call each room, where its id isn't enough
   */
  roomLabel?: (roomId: RoomId) => string;
  /**
   * more about each room, shown at the end of its option
   */
  roomDetail?: (roomId: RoomId) => ComponentChildren;
  /**
   * for short lists, which need no search box
   */
  withoutSearch?: boolean;
};

export function RoomSelect<RoomId extends string>({
  roomHues,
  onSelect,
  headRoomId,
  heelsRoomId,
  value,
  triggerButtonClassName,
  excludeRoomIds = [],
  tooltipContent,
  roomLabel = (roomId) => roomId,
  roomDetail,
  withoutSearch = false,
}: RoomSelectProps<RoomId>) {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const roomIds = Object.keys(roomHues)
    .filter((r) => !excludeRoomIds.includes(r as RoomId))
    .sort(naturalCompare) as RoomId[];

  const uncolourised = useIsUncolourised();

  return (
    <Select<RoomId>
      onSelect={(roomId) => onSelect?.(roomId)}
      value={value}
      values={roomIds}
      triggerButtonClassName={triggerButtonClassName}
      tooltipContent={tooltipContent}
      {...(withoutSearch ?
        { disableCommandInput: true }
      : { disableCommandInput: false, placeholder: "search" })}
      triggerButtonLabel={value === undefined ? "none" : roomLabel(value)}
      OptionCommandItem={({ itemValue, isCurrent, onSelect }) => {
        return (
          <CommandItem
            value={itemValue}
            onSelect={onSelect}
            class="px-1"
            data-test-id={`room-select-${itemValue}`}
            style={cssForRoomColour(roomHues[itemValue], uncolourised)}
          >
            <CurrentMarker isCurrent={isCurrent} uncoloured />
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
            <CommandMatch text={roomLabel(itemValue)} />
            {roomDetail && (
              <span class="ml-auto pl-1 text-single-line whitespace-nowrap">
                {roomDetail(itemValue)}
              </span>
            )}
          </CommandItem>
        );
      }}
    />
  );
}
