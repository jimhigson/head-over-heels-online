import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

const LoadingContext = createContext<{
  count: number;
  loadingStarted: () => void;
  loadingFinished: () => void;
} | null>(null);

/**
 * track how many things are loading currently - allows us to draw a loading border without
 * completely changing how things are rendered
 */
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const loadingStarted = useCallback(() => setCount((prev) => prev + 1), []);
  const loadingFinished = useCallback(() => setCount((prev) => prev - 1), []);

  return (
    <LoadingContext
      value={{
        count,
        loadingStarted,
        loadingFinished,
      }}
    >
      {children}
    </LoadingContext>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

export const useIsLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context.count > 0;
};
