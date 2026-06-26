import { editorCampaignsApiSlice } from "./editorCampaignsApiSlice";
import { gameCampaignsApiSlice } from "./gameCampaignsApiSlice";

// tree shakable export of the correct api slice for the current app
export const campaignsApiSlice =
  import.meta.env.VITE_APP === "editor" ?
    editorCampaignsApiSlice
  : gameCampaignsApiSlice;
