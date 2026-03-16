import type { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

import { importSupabaseDb } from "../../db/supabaseDb.import";

export const useSupabaseUser = () => {
  // undefined - unknown
  // null - known to be not logged in
  const [user, setUser] = useState<null | undefined | User>(undefined);

  useEffect(() => {
    let cancelled = false;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { supabaseDb } = await importSupabaseDb();
      if (cancelled) return;

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

      cleanup = () => subscription.unsubscribe();
    };

    init();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return user;
};
