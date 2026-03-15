import type * as Monaco from "monaco-editor";

import { useEffect, useState } from "react";

import { loadMonacoOnce } from "./monaco-loader";

export const useLoadMonaco = (): null | typeof Monaco => {
  const [monaco, setMonaco] = useState<null | typeof Monaco>(null);

  useEffect(() => {
    loadMonacoOnce().then((loadedMonaco) => {
      setMonaco(loadedMonaco);
    });
  }, []);

  return monaco;
};
