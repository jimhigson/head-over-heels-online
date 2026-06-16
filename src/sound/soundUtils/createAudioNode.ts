import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import { audioCtx } from "../audioCtx";
import { loadedSound } from "../soundsLoader";

/**
 * when looping, the lead-in and lead-out at each end of the buffer that is
 * excluded from the looped region, in seconds
 */
const loopLeadInOutSec = 0.02;

export type CreateAudioNodeOptionsObject = {
  soundId: ExportedSoundId;
  playbackRate?: number;
  varyPlaybackRate?: boolean;
  randomiseStartPoint?: boolean;
  /** random delay before the sound starts, in milliseconds */
  randomDelayMaxMs?: number;
  loop?: boolean;
  connectTo?: AudioNode;
};

export type CreateAudioNodeOptions =
  //| CreateAudioNodeWithGainOptionsObject
  CreateAudioNodeOptionsObject | ExportedSoundId;

export const createAudioNode = (
  param: CreateAudioNodeOptions,
): AudioBufferSourceNode => {
  const resolvedParam: CreateAudioNodeOptionsObject =
    typeof param === "string" ? { soundId: param as ExportedSoundId } : param;

  const {
    playbackRate = 1,
    soundId,
    connectTo,
    loop = false,
    varyPlaybackRate = false,
    randomiseStartPoint = false,
    randomDelayMaxMs = 0,
  } = resolvedParam;

  const node = audioCtx.createBufferSource();

  const buffer = loadedSound(soundId);

  node.buffer = buffer;

  const loopLead =
    buffer.duration > 2 * loopLeadInOutSec ?
      loopLeadInOutSec
      // when the buffer is too short to trim a lead-in/out from both ends, don't trim
    : 0;

  if (loop) {
    node.loop = true;
    // loop the inner region of the buffer, excluding the lead-in/out at each end
    node.loopStart = loopLead;
    node.loopEnd = buffer.duration - loopLead;
  }

  node.playbackRate.value =
    varyPlaybackRate ? playbackRate - 0.05 + Math.random() * 0.1 : playbackRate;

  const startTime =
    randomDelayMaxMs > 0 ?
      audioCtx.currentTime + (Math.random() * randomDelayMaxMs) / 1000
    : 0;

  if (loop && randomiseStartPoint) {
    // randomise the start point within the looped region - otherwise if there are
    // multiple playing at the same time it will sound like one effect
    node.start(
      startTime,
      loopLead + Math.random() * (buffer.duration - 2 * loopLead),
    );
  } else if (loop) {
    // skip the lead-in so the first pass matches the looped region
    node.start(startTime, loopLead);
  } else {
    node.start(startTime);
  }

  if (connectTo !== undefined) {
    node.connect(connectTo);
  }
  return node;
};
