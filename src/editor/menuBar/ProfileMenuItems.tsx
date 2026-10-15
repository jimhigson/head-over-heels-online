import { useGetAuthProvidersQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { logInWithProvider } from "../auth/logInWithProvider";
import { logOut } from "../auth/logOut";
import {
  useIsAuthServerUnreachable,
  useSupabaseUser,
} from "../toolbar/useSupabaseUser";

/** the profile menu: logging in or out */
export const ProfileMenuItems = () => {
  const user = useSupabaseUser();
  const { data: authProviders = [], isError: authProvidersFailed } =
    useGetAuthProvidersQuery();
  const isAuthServerUnreachable = useIsAuthServerUnreachable();

  if (isAuthServerUnreachable) {
    return (
      <MenuItem
        label="Can’t reach the login server"
        disabled
        onSelect={() => {}}
      />
    );
  }

  if (user === undefined) {
    return (
      <MenuItem
        label="Loading…"
        class="animate-flash"
        disabled
        onSelect={() => {}}
      />
    );
  }

  if (user === null) {
    return (
      <>
        <MenuItem label="Not logged in" disabled onSelect={() => {}} />
        {authProvidersFailed && (
          <MenuItem
            label="Can’t reach the login server"
            disabled
            onSelect={() => {}}
          />
        )}
        {authProviders.map((authProvider) => (
          <MenuItem
            key={authProvider}
            label={`Log in with ${authProvider}`}
            onSelect={() => logInWithProvider(authProvider)}
          />
        ))}
      </>
    );
  }

  return <MenuItem label="Log out" onSelect={logOut} />;
};
