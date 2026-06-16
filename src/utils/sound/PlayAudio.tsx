import { useEffect } from "preact/hooks";

import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import { audioCtx } from "../../sound/audioCtx";
import { loadSound } from "../../sound/soundsLoader";
import { connectWithGain } from "../../sound/soundUtils/connectWithGain";
import { createAudioNode } from "../../sound/soundUtils/createAudioNode";
import { stopWithFade } from "../../sound/soundUtils/stopWithFade";

export type PlayAudioProps = {
  soundId: ExportedSoundId;
  /** keep looping the sound until unmounted */
  loop?: boolean;
  /** gain applied to the sound, where 1 is full volume */
  volume?: number;
};

/**
 * Like <audio> except uses our playing mechanism that supports loops etc on the
 * audio api. Renders a hidden marker carrying the playing sound's id, so e2e
 * tests can assert which sound is playing (there is no <audio> element to find).
 */
export const PlayAudio = ({
  soundId,
  loop = false,
  volume = 1,
}: PlayAudioProps) => {
  useEffect(() => {
    let cancelled = false;

    let source: AudioBufferSourceNode | undefined;
    let gainNode: GainNode | undefined;

    const play = () => {
      if (cancelled) {
        // unmounted before the sound finished loading - never start it
        return;
      }
      // createAudioNode starts the sound but is left unconnected, so
      // connectWithGain can insert the gain node that applies the volume (and,
      // for loops, fades in from zero to avoid a click); that gain node is
      // also what we fade back out on unmount
      source = createAudioNode({ soundId, loop });
      gainNode = connectWithGain(
        source,
        { soundId, gain: volume },
        audioCtx.destination,
        loop,
      );
      source.onended = () => {
        // a non-looping sound that finishes before unmount - tidy up so the
        // unmount cleanup doesn't try to stop an already-ended node
        source?.disconnect();
        gainNode?.disconnect();
        source = undefined;
        gainNode = undefined;
      };
    };

    const loading = loadSound(soundId);
    if (loading === undefined) {
      // already loaded - play synchronously, without waiting
      play();
    } else {
      loading.then(play);
    }

    return () => {
      cancelled = true;
      if (source === undefined || gainNode === undefined) {
        return;
      }
      stopWithFade(source, gainNode);
    };
  }, [soundId, loop, volume]);

  // a hidden marker so e2e tests can assert which sound is playing (there is no
  // <audio> element to find). Only emitted in visual-regression builds, so it is
  // tree-shaken out of production - import.meta.env.MODE is a build-time constant
  return import.meta.env.MODE === "visual-regression" ?
      <span className="hidden" data-test-playing-sound={soundId} />
    : null;
};
