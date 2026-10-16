import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type Campaign } from "../../model/modelTypes";
import { emptyArray } from "../../utils/empty";
import { teleporterIsActive } from "../physics/mechanics/teleporterIsActive";
import { entryTuneSoundsForRoom } from "./entryTuneSoundsForRoom";
import { type ItemBehaviour } from "./ItemBehaviour";

type TeleporterItem<
  RoomId extends string,
  RoomItemId extends string,
> = ItemTypeUnion<"portableTeleporter" | "teleporter", RoomId, RoomItemId>;

type ItemBehaviourClass = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => ItemBehaviour;

/**
 * what all teleporters do, whether fixed in place or portable
 */
export const TeleporterMixin = <B extends ItemBehaviourClass>(Base: B) =>
  class Teleporter extends Base {
    override isJumpOffable<RoomId extends string, RoomItemId extends string>(
      teleporter: TeleporterItem<RoomId, RoomItemId>,
    ): boolean {
      // can't jump from an active teleporter (jump input teleports)
      return !teleporterIsActive(teleporter);
    }

    /** preload the room entry tune of the room the teleporter leads to */
    override soundsToPreload<RoomId extends string, RoomItemId extends string>(
      teleporter: TeleporterItem<RoomId, RoomItemId>,
      campaign: Campaign<RoomId>,
    ): readonly ExportedSoundId[] {
      const {
        state: { toRoom },
      } = teleporter;
      // no toRoom means teleporting within the same room
      return toRoom === undefined ? emptyArray : (
          entryTuneSoundsForRoom(toRoom, campaign)
        );
    }
  };
