import { audioCtx } from "../audioCtx";
import { loadedSounds, type SoundId } from "../soundsLoader";

export type CreateAudioNodeOptionsObject = {
  soundId: SoundId;
  playbackRate?: number;
  varyPlaybackRate?: boolean;
  randomiseStartPoint?: boolean;
  loop?: boolean;
  connectTo?: AudioNode;
};

export type CreateAudioNodeWithGainOptionsObject = {
  gain: number;
  soundId: SoundId;
  playbackRate?: number;
  varyPlaybackRate?: boolean;
  randomiseStartPoint?: boolean;
  loop?: boolean;
  connectTo?: AudioNode;
};

export type CreateAudioNodeOptions =
  | CreateAudioNodeWithGainOptionsObject
  | CreateAudioNodeOptionsObject
  | SoundId;

export const createAudioNode = <Opt extends CreateAudioNodeOptions>(
  param: Opt,
): Opt extends CreateAudioNodeWithGainOptionsObject ? GainNode
: AudioBufferSourceNode => {
  const resolvedParam: CreateAudioNodeOptionsObject =
    typeof param === "string" ? { soundId: param as SoundId } : param;

  const {
    playbackRate = 1,
    soundId,
    connectTo,
    loop = false,
    varyPlaybackRate = false,
    randomiseStartPoint = false,
    gain = 1,
  } = resolvedParam as CreateAudioNodeWithGainOptionsObject;

  const node = audioCtx.createBufferSource();
  const buffer = loadedSounds()[soundId];
  node.buffer = buffer;
  node.loop = loop;

  node.playbackRate.value =
    varyPlaybackRate ? playbackRate - 0.05 + Math.random() * 0.1 : playbackRate;

  if (loop && randomiseStartPoint) {
    // randomise the start time - otherwise if there are multiple playing at the same time
    // it will sound like one effect
    node.start(0, buffer.duration * Math.random());
  } else {
    node.start();
  }

  if (gain !== 1) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = gain;
    node.connect(gainNode);
    if (connectTo !== undefined) gainNode.connect(connectTo);
    return gainNode as Opt extends CreateAudioNodeWithGainOptionsObject ?
      GainNode
    : AudioBufferSourceNode;
  } else {
    if (connectTo !== undefined) node.connect(connectTo);
    return node as Opt extends CreateAudioNodeWithGainOptionsObject ? GainNode
    : AudioBufferSourceNode;
  }
};
