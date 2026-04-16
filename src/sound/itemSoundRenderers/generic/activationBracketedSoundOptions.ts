import type { CreateBracketedEventOptions } from "../../soundUtils/createBracketedSound";

export const activationBracketedSoundOptions: CreateBracketedEventOptions = {
  start: {
    soundId: "activate",
    varyPlaybackRate: true,
    randomDelayMaxMs: 100,
  },
  stop: { soundId: "deactivate", randomDelayMaxMs: 100 },
  noStartOnFirstFrame: true,
};
