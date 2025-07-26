import { useEffect, useState } from "react";
import { loadMonacoOnce } from "./monaco-loader";
import type { Monaco } from "@monaco-editor/react";

export const useLoadMonaco = (): Monaco | null => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    loadMonacoOnce().then((loadedMonaco) => {
      setMonaco(loadedMonaco);
    });
  }, []);

  return monaco;
};
