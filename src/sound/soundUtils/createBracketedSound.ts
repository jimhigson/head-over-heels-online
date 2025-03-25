import type { CreateAudioNodeOptions } from "./createAudioNode";
import { createAudioNode } from "./createAudioNode";

export type BracketedSound = ReturnType<typeof createBracketedSound>;

export const createBracketedSound = ({
  start,
  loop,
  stop,
  connectTo,
}: {
  start: Omit<CreateAudioNodeOptions, "connectTo" | "loop">;
  loop: Omit<CreateAudioNodeOptions, "connectTo" | "loop">;
  stop: Omit<CreateAudioNodeOptions, "connectTo" | "loop">;
  connectTo: AudioNode;
}) => {
  let currentSound: AudioBufferSourceNode | undefined;
  let currentlyActive = false;

  return (active: boolean) => {
    if (active !== currentlyActive) {
      if (active) {
        // stop in case was playing the end sound and is starting up again
        currentSound?.stop();
        currentSound = createAudioNode({ ...start, connectTo });

        currentSound.onended = () => {
          currentSound = createAudioNode({ ...loop, connectTo, loop: true });
        };
      } else {
        if (currentSound !== undefined) {
          currentSound.stop();
          currentSound.onended = null;
        }

        currentSound = createAudioNode({ ...stop, connectTo });
      }
      currentlyActive = active;
    }
  };
};
