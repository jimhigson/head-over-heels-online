import { reconsolidateItems } from "../../src/consolidateItems/reconsolidateItems";
import { makeToasterConsolidationPredicate } from "../../src/consolidateItems/toasterConsolidationPredicate";
import { type Campaign } from "../../src/model/modelTypes";
import { entries } from "../../src/utils/entries";

export const reconsolidateCampaign = (
  campaign: Campaign<string>,
): Campaign<string> => ({
  ...campaign,
  rooms: Object.fromEntries(
    entries(campaign.rooms).map(([roomId, room]) => [
      roomId,
      {
        ...room,
        items: reconsolidateItems(
          room.items,
          makeToasterConsolidationPredicate(room.items),
        ),
      },
    ]),
  ),
});
