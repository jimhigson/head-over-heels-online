import type { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

import { supabaseDb } from "../../db/supabaseDb";

export const useSupabaseUser = () => {
  // undefined - unknown
  // null - known to be not logged in
  const [user, setUser] = useState<null | undefined | User>(undefined);

  useEffect(() => {
    // Get initial user
    supabaseDb.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Subscribe to changes
    const {
      data: { subscription },
    } = supabaseDb.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return user;
};
