import { useEffect, useState } from "preact/hooks";

/**
 * The current `location.pathname`, re-rendering the caller when the history
 * location changes (back/forward navigation). Built on the platform history
 * API - no routing library needed.
 */
export const useRoutePath = (): string => {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  return path;
};
