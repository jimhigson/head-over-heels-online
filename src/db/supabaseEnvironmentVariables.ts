if (import.meta.env && import.meta.env.VITE_SUPABASE_URL === undefined) {
  // in vite but no variable - giving one is mandatory for vite builds
  throw new Error("VITE_SUPABASE_URL is not defined in the environment");
}
if (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY === undefined) {
  // in vite but no variable - giving one is mandatory for vite builds
  throw new Error("VITE_SUPABASE_ANON_KEY is not defined in the environment");
}

export const supabaseUrl =
  import.meta.env ?
    new URL(
      import.meta.env.VITE_SUPABASE_URL,
      // making relative to the current page allows vite config to set
      // VITE_SUPABASE_URL to "/" to proxy through vite to the local supabase dev server
      window.location.href,
    ).href
    // no import.meta.env = not running under Vite, ie playwright spec or node - use
    // real server:
  : "https://pkswdnpftrundnewgnya.supabase.co";

/** public anon key */
export const supabaseAnonKey =
  import.meta.env ?
    import.meta.env.VITE_SUPABASE_ANON_KEY
    // no import.meta.env = not running under Vite, ie playwright spec or node - use
    // real key:
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc3dkbnBmdHJ1bmRuZXdnbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODI2MzIsImV4cCI6MjA2ODI1ODYzMn0.r_Y1RLOGJ55C0De5SBTVXqO09SMDqgV38sQuE-oDxXE";
