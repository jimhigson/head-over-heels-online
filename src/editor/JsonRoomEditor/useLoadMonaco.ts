import type { Monaco } from "@monaco-editor/react";

import { useEffect, useState } from "react";

import { loadMonacoOnce } from "./monaco-loader";

export const useLoadMonaco = (): Monaco | null => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    loadMonacoOnce().then((loadedMonaco) => {
      setMonaco(loadedMonaco);
    });
  }, []);

  return monaco;
};
