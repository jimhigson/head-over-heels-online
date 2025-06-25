import { useEffect, useState } from "react";
import { monacoLoader } from "./monaco-loader";
import type { Monaco } from "@monaco-editor/react";

export const useLoadMonaco = (): Monaco | null => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    monacoLoader().then((loadedMonaco) => {
      setMonaco(loadedMonaco);
    });
  });

  return monaco;
};
