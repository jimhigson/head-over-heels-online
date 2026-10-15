import { useGetSupabaseUserQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";

/**
 * the logged-in user: null if known to be not logged in, undefined if not
 * known yet (or the auth server can't be reached - see
 * `useIsAuthServerUnreachable`)
 */
export const useSupabaseUser = () => useGetSupabaseUserQuery().data;

/** checking the login failed, as the auth server couldn't be reached */
export const useIsAuthServerUnreachable = () =>
  useGetSupabaseUserQuery().isError;
