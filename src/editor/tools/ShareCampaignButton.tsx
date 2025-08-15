import { supabaseDb } from "../../db/supabaseDb";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import type { TypedURLSearchParams } from "../../options/queryParams";
import { useSavedIsInSync } from "./SaveAndLoadButtons";
import { ToolbarButton } from "./ToolbarButton";
import { useShortTimeDisplay } from "./useShortTimeDisplay";

const tooltipMarkdown = `
## Share

**save first**

copies a link to the clipboard

give anyone the link to your game
`;

export const ShareCampaignButton = () => {
  const sharedIsInSync = useSavedIsInSync();
  const { doneNow, justDone } = useShortTimeDisplay();

  return justDone > 0 ?
      <ToolbarButton className="bg-moss">
        <BitmapText className="relative leading-none">OK!</BitmapText>
      </ToolbarButton>
    : <ToolbarButton
        disabled={!sharedIsInSync}
        onClick={async () => {
          const url = new URL(import.meta.env.VITE_GAME_URL);
          const searchParams = url.searchParams as TypedURLSearchParams;

          const {
            data: { session },
          } = await supabaseDb.auth.getSession();
          const userId = session?.user.id;

          if (userId === undefined) {
            throw new Error("no user id on supabase session");
          }

          searchParams.set("campaignName", "sequel");
          searchParams.set("campaignAuthorUserId", userId);

          navigator.clipboard.writeText(url.toString()).then(doneNow);
        }}
        tooltipContent={tooltipMarkdown}
      >
        <span
          className={`sprite sprite-tinted texture-editor_tool_share relative`}
        />
      </ToolbarButton>;
};
