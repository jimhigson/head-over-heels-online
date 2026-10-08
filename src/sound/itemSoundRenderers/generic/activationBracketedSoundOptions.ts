import { type BracketedSoundOptions } from "../../soundUtils/BracketedSound";

export const activationBracketedSoundOptions: BracketedSoundOptions = {
  start: {
    soundId: "activate",
    varyPlaybackRate: true,
    randomDelayMaxMs: 100,
  },
  stop: { soundId: "deactivate", randomDelayMaxMs: 100 },
};
