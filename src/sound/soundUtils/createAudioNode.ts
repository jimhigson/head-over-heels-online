import { audioCtx } from "../audioCtx";
import { loadedSounds, type SoundId } from "../soundsLoader";

export type CreateAudioNodeOptions = {
  soundId: SoundId;
  playbackRate?: number;
  varyPlaybackRate?: boolean;
  loop?: boolean;
  connectTo: AudioNode;
};

export const createAudioNode = ({
  playbackRate = 1,
  soundId,
  connectTo,
  loop = false,
  varyPlaybackRate = false,
}: CreateAudioNodeOptions): AudioBufferSourceNode => {
  const node = audioCtx.createBufferSource();
  const buffer = loadedSounds()[soundId];
  node.buffer = buffer;
  node.loop = loop;

  node.playbackRate.value =
    varyPlaybackRate ? playbackRate - 0.05 + Math.random() * 0.1 : playbackRate;

  node.connect(connectTo);

  if (loop) {
    // randomise the start time - otherwise if there are multiple playing at the same time
    // it will sound like one effect
    node.start(buffer.duration * Math.random());
  } else {
    node.start();
  }

  return node;
};
