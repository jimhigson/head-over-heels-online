import { roomJsonItemsIterable } from "../../model/RoomJsonItemIterators";
import { keysIter, objectEntriesIter } from "../../utils/entries";
import { first } from "../../utils/iterators/first";
import type { EditorCampaign, EditorRoomId } from "../editorTypes";

/**
 * the room to start editing a campaign in: head's room (the traditional
 * starting room), else heels', else any
 */
export const startingRoomId = (campaign: EditorCampaign): EditorRoomId => {
  const playerRoomId = (which: "head" | "heels") =>
    objectEntriesIter(campaign.rooms).find(([, room]) =>
      roomJsonItemsIterable(room).some(
        (item) => item.type === "player" && item.config.which === which,
      ),
    )?.[0];
  const maybeRoomId =
    playerRoomId("head") ??
    playerRoomId("heels") ??
    first(keysIter(campaign.rooms));
  if (maybeRoomId === undefined) {
    throw new Error("could not find any rooms in this campaign");
  }
  return maybeRoomId;
};
