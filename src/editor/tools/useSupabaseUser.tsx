import type { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabaseDb } from "../../db/supabaseDb";

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);

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
