import type { MouseEvent } from "react";

import type { JsonItem } from "../../../../../../model/json/JsonItem";
import type { IndividualCharacterName } from "../../../../../../model/modelTypes";
import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { Xyz } from "../../../../../../utils/vectors/vectors";

import { vectorClosestDirectionXy8 } from "../../../../../../utils/vectors/vectors";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/PlayableTailwindSprite";
import { ScrollIntoView } from "./ScrollIntoView";

/**
 * items that get rendered on the map if they are found in the room's json
 */
export type NotableItem<RoomId extends string> =
  | JsonItem<"hushPuppy", RoomId>
  | JsonItem<"lift", RoomId>
  | JsonItem<"pickup", RoomId>
  | JsonItem<"teleporter", RoomId>;

export const SpriteInRoom = ({
  className,
  scrollTo = false,
  onClick,
  yAdjust = 0,
}: {
  /**
   * should have a sprite-* utility class and some way to set the --scale var - for this to actually show a sprite
   */
  className: string;
  scrollTo?: boolean;
  onClick?: (e: MouseEvent) => void;
  yAdjust?: number;
}) => {
  return (
    <foreignObject
      x={-50}
      y={-100 + yAdjust}
      width={100}
      height={100}
      className={className}
      // because of its width and height, this will cover up other rooms behind this one,
      // and will stop clicks on them - eg, in the editor to change room via the map.
      // however, this may come at the cost of switching by clicking on char on the map in-game
      style={{ pointerEvents: "none" }}
    >
      <div
        className={`sprite zx:sprite-revert-to-two-tone ml-[calc(50px-var(--scale)*var(--w)*1px/2)] mt-[calc(100px-var(--scale)*var(--h)*1px)] ${
          className
        }`}
        onClick={onClick}
        // having turned pointer events off for the foreign object, turn them back on for the item
        // sprite *iff* we have a click handler to call
        // TODO: test this in iphone Safari, since it struggles with fos!
        style={onClick ? { pointerEvents: "all" } : {}}
      />
      {scrollTo && <ScrollIntoView />}
    </foreignObject>
  );
};

export const PlayableItemInRoom = ({
  characterName,
  facing,
  isCurrent = false,
  onlyPlayableInRoom = false,
  yAdjust = 0,
  onClick,
}: {
  characterName: IndividualCharacterName;
  facing: Xyz;
  isCurrent?: boolean;
  onlyPlayableInRoom: boolean;
  yAdjust?: number;
  onClick?: (name: "head" | "heels") => void;
}) => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  return (
    <SpriteInRoom
      className={`${onlyPlayableInRoom ? "[--scale:2.5]" : "[--scale:1.5]"}
                ${spriteClassname({
                  character: characterName,
                  action: isCurrent ? "walking" : "idle",
                  facingXy8: vectorClosestDirectionXy8(facing) ?? "towards",
                })}`}
      scrollTo={isCurrent}
      yAdjust={yAdjust}
      onClick={(e) => {
        onClick?.(characterName);
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
};

export const NotableItemSvg = ({ item }: { item: NotableItem<string> }) => {
  const isBigItem = item.type === "hushPuppy" || item.type === "teleporter";
  const scaleClass = isBigItem ? "[--scale:1.25]" : "[--scale:1.5]";

  if (item.type === "lift") {
    return (
      <>
        <SpriteInRoom
          className={`${scaleClass} ${"texture-lift_static" satisfies TextureTailwindClass}`}
        />
        <SpriteInRoom
          className={`${scaleClass} ${"texture-lift_2" satisfies TextureTailwindClass}`}
        />
      </>
    );
  }

  const spriteClassName =
    // the biggest sprites get scaled down so all sprites are about the same size:
    item.type === "teleporter" ?
      ("texture-teleporter" satisfies TextureTailwindClass)
    : item.type === "hushPuppy" ?
      ("texture-hushPuppy" satisfies TextureTailwindClass)
    : item.config.gives === "extra-life" ?
      ("texture-whiteRabbit_extra-life" satisfies TextureTailwindClass)
    : item.config.gives === "fast" ?
      ("texture-whiteRabbit_fast" satisfies TextureTailwindClass)
    : item.config.gives === "jumps" ?
      ("texture-whiteRabbit_jumps" satisfies TextureTailwindClass)
    : item.config.gives === "shield" ?
      ("texture-whiteRabbit_shield" satisfies TextureTailwindClass)
    : item.config.gives === "doughnuts" ?
      ("texture-doughnuts" satisfies TextureTailwindClass)
    : item.config.gives === "hooter" ?
      ("texture-hooter" satisfies TextureTailwindClass)
    : item.config.gives === "bag" ?
      ("texture-bag" satisfies TextureTailwindClass)
    : item.config.gives === "reincarnation" ?
      ("texture-animated-fish" satisfies AnimatedTextureTailwindClass)
    : item.config.gives === "crown" ?
      item.config.planet === "blacktooth" ?
        ("texture-crown_blacktooth" satisfies TextureTailwindClass)
      : item.config.planet === "egyptus" ?
        ("texture-crown_egyptus" satisfies TextureTailwindClass)
      : item.config.planet === "penitentiary" ?
        ("texture-crown_penitentiary" satisfies TextureTailwindClass)
      : item.config.planet === "safari" ?
        ("texture-crown_safari" satisfies TextureTailwindClass)
      : ("texture-crown_bookworld" satisfies TextureTailwindClass)
    : ("texture-block_organic" satisfies TextureTailwindClass);

  return <SpriteInRoom className={`${scaleClass} ${spriteClassName}`} />;
};
