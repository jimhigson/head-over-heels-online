import { supabaseDb } from "../../db/supabaseDb";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { cn } from "../../ui/cn";
import { Button } from "../../ui/button";
import { useSupabaseUser } from "./useSupabaseUser";
import type { Provider } from "@supabase/supabase-js";
import {
  nerdFontDiscordChar,
  nerdFontGithubChar,
} from "../../sprites/hudSritesheetData";
import type { Subset } from "../../utils/subset";

type SupportedProvider = Subset<Provider, "github" | "discord">;

const providerIcon = (provider: SupportedProvider): string => {
  switch (provider) {
    case "github":
      return nerdFontGithubChar;
    case "discord":
      return nerdFontDiscordChar;
    // case "email":
    //   return "@";
    default:
      provider satisfies never;
      throw new Error();
  }
};

export const LoggedInStatus = ({ className }: { className?: string }) => {
  const user = useSupabaseUser();

  const handleLogin = (provider: Provider) => async () => {
    // Remove everything after, and including, #.
    // the # was causing issues since the redirect adds another # with the auth
    // token to the url when coming back to our site, then leaves one which
    // can still be there if we log out and in again
    const redirectToUrl = new URL(window.location.href);
    redirectToUrl.hash = "";
    const redirectTo = redirectToUrl.toString();

    const { error } = await supabaseDb.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
    if (error) console.error("Login error:", error);
  };
  const handleLogout = async () => {
    const { error } = await supabaseDb.auth.signOut();
    if (error) console.error("Logout error:", error);
  };

  return (
    <div className={cn(className)}>
      {user ?
        <div className="bg-moss">
          <BitmapText
            noSlitWords
            className="overflow-hidden"
          >{`${providerIcon(user.app_metadata.provider as SupportedProvider)}${user.email}`}</BitmapText>
          <Button className="px-1 w-full" onClick={handleLogout}>
            <BitmapText>Logout</BitmapText>
          </Button>
        </div>
      : <div className="px-1 bg-midRed">
          <BitmapText className="block w-full sprites-double-height pb-1">
            Not logged in
          </BitmapText>
          <BitmapText className="block w-full text-highlightBeige">
            You will not be able to save
          </BitmapText>
          <div className="pt-1 flex flex-col gap-half">
            <BitmapText>Log in with:</BitmapText>
            <Button
              className="px-1 w-full flex-row justify-between bg-redShadow"
              onClick={handleLogin("github")}
            >
              <BitmapText>{nerdFontGithubChar}</BitmapText>
              <BitmapText>GitHub</BitmapText>
            </Button>
            <Button
              className="px-1 w-full flex-row justify-between bg-redShadow"
              onClick={handleLogin("discord")}
            >
              <BitmapText>{nerdFontDiscordChar}</BitmapText>
              <BitmapText>Discord</BitmapText>
            </Button>
          </div>
        </div>
      }
    </div>
  );
};
