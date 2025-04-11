import type { JsonItem } from "../../../../../../model/json/JsonItem";
import { ScrollIntoView } from "./ScrollIntoView";
import type { MouseEvent } from "react";

/**
 * items that get rendered on the map if they are found in the room's json
 */
export type NotableItem<RoomId extends string> =
  | JsonItem<"pickup", RoomId>
  | JsonItem<"hushPuppy", RoomId>
  | JsonItem<"teleporter", RoomId>;

export const SpriteInRoom = ({
  className,
  scrollTo = false,
  onClick,
}: {
  /**
   * should have a sprite-* utility and some way to set the --scale var - for this to actually show a sprite
   */
  className: string;
  scrollTo?: boolean;
  onClick?: (e: MouseEvent) => void;
}) => {
  return (
    <foreignObject
      x={-50}
      y={-100}
      width={100}
      height={100}
      className={className}
    >
      <div
        className={`sprite zx:sprite-revert-to-two-tone ml-[calc(50px-var(--scale)*var(--w)/2)] mt-[calc(100px-var(--scale)*var(--h))] ${
          className
        }`}
        onClick={onClick}
      />
      {scrollTo && <ScrollIntoView />}
    </foreignObject>
  );
};

export const NotableItemSvg = <RoomId extends string>({
  notableItem: item,
  className,
}: {
  notableItem: NotableItem<RoomId>;
  className?: string;
}) => {
  const spriteClassName =
    // the biggest sprites get scaled down so all sprites are about the same size:
    item.type === "teleporter" ? "texture-teleporter"
    : item.type === "hushPuppy" ? "texture-hushPuppy"
    : (
      item.config.gives === "extra-life" ||
      item.config.gives === "fast" ||
      item.config.gives === "jumps" ||
      item.config.gives === "shield"
    ) ?
      "texture-whiteRabbit"
    : item.config.gives === "doughnuts" ? "texture-doughnuts"
    : item.config.gives === "hooter" ? "texture-hooter"
    : item.config.gives === "bag" ? "texture-bag"
    : item.config.gives === "reincarnation" ? "texture-animated-fish"
    : item.config.gives === "crown" ?
      item.config.planet === "blacktooth" ? "texture-crown.blacktooth"
      : item.config.planet === "egyptus" ? "texture-crown.egyptus"
      : item.config.planet === "penitentiary" ? "texture-crown.penitentiary"
      : item.config.planet === "safari" ? "texture-crown.safari"
      : item.config.planet === "bookworld" ? "texture-crown.bookworld"
      : "texture-crown.dark"
    : "texture-block.organic";

  return <SpriteInRoom className={`${className ?? ""} ${spriteClassName}`} />;
};
