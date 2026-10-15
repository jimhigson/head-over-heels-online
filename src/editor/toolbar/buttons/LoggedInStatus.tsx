import { skipToken } from "@reduxjs/toolkit/query/react";
import { type Provider } from "@supabase/supabase-js";

import { BlockyMarkdown } from "../../../game/components/BlockyMarkdown";
import {
  useGetAuthProvidersQuery,
  useGetUsernameQuery,
} from "../../../store/slices/campaigns/editorCampaignsApiSlice";
import { Button } from "../../../ui/Button";
import { cn } from "../../../ui/cn";
import { SpinnerHead } from "../../../ui/Spinner";
import { useTip } from "../../../ui/tip/useTip";
import { logInWithProvider } from "../../auth/logInWithProvider";
import { logOut } from "../../auth/logOut";
import { ProviderIcon } from "../../auth/ProviderIcon";
import {
  useIsAuthServerUnreachable,
  useSupabaseUser,
} from "../useSupabaseUser";

export const LoggedInStatus = ({ class: className }: { class?: string }) => {
  const user = useSupabaseUser();
  // the session only carries the email; look up the display name to show instead
  const { data: username } = useGetUsernameQuery(user ? user.id : skipToken);
  const { data: authProviders = [], isError: authProvidersFailed } =
    useGetAuthProvidersQuery();
  const { interestfor, tip } = useTip(user?.email);
  const isAuthServerUnreachable = useIsAuthServerUnreachable();

  if (isAuthServerUnreachable) {
    return (
      <div class={cn("px-1 pb-1 bg-midRed", className)}>
        <BlockyMarkdown class="text-highlightBeige [&_h2]:text-white">{`## Can’t log in

![](texture-dalek_1) Can’t reach the login server.

You can’t save now, but edit and can save when the network comes back`}</BlockyMarkdown>
      </div>
    );
  }

  if (user === undefined) {
    // no data yet - don't know if logged in. Render a space-holder to stop the
    // ui jumping around as much:
    return (
      <div class={cn("flex flex-col items-center", className)}>
        <div class="h-4">
          <SpinnerHead />
        </div>
        <span class="text-single-line">Logging in</span>
      </div>
    );
  }

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
          <Button aria-label="Log out" class="px-1 w-full" onClick={logOut}>
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
            <span class="text-single-line">
              {authProvidersFailed ?
                "Can’t reach the login server"
              : "Log in with:"}
            </span>
            {authProviders.map((authProvider) => {
              return (
                <Button
                  key={authProvider}
                  class="px-1 w-full max-w-16 flex-row justify-between bg-redShadow"
                  onClick={() => logInWithProvider(authProvider)}
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
