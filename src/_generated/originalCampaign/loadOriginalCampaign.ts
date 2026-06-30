import { columnarDecode } from "../../columnar/decoder.ts";
import { type Campaign } from "../../model/modelTypes.ts";
import { importOnce } from "../../utils/importOnce.ts";
import { type OriginalCampaignRoomId } from "./OriginalCampaignRoomId.ts";

export const loadOriginalCampaign = importOnce(
  async (): Promise<Campaign<OriginalCampaignRoomId>> => {
    if (import.meta.env.DEV) {
      return (await import("./campaign.ts")).campaign;
    }
    // only the blob is lazy; the decoder is already in the graph (db loads use
    // it too), so importing it dynamically would not split it into its own chunk
    const { default: url } = await import("./campaign.columnar.json?url");
    return columnarDecode<OriginalCampaignRoomId>(
      await (await fetch(url)).json(),
    );
  },
);
