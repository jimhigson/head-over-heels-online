import { useState } from "react";
import { showOkAfterSaveDuration } from "./saving/SaveAndLoadButtons";

export const useShortTimeDisplay = () => {
  const [justDone, setJustDone] = useState<number>(0);

  return {
    justDone,
    doneNow() {
      setJustDone((n) => n + 1);
      setTimeout(() => setJustDone((n) => n - 1), showOkAfterSaveDuration);
    },
  };
};
