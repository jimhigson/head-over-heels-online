import type { CreateAudioNodeOptionsObject } from "./createAudioNode";
import { createAudioNode } from "./createAudioNode";

export type BracketedSound = ReturnType<typeof createBracketedSound>;

type CreateBracketedSoundOptions = {
  start?: Omit<CreateAudioNodeOptionsObject, "connectTo" | "loop">;
  loop?: Omit<CreateAudioNodeOptionsObject, "connectTo" | "loop">;
  stop?: Omit<CreateAudioNodeOptionsObject, "connectTo" | "loop">;
  connectTo: AudioNode;
};

export const createBracketedSound = ({
  start,
  loop,
  stop,
  connectTo,
}: CreateBracketedSoundOptions) => {
  let currentSound: AudioBufferSourceNode | undefined;
  let currentlyActive = false;

  return (active: boolean | number) => {
    if (active !== currentlyActive) {
      if (active) {
        if (start !== undefined) {
          // stop in case was playing the end sound and is starting up again
          currentSound?.stop();
          currentSound = createAudioNode({ ...start, connectTo });

          if (loop !== undefined) {
            currentSound.onended = () => {
              currentSound = createAudioNode({
                ...loop,
                connectTo,
                loop: true,
              });
            };
          }
        } else if (loop !== undefined) {
          currentSound = createAudioNode({ ...loop, connectTo, loop: true });
        }
      } else {
        if (currentSound !== undefined) {
          currentSound.stop();
          currentSound.onended = null;
        }

        if (stop !== undefined) {
          currentSound = createAudioNode({ ...stop, connectTo });
        }
      }
      currentlyActive = !!active;
    }

    if (
      currentSound !== undefined &&
      typeof active === "number" &&
      active > 0
    ) {
      currentSound.playbackRate.value = active;
    }
  };
};
