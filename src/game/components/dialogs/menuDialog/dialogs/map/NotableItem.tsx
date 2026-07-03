import { type JsonItem } from "../../../../../../model/json/JsonItem";
import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import {
  vectorClosestDirectionXy8,
  type Xyz,
} from "../../../../../../utils/vectors/vectors";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";
import { SvgSpriteInRoom } from "./SvgSpriteInRoom";

/**
 * items that get rendered on the map if they are found in the room's json
 */
export type NotableItem<RoomId extends string> =
  | JsonItem<"hushPuppy", RoomId>
  | JsonItem<"lift", RoomId>
  | JsonItem<"pickup", RoomId>
  | JsonItem<"teleporter", RoomId>;

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
    <SvgSpriteInRoom
      scale={onlyPlayableInRoom ? 2.5 : 1.5}
      spriteClass={spriteClassname({
        character: characterName,
        action: isCurrent ? "walking" : "idle",
        facingXy8: vectorClosestDirectionXy8(facing) ?? "towards",
      })}
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
  // the biggest sprites get scaled down so all sprites are about the same size
  const scale = isBigItem ? 1.25 : 1.5;

  if (item.type === "lift") {
    return (
      <>
        <SvgSpriteInRoom
          scale={scale}
          spriteClass={"texture-lift_static" satisfies TextureTailwindClass}
        />
        <SvgSpriteInRoom
          scale={scale}
          spriteClass={"texture-lift_2" satisfies TextureTailwindClass}
        />
      </>
    );
  }

  const spriteClassName =
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

  return <SvgSpriteInRoom scale={scale} spriteClass={spriteClassName} />;
};
