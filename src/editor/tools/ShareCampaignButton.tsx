import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import type { TypedURLSearchParams } from "../../options/queryParams";
import { cn } from "../../ui/cn";
import { useAppSelectorWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { useRemoteIsInSync } from "./SaveAndLoadButtons";
import { ToolbarButton } from "./ToolbarButton";
import { useShortTimeDisplay } from "./useShortTimeDisplay";

const tooltipMarkdown = `
## Share

**save first**

copies a link to the clipboard

give anyone the link to your game
`;

export const ShareCampaignButton = () => {
  const remoteIsInSync = useRemoteIsInSync();
  const { doneNow, justDone } = useShortTimeDisplay();
  const { userId, campaignName } = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress.locator,
  );
  const disabled = !remoteIsInSync || campaignName === undefined;

  return justDone > 0 ?
      <ToolbarButton className="bg-moss">
        <BitmapText className="relative leading-none">OK!</BitmapText>
      </ToolbarButton>
    : <ToolbarButton
        disabled={disabled}
        onClick={async () => {
          const url = new URL(import.meta.env.VITE_GAME_URL);
          const searchParams = url.searchParams as TypedURLSearchParams;

          if (userId === undefined) {
            throw new Error("no user id on supabase session");
          }

          searchParams.set("campaignName", campaignName!);
          searchParams.set("campaignAuthorUserId", userId);

          navigator.clipboard.writeText(url.toString()).then(doneNow);
        }}
        tooltipContent={tooltipMarkdown}
      >
        <span
          className={cn(`sprite texture-editor_tool_share relative`, {
            "sprite-revert-to-two-tone-dim": !remoteIsInSync,
          })}
        />
      </ToolbarButton>;
};
