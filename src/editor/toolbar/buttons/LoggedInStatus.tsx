import { skipToken } from "@reduxjs/toolkit/query/react";
import { type Provider } from "@supabase/supabase-js";

import { importSupabaseDb } from "../../../db/supabaseDb.import";
import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import {
  nerdFontAppleChar,
  nerdFontDiscordChar,
  nerdFontGithubChar,
  nerdFontGoogleChar,
  nerdFontTwitchChar,
} from "../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import {
  useGetAuthProvidersQuery,
  useGetUsernameQuery,
} from "../../../store/slices/campaigns/editorCampaignsApiSlice";
import { Button } from "../../../ui/Button";
import { cn } from "../../../ui/cn";
import { Tooltip } from "../../../ui/tooltip/Tooltip";
import { useSupabaseUser } from "../useSupabaseUser";

const providerIcons: Partial<Record<Provider, string>> = {
  apple: nerdFontAppleChar,
  discord: nerdFontDiscordChar,
  github: nerdFontGithubChar,
  google: nerdFontGoogleChar,
  twitch: nerdFontTwitchChar,
};

export type ProviderIconProps = {
  provider: Provider;
  className?: string;
};

const ProviderIcon = ({ provider, className }: ProviderIconProps) => {
  const icon = providerIcons[provider];
  if (icon === undefined) {
    return <span className="w-1" />;
  }
  return <span className={className}>{icon}</span>;
};

export const LoggedInStatus = ({ className }: { className?: string }) => {
  const user = useSupabaseUser();
  // the session only carries the email; look up the display name to show instead
  const { data: username } = useGetUsernameQuery(user ? user.id : skipToken);
  const { data: authProviders = [] } = useGetAuthProvidersQuery();

  if (user === undefined) {
    // no data yet - don't know if logged in. Render a space-holder to stop the
    // ui jumping around as much:
    return <div className="bg-shadow h-4" />;
  }

  const handleLogin = (provider: Provider) => async () => {
    // Remove everything after, and including, #.
    // the # was causing issues since the redirect adds another # with the auth
    // token to the url when coming back to our site, then leaves one which
    // can still be there if we log out and in again
    const redirectToUrl = new URL(window.location.href);
    redirectToUrl.hash = "";
    const redirectTo = redirectToUrl.toString();

    const { supabaseDb } = await importSupabaseDb();
    const { error } = await supabaseDb.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
    if (error) {
      console.error("Login error:", error);
    }
  };
  const handleLogout = async () => {
    const { supabaseDb } = await importSupabaseDb();
    const { error } = await supabaseDb.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={cn(className)}>
      {user !== null ?
        <div className="bg-moss overflow-hidden text-center">
          <Tooltip
            tooltipContent={user.email}
            triggerContent={
              <div className="overflow-hidden">
                <ProviderIcon
                  provider={user.app_metadata.provider as Provider}
                  className="text-highlightBeige"
                />{" "}
                <span>{username ?? user.email}</span>
              </div>
            }
          />
          <Button
            aria-label="Log out"
            className="px-1 w-full"
            onClick={handleLogout}
          >
            <span className="text-single-line">LOGOUT</span>
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
            {authProviders.map((authProvider) => {
              return (
                <Button
                  key={authProvider}
                  className="px-1 w-full max-w-16 flex-row justify-between bg-redShadow"
                  onClick={handleLogin(authProvider)}
                >
                  <ProviderIcon
                    provider={authProvider}
                    className="text-lightBeige"
                  />{" "}
                  <span>{authProvider}</span>
                </Button>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};
