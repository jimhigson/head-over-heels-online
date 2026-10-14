import { skipToken } from "@reduxjs/toolkit/query/react";
import { type Provider } from "@supabase/supabase-js";

import { useGetUsernameQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { ProviderIcon } from "../auth/ProviderIcon";
import { useSupabaseUser } from "../toolbar/useSupabaseUser";

/** the profile menu's name in the menu bar: who is logged in, if anyone */
export const ProfileMenuName = () => {
  const user = useSupabaseUser();
  const { data: username } = useGetUsernameQuery(user ? user.id : skipToken);

  if (!user) {
    return "Profile";
  }

  return (
    <>
      <ProviderIcon
        provider={user.app_metadata.provider as Provider}
        class="text-highlightBeige"
      />{" "}
      {username ?? user.email}
    </>
  );
};
