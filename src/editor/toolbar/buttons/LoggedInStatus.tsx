import { skipToken } from "@reduxjs/toolkit/query/react";
import { type Provider } from "@supabase/supabase-js";

import { importSupabaseDb } from "../../../db/supabaseDb.import";
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
import { useTip } from "../../../ui/tip/useTip";
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
  class?: string;
};

const ProviderIcon = ({ provider, class: className }: ProviderIconProps) => {
  const icon = providerIcons[provider];
  if (icon === undefined) {
    return <span class="w-1" />;
  }
  return <span class={className}>{icon}</span>;
};

export const LoggedInStatus = ({ class: className }: { class?: string }) => {
  const user = useSupabaseUser();
  // the session only carries the email; look up the display name to show instead
  const { data: username } = useGetUsernameQuery(user ? user.id : skipToken);
  const { data: authProviders = [] } = useGetAuthProvidersQuery();
  const { interestfor, tip } = useTip(user?.email);

  if (user === undefined) {
    // no data yet - don't know if logged in. Render a space-holder to stop the
    // ui jumping around as much:
    return <div class="bg-shadow h-4" />;
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
    <div class={cn(className)}>
      {user !== null ?
        <div class="bg-moss overflow-hidden text-center">
          <button
            type="button"
            interestfor={interestfor}
            class="overflow-hidden block w-full"
          >
            <ProviderIcon
              provider={user.app_metadata.provider as Provider}
              class="text-highlightBeige"
            />{" "}
            <span>{username ?? user.email}</span>
          </button>
          {tip}
          <Button
            aria-label="Log out"
            class="px-1 w-full"
            onClick={handleLogout}
          >
            <span class="text-single-line">LOGOUT</span>
          </Button>
        </div>
      : <div class="px-1 bg-midRed">
          <div class="block w-full pb-1">
            <span class="text-double-height">Not logged in</span>
          </div>
          <span class="block w-full text-highlightBeige text-single-line">
            You will not be able to save
          </span>
          <div class="pt-1 flex flex-col gap-half">
            <span class="text-single-line">Log in with:</span>
            {authProviders.map((authProvider) => {
              return (
                <Button
                  key={authProvider}
                  class="px-1 w-full max-w-16 flex-row justify-between bg-redShadow"
                  onClick={handleLogin(authProvider)}
                >
                  <ProviderIcon
                    provider={authProvider}
                    class="text-lightBeige"
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
