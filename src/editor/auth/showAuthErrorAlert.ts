import { importGetSupabaseUser } from "../../db/getSupabaseUser.import";
import { showAlert } from "../toolbar/showAlert";

/** tell the user logging in or out failed, and why */
export const showAuthErrorAlert = async (
  /** eg "Couldn’t log out" */
  heading: string,
  /** from the auth client, or thrown while calling it */
  authError: unknown,
) => {
  const { isAuthServerUnreachable } = await importGetSupabaseUser();
  await showAlert({
    heading,
    body:
      isAuthServerUnreachable(authError) ?
        "Can’t reach the login server. Check your connection, or whether this network blocks it."
      : String(authError),
    okText: "OK",
  });
};
